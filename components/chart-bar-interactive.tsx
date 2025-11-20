'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', projects: 222, users: 150 },
  { date: '2024-04-02', projects: 97, users: 180 },
  { date: '2024-04-03', projects: 167, users: 120 },
  { date: '2024-04-04', projects: 242, users: 260 },
  { date: '2024-04-05', projects: 373, users: 290 },
  { date: '2024-04-06', projects: 301, users: 340 },
  { date: '2024-04-07', projects: 245, users: 180 },
  { date: '2024-04-08', projects: 409, users: 320 },
  { date: '2024-04-09', projects: 59, users: 110 },
  { date: '2024-04-10', projects: 261, users: 190 },
  { date: '2024-04-11', projects: 327, users: 350 },
  { date: '2024-04-12', projects: 292, users: 210 },
  { date: '2024-04-13', projects: 342, users: 380 },
  { date: '2024-04-14', projects: 137, users: 220 },
  { date: '2024-04-15', projects: 120, users: 170 },
  { date: '2024-04-16', projects: 138, users: 190 },
  { date: '2024-04-17', projects: 446, users: 360 },
  { date: '2024-04-18', projects: 364, users: 410 },
  { date: '2024-04-19', projects: 243, users: 180 },
  { date: '2024-04-20', projects: 89, users: 150 },
  { date: '2024-04-21', projects: 137, users: 200 },
  { date: '2024-04-22', projects: 224, users: 170 },
  { date: '2024-04-23', projects: 138, users: 230 },
  { date: '2024-04-24', projects: 387, users: 290 },
  { date: '2024-04-25', projects: 215, users: 250 },
  { date: '2024-04-26', projects: 75, users: 130 },
  { date: '2024-04-27', projects: 383, users: 420 },
  { date: '2024-04-28', projects: 122, users: 180 },
  { date: '2024-04-29', projects: 315, users: 240 },
  { date: '2024-04-30', projects: 454, users: 380 },
  { date: '2024-05-01', projects: 165, users: 220 },
  { date: '2024-05-02', projects: 293, users: 310 },
  { date: '2024-05-03', projects: 247, users: 190 },
  { date: '2024-05-04', projects: 385, users: 420 },
  { date: '2024-05-05', projects: 481, users: 390 },
  { date: '2024-05-06', projects: 498, users: 520 },
  { date: '2024-05-07', projects: 388, users: 300 },
  { date: '2024-05-08', projects: 149, users: 210 },
  { date: '2024-05-09', projects: 227, users: 180 },
  { date: '2024-05-10', projects: 293, users: 330 },
  { date: '2024-05-11', projects: 335, users: 270 },
  { date: '2024-05-12', projects: 197, users: 240 },
  { date: '2024-05-13', projects: 197, users: 160 },
  { date: '2024-05-14', projects: 448, users: 490 },
  { date: '2024-05-15', projects: 473, users: 380 },
  { date: '2024-05-16', projects: 338, users: 400 },
  { date: '2024-05-17', projects: 499, users: 420 },
  { date: '2024-05-18', projects: 315, users: 350 },
  { date: '2024-05-19', projects: 235, users: 180 },
  { date: '2024-05-20', projects: 177, users: 230 },
  { date: '2024-05-21', projects: 82, users: 140 },
  { date: '2024-05-22', projects: 81, users: 120 },
  { date: '2024-05-23', projects: 252, users: 290 },
  { date: '2024-05-24', projects: 294, users: 220 },
  { date: '2024-05-25', projects: 201, users: 250 },
  { date: '2024-05-26', projects: 213, users: 170 },
  { date: '2024-05-27', projects: 420, users: 460 },
  { date: '2024-05-28', projects: 233, users: 190 },
  { date: '2024-05-29', projects: 78, users: 130 },
  { date: '2024-05-30', projects: 340, users: 280 },
  { date: '2024-05-31', projects: 178, users: 230 },
  { date: '2024-06-01', projects: 178, users: 200 },
  { date: '2024-06-02', projects: 470, users: 410 },
  { date: '2024-06-03', projects: 103, users: 160 },
  { date: '2024-06-04', projects: 439, users: 380 },
  { date: '2024-06-05', projects: 88, users: 140 },
  { date: '2024-06-06', projects: 294, users: 250 },
  { date: '2024-06-07', projects: 323, users: 370 },
  { date: '2024-06-08', projects: 385, users: 320 },
  { date: '2024-06-09', projects: 438, users: 480 },
  { date: '2024-06-10', projects: 155, users: 200 },
  { date: '2024-06-11', projects: 92, users: 150 },
  { date: '2024-06-12', projects: 492, users: 420 },
  { date: '2024-06-13', projects: 81, users: 130 },
  { date: '2024-06-14', projects: 426, users: 380 },
  { date: '2024-06-15', projects: 307, users: 350 },
  { date: '2024-06-16', projects: 371, users: 310 },
  { date: '2024-06-17', projects: 475, users: 520 },
  { date: '2024-06-18', projects: 107, users: 170 },
  { date: '2024-06-19', projects: 341, users: 290 },
  { date: '2024-06-20', projects: 408, users: 450 },
  { date: '2024-06-21', projects: 169, users: 210 },
  { date: '2024-06-22', projects: 317, users: 270 },
  { date: '2024-06-23', projects: 480, users: 530 },
  { date: '2024-06-24', projects: 132, users: 180 },
  { date: '2024-06-25', projects: 141, users: 190 },
  { date: '2024-06-26', projects: 434, users: 380 },
  { date: '2024-06-27', projects: 448, users: 490 },
  { date: '2024-06-28', projects: 149, users: 200 },
  { date: '2024-06-29', projects: 103, users: 160 },
  { date: '2024-06-30', projects: 446, users: 400 },
];

const chartConfig = {
  views: {
    label: 'total in day',
  },
  projects: {
    label: 'projects',
    color: 'var(--chart-2)',
  },
  users: {
    label: 'users',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('projects');

  const total = React.useMemo(
    () => ({
      projects: chartData.reduce((acc, curr) => acc + curr.projects, 0),
      users: chartData.reduce((acc, curr) => acc + curr.users, 0),
    }),
    []
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total project and User</CardDescription>
        </div>
        <div className="flex">
          {['projects', 'users'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
