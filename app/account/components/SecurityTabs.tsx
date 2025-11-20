import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

export default function SecurityTabs() {
  return (
    <TabsContent value="security">
      <Card>
        <CardContent className="px-6">
          <h2 className="text-lg font-semibold">Security</h2>

          <div className="mt-6 flex justify-between">
            <div className="space-y-2">
              <h3 className="font-medium ">Password</h3>
              <p className="text-sm">Last changed 3 months ago</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="px-6">
          <h2 className="text-lg font-semibold">Active Sessions</h2>

          <div className="mt-6 flex justify-between">
            <div>
              <h3 className="font-medium ">iPhone 12</h3>
              <p className="text-sm text-gray-500">New York, NY • 2 days ago</p>
            </div>
            <Button variant="outline">Logout</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
