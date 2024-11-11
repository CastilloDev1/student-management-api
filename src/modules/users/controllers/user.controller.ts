import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../use-cases/user.use-cases';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const userUseCase = new UserUseCase();

export class UserController {

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userUseCase.getAllUsers();
      res.status(200).json({message: 'usuarios encontrados', data: users});
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await userUseCase.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, role, specialty } = req.body;
      const newUser = await userUseCase.createUser({ name, email, role, specialty });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const updatedUser = await userUseCase.updateUser(userId, updatedData);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      userUseCase.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
