'use client';

// import { useAuth } from '@/providers/auth-provider';
// import { useRouter } from 'next/navigation';

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  // const { isError } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isError) {
  //     router.replace('/login');
  //   }
  // }, [isError, router]);

  // if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
}
