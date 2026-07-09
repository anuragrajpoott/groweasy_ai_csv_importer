import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-8
        py-4
        border-b
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-orange-500
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
        >
          G
        </div>

        <div>
          <h2
            className="
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            GrowEasy
          </h2>

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            AI CSV Importer
          </p>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}

export default Navbar;