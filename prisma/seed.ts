import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // Seed Gallery Items - Certificates
  const cert1 = await prisma.galleryItem.upsert({
    where: { id: "cert-1" },
    update: {},
    create: {
      id: "cert-1",
      type: "certificate",
      titleId: "Sertifikat Web Development",
      titleEn: "Web Development Certificate",
      descId: "Belajar Membuat Aplikasi Web",
      descEn: "Learn to Build Web Applications",
      issuer: "Dicoding Indonesia",
      date: "2024",
      imageUrl: "/images/certificates/cert-1.jpg",
      sortOrder: 1,
    },
  });

  const cert2 = await prisma.galleryItem.upsert({
    where: { id: "cert-2" },
    update: {},
    create: {
      id: "cert-2",
      type: "certificate",
      titleId: "Sertifikat JavaScript",
      titleEn: "JavaScript Certificate",
      descId: "Belajar Dasar Pemrograman JavaScript",
      descEn: "Learn JavaScript Programming Basics",
      issuer: "Dicoding Indonesia",
      date: "2024",
      imageUrl: "/images/certificates/cert-2.jpg",
      sortOrder: 2,
    },
  });

  const cert3 = await prisma.galleryItem.upsert({
    where: { id: "cert-3" },
    update: {},
    create: {
      id: "cert-3",
      type: "certificate",
      titleId: "Sertifikat React",
      titleEn: "React Certificate",
      descId: "Belajar Membuat Aplikasi Web dengan React",
      descEn: "Learn to Build Web Applications with React",
      issuer: "Dicoding Indonesia",
      date: "2024",
      imageUrl: "/images/certificates/cert-3.jpg",
      sortOrder: 3,
    },
  });

  // Seed Gallery Items - Documentation
  const doc1 = await prisma.galleryItem.upsert({
    where: { id: "doc-1" },
    update: {},
    create: {
      id: "doc-1",
      type: "documentation",
      titleId: "Kegiatan Magang",
      titleEn: "Internship Activity",
      descId: "Dokumentasi kegiatan magang di PT. IHATEC",
      descEn: "Internship documentation at PT. IHATEC",
      date: "2025",
      imageUrl: "/images/documentation/doc-1.jpg",
      sortOrder: 1,
    },
  });

  const doc2 = await prisma.galleryItem.upsert({
    where: { id: "doc-2" },
    update: {},
    create: {
      id: "doc-2",
      type: "documentation",
      titleId: "Proyek Kampus",
      titleEn: "Campus Project",
      descId: "Presentasi proyek akhir semester",
      descEn: "End of semester project presentation",
      date: "2024",
      imageUrl: "/images/documentation/doc-2.jpg",
      sortOrder: 2,
    },
  });

  console.log("✅ Seeded gallery items:", { cert1: cert1.id, cert2: cert2.id, cert3: cert3.id, doc1: doc1.id, doc2: doc2.id });

  // Seed a sample comment
  const comment = await prisma.comment.upsert({
    where: { id: "sample-comment-1" },
    update: {},
    create: {
      id: "sample-comment-1",
      contextKey: "github-PORTFOLIO-ASLI",
      name: "Raffa Yuda",
      message: "Welcome to my portfolio! Feel free to leave a comment. 🚀",
      reactions: JSON.stringify({ "🔥": 1, "👍": 2 }),
    },
  });

  console.log("✅ Seeded sample comment:", comment.id);
  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
