function Footer() {
  return (
    <div
      className="
        px-8
        py-4
        border-t
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-2
          text-sm
          text-gray-500
          dark:text-gray-400
        "
      >
        <p>GrowEasy CSV Importer</p>

        <p>
          Built with React, Node.js, AI Mapping & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default Footer;