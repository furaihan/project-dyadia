import bcryptjs from 'bcryptjs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcryptjs.hash(password, saltRounds)
}

export function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword)
}
