/*
  catch middleware
  валидации
*/

import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import router from './router.js';

const PORT = 5004;
const DB_URL = 'mongodb://127.0.0.1:27017/it-asset-managment';
const app = express();

app.use(fileUpload({}));
app.use(express.static('uploads'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use('/api', router);

async function startApp() {
	try {
		app.listen(PORT, () => console.log('server started'));

		mongoose.connect(DB_URL, {})
			.then(() => {
				console.log('Успешное подключение к базе данных');
			})
			.catch((error) => {
				console.error('Ошибка подключения к базе данных:', error);
			});
	} catch(error) {
		console.log(error);
	}
}

startApp();
