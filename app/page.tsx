import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import data from './dashboard/data.json';
import Layout from '@/components/Layout';
import { ChartBarInteractive } from '@/components/chart-bar-interactive';

export default function Page() {
  return (
    <Layout>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartBarInteractive />
      </div>
      <DataTable data={data} />
    </Layout>
  );
}
