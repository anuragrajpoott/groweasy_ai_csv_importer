import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
     className="
  px-3
  py-2
  rounded-lg
  border
  border-gray-300
  dark:border-gray-600
  bg-white
  dark:bg-gray-700
  text-sm
  text-gray-700
  dark:text-white
  cursor-pointer
"
    >
      <option value="light">
        ☀️ Light
      </option>

      <option value="dark">
        🌙 Dark
      </option>

      <option value="system">
        💻 System
      </option>
    </select>
  );
}

export default ThemeToggle;