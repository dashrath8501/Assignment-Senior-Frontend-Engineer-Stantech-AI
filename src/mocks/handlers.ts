import { rest } from 'msw';
import { Item } from '../types/item';

const mockData: Item[] = [
  { id: 1, title: 'Post A', body: 'Content A' },
  { id: 2, title: 'Post B', body: 'Content B' },
];

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
];