import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelation1655289848239 implements MigrationInterface {
    name = 'updateRelation1655289848239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" DROP CONSTRAINT "FK_27097efa96faa25e32867a5b793"`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" DROP CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '"2022-06-15T10:44:08.837Z"'`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" ADD CONSTRAINT "FK_27097efa96faa25e32867a5b793" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" ADD CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" DROP CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c"`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" DROP CONSTRAINT "FK_27097efa96faa25e32867a5b793"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '2022-06-15 08:54:01.628'`);
        await queryRunner.query(`ALTER TABLE "book_waiting_lists_waiting_list" ADD CONSTRAINT "FK_39f600e4041ebc1d30d57d5ff3c" FOREIGN KEY ("waitingListId") REFERENCES "waiting_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book_shelfs_book_shelf" ADD CONSTRAINT "FK_27097efa96faa25e32867a5b793" FOREIGN KEY ("bookShelfId") REFERENCES "book_shelf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
