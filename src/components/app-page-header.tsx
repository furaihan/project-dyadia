import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { AppBreadcrumbs } from './app-breadcrumbs'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface AppPageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
}

export function AppPageHeader({ breadcrumbs }: AppPageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <AppBreadcrumbs items={breadcrumbs} />
    </header>
  )
}
