function ImportCard({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200">
        {children}
      </div>
    </div>
  );
}

export default ImportCard;