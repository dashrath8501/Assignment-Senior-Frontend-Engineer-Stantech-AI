export interface Item {
    id: number;
    title: string;
    body: string;
  }
  
  export interface ItemsState {
    items: Item[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalPages: number;
    sortBy: 'title' | 'id';
    sortOrder: 'asc' | 'desc';
  }
  