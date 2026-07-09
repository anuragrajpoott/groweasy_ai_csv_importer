function ImportCard({ children }) {
  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-900
        flex
        items-center
        justify-center
        p-6
        transition-colors
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          bg-white
          dark:bg-gray-800
          rounded-2xl
          shadow-lg
          border
          border-gray-200
          dark:border-gray-700
          transition-colors
        "
      >
        {children}
      </div>
    </div>
  );
}

export default ImportCard;