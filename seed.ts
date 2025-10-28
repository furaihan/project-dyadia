import { PrismaClient } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

interface SeedUserAccount {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcryptjs.hash(password, saltRounds)
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing todos
  await prisma.todo.deleteMany()

  // Create example todos
  const todos = await prisma.todo.createMany({
    data: [
      { title: 'Buy groceries' },
      { title: 'Read a book' },
      { title: 'Workout' },
    ],
  })

  console.log(`✅ Created ${todos.count} todos`)

  console.log('🔐 Seeding UserAccounts...')

  const users: SeedUserAccount[] = [
    {
      email: 'user@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
    },
  ]

  // Hash passwords and create user accounts
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password)
    await prisma.userAccount.create({
      data: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.username,
      },
    })
  }

  console.log(`✅ Created ${users.length} user account(s)`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
