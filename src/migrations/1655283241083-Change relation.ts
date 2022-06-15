import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeRelation1655283241083 implements MigrationInterface {
    name = 'ChangeRelation1655283241083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waiting_list" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "book_shelf" ADD "bookId" integer`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '"2022-06-15T08:54:01.628Z"'`);
        await queryRunner.query(`ALTER TABLE "waiting_list" ADD CONSTRAINT "FK_0ca5aa2acd5790ccddca86d5b78" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_shelf" ADD CONSTRAINT "FK_a78c352ec76bcae86a16024d91d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_shelf" DROP CONSTRAINT "FK_a78c352ec76bcae86a16024d91d"`);
        await queryRunner.query(`ALTER TABLE "waiting_list" DROP CONSTRAINT "FK_0ca5aa2acd5790ccddca86d5b78"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '2022-06-09 10:13:00.437'`);
        await queryRunner.query(`ALTER TABLE "book_shelf" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "waiting_list" DROP COLUMN "userId"`);
    }

}
