import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/providers/auth-provider";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                {children}
            </SidebarProvider>
        </AuthProvider>
    )
}