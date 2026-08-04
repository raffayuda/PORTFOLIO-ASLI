-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "longDescriptionId" TEXT NOT NULL,
    "longDescriptionEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" JSONB NOT NULL DEFAULT '[]',
    "tags" JSONB NOT NULL DEFAULT '[]',
    "github" TEXT,
    "demo" TEXT,
    "category" TEXT NOT NULL DEFAULT 'web',
    "featuresId" JSONB NOT NULL DEFAULT '[]',
    "featuresEn" JSONB NOT NULL DEFAULT '[]',
    "year" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_category_idx" ON "projects"("category");
