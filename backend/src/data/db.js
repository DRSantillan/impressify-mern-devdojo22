const USER_PLACES_DATA = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'One of the most famous sky scrapers in the world!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Empire State Building....',
		description: 'One of the most famous sky scrapers in the world!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u2',
	},
];
const USERS_DATA = [
	{
		id: 'u1',
		name: 'Haru Santillan',
		imageUrl:
			'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80',
		places: 3,
	},
	{
		id: 'u2',
		name: 'Dean Santillan',
		imageUrl:
			'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		places: 3,
	},
];
export { USER_PLACES_DATA, USERS_DATA };
