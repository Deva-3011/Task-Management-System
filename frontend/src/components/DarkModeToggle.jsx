import { useTheme } from '../context/ThemeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button type="button" className="btn btn-outline-light btn-sm theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export default DarkModeToggle;
