import Layout from '@/components/Layout';
import Image from 'next/image';
import AccTabs from './components/AccTabs';

export default function page() {
  return (
    <Layout>
      <div className="w-full">
        <div className=" max-w-4xl mx-auto">
          <div className=" flex flex-col gap-4">
            <div className="flex justify-start items-center gap-6">
              <Image width={90} src={'/avatar.png'} alt="OR" height={90} />
              <div>
                <h1 className="font-semibold text-xl">Account Setting</h1>
                <p className="text-sm">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>

            <AccTabs />
          </div>
        </div>
      </div>
    </Layout>
  );
}
