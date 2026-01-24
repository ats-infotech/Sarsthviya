import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsJson,
  parseAsString
} from 'nuqs/server';
import { z } from 'zod';

const SortSchema = z.array(
  z.object({
    sortOrder: z.string(),
    sortBy: z.string()
  })
);

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(''), // for search
  status: parseAsString.withDefault(''),
  tab: parseAsString.withDefault(''),
  fromDate: parseAsString.withDefault(''),
  toDate: parseAsString.withDefault(''),
  sort: parseAsJson((value) => SortSchema.parse(value)).withDefault([])
  // advanced filter
  // filters: getFiltersStateParser().withDefault([]),
  // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
