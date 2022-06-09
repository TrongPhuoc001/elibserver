import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelation1654767790223 implements MigrationInterface {
    name = 'updateRelation1654767790223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_waiting_lists_waiting_list" ("userId" integer NOT NULL, "waitingListId" integer NOT NULL, CONSTRAINT "PK_894a5d2af27cc699a07039ab88f" PRIMARY KEY ("userId", "waitingListId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8344cb9359cc7ec57b31ee16ca" ON "user_waiting_lists_waiting_list" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d98ece7ad437877aceec7d2d95" ON "user_waiting_lists_waiting_list" ("waitingListId") `);
        await queryRunner.query(`CREATE TABLE "user_book_shelfs_book_shelf" ("userId" integer NOT NULL, "bookShelfId" integer NOT NULL, CONSTRAINT "PK_20aae13815d9cbc07416302a5ab" PRIMARY KEY ("userId", "bookShelfId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8efc4fd1c75939f6040a07cccc" ON "user_book_shelfs_book_shelf" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27097efa96faa25e32867a5b79" ON "user_book_shelfs_book_shelf" ("bookShelfId") `);
        await queryRunner.query(`CREATE TABLE "book_book_shelfs_book_shelf" ("bookId" integer NOT NULL, "bookShelfId" integer NOT NULL, CONSTRAINT "PK_41b7336361cf0956b53c2daa071" PRIMARY KEY ("bookId", "bookShelfId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a399662cbef0cd664525c867f5" ON "book_book_shelfs_book_shelf" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_48dbaf394e078618dee6922aea" ON "book_book_shelfs_book_shelf" ("bookShelfId") `);
        await queryRunner.query(`CREATE TABLE "book_waiting_lists_waiting_list" ("bookId" integer NOT NULL, "waitingListId" integer NOT NULL, CONSTRAINT "PK_bcbe68bdb743de360f946f10999" PRIMARY KEY ("bookId", "waitingListId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1538f123ad1607325a8c608b79" ON "book_waiting_lists_waiting_list" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39f600e4041ebc1d30d57d5ff3" ON "book_waiting_lists_waiting_list" ("waitingListId") `);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '"2022-06-09T09:43:10.760Z"'`);
        await queryRunner.query(`ALTER TABLE "user_waiting_lists_waiting_list" ADD CONSTRAINT "FK_8344cb9359cc7ec57b31ee16cab" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_waiting_lists_waiting_list" ADD CONSTRAINT "FK_d98ece7ad437877aceec7d2d95d" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" ADD CONSTRAINT "FK_8efc4fd1c75939f6040a07cccca" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" ADD CONSTRAINT "FK_27097efa96faa25e32867a5b793" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_book_shelfs_book_shelf" ADD CONSTRAINT "FK_a399662cbef0cd664525c867f51" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_book_shelfs_book_shelf" ADD CONSTRAINT "FK_48dbaf394e078618dee6922aea7" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" ADD CONSTRAINT "FK_1538f123ad1607325a8c608b79d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" ADD CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" DROP CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c"`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" DROP CONSTRAINT "FK_1538f123ad1607325a8c608b79d"`);
        await queryRunner.query(`ALTER TABLE "book_book_shelfs_book_shelf" DROP CONSTRAINT "FK_48dbaf394e078618dee6922aea7"`);
        await queryRunner.query(`ALTER TABLE "book_book_shelfs_book_shelf" DROP CONSTRAINT "FK_a399662cbef0cd664525c867f51"`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" DROP CONSTRAINT "FK_27097efa96faa25e32867a5b793"`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" DROP CONSTRAINT "FK_8efc4fd1c75939f6040a07cccca"`);
        await queryRunner.query(`ALTER TABLE "user_waiting_lists_waiting_list" DROP CONSTRAINT "FK_d98ece7ad437877aceec7d2d95d"`);
        await queryRunner.query(`ALTER TABLE "user_waiting_lists_waiting_list" DROP CONSTRAINT "FK_8344cb9359cc7ec57b31ee16cab"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '2022-06-09 09:40:04.474'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39f600e4041ebc1d30d57d5ff3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1538f123ad1607325a8c608b79"`);
        await queryRunner.query(`DROP TABLE "book_waiting_lists_waiting_list"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48dbaf394e078618dee6922aea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a399662cbef0cd664525c867f5"`);
        await queryRunner.query(`DROP TABLE "book_book_shelfs_book_shelf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27097efa96faa25e32867a5b79"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8efc4fd1c75939f6040a07cccc"`);
        await queryRunner.query(`DROP TABLE "user_book_shelfs_book_shelf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d98ece7ad437877aceec7d2d95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8344cb9359cc7ec57b31ee16ca"`);
        await queryRunner.query(`DROP TABLE "user_waiting_lists_waiting_list"`);
    }

}
