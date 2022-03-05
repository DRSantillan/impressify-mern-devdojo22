import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('get request for users');
	res.status(200).json({ message: 'Users' });
});

export default router;
