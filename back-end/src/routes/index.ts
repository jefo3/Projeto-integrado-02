import { Router } from 'express';

const routes = Router();

routes.get('/', async (request, response) => {
  return response.json({ teste: 'teste111' });
});

export default routes;
