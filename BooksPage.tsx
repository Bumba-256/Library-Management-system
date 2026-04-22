import React, { useState } from 'react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { Modal } from '../components/Modal';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
export function BooksPage() {
  const { state, dispatch } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: ''
  });
  const filteredBooks = state.books.filter(
    (book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn) {
      toast.error('Please fill in all fields');
      return;
    }
    const newBook = {
      id: `B${String(state.books.length + 1).padStart(3, '0')}`,
      ...formData,
      available: true
    };
    dispatch({
      type: 'ADD_BOOK',
      payload: newBook
    });
    toast.success('Book added successfully!');
    setIsModalOpen(false);
    setFormData({
      title: '',
      author: '',
      isbn: ''
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
        <h1 className="text-3xl font-bold text-slate-900">Books</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          
          <PlusIcon className="w-5 h-5" />
          Add Book
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Book ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Title
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Author
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  ISBN
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) =>
              <tr
                key={book.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {book.id}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">
                    {book.title}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {book.author}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {book.isbn}
                  </td>
                  <td className="py-3 px-4">
                    <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${book.available ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
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
        title="Add New Book">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter book title" />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
              setFormData({
                ...formData,
                author: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter author name" />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) =>
              setFormData({
                ...formData,
                isbn: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter ISBN" />
            
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
              
              Add Book
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>);

}