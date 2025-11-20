import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Lock, User } from 'lucide-react';
import ProfileTabs from './ProfileTabs';
import SecurityTabs from './SecurityTabs';
import NotificationsTabs from './NotificationsTabs';

export default function AccTabs() {
  const tabsTrigger = [
    {
      label: 'Profile',
      icon: User,
    },
    {
      label: 'Security',
      icon: Lock,
    },
    {
      label: 'Notifications',
      icon: Bell,
    },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid grid-cols-3 w-full mx-auto my-8  bg-transparent ">
        {tabsTrigger.map((taps) => (
          <TabsTrigger
            key={taps.label}
            value={taps.label.toLowerCase()}
            className="flex items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-white "
          >
            <taps.icon /> {taps.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* PROFILE TAB */}
      <ProfileTabs />

      {/* SECURITY */}
      <SecurityTabs />

      {/* NOTIFICATIONS */}
      <NotificationsTabs />
    </Tabs>
  );
}
