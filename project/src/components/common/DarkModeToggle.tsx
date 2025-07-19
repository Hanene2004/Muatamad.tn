import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className={`ml-2 p-2 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 shadow transition-colors`}
      aria-label="Activer/désactiver le mode sombre"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
    </button>
  );
};

export default DarkModeToggle; 