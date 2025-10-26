import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, type SortingState, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })

  return (
    <>
      <SearchBar filtering={filtering} setFiltering={setFiltering} />
      <section className='border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
        <div className='max-w-full overflow-x-auto'>
          <Table className='w-full table-auto'>
            <TableHeader className='bg-gradient-to-r from-primary to-secondary text-white'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className='text-center p-3 cursor-pointer font-semibold text-sm'
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {
                          header.isPlaceholder
                            ? null
                            : (
                              <div className='flex items-center justify-center gap-2'>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getIsSorted() === 'asc' && (
                                  <ArrowUpIcon className='w-3 h-3 text-white' />
                                )}
                                {header.column.getIsSorted() === 'desc' && (
                                  <ArrowDownIcon className='w-3 h-3 text-white' />
                                )}
                              </div>
                            )
                        }
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='text-black dark:text-white'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`text-center border border-stroke dark:border-strokedark hover:bg-stroke dark:hover:bg-strokedark ${index % 2 === 0 ? 'bg-white dark:bg-boxdark' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className='border border-stroke dark:border-strokedark'
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className='h-24 text-center hover:bg-stroke dark:hover:bg-strokedark'>
                  <TableCell colSpan={columns.length}>
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
};