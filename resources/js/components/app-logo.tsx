import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-teal-950 shadow-sm">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="ml-1 grid min-w-0 flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold">Shelter Animal Adoption</span>
                <span className="text-muted-foreground mt-1 truncate text-[11px]">Care · Rescue · Adopt</span>
            </div>
        </>
    );
}
