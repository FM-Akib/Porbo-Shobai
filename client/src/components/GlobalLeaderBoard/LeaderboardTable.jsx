import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FaMedal, FaStar, FaTrophy } from 'react-icons/fa';

const badgeStyles = {
  Low: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  Intermediate: 'bg-yellow-500 text-white dark:bg-yellow-600',
  Advanced: 'bg-orange-500 text-white dark:bg-orange-600',
  Expert: 'bg-red-500 text-white dark:bg-red-600',
};

const badgeIcons = {
  Low: <FaStar />,
  Intermediate: <FaMedal />,
  Advanced: <FaTrophy />,
  Expert: <FaTrophy />,
};

const getBadge = points => {
  if (points < 100) return 'Low';
  if (points >= 100 && points < 200) return 'Intermediate';
  if (points >= 500 && points < 1000) return 'Advanced';
  return 'Expert';
};

const columns = [
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('rank')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'institution',
    header: 'Institution',
    cell: ({ row }) => <div>{row.getValue('institution')}</div>,
  },
  {
    accessorKey: 'badge',
    header: 'Badge',
    cell: ({ row }) => {
      const badge = getBadge(row.getValue('totalPoints'));
      return (
        <div
          className={`flex items-center justify-center space-x-2 px-2 py-1 rounded-full ${badgeStyles[badge]}`}
        >
          {badgeIcons[badge]}
          <span>{badge}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'points',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('points')}</div>
    ),
  },
];

export default function LeaderboardTable({ users }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const data = users.map((user, index) => ({
    ...user,
    rank: index + 1,
    name: `${user.firstName} ${user.lastName}`,
    badge: getBadge(user.points),
  }));

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full overflow-x-auto p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border dark:border-gray-700">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-100 dark:bg-gray-800"
              >
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
    </div>
  );
}
