import { Injectable } from '@nestjs/common';
import { Author } from './author.entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async getAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getAuthor(id: number): Promise<Author[]> {
    return await this.authorRepository.find({
      select: ['firstname', 'lastname', 'birthdate'],
      where: [{ id: id }],
    });
  }

  saveAuthor(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }

  deleteAuthor(author: Author): void {
    this.authorRepository.delete(author);
  }
}
