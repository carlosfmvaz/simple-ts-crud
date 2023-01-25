import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674442365595 implements MigrationInterface {
    name = 'default1674442365595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
