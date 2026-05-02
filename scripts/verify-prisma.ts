import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function verify() {
  console.log("🔍 Verifying Prisma Postgres connection...\n");

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    // Test read
    const commentCount = await prisma.comment.count();
    const galleryCount = await prisma.galleryItem.count();
    
    console.log("✅ Connected to Prisma Postgres!");
    console.log(`   📝 Comments: ${commentCount}`);
    console.log(`   🖼️  Gallery items: ${galleryCount}`);
    console.log("\n🎉 Everything is working!");
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
