import {
	ACCESS_KEY_ID,
	ACCOUNT_ID,
	BUCKET_NAME,
	R2_CUSTOM_DOMAIN,
	SECRET_ACCESS_KEY
} from '$env/static/private';
import { PUBLIC_R2_SUBDOMAIN } from '$env/static/public';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY
	}
});

export const upload = async (name: string, file: File) => {
	const signedUrl = await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: name,
			ContentType: file.type,
			ACL: 'public-read'
		})
	);

	await fetch(signedUrl, { method: 'PUT', body: file });
	return { url: `https://${R2_CUSTOM_DOMAIN ?? PUBLIC_R2_SUBDOMAIN}/${name}` };
};
