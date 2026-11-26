import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset className="bg-background flex flex-1 flex-col transition-[margin] duration-200 ease-linear" {...props}>
                {children}
            </SidebarInset>
        );
    }

    return (
        <main className="bg-background mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 rounded-xl p-4 md:gap-8 md:p-8" {...props}>
            {children}
        </main>
    );
}
