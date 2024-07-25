import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmptyDatabase1721229856580 implements MigrationInterface {
  name = 'CreateEmptyDatabase1721229856580';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content" ("id" SERIAL NOT NULL, "text" text NOT NULL, "bookId" integer, CONSTRAINT "REL_2ab41132b49cae2bd2daf9b9d7" UNIQUE ("bookId"), CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "contentId" integer, "authorId" integer, "genreId" integer, CONSTRAINT "REL_4dfd4327c20af533d692a55269" UNIQUE ("contentId"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100) NOT NULL, "birthdate" TIMESTAMP, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author_genre" ("authorId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_da01186c189ec52fb8f2d2654d6" PRIMARY KEY ("authorId", "genreId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d614e9f5f5478eda58255c5737" ON "author_genre" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1885b91f24f4fbb89cbed3df7e" ON "author_genre" ("genreId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_2ab41132b49cae2bd2daf9b9d7b" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_4dfd4327c20af533d692a552691" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_6ee57fcf22c96838179e5b46b2d" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "author_genre" ADD CONSTRAINT "FK_d614e9f5f5478eda58255c57378" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "author_genre" ADD CONSTRAINT "FK_1885b91f24f4fbb89cbed3df7e8" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "author_genre" DROP CONSTRAINT "FK_1885b91f24f4fbb89cbed3df7e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "author_genre" DROP CONSTRAINT "FK_d614e9f5f5478eda58255c57378"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_6ee57fcf22c96838179e5b46b2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_4dfd4327c20af533d692a552691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_2ab41132b49cae2bd2daf9b9d7b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1885b91f24f4fbb89cbed3df7e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d614e9f5f5478eda58255c5737"`,
    );
    await queryRunner.query(`DROP TABLE "author_genre"`);
    await queryRunner.query(`DROP TABLE "genre"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "content"`);
  }
}
