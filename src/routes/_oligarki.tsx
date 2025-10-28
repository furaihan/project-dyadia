import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_oligarki')({
    beforeLoad:({ context }) => {
        if (!context.user){
            throw new Error('Unauthorized')
        }
    }
})

