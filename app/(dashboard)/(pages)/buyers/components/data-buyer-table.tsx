'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Rows2, Rows3, Rows4 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    name: 'NAME',
    cardNumber: '1234 1233 1234 1234',
    ExDate: '12/24',
    cvv: 316,
    opt: 123,
  },
  {
    id: '3u1reuv4',
    name: 'NAME',
    cardNumber: '1235 1233 1234 1234',
    ExDate: '12/24',
    cvv: 242,
    opt: 456,
  },
  {
    id: 'derv1ws0',
    name: 'NAME',
    cardNumber: '1234 1233 1234 1234',
    ExDate: '12/24',
    cvv: 837,
    opt: 789,
  },
  {
    id: '5kma53ae',
    name: 'NAME',
    cardNumber: '1234 1233 1234 1234',
    ExDate: '12/24',
    cvv: 874,
    opt: 321,
  },
  {
    id: 'bhqecj4p',
    name: 'NAME',
    cardNumber: '1234 1233 1234 1234',
    ExDate: '12/24',
    cvv: 721,
    opt: 654,
  },
];

export type Payment = {
  id: string;
  name: string;
  cardNumber: string;
  ExDate: string;
  cvv: number;
  opt: number | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'cardNumber',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Card Number
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('cardNumber')}</div>
    ),
  },
  {
    accessorKey: 'ExDate',
    header: () => <div className="text-right">ExDate</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('ExDate')}</div>
      );
    },
  },
  {
    accessorKey: 'cvv',
    header: () => <div className="text-right">CVV</div>,
    cell: ({ row }) => {
      const cvv = parseFloat(row.getValue('cvv'));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US').format(cvv);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'opt',
    header: () => <div className="text-right">OPT</div>,
    cell: ({ row }) => {
      const opt = parseFloat(row.getValue('opt') || '0');
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US').format(opt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.cardNumber)}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Card</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataBuyerTable() {
  const [density, setDensity] = React.useState<string>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn('cardNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('cardNumber')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Select value={density} onValueChange={setDensity}>
          <SelectTrigger className="ml-auto w-[180px]">
            <SelectValue placeholder="Density" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Density</SelectLabel>
              <SelectItem value="compact">
                <div className="flex items-center gap-2">
                  <Rows4 className="h-4 w-4" />
                  Compact
                </div>
              </SelectItem>
              <SelectItem value="standard" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Rows3 className="h-4 w-4" /> Standard
                </div>
              </SelectItem>
              <SelectItem value="flexible" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Rows2 className="h-4 w-4" />
                  Flexible
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table
          className={cn({
            '[&_td]:py-px [&_th]:py-px': density === 'compact',
            '[&_td]:py-1 [&_th]:py-1': density === 'standard',
            '[&_td]:py-2 [&_th]:py-1': density === 'flexible',
          })}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
