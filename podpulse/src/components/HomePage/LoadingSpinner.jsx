const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-orange-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-0v8h8a8 8 0 11-16 0z"
          ></path>
        </svg>
        <span className="text-oxford-blue text-lg">Loading...</span>
      </div>
    </div>
  );
  
  export default LoadingSpinner;
  