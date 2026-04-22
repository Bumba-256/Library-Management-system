import React, { createContext, useContext, useReducer } from 'react';
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}
export interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
}
export interface Transaction {
  id: string;
  bookId: string;
  userId: string;
  type: 'borrow' | 'return';
  date: string;
}
interface LibraryState {
  books: Book[];
  users: User[];
  transactions: Transaction[];
}
type LibraryAction =
{
  type: 'ADD_BOOK';
  payload: Book;
} |
{
  type: 'ADD_USER';
  payload: User;
} |
{
  type: 'BORROW_BOOK';
  payload: {
    bookId: string;
    userId: string;
  };
} |
{
  type: 'RETURN_BOOK';
  payload: {
    bookId: string;
    userId: string;
  };
};
const initialState: LibraryState = {
  books: [
  {
    id: 'B001',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    available: true
  },
  {
    id: 'B002',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    available: false
  },
  {
    id: 'B003',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    available: true
  },
  {
    id: 'B004',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    available: false
  },
  {
    id: 'B005',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    available: true
  },
  {
    id: 'B006',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    isbn: '978-0-439-70818-8',
    available: true
  },
  {
    id: 'B007',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-547-92822-7',
    available: false
  },
  {
    id: 'B008',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    isbn: '978-0-06-085052-4',
    available: true
  },
  {
    id: 'B009',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-618-64561-1',
    available: true
  },
  {
    id: 'B010',
    title: 'Animal Farm',
    author: 'George Orwell',
    isbn: '978-0-452-28424-1',
    available: true
  }],

  users: [
  {
    id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    memberSince: '2023-01-15'
  },
  {
    id: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    memberSince: '2023-03-22'
  },
  {
    id: 'U003',
    name: 'Carol Williams',
    email: 'carol.williams@email.com',
    memberSince: '2023-06-10'
  },
  {
    id: 'U004',
    name: 'David Brown',
    email: 'david.brown@email.com',
    memberSince: '2023-09-05'
  }],

  transactions: [
  {
    id: 'T001',
    bookId: 'B002',
    userId: 'U001',
    type: 'borrow',
    date: '2024-04-10T10:30:00'
  },
  {
    id: 'T002',
    bookId: 'B004',
    userId: 'U002',
    type: 'borrow',
    date: '2024-04-12T14:15:00'
  },
  {
    id: 'T003',
    bookId: 'B007',
    userId: 'U003',
    type: 'borrow',
    date: '2024-04-15T09:45:00'
  }]

};
function libraryReducer(
state: LibraryState,
action: LibraryAction)
: LibraryState {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'BORROW_BOOK':{
        const newTransaction: Transaction = {
          id: `T${String(state.transactions.length + 1).padStart(3, '0')}`,
          bookId: action.payload.bookId,
          userId: action.payload.userId,
          type: 'borrow',
          date: new Date().toISOString()
        };
        return {
          ...state,
          books: state.books.map((book) =>
          book.id === action.payload.bookId ?
          {
            ...book,
            available: false
          } :
          book
          ),
          transactions: [...state.transactions, newTransaction]
        };
      }
    case 'RETURN_BOOK':{
        const newTransaction: Transaction = {
          id: `T${String(state.transactions.length + 1).padStart(3, '0')}`,
          bookId: action.payload.bookId,
          userId: action.payload.userId,
          type: 'return',
          date: new Date().toISOString()
        };
        return {
          ...state,
          books: state.books.map((book) =>
          book.id === action.payload.bookId ?
          {
            ...book,
            available: true
          } :
          book
          ),
          transactions: [...state.transactions, newTransaction]
        };
      }
    default:
      return state;
  }
}
interface LibraryContextType {
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}
const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
export function LibraryProvider({ children }: {children: ReactNode;}) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch
      }}>
      
      {children}
    </LibraryContext.Provider>);

}
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}