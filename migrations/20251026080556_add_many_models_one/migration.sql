-- CreateTable
CREATE TABLE "user_account" (
    "id_user" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "activity" (
    "id_activity" UUID NOT NULL,
    "activity_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id_activity")
);

-- CreateTable
CREATE TABLE "expense" (
    "id_expense" UUID NOT NULL,
    "expense_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "activity_id" UUID NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id_expense")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_user_name_key" ON "user_account"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
