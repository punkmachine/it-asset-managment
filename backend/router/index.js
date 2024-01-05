import { Router } from 'express';

const router = new Router();

router.get('/ping', (request, response) => {
  response.status(200).json('pong');
});

export default router;
