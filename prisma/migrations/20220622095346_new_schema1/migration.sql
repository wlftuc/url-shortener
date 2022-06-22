-- CreateTable
CREATE TABLE "Shortener" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "redirectTo" TEXT NOT NULL,
    "origin" TEXT,

    CONSTRAINT "Shortener_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shortener_slug_key" ON "Shortener"("slug");
