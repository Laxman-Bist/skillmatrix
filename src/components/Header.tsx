import React from 'react';
import { Menu, Bell, Search, Menu as MenuIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-md lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="input pl-10 bg-gray-50 text-sm"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-full relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-accent-500 border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-white cursor-pointer">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;