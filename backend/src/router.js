import { Router } from 'express';
import BranchesController from './controllers/branch.js';

const router = new Router();

router.get('/ping', (request, response) => {
  response.status(200).json('pong');
});

router.post('/login', () => {});

// филиалы
router.get('/branches', BranchesController.getAll); // @todo: пагинация
router.get('/branches/search', () => {}); // @todo: пагинация
router.get('/branch/:id', BranchesController.getById);
router.post('/branch', BranchesController.create);
router.put('/branch/:id', BranchesController.updateById);
router.delete('/branch/:id', BranchesController.deleteById);

// юзеры
router.get('/users', () => {}); // @todo: пагинация
router.get('/users/search', () => {}); // @todo: пагинация
router.get('/user/:id', () => {});
router.post('/user', () => {});
router.put('/user/:id', () => {});
router.delete('/user/:id', () => {});

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
