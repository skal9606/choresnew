import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return [isDark, toggleDarkMode];
}
