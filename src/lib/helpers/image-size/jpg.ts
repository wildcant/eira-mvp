// NOTE: we only support baseline and progressive JPGs here
// due to the structure of the loader class, we only get a buffer
// with a maximum size of 4096 bytes. so if the SOF marker is outside
// if this range we can't detect the file size correctly.

import type { Size } from './types';

const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;

// Each entry is exactly 12 bytes
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;

function is_exif(view: DataView, p: number): boolean {
	return view.getUint16(p + 2) === 0x4578 && view.getUint16(p + 4) === 0x6966;
}

function extract_orientation(
	view: DataView,
	exif_start: number,
	exif_end: number,
	is_little_endian: boolean
) {
	const idf_offset = 8;

	// IDF osset works from right after the header bytes
	// (so the offset includes the tiff byte align)
	const offset = exif_start + EXIF_HEADER_BYTES + idf_offset;

	const idf_directory_entries = view.getUint16(offset, is_little_endian);

	for (
		let directory_entry_number = 0;
		directory_entry_number < idf_directory_entries;
		directory_entry_number++
	) {
		const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directory_entry_number * IDF_ENTRY_BYTES;

		// Skip on corrupt EXIF blocks
		if (start > exif_end) {
			return;
		}

		const tag_number = view.getUint16(start + 0, is_little_endian);

		// 0x0112 (decimal: 274) is the `orientation` tag ID
		if (tag_number === 274) {
			const data_format = view.getUint16(start + 2, is_little_endian);

			if (data_format !== 3) {
				return;
			}

			// unsigned int has 2 bytes per component
			// if there would more than 4 bytes in total it's a pointer
			const number_of_components = view.getUint32(start + 4, is_little_endian);
			if (number_of_components !== 1) {
				return;
			}

			return view.getUint16(start + 8, is_little_endian);
		}
	}
}

function validate_exif_block(view: DataView, p: number, index: number) {
	// Skip APP1 Data Size
	const exif_start = p + APP1_DATA_SIZE_BYTES;
	const exif_end = p + index;

	// Ignore Empty EXIF. Validate byte alignment
	const byte1 = view.getUint8(exif_start + 6);
	const byte2 = view.getUint8(exif_start + 7);
	const is_big_endian = byte1 === 0x4d && byte2 === 0x4d;
	const is_little_endian = byte1 === 0x49 && byte2 === 0x49;

	if (is_big_endian || is_little_endian) {
		return extract_orientation(view, exif_start, exif_end, is_little_endian);
	}
}

export function jpg(data: ArrayBuffer): Size | undefined {
	const bytes = new Uint8Array(data);

	if (bytes[0] === 0xff && bytes[1] === 0xd8) {
		const view = new DataView(data);

		// Skip 4 bytes, they are for signature
		let p = 4;

		let orientation: number | undefined;

		while (p < bytes.length) {
			// read length of the next block
			const i = view.getUint16(p, false);

			if (is_exif(view, p)) {
				orientation = validate_exif_block(view, p, i);
			}

			// index should be within buffer limits
			if (p + i > bytes.length) {
				throw new TypeError('Corrupt JPG, exceeded buffer limits');
			}

			// Every JPEG block must begin with a 0xFF
			if (bytes[p + i] !== 0xff) {
				throw new TypeError('Invalid JPG, marker table corrupted');
			}

			// 0xFFC0 is baseline standard(SOF)
			// 0xFFC1 is baseline optimized(SOF)
			// 0xFFC2 is progressive(SOF2)
			const next = bytes[p + i + 1];

			if (next === 0xc0 || next === 0xc1 || next === 0xc2) {
				const size = {
					width: view.getUint16(p + i + 7, false),
					height: view.getUint16(p + i + 5, false)
				};

				if (orientation && orientation >= 5 && orientation <= 8) {
					[size.width, size.height] = [size.height, size.width];
				}

				return size;
			}

			// move to the next block
			p += i + 2;
		}

		throw new TypeError('Invalid JPG, no size found');
	}
}
