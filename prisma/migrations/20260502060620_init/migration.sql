-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "contextKey" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Anonymous',
    "message" TEXT NOT NULL,
    "reactions" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_items" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descId" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "issuer" TEXT,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_contextKey_idx" ON "comments"("contextKey");

-- CreateIndex
CREATE INDEX "gallery_items_type_idx" ON "gallery_items"("type");
