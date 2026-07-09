function ImportHeader() {
  return (
    <div className="border-b border-gray-200 px-8 py-6 bg-white">
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

        <h1 className="text-3xl font-bold text-gray-900">
          Import Leads
        </h1>

        <p className="mt-2 text-gray-500">
          Upload a CSV file and automatically map columns to CRM fields using AI.
        </p>
      </div>
    </div>
  );
}

export default ImportHeader;