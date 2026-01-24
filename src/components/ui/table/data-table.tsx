import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import type * as React from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import { getCommonPinningStyles } from '@/lib/data-table';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  showHeader?: boolean;
  tableDivClassname?: string;
  showPagination?: boolean;
  isLoading?: boolean;
}

export function DataTable<TData>({
  table,
  actionBar,
  showHeader = true,
  children,
  tableDivClassname,
  showPagination = true,
  isLoading
}: DataTableProps<TData>) {
  return (
    <div className='flex h-full flex-1 flex-col space-y-4'>
      {children}
      <div className='relative flex min-h-55 flex-1'>
        <div
          className={cn(
            'absolute inset-0 flex overflow-hidden rounded-lg border',
            tableDivClassname
          )}
        >
          <ScrollArea className='h-full w-full'>
            <Table>
              <TableHeader
                className='bg-muted sticky top-0 z-10'
                hidden={!showHeader}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className='font-normal text-neutral-500'
                        style={{
                          ...getCommonPinningStyles({ column: header.column })
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className={'bg-white'}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonPinningStyles({ column: cell.column })
                          }}
                        >
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
                      colSpan={table.getAllColumns().length}
                      className='h-90 text-center'
                    >
                      {isLoading ? (
                        <div className='flex items-center justify-center'>
                          <Loader2 className='animate-spin' />
                        </div>
                      ) : (
                        'No results.'
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      {showPagination && (
        <div className='flex flex-col gap-2.5'>
          <DataTablePagination table={table} />
          {actionBar &&
            table.getFilteredSelectedRowModel().rows.length > 0 &&
            actionBar}
        </div>
      )}
    </div>
  );
}
