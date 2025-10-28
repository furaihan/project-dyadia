// src/services/session.server.ts
import { useSession } from '@tanstack/react-start/server'
import type { UserAccount } from '@prisma/client'

type SessionUser = {
  userEmail: UserAccount['email']
}

export function useAppSession() {
  const sessionSecret = process.env.SESSION_SECRET
  if (!sessionSecret) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  return useSession<SessionUser>({
    password: sessionSecret,
  })
}