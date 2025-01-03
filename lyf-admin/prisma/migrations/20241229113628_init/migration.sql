-- CreateTable
CREATE TABLE "sys_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(20),
    "sex" INTEGER DEFAULT 3,
    "status" INTEGER NOT NULL DEFAULT 1,
    "department_id" INTEGER,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sys_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sort" INTEGER DEFAULT 1,
    "parent_id" INTEGER NOT NULL,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "type" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "sort" INTEGER DEFAULT 1,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "sort" INTEGER DEFAULT 1,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "permission_id" INTEGER,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "role_id" INTEGER,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(1024) NOT NULL,
    "user" VARCHAR(64),
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "card_group_id" INTEGER NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sort" INTEGER DEFAULT 1,
    "board_id" INTEGER NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "card_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(1024) NOT NULL,
    "description" VARCHAR(1024),
    "owner" INTEGER NOT NULL,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_username_key" ON "sys_user"("username");

-- CreateIndex
CREATE INDEX "sys_user_department_id_idx" ON "sys_user"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_code_key" ON "permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE INDEX "role_permission_role_id_idx" ON "role_permission"("role_id");

-- CreateIndex
CREATE INDEX "role_permission_permission_id_idx" ON "role_permission"("permission_id");

-- CreateIndex
CREATE INDEX "user_role_user_id_idx" ON "user_role"("user_id");

-- CreateIndex
CREATE INDEX "user_role_role_id_idx" ON "user_role"("role_id");

-- CreateIndex
CREATE INDEX "card_card_group_id_idx" ON "card"("card_group_id");

-- CreateIndex
CREATE INDEX "card_group_board_id_idx" ON "card_group"("board_id");

-- CreateIndex
CREATE INDEX "board_owner_idx" ON "board"("owner");
