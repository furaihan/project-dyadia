import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ans/activity')({
  server:{
    handlers: {
        GET: async () => {
            return Response.json({ message: 'Hello from /ans/activity API!' })
        },
    },
  }
})  
