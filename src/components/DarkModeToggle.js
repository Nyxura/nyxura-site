'use client';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('theme') === 'dark';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleDark = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDark}
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow hover:shadow-md transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}