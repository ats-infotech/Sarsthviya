
import { DataTableConfig } from '@/config/data-table';
import type { FilterItemSchema } from '@/lib/parsers';
import type { ColumnSort, Row, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // Extend the ColumnMeta interface to include custom metadata
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
}

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type FilterOperator = DataTableConfig['operators'][number];
export type FilterVariant = DataTableConfig['filterVariants'][number];
export type JoinOperator = DataTableConfig['joinOperators'][number];

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
  id: Extract<keyof TData, string>;
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>;
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  variant: 'update' | 'delete';
}

export interface TPagination {
  totalCount: number;
  start: number;
  limit: number;
  totalPages?: number;
}

export interface TDataTable<T = any> {
  rows: T[];
  pagination: TPagination;
}

export interface TTableFilter {
  page: number;
  limit: number;
  search?: string | null;
  status?: string | null;
  fromDate?: string;
  toDate?: string;
  [key: string]: any; // This allows any additional keys in the future
}
