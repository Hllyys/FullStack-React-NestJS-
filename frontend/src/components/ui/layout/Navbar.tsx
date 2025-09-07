import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../ui/Button';
import { FaHome, FaUsers, FaBox, FaDatabase } from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase = 'px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2';
  const linkInactive = 'text-gray-300 hover:text-white hover:bg-gray-700';
  const linkActive = 'text-white bg-gray-700';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-700 bg-gray-900/95 backdrop-blur">
      <div className="container-std h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <FaHome className="text-indigo-400" />
          HOME
        </NavLink>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <FaUsers /> Users
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <FaBox /> Posts
          </NavLink>
         
        </nav>

        {/* Mobile toggle */}
        <Button
          aria-label="Toggle menu"
          className="md:hidden bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
          onClick={() => setOpen((s) => !s)}
        >
          ☰
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-700 bg-gray-900">
          <div className="container-std py-2 flex flex-col gap-1">
            <NavLink
              to="/users"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <FaUsers /> Users
            </NavLink>
            <NavLink
              to="/posts"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <FaBox /> Posts
            </NavLink>
            <a
              href="https://jsonplaceholder.typicode.com/"
              target="_blank"
              rel="noreferrer"
              className={`${linkBase} ${linkInactive}`}
              onClick={() => setOpen(false)}
            >
              <FaDatabase /> API
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
