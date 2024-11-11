import { UserTypeEnum } from "../../../shared/enums/user-type.enum";
import { UserRepository } from "../repositories/user.repository";


export class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers() {
    return this.userRepository.findAll();
  }

  getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  createUser(data: { name: string; email: string; role: UserTypeEnum, specialty?: string }) {
    return this.userRepository.createUser(data);
  }

  updateUser(id: string, data: Partial<{ name: string; email: string }>) {
    return this.userRepository.update(id, data);
  }

  deleteUser(id: string) {
    this.userRepository.delete(id);
  }
}
