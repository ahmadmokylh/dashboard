import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

export default function NotificationsTabs() {
  return (
    <TabsContent value="notifications">
      <Card>
        <CardContent className="px-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Add notification controls here…
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
