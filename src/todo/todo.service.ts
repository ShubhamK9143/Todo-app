import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoInput);
    return this.todoRepository.save(newTodo);
  }

  async update(id: number, updateTodoInput: CreateTodoInput): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoInput);
    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    return result.affected > 0;
  }
}
