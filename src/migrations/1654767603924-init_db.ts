import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1654767603924 implements MigrationInterface {
    name = 'initDb1654767603924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "waiting_list" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3af55ff9231edec0da959ffc040" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "account" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "gender" character varying NOT NULL, "address" character varying NOT NULL, "is_ban" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_shelf" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_e16898fd97bfd050058b0cc3800" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "img_link" character varying, "star" character varying, "description" character varying, "state" integer NOT NULL DEFAULT '0', "add_date" TIMESTAMP NOT NULL DEFAULT '"2022-06-09T09:40:04.474Z"', "authorId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waiting_list_users_user" ("waitingListId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6ce72d636e95482648a4c958aff" PRIMARY KEY ("waitingListId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0119a340b2dc13ee623013182" ON "waiting_list_users_user" ("waitingListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_feb1b4b2d7496be4c90bf928df" ON "waiting_list_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "waiting_list_books_book" ("waitingListId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_64944585ac4874c402e7821bddd" PRIMARY KEY ("waitingListId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5460d92d43ddcae09edf30188" ON "waiting_list_books_book" ("waitingListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f3ea02e4716659cd496d6ca47" ON "waiting_list_books_book" ("bookId") `);
        await queryRunner.query(`CREATE TABLE "book_shelf_books_book" ("bookShelfId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_f0252b22bc1865dd8d95ea4c0fb" PRIMARY KEY ("bookShelfId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c08bee2e6f4af85ba424e9293" ON "book_shelf_books_book" ("bookShelfId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc22100fa2c8e86b32dd5392d2" ON "book_shelf_books_book" ("bookId") `);
        await queryRunner.query(`CREATE TABLE "book_shelf_users_user" ("bookShelfId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b5615a2af345105e31209743ead" PRIMARY KEY ("bookShelfId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1e2c92788e1a67c41ae61dded" ON "book_shelf_users_user" ("bookShelfId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b6139c23fc545733f08308674b" ON "book_shelf_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_75a197f32ed39286c5c39198ece" PRIMARY KEY ("bookId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "waiting_list_users_user" ADD CONSTRAINT "FK_a0119a340b2dc13ee623013182f" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waiting_list_users_user" ADD CONSTRAINT "FK_feb1b4b2d7496be4c90bf928df4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "waiting_list_books_book" ADD CONSTRAINT "FK_c5460d92d43ddcae09edf30188b" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waiting_list_books_book" ADD CONSTRAINT "FK_6f3ea02e4716659cd496d6ca473" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_shelf_books_book" ADD CONSTRAINT "FK_5c08bee2e6f4af85ba424e92939" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_shelf_books_book" ADD CONSTRAINT "FK_fc22100fa2c8e86b32dd5392d25" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_shelf_users_user" ADD CONSTRAINT "FK_e1e2c92788e1a67c41ae61dded2" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_shelf_users_user" ADD CONSTRAINT "FK_b6139c23fc545733f08308674b7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_31d658e0af554165f4598158c55"`);
        await queryRunner.query(`ALTER TABLE "book_shelf_users_user" DROP CONSTRAINT "FK_b6139c23fc545733f08308674b7"`);
        await queryRunner.query(`ALTER TABLE "book_shelf_users_user" DROP CONSTRAINT "FK_e1e2c92788e1a67c41ae61dded2"`);
        await queryRunner.query(`ALTER TABLE "book_shelf_books_book" DROP CONSTRAINT "FK_fc22100fa2c8e86b32dd5392d25"`);
        await queryRunner.query(`ALTER TABLE "book_shelf_books_book" DROP CONSTRAINT "FK_5c08bee2e6f4af85ba424e92939"`);
        await queryRunner.query(`ALTER TABLE "waiting_list_books_book" DROP CONSTRAINT "FK_6f3ea02e4716659cd496d6ca473"`);
        await queryRunner.query(`ALTER TABLE "waiting_list_books_book" DROP CONSTRAINT "FK_c5460d92d43ddcae09edf30188b"`);
        await queryRunner.query(`ALTER TABLE "waiting_list_users_user" DROP CONSTRAINT "FK_feb1b4b2d7496be4c90bf928df4"`);
        await queryRunner.query(`ALTER TABLE "waiting_list_users_user" DROP CONSTRAINT "FK_a0119a340b2dc13ee623013182f"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83bd32782d44d9db3d68c3f58c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31d658e0af554165f4598158c5"`);
        await queryRunner.query(`DROP TABLE "book_genres_genre"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6139c23fc545733f08308674b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1e2c92788e1a67c41ae61dded"`);
        await queryRunner.query(`DROP TABLE "book_shelf_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc22100fa2c8e86b32dd5392d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c08bee2e6f4af85ba424e9293"`);
        await queryRunner.query(`DROP TABLE "book_shelf_books_book"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f3ea02e4716659cd496d6ca47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5460d92d43ddcae09edf30188"`);
        await queryRunner.query(`DROP TABLE "waiting_list_books_book"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_feb1b4b2d7496be4c90bf928df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0119a340b2dc13ee623013182"`);
        await queryRunner.query(`DROP TABLE "waiting_list_users_user"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "book_shelf"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "waiting_list"`);
    }

}
