export type Person = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: 'relationship' | 'complicated' | 'single';
};

export const samples: Person[] = [
	{
		id: 1,
		firstName: 'Mariela',
		lastName: 'Labadie',
		age: 11,
		visits: 32,
		progress: 13,
		status: 'relationship'
	},
	{
		id: 2,
		firstName: 'Zella',
		lastName: 'Hintz',
		age: 15,
		visits: 57,
		progress: 29,
		status: 'single'
	},
	{
		id: 3,
		firstName: 'Devonte',
		lastName: 'Stehr',
		age: 11,
		visits: 84,
		progress: 6,
		status: 'relationship'
	},
	{
		id: 4,
		firstName: 'Katlynn',
		lastName: 'Weimann',
		age: 9,
		visits: 5,
		progress: 14,
		status: 'single'
	},
	{
		id: 5,
		firstName: 'Lucius',
		lastName: 'Crist',
		age: 1,
		visits: 82,
		progress: 55,
		status: 'single'
	},
	{
		id: 6,
		firstName: 'Antone',
		lastName: 'Mante',
		age: 17,
		visits: 31,
		progress: 41,
		status: 'single'
	},
	{
		id: 7,
		firstName: 'Sidney',
		lastName: 'Murazik',
		age: 24,
		visits: 1,
		progress: 11,
		status: 'relationship'
	},
	{
		id: 8,
		firstName: 'Roman',
		lastName: 'Doyle',
		age: 5,
		visits: 35,
		progress: 86,
		status: 'relationship'
	},
	{
		id: 9,
		firstName: 'Tyra',
		lastName: 'Schmidt',
		age: 2,
		visits: 30,
		progress: 48,
		status: 'complicated'
	},
	{
		id: 10,
		firstName: 'Hallie',
		lastName: 'Batz',
		age: 4,
		visits: 84,
		progress: 43,
		status: 'complicated'
	},
	{
		id: 11,
		firstName: 'Jacklyn',
		lastName: 'Greenfelder',
		age: 11,
		visits: 46,
		progress: 3,
		status: 'relationship'
	},
	{
		id: 12,
		firstName: 'Devon',
		lastName: 'Hettinger',
		age: 7,
		visits: 2,
		progress: 48,
		status: 'relationship'
	},
	{
		id: 13,
		firstName: 'Gilda',
		lastName: 'Ritchie',
		age: 10,
		visits: 2,
		progress: 69,
		status: 'single'
	},
	{
		id: 14,
		firstName: 'Paolo',
		lastName: 'Schoen',
		age: 7,
		visits: 36,
		progress: 55,
		status: 'complicated'
	},
	{
		id: 15,
		firstName: 'Nikita',
		lastName: 'Mills',
		age: 17,
		visits: 34,
		progress: 72,
		status: 'complicated'
	},
	{
		id: 16,
		firstName: 'Zoey',
		lastName: 'Raynor',
		age: 20,
		visits: 43,
		progress: 26,
		status: 'single'
	},
	{
		id: 17,
		firstName: 'April',
		lastName: 'Mann',
		age: 7,
		visits: 88,
		progress: 59,
		status: 'single'
	},
	{
		id: 18,
		firstName: 'Caden',
		lastName: 'Boyer',
		age: 21,
		visits: 56,
		progress: 48,
		status: 'relationship'
	},
	{
		id: 19,
		firstName: 'Susanna',
		lastName: 'Jacobs',
		age: 20,
		visits: 64,
		progress: 1,
		status: 'relationship'
	},
	{
		id: 20,
		firstName: 'Connie',
		lastName: 'Roob',
		age: 9,
		visits: 23,
		progress: 42,
		status: 'relationship'
	},
	{
		id: 21,
		firstName: 'Alexandrea',
		lastName: 'Friesen',
		age: 21,
		visits: 53,
		progress: 95,
		status: 'relationship'
	},
	{
		id: 22,
		firstName: 'Mckayla',
		lastName: 'Fritsch',
		age: 20,
		visits: 96,
		progress: 70,
		status: 'complicated'
	},
	{
		id: 23,
		firstName: 'Thomas',
		lastName: 'Flatley',
		age: 4,
		visits: 75,
		progress: 41,
		status: 'relationship'
	},
	{
		id: 24,
		firstName: 'Velma',
		lastName: 'Crist',
		age: 16,
		visits: 64,
		progress: 35,
		status: 'single'
	},
	{
		id: 25,
		firstName: 'Dorthy',
		lastName: 'Fay',
		age: 3,
		visits: 97,
		progress: 84,
		status: 'relationship'
	},
	{
		id: 26,
		firstName: 'Desiree',
		lastName: 'Runolfsdottir',
		age: 18,
		visits: 14,
		progress: 33,
		status: 'relationship'
	},
	{
		id: 27,
		firstName: 'Lacy',
		lastName: 'Smitham',
		age: 8,
		visits: 87,
		progress: 72,
		status: 'complicated'
	},
	{
		id: 28,
		firstName: 'Abigail',
		lastName: 'Bednar',
		age: 28,
		visits: 43,
		progress: 94,
		status: 'relationship'
	},
	{
		id: 29,
		firstName: 'Rebeca',
		lastName: 'Zboncak',
		age: 17,
		visits: 74,
		progress: 84,
		status: 'relationship'
	},
	{
		id: 30,
		firstName: 'Rosalee',
		lastName: 'West',
		age: 18,
		visits: 52,
		progress: 21,
		status: 'complicated'
	},
	{
		id: 31,
		firstName: 'Madyson',
		lastName: 'Lang',
		age: 13,
		visits: 50,
		progress: 43,
		status: 'single'
	},
	{
		id: 32,
		firstName: 'Elsie',
		lastName: 'Ruecker',
		age: 14,
		visits: 98,
		progress: 59,
		status: 'relationship'
	},
	{
		id: 33,
		firstName: 'Roscoe',
		lastName: 'Breitenberg',
		age: 23,
		visits: 17,
		progress: 99,
		status: 'complicated'
	},
	{
		id: 34,
		firstName: 'Dannie',
		lastName: 'Hoeger',
		age: 5,
		visits: 96,
		progress: 23,
		status: 'complicated'
	},
	{
		id: 35,
		firstName: 'Max',
		lastName: 'Schumm',
		age: 0,
		visits: 5,
		progress: 26,
		status: 'relationship'
	},
	{
		id: 36,
		firstName: 'Mylene',
		lastName: 'Fisher',
		age: 18,
		visits: 54,
		progress: 24,
		status: 'single'
	},
	{
		id: 37,
		firstName: 'Whitney',
		lastName: 'Osinski',
		age: 7,
		visits: 45,
		progress: 38,
		status: 'relationship'
	},
	{
		id: 38,
		firstName: 'Heather',
		lastName: 'Barrows',
		age: 20,
		visits: 98,
		progress: 14,
		status: 'complicated'
	},
	{
		id: 39,
		firstName: 'Colin',
		lastName: 'Dickinson',
		age: 17,
		visits: 44,
		progress: 60,
		status: 'complicated'
	},
	{
		id: 40,
		firstName: 'Aurelia',
		lastName: 'Volkman',
		age: 18,
		visits: 97,
		progress: 49,
		status: 'relationship'
	},
	{
		id: 41,
		firstName: 'Mitchell',
		lastName: 'Fahey',
		age: 7,
		visits: 32,
		progress: 78,
		status: 'relationship'
	},
	{
		id: 42,
		firstName: 'Cedrick',
		lastName: 'Kuhic',
		age: 2,
		visits: 33,
		progress: 67,
		status: 'complicated'
	},
	{
		id: 43,
		firstName: 'Alysson',
		lastName: 'Denesik',
		age: 12,
		visits: 0,
		progress: 95,
		status: 'single'
	},
	{
		id: 44,
		firstName: 'Emmalee',
		lastName: 'Larson',
		age: 4,
		visits: 72,
		progress: 96,
		status: 'single'
	},
	{
		id: 45,
		firstName: 'Tanya',
		lastName: 'Gleason',
		age: 16,
		visits: 80,
		progress: 56,
		status: 'complicated'
	},
	{
		id: 46,
		firstName: 'Gerda',
		lastName: 'Gislason',
		age: 20,
		visits: 15,
		progress: 27,
		status: 'complicated'
	},
	{
		id: 47,
		firstName: 'Pearlie',
		lastName: 'Bins',
		age: 21,
		visits: 55,
		progress: 85,
		status: 'relationship'
	},
	{
		id: 48,
		firstName: 'Jordi',
		lastName: 'Wintheiser',
		age: 19,
		visits: 49,
		progress: 95,
		status: 'single'
	},
	{
		id: 49,
		firstName: 'Skylar',
		lastName: 'Howe',
		age: 10,
		visits: 26,
		progress: 78,
		status: 'single'
	},
	{
		id: 50,
		firstName: 'Ora',
		lastName: 'Mitchell',
		age: 9,
		visits: 19,
		progress: 99,
		status: 'single'
	},
	{
		id: 51,
		firstName: 'Noemi',
		lastName: 'Bradtke',
		age: 18,
		visits: 10,
		progress: 43,
		status: 'relationship'
	},
	{
		id: 52,
		firstName: 'Sadie',
		lastName: 'Kassulke',
		age: 6,
		visits: 59,
		progress: 49,
		status: 'single'
	},
	{
		id: 53,
		firstName: 'Agustin',
		lastName: 'Wehner',
		age: 16,
		visits: 34,
		progress: 86,
		status: 'single'
	},
	{
		id: 54,
		firstName: 'Alicia',
		lastName: 'Morar',
		age: 12,
		visits: 93,
		progress: 63,
		status: 'relationship'
	},
	{
		id: 55,
		firstName: 'Vincenzo',
		lastName: 'Reinger',
		age: 22,
		visits: 96,
		progress: 39,
		status: 'single'
	},
	{
		id: 56,
		firstName: 'Joey',
		lastName: 'Keebler',
		age: 7,
		visits: 61,
		progress: 22,
		status: 'complicated'
	},
	{
		id: 57,
		firstName: 'Cierra',
		lastName: 'Strosin',
		age: 16,
		visits: 40,
		progress: 18,
		status: 'single'
	},
	{
		id: 58,
		firstName: 'Malachi',
		lastName: 'Kilback',
		age: 11,
		visits: 81,
		progress: 69,
		status: 'complicated'
	},
	{
		id: 59,
		firstName: 'Sofia',
		lastName: 'Kautzer',
		age: 28,
		visits: 31,
		progress: 32,
		status: 'complicated'
	},
	{
		id: 60,
		firstName: 'Jerry',
		lastName: 'Schmeler',
		age: 24,
		visits: 30,
		progress: 48,
		status: 'single'
	},
	{
		id: 61,
		firstName: 'Evie',
		lastName: 'Mann',
		age: 13,
		visits: 43,
		progress: 29,
		status: 'relationship'
	},
	{
		id: 62,
		firstName: 'Alvis',
		lastName: 'Connelly',
		age: 10,
		visits: 50,
		progress: 85,
		status: 'single'
	},
	{
		id: 63,
		firstName: 'Reuben',
		lastName: 'Parisian',
		age: 4,
		visits: 69,
		progress: 87,
		status: 'single'
	},
	{
		id: 64,
		firstName: 'Judson',
		lastName: 'Gislason',
		age: 5,
		visits: 61,
		progress: 62,
		status: 'single'
	},
	{
		id: 65,
		firstName: 'Cory',
		lastName: 'Robel',
		age: 0,
		visits: 9,
		progress: 90,
		status: 'single'
	},
	{
		id: 66,
		firstName: 'Kattie',
		lastName: 'Upton',
		age: 6,
		visits: 37,
		progress: 67,
		status: 'complicated'
	},
	{
		id: 67,
		firstName: 'Darion',
		lastName: 'Hyatt',
		age: 7,
		visits: 63,
		progress: 35,
		status: 'complicated'
	},
	{
		id: 68,
		firstName: 'Anahi',
		lastName: 'Simonis',
		age: 14,
		visits: 34,
		progress: 14,
		status: 'complicated'
	},
	{
		id: 69,
		firstName: 'Price',
		lastName: 'Cole',
		age: 11,
		visits: 9,
		progress: 31,
		status: 'complicated'
	},
	{
		id: 70,
		firstName: 'Terrance',
		lastName: "O'Kon",
		age: 16,
		visits: 88,
		progress: 60,
		status: 'complicated'
	},
	{
		id: 71,
		firstName: 'Kiera',
		lastName: 'Hilpert',
		age: 23,
		visits: 2,
		progress: 7,
		status: 'complicated'
	},
	{
		id: 72,
		firstName: 'Dagmar',
		lastName: 'Fay',
		age: 4,
		visits: 68,
		progress: 88,
		status: 'relationship'
	},
	{
		id: 73,
		firstName: 'Benedict',
		lastName: 'Beahan',
		age: 1,
		visits: 17,
		progress: 19,
		status: 'single'
	},
	{
		id: 74,
		firstName: 'Freeman',
		lastName: 'Shanahan',
		age: 20,
		visits: 14,
		progress: 37,
		status: 'complicated'
	},
	{
		id: 75,
		firstName: 'Elinor',
		lastName: 'Olson',
		age: 23,
		visits: 44,
		progress: 73,
		status: 'single'
	},
	{
		id: 76,
		firstName: 'Lisandro',
		lastName: 'Berge',
		age: 17,
		visits: 1,
		progress: 15,
		status: 'complicated'
	},
	{
		id: 77,
		firstName: 'Jeffrey',
		lastName: 'Bergstrom',
		age: 2,
		visits: 22,
		progress: 4,
		status: 'single'
	},
	{
		id: 78,
		firstName: 'Heloise',
		lastName: 'Douglas',
		age: 1,
		visits: 43,
		progress: 30,
		status: 'single'
	},
	{
		id: 79,
		firstName: 'Nyah',
		lastName: 'Turcotte',
		age: 7,
		visits: 15,
		progress: 60,
		status: 'single'
	},
	{
		id: 80,
		firstName: 'Darwin',
		lastName: 'Wyman',
		age: 22,
		visits: 33,
		progress: 15,
		status: 'complicated'
	},
	{
		id: 81,
		firstName: 'Daphnee',
		lastName: 'Morar',
		age: 22,
		visits: 82,
		progress: 66,
		status: 'relationship'
	},
	{
		id: 82,
		firstName: 'Earnestine',
		lastName: 'Klein',
		age: 23,
		visits: 68,
		progress: 89,
		status: 'complicated'
	},
	{
		id: 83,
		firstName: 'Clarissa',
		lastName: 'Stoltenberg',
		age: 24,
		visits: 37,
		progress: 2,
		status: 'relationship'
	},
	{
		id: 84,
		firstName: 'Halie',
		lastName: 'Hartmann',
		age: 3,
		visits: 10,
		progress: 52,
		status: 'single'
	},
	{
		id: 85,
		firstName: 'Amara',
		lastName: 'Jacobs',
		age: 13,
		visits: 9,
		progress: 94,
		status: 'complicated'
	},
	{
		id: 86,
		firstName: 'Bell',
		lastName: 'Pacocha',
		age: 2,
		visits: 56,
		progress: 27,
		status: 'complicated'
	},
	{
		id: 87,
		firstName: 'Maritza',
		lastName: 'Rowe',
		age: 7,
		visits: 79,
		progress: 3,
		status: 'relationship'
	},
	{
		id: 88,
		firstName: 'Millie',
		lastName: 'Wunsch',
		age: 1,
		visits: 10,
		progress: 47,
		status: 'single'
	},
	{
		id: 89,
		firstName: 'Mason',
		lastName: 'Runte',
		age: 10,
		visits: 11,
		progress: 75,
		status: 'relationship'
	},
	{
		id: 90,
		firstName: 'Maribel',
		lastName: 'Dare',
		age: 22,
		visits: 39,
		progress: 26,
		status: 'single'
	},
	{
		id: 91,
		firstName: 'Fidel',
		lastName: 'Walter',
		age: 13,
		visits: 23,
		progress: 35,
		status: 'complicated'
	},
	{
		id: 92,
		firstName: 'Jayme',
		lastName: 'Kozey',
		age: 25,
		visits: 11,
		progress: 56,
		status: 'relationship'
	},
	{
		id: 93,
		firstName: 'Theresia',
		lastName: 'Hansen',
		age: 7,
		visits: 66,
		progress: 79,
		status: 'complicated'
	},
	{
		id: 94,
		firstName: 'Eloise',
		lastName: 'Romaguera',
		age: 13,
		visits: 38,
		progress: 81,
		status: 'single'
	},
	{
		id: 95,
		firstName: 'Nelle',
		lastName: 'Gorczany',
		age: 13,
		visits: 52,
		progress: 97,
		status: 'complicated'
	},
	{
		id: 96,
		firstName: 'Ford',
		lastName: 'Runte',
		age: 28,
		visits: 88,
		progress: 87,
		status: 'single'
	},
	{
		id: 97,
		firstName: 'Anna',
		lastName: 'Daniel',
		age: 21,
		visits: 80,
		progress: 15,
		status: 'single'
	},
	{
		id: 98,
		firstName: 'Garfield',
		lastName: "O'Connell",
		age: 18,
		visits: 10,
		progress: 74,
		status: 'relationship'
	},
	{
		id: 99,
		firstName: 'Max',
		lastName: 'Collier',
		age: 11,
		visits: 26,
		progress: 20,
		status: 'single'
	},
	{
		id: 100,
		firstName: 'Herta',
		lastName: 'Hartmann',
		age: 25,
		visits: 23,
		progress: 78,
		status: 'relationship'
	}
];
