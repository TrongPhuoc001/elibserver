import {MigrationInterface, QueryRunner} from "typeorm";

export class addLibrarian1654769579987 implements MigrationInterface {
    name = 'addLibrarian1654769579987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "librarian" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "account" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_d5082c55e4755453f4e6a965e7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '"2022-06-09T10:13:00.437Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "add_date" SET DEFAULT '2022-06-09 09:43:10.76'`);
        await queryRunner.query(`DROP TABLE "librarian"`);
    }

}
