import { createFileRoute } from '@tanstack/react-router'
import {
  Home,
  Users,
  FileText,
  BarChart3,
} from 'lucide-react'
import { AppPageHeader } from '@/components/app-page-header'

export const Route = createFileRoute('/_oligarki/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AppPageHeader 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]} 
      />
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to the Oligarki dashboard
            </p>
          </div>
          
          {/* Dashboard content */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Reports
                  </p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Analytics
                  </p>
                  <p className="text-2xl font-bold">+12.5%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Now
                  </p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Home className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
