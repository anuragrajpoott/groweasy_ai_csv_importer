

function ImportHeader() {
  return (
    <div
      className="
        border-b
        border-gray-200
        dark:border-gray-700
        px-8
        py-6
        bg-white
        dark:bg-gray-800
        transition-colors
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className="
              inline-flex
              items-center
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              bg-orange-100
              text-orange-700
              mb-3
            "
          >
            CSV Import
          </span>

          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Import Leads
          </h1>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-gray-400
            "
          >
            Upload a CSV file and automatically map
            columns to CRM fields using AI.
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default ImportHeader;