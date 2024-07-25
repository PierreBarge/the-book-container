import { Author } from '../../author/author.entity/author.entity';
import { Book } from '../../book/book.entity/book.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
  @ManyToMany(() => Author, (author) => author.genres)
  authors: Author[];
}
