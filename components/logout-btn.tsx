import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';

const handleLogout = async () => {
  const { error } = await authClient.signOut();
  if (error) {
    toast.error('Error logging out');
  } else {
    toast.success('Logged out successfully');
    redirect('/login');
  }
};

export default function LogoutBtn() {
  return (
    <DropdownMenuItem onClick={handleLogout}>
      Logout
      <LogOut />
    </DropdownMenuItem>
  );
}
