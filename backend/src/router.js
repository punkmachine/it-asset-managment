import { Router } from 'express';
import { check } from 'express-validator';

import authMiddleware from './middleware/auth.js';
// import catchMiddleware from './middleware/catch.js'

import AuthController from './controllers/auth.js';
import UserController from './controllers/user.js';
import BranchesController from './controllers/branch.js';
import EquipmentsController from './controllers/equipment.js';
import HistoryController from './controllers/history.js';

const router = new Router();

router.post('/login', AuthController.login);

// филиалы
router.get('/branches', authMiddleware, BranchesController.getAll); // @todo: пагинация
router.get('/branches/search', authMiddleware, BranchesController.searchBranches); // @todo: пагинация
router.get('/branch/:id', authMiddleware, BranchesController.getById);
router.post('/branch', authMiddleware, BranchesController.create);
router.put('/branch/:id', authMiddleware, BranchesController.updateById);
router.delete('/branch/:id', authMiddleware, BranchesController.deleteById);

// юзеры
router.get('/users', authMiddleware, UserController.getAll); // @todo: пагинация
router.get('/users/search', authMiddleware, UserController.searchUsers); // @todo: пагинация
router.get('/user/:id', authMiddleware, UserController.getById);
router.post('/user',
  [
    check('login', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 символов").isLength({ min: 4 }),
    // authMiddleware
  ],
  UserController.create
);
router.put('/user/:id', authMiddleware, UserController.updateById);
router.delete('/user/:id', authMiddleware, UserController.deleteById);

// оборудование
router.get('/equipments', authMiddleware, EquipmentsController.getAll); // @todo: пагинация
router.get('/equipments/search', authMiddleware, EquipmentsController.searchEquipments); // @todo: пагинация
router.get('/equipment/:id', authMiddleware, EquipmentsController.getById);
router.post('/equipments', authMiddleware, EquipmentsController.createByFile); // @todo: тут файл должен быть
router.put('/equipment/:id', authMiddleware, EquipmentsController.updateById);
router.delete('/equipment/:id', authMiddleware, EquipmentsController.deleteById);

// комменты оборудования
router.post('/equipment/comment/:equipmentId', authMiddleware, EquipmentsController.createComment);

// история оборудования
router.get('/equipments/history/:equipmentId', authMiddleware, HistoryController.getHistoryByEquipmentId);
router.post('/equipments/history/:equipmentId', authMiddleware, HistoryController.createHistoryItem);


export default router;
