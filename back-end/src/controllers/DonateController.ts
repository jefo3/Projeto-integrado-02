import { Request, Response } from 'express';

import CreateDonateService from '../services/donate/CreateDonateService';
import UpdateDonateService from '../services/donate/UpdateDonateService';
import DeleteDonateService from '../services/donate/DeleteDonateService';
import ListDonateService from '../services/donate/ListDonateService';
import ListAllDonateService from '../services/donate/ListAllDonateService';
import FilterDonateService from '../services/donate/FilterDonateService';
import ListAllSuccessfullDonateService from '../services/donate/ListAllSuccessfulDonateService';

import {getRepository} from 'typeorm'
import Donate from '../models/Donate'
import FilterDonateByTitleService from '../services/donate/FilterDonateByTitleService';
import UpdateImageService from '../services/donate/UpdateImageService';

class DonateController {
  async create(request: Request, response: Response) {
    try {

      const { title, description, tag_id } = request.body;
      const { id: user_id } = request.user;
      const status_donate = 'pending';

      const donateRepository = getRepository(Donate);

      const donate = await new CreateDonateService(donateRepository).execute({
        title,
        description,
        user_id,
        tag_id,
        status_donate,
      });

      return response.json(donate);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { title, description, tag_id, status_donate } = request.body;
      const { id } = request.params;

      const donateUpdate = await new UpdateDonateService().execute({
        title,
        description,
        id,
        tag_id,
        status_donate,
      });

      return response.json(donateUpdate);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const donateDelete = await new DeleteDonateService().execute({
        id,
      });

      return response.json(donateDelete);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const donates = await new ListDonateService().execute(user_id);

      return response.json(donates);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async listAll(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const donates = await new ListAllDonateService().execute(user_id);

      return response.json(donates);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async listAllSuccessfull(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const donates = await new ListAllSuccessfullDonateService().execute(user_id);

      return response.json(donates);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async filterTag(request: Request, response: Response) {
    try {
      const { id: user_id } = request.user;
      const { tag_id } = request.params;
      const donates = await new FilterDonateService().execute(tag_id, user_id);

      return response.json(donates);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async filterByTitle(request: Request, response: Response){
    try {
      const { title } = request.params;
      const donates = await new FilterDonateByTitleService().execute(title);

      return response.json(donates);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async addImage(request: Request, response: Response){
    try{
      const { id } = request.params;
      const image = request.file?.filename as string

      const donateRepository = getRepository(Donate);

      const donate = new UpdateImageService(donateRepository).execute({
        id,
        image
      })

      return response.json(donate);

    }catch(error){
      return response.status(400).json({error: (error as Error).message})
    }
  }
}

export default DonateController;
