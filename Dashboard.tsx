import React from 'react';
import {
  BookOpenIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon } from
'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { motion } from 'framer-motion';
export function Dashboard() {
  const { state } = useLibrary();
  const availableBooks = state.books.filter((book) => book.available).length;
  const borrowedBooks = state.books.filter((book) => !book.available).length;
  const recentTransactions = state.transactions.slice(-5).reverse();
  const stats = [
  {
    label: 'Total Books',
    value: state.books.length,
    icon: BookOpenIcon,
    color: 'bg-blue-500'
  },
  {
    label: 'Available Books',
    value: availableBooks,
    icon: CheckCircleIcon,
    color: 'bg-green-500'
  },
  {
    label: 'Borrowed Books',
    value: borrowedBooks,
    icon: XCircleIcon,
    color: 'bg-amber-500'
  },
  {
    label: 'Registered Users',
    value: state.users.length,
    icon: UsersIcon,
    color: 'bg-indigo-500'
  }];

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
      
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }}
              className="bg-white rounded-lg border border-slate-200 p-6">
              
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>);

        })}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Recent Transactions
        </h2>
        {recentTransactions.length === 0 ?
        <p className="text-slate-500">No transactions yet.</p> :

        <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
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
                {recentTransactions.map((transaction) =>
              <tr
                key={transaction.id}
                className="border-b border-slate-100">
                
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
        }
      </div>
    </motion.div>);

}