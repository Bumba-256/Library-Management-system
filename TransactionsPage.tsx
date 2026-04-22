import React, { useState } from 'react';
import { BookOpenIcon, RotateCcwIcon } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
export function TransactionsPage() {
  const { state, dispatch } = useLibrary();
  const [borrowForm, setBorrowForm] = useState({
    userId: '',
    bookId: ''
  });
  const [returnForm, setReturnForm] = useState({
    userId: '',
    bookId: ''
  });
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const availableBooks = state.books.filter((book) => book.available);
  const getUserBorrowedBooks = (userId: string) => {
    const borrowedBookIds = state.transactions.
    filter((t) => t.userId === userId).
    reduce((acc, t) => {
      if (t.type === 'borrow') {
        acc.add(t.bookId);
      } else {
        acc.delete(t.bookId);
      }
      return acc;
    }, new Set<string>());
    return state.books.filter((book) => borrowedBookIds.has(book.id));
  };
  const handleBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowForm.userId || !borrowForm.bookId) {
      toast.error('Please select both user and book');
      return;
    }
    dispatch({
      type: 'BORROW_BOOK',
      payload: {
        userId: borrowForm.userId,
        bookId: borrowForm.bookId
      }
    });
    toast.success('Book borrowed successfully!');
    setBorrowForm({
      userId: '',
      bookId: ''
    });
    setShowBorrowForm(false);
  };
  const handleReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnForm.userId || !returnForm.bookId) {
      toast.error('Please select both user and book');
      return;
    }
    dispatch({
      type: 'RETURN_BOOK',
      payload: {
        userId: returnForm.userId,
        bookId: returnForm.bookId
      }
    });
    toast.success('Book returned successfully!');
    setReturnForm({
      userId: '',
      bookId: ''
    });
    setShowReturnForm(false);
  };
  const getBookTitle = (bookId: string) => {
    const book = state.books.find((b) => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  };
  const getUserName = (userId: string) => {
    const user = state.users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="p-8">
      
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-lg">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Borrow Book
            </h2>
          </div>
          {!showBorrowForm ?
          <button
            onClick={() => setShowBorrowForm(true)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            
              Start Borrowing
            </button> :

          <form onSubmit={handleBorrow} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select User
                </label>
                <select
                value={borrowForm.userId}
                onChange={(e) =>
                setBorrowForm({
                  ...borrowForm,
                  userId: e.target.value
                })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                
                  <option value="">Choose a user</option>
                  {state.users.map((user) =>
                <option key={user.id} value={user.id}>
                      {user.name} ({user.id})
                    </option>
                )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Book
                </label>
                <select
                value={borrowForm.bookId}
                onChange={(e) =>
                setBorrowForm({
                  ...borrowForm,
                  bookId: e.target.value
                })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                
                  <option value="">Choose a book</option>
                  {availableBooks.map((book) =>
                <option key={book.id} value={book.id}>
                      {book.title} ({book.id})
                    </option>
                )}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                type="button"
                onClick={() => {
                  setShowBorrowForm(false);
                  setBorrowForm({
                    userId: '',
                    bookId: ''
                  });
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                
                  Cancel
                </button>
                <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                
                  Borrow
                </button>
              </div>
            </form>
          }
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <RotateCcwIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Return Book
            </h2>
          </div>
          {!showReturnForm ?
          <button
            onClick={() => setShowReturnForm(true)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            
              Start Returning
            </button> :

          <form onSubmit={handleReturn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select User
                </label>
                <select
                value={returnForm.userId}
                onChange={(e) => {
                  setReturnForm({
                    userId: e.target.value,
                    bookId: ''
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                
                  <option value="">Choose a user</option>
                  {state.users.map((user) =>
                <option key={user.id} value={user.id}>
                      {user.name} ({user.id})
                    </option>
                )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Book
                </label>
                <select
                value={returnForm.bookId}
                onChange={(e) =>
                setReturnForm({
                  ...returnForm,
                  bookId: e.target.value
                })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!returnForm.userId}>
                
                  <option value="">Choose a book</option>
                  {returnForm.userId &&
                getUserBorrowedBooks(returnForm.userId).map((book) =>
                <option key={book.id} value={book.id}>
                        {book.title} ({book.id})
                      </option>
                )}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                type="button"
                onClick={() => {
                  setShowReturnForm(false);
                  setReturnForm({
                    userId: '',
                    bookId: ''
                  });
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                
                  Cancel
                </button>
                <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                
                  Return
                </button>
              </div>
            </form>
          }
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Transaction History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Transaction ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Book
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  User
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {state.transactions.
              slice().
              reverse().
              map((transaction, index) =>
              <tr
                key={transaction.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {transaction.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {getBookTitle(transaction.bookId)}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {getUserName(transaction.userId)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'borrow' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    
                        {transaction.type === 'borrow' ?
                    'Borrowed' :
                    'Returned'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {formatDate(transaction.date)}
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>);

}