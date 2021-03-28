import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1616925030971 implements MigrationInterface {
    name = 'Initialize1616925030971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `m_user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `m_user`");
    }

}
