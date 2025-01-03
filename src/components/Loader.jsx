export const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="relative flex flex-col items-center justify-center">
      {/* Shopping cart icon spinning */}
      <div className="w-32 h-32 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>

      {/* Cart icon */}
      <svg
        className="absolute w-12 h-12 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M9 21h6"
        />
      </svg>

      {/* Text below the spinner */}
      <p className="mt-3 text-sm text-gray-600">Loading ...</p>
    </div>
  </div>
);
