import { Author } from '../../author/author.entity/author.entity';
import { Content } from '../../content/content.entity/content.entity';
import { Genre } from '../../genre/genre.entity/genre.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @OneToOne(() => Content, (content) => content.book)
  @JoinColumn()
  content: Content;
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;
}
