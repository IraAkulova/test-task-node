-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bosses" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bosses_email_key" ON "bosses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
