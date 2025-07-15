import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const LogoutButton = () => {
  const { signOut, isLoading } = useAuth();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={signOut}
      disabled={isLoading}
      className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
};