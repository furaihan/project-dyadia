// src/services/session.server.ts
import { useSession } from '@tanstack/react-start/server'
import type { UserAccount } from '@prisma/client'

type SessionUser = {
  userEmail: UserAccount['email']
  fullName: string
}

export function useAppSession() {
  const sessionSecret = process.env.SESSION_SECRET
  if (!sessionSecret) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  return useSession<SessionUser>({
    password: sessionSecret,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}