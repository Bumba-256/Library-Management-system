import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { Modal } from '../components/Modal';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
export function UsersPage() {
  const { state, dispatch } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const getBorrowedBooksCount = (userId: string) => {
    const borrowedBooks = state.transactions.
    filter((t) => t.userId === userId).
    reduce((acc, t) => {
      if (t.type === 'borrow') {
        acc.add(t.bookId);
      } else {
        acc.delete(t.bookId);
      }
      return acc;
    }, new Set<string>());
    return borrowedBooks.size;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }
    const newUser = {
      id: `U${String(state.users.length + 1).padStart(3, '0')}`,
      ...formData,
      memberSince: new Date().toISOString().split('T')[0]
    };
    dispatch({
      type: 'ADD_USER',
      payload: newUser
    });
    toast.success('User registered successfully!');
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: ''
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
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          
          <PlusIcon className="w-5 h-5" />
          Register User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  User ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Member Since
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Books Borrowed
                </th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user, index) =>
              <tr
                key={user.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {user.id}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {new Date(user.memberSince).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {getBorrowedBooksCount(user.id)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New User">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter user name" />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email address" />
            
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              
              Register User
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>);

}