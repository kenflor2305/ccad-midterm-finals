import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentPath = page.url.split('?')[0].replace(/\/+$/, '') || '/';
    const isActive = (url: string) => {
        const itemPath = new URL(url, 'http://localhost').pathname.replace(/\/+$/, '') || '/';

        return currentPath === itemPath || (itemPath !== '/' && currentPath.startsWith(`${itemPath}/`));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Shelter management</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive(item.url)}>
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
