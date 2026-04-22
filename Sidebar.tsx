import React from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowLeftRightIcon } from
'lucide-react';
interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}
const navItems = [
{
  id: 'dashboard',
  label: 'Dashboard',
  icon: LayoutDashboardIcon
},
{
  id: 'books',
  label: 'Books',
  icon: BookOpenIcon
},
{
  id: 'users',
  label: 'Users',
  icon: UsersIcon
},
{
  id: 'transactions',
  label: 'Transactions',
  icon: ArrowLeftRightIcon
}];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-indigo-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpenIcon className="w-7 h-7" />
          Library MS
        </h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}>
                  
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>);

          })}
        </ul>
      </nav>
    </aside>);

}