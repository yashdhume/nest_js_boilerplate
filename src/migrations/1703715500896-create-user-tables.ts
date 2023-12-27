import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTables1703715500896 implements MigrationInterface {
  name = 'CreateUserTables1703715500896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "deviceId" character varying NOT NULL, "fcmToken" character varying NOT NULL, "user" uuid, CONSTRAINT "PK_99cf05a96c3aaf7dfd10b5740d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('MALE', 'FEMALE', 'TRANSGENDER', 'GENDER_NEUTRAL', 'NON_BINARY', 'NONE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "firebaseUID" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT '2', "dateOfBirth" TIMESTAMP WITH TIME ZONE NOT NULL, "gender" "public"."user_gender_enum" NOT NULL DEFAULT 'NONE', CONSTRAINT "UQ_19b80ce7ff447dba7f64c818bcd" UNIQUE ("firebaseUID"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "city" character varying NOT NULL, "district" character varying, "province" character varying NOT NULL, "country" character varying NOT NULL, "postalCode" character varying, "user" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification_token" ADD CONSTRAINT "FK_34f2ca9503d527ccc3446593564" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_ba16b7fcf16a986fcfdc67d74e2" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_ba16b7fcf16a986fcfdc67d74e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification_token" DROP CONSTRAINT "FK_34f2ca9503d527ccc3446593564"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "notification_token"`);
  }
}
