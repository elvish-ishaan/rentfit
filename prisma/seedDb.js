import { prisma } from './prismaClient'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "User",
      password: "password",
    },
  });

  console.log("User created:", user);

  const order = await prisma.order.create({
    data: {
      productId: "1",
      userId: user.id,
      amount: 999,
      status: "Pending",
      pincode: 123456,
      city: "New York",
      district: "Manhattan",
      state: "NY",
      phone: 1234567890,
      alternatePhone: 1234567891,
      landmark: "Central Park",
      rentFrom: new Date("2023-01-01"),
      rentTo: new Date("2023-01-05"),
    },
  });

  console.log("Order created:", order);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });