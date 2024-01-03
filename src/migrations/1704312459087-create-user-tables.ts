import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTables1704312459087 implements MigrationInterface {
  name = 'CreateUserTables1704312459087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_device_os_enum" AS ENUM('IOS', 'ANDROID')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_device" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedAt" TIMESTAMP, "os" "public"."user_device_os_enum" NOT NULL, "model" character varying NOT NULL, "deviceId" character varying NOT NULL, "fcmToken" character varying NOT NULL, "user" uuid, CONSTRAINT "PK_0232591a0b48e1eb92f3ec5d0d1" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "user_device" ADD CONSTRAINT "FK_c0f33f9e8beee68a6ca4d86b5cd" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "user_device" DROP CONSTRAINT "FK_c0f33f9e8beee68a6ca4d86b5cd"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_device"`);
    await queryRunner.query(`DROP TYPE "public"."user_device_os_enum"`);
  }
}
