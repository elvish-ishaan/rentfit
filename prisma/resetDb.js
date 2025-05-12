import { prisma } from './prismaClient'

async function main() {
  await prisma.user.deleteMany();
  await prisma.order.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });   