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

type SeedMode = 'seed' | 'reset' | 'fresh'

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcryptjs.hash(password, saltRounds)
}

async function clearDatabase() {
  console.log('🧹 Clearing database...')
  await prisma.todo.deleteMany()
  await prisma.userAccount.deleteMany()
  console.log('✅ Database cleared')
}

async function seedData() {
  console.log('🌱 Seeding database...')

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

async function checkIfDatabaseIsEmpty(): Promise<boolean> {
  const todoCount = await prisma.todo.count()
  const userCount = await prisma.userAccount.count()
  return todoCount === 0 && userCount === 0
}

async function main() {
  const mode: SeedMode = (process.argv[2] as SeedMode) || 'seed'

  console.log(`\n🚀 Running in ${mode.toUpperCase()} mode...\n`)

  switch (mode) {
    case 'seed': {
      // Default mode: only seed if tables are empty
      const isEmpty = await checkIfDatabaseIsEmpty()
      if (isEmpty) {
        await seedData()
      } else {
        console.log('⚠️  Database already has data. Use "reset" or "fresh" mode to re-seed.')
        console.log('   - npm run db:seed:reset  (clears data)')
        console.log('   - npm run db:seed:fresh  (clears and re-seeds)')
      }
      break
    }

    case 'reset': {
      // Reset mode: clear the database
      await clearDatabase()
      console.log('✅ Database reset complete')
      break
    }

    case 'fresh': {
      // Fresh mode: clear and re-seed
      await clearDatabase()
      await seedData()
      console.log('✅ Fresh seed complete')
      break
    }

    default:
      console.error(`❌ Unknown mode: ${mode}`)
      console.log('Available modes: seed (default), reset, fresh')
      process.exit(1)
  }

  console.log('\n✨ Done!\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
