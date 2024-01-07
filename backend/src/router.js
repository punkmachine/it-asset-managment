import { Router } from 'express';
import { check } from 'express-validator';

import authMiddleware from './middleware/auth.js';

import AuthController from './controllers/auth.js';
import UserController from './controllers/user.js';
import BranchesController from './controllers/branch.js';

const router = new Router();

router.get('/ping', (request, response) => {
  response.status(200).json('pong');
});

router.post('/login', AuthController.login);

// филиалы
router.get('/branches', BranchesController.getAll); // @todo: пагинация
router.get('/branches/search', () => {}); // @todo: пагинация
router.get('/branch/:id', BranchesController.getById);
router.post('/branch', BranchesController.create);
router.put('/branch/:id', BranchesController.updateById);
router.delete('/branch/:id', BranchesController.deleteById);

// юзеры
router.get('/users', UserController.getAll); // @todo: пагинация
router.get('/users/search', () => {}); // @todo: пагинация
router.get('/user/:id', UserController.getById);
router.post('/user', [
    check('login', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min:4 }),
  ],
  UserController.create
);
router.put('/user/:id', UserController.updateById);
router.delete('/user/:id', UserController.deleteById);

// оборудование
router.get('/equipments', () => {}); // @todo: пагинация
router.get('/equipments/search', () => {}); // @todo: пагинация
router.get('/equipment/:id', () => {});
router.post('/equipments', () => {}); // @todo: тут файл должен быть
router.put('/equipment/:id', () => {});
router.delete('/equipment/:id', () => {});

// история оборудования
router.get('/equipments/history/:equipmentId', () => {}); // @todo: пагинация
router.post('/equipments/history/:equipmentId', () => {});


export default router;
