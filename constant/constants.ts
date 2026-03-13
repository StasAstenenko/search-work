import { Country } from '@/types/Country.type';
import { SortBy } from '@/types/Sorted.type';

export const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY!;

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASEURL!;
export const ANON_KEY = process.env.NEXT_PUBLIC_ANONKEY!;

export const FIVE_MINUTES = 1000 * 60 * 5;

export const JOBS_ID = process.env.NEXT_PUBLIC_JOBS_APP_ID!;
export const JOBS_APP_KEY = process.env.NEXT_PUBLIC_JOBS_APP_KEY!;

export const COUNTRIES: Country[] = [
  {
    code: 'gb',
    name: 'Велика Британі',
  },
  {
    code: 'us',
    name: 'США',
  },
  {
    code: 'at',
    name: 'Австрія',
  },
  {
    code: 'au',
    name: 'Австралія',
  },
  {
    code: 'be',
    name: 'Бельгія',
  },
  {
    code: 'br',
    name: 'Бразилія',
  },
  {
    code: 'ca',
    name: 'Канада',
  },
  {
    code: 'ch',
    name: 'Швейцарія',
  },
  {
    code: 'de',
    name: 'Німеччина',
  },
  {
    code: 'es',
    name: 'Іспанія',
  },
  {
    code: 'fr',
    name: 'Франція',
  },
  {
    code: 'in',
    name: 'Індія',
  },
  {
    code: 'it',
    name: 'Італія',
  },
  {
    code: 'mx',
    name: 'Мексика',
  },
  {
    code: 'nl',
    name: 'Нідерланди',
  },
  {
    code: 'nz',
    name: 'Нова Зеландія',
  },
  {
    code: 'pl',
    name: 'Польща',
  },
  {
    code: 'sg',
    name: 'Сінгапур',
  },
  {
    code: 'za',
    name: 'Південно-Африканська Республіка',
  },
];

export const SORT_BY: SortBy[] = [
  {
    key: 'date',
    value: 'Дата',
  },
  {
    key: 'salary',
    value: 'Зарплата',
  },
  {
    key: 'relevance',
    value: 'Релевантність',
  },
];
