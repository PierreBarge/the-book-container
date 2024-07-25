import { Book } from '../../book/book.entity/book.entity';
import { Genre } from '../../genre/genre.entity/genre.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  firstname: string;
  @Column({ type: 'varchar', length: 100 })
  lastname: string;
  @Column({ type: 'date', nullable: true })
  birthdate: Date;
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
  @ManyToMany(() => Genre, (genre) => genre.authors)
  @JoinTable({
    name: 'author_genre',
  })
  genres: Genre[];
}
