import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database.config';
import { NestFactory } from '@nestjs/core';
import { AuthorService } from '../author/author.service';
import { Author } from '../author/author.entity/author.entity';
import { AppModule } from '../app.module';
import { INestApplicationContext } from '@nestjs/common';

NestFactory.createApplicationContext(AppModule).then((application) => {
  new DataSource(databaseConfig).initialize().then((dataSource) => {
    const entities = dataSource.entityMetadatas;
    const promises = [];
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      promises.push(repository.delete({}));
    }

    return Promise.all(promises)
      .then(async function () {
        return await executeFixtures(application);
      })
      .then(() => {
        dataSource.destroy();
      });
  });
});

function executeFixtures(application: INestApplicationContext): Promise<any[]> {
  const promises = [];

  const author1 = new Author();
  author1.firstname = 'William';
  author1.lastname = 'Shakespeare';
  author1.birthdate = new Date(1564, 4, 26);

  promises.push(application.get(AuthorService).saveAuthor(author1));

  const author2 = new Author();
  author2.firstname = 'Victor';
  author2.lastname = 'Hugo';
  author2.birthdate = new Date(1802, 2, 26);

  promises.push(application.get(AuthorService).saveAuthor(author2));

  const author3 = new Author();
  author3.firstname = 'Roald';
  author3.lastname = 'Dahl';
  author3.birthdate = new Date(1916, 9, 13);

  promises.push(application.get(AuthorService).saveAuthor(author3));

  const author4 = new Author();
  author4.firstname = 'Émile';
  author4.lastname = 'Zola';
  author4.birthdate = new Date(1840, 4, 2);

  promises.push(application.get(AuthorService).saveAuthor(author4));

  const author5 = new Author();
  author5.firstname = 'Agatha';
  author5.lastname = 'Christie';
  author5.birthdate = new Date(1890, 9, 15);

  promises.push(application.get(AuthorService).saveAuthor(author5));

  return Promise.all(promises);
}
