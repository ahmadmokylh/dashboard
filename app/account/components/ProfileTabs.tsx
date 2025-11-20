import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';

export default function ProfileTabs() {
  return (
    <TabsContent value="profile">
      <Card className="mb-10 ">
        <CardContent className="px-6">
          <h2 className="font-semibold text-lg mb-4">Profile Details</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label>First name</Label>
              <Input defaultValue="John" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Last name</Label>
              <Input defaultValue="Doe" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input defaultValue="john@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <Input defaultValue="Male" />
            </div>
          </div>

          <div className="mt-6">
            <Button className="w-fit">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
