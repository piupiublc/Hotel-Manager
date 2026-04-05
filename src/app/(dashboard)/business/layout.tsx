import { AuthGuard } from "@/components/auth/AuthGuard";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['partner', 'admin']} redirectTo="/discovery">
      {children}
    </AuthGuard>
  );
}
