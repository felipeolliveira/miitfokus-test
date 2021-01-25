import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Tasks from '../entities/Tasks';

export default class HomeController {
  public async index(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Tasks);

    const tasks = await repository.find();
    return res.json(tasks);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, status, due_date } = req.body;

    const repository = getRepository(Tasks);

    const tasks = repository.create({
      name,
      description,
      status,
      due_date,
    });

    await repository.save(tasks);

    return res.json(tasks);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.query;
    const repository = getRepository(Tasks);

    if (id === 'delete-all') {
      const AllTasks = await repository.find();
      const allIds = AllTasks.map(task => task.id);

      const deletedAllTasks = await repository.delete(allIds);

      return res.send(deletedAllTasks);
    }

    if (id === 'delete-by-status' && status !== '') {
      const AllTasksByStatus = await repository.find({ where: { status } });
      const allIds = AllTasksByStatus.map(task => task.id);

      const deletedAllTasksByStatus = await repository.delete(allIds);

      return res.send(deletedAllTasksByStatus);
    }

    const tasks = await repository.delete(id);

    return res.json(tasks);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = req.body;

    const repository = getRepository(Tasks);

    const task = await repository.findOne(id);

    const updatedTask = Object.assign(task, updateData);

    await repository.save(updatedTask);

    return res.json(updatedTask);
  }

  public async patch(req: Request, res: Response): Promise<Response> {
    const { statusOut } = req.query;
    const { statusIn } = req.body;

    const repository = getRepository(Tasks);

    const tasks = await repository.find({ where: { status: statusOut } });

    const updatedStatusTasks = tasks.map(task => {
      Object.assign(task, { status: statusIn });

      return task;
    });

    await repository.save(updatedStatusTasks);

    return res.json(updatedStatusTasks);
  }
}
