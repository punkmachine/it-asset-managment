import { Router } from 'express';

const router = new Router();

router.get('/ping', (request, response) => {
  response.status(200).json('pong');
});

router.post('/login', () => {});

// филиалы
router.get('/branches', () => {}); // @todo: пагинация
router.get('/branches/search', () => {}); // @todo: пагинация
router.get('/branch/:id', () => {});
router.post('/branch', () => {});
router.put('/branch/:id', () => {});
router.delete('/branch/:id', () => {});

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
