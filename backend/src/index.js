import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import router from './router.js';

const PORT = 5004;
const DB_URL = 'mongodb://localhost:27017/IT-ASSET-MANAGMENT';
const app = express();

app.use(fileUpload({}));
app.use(express.static('static'));
app.use(express.json());
app.use('/api', router);

async function startApp() {
	try {
		app.listen(PORT, () => console.log('server started'));

		mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
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
