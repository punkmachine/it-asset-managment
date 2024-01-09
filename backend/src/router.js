import { Router } from 'express';
import { check } from 'express-validator';

import authMiddleware from './middleware/auth.js';
// import catchMiddleware from './middleware/catch.js'

import AuthController from './controllers/auth.js';
import UserController from './controllers/user.js';
import BranchesController from './controllers/branch.js';

const router = new Router();

router.post('/login', AuthController.login);

// филиалы
router.get('/branches', authMiddleware, BranchesController.getAll); // @todo: пагинация
router.get('/branches/search', authMiddleware, () => {}); // @todo: пагинация
router.get('/branch/:id', authMiddleware, BranchesController.getById);
router.post('/branch', authMiddleware, BranchesController.create);
router.put('/branch/:id', authMiddleware, BranchesController.updateById);
router.delete('/branch/:id', authMiddleware, BranchesController.deleteById);

// юзеры
router.get('/users', authMiddleware, UserController.getAll); // @todo: пагинация
router.get('/users/search', authMiddleware, () => {}); // @todo: пагинация
router.get('/user/:id', authMiddleware, UserController.getById);
router.post('/user',
  [
    check('login', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4 }),
    authMiddleware
  ],
  UserController.create
);
router.put('/user/:id', authMiddleware, UserController.updateById);
router.delete('/user/:id', authMiddleware, UserController.deleteById);

// оборудование
router.get('/equipments', () => {}); // @todo: пагинация
router.get('/equipments/search', () => {}); // @todo: пагинация
router.get('/equipment/:id', () => {});
router.post('/equipments', () => {}); // @todo: тут файл должен быть
router.put('/equipment/:id', () => {});
router.delete('/equipment/:id', () => {});

// комменты оборудования
router.post('/equipment/comment/:id', () => {});

// история оборудования
router.get('/equipments/history/:equipmentId', () => {}); // @todo: пагинация
router.post('/equipments/history/:equipmentId', () => {});


export default router;
