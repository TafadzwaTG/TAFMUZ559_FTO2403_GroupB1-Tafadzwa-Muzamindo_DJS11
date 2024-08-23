const LoadingSpinner = () => (
  // Center the spinner vertically and horizontally on the screen
  <div className="flex justify-center items-center h-screen">
    <div className="flex items-center">
      {/* SVG for the spinning loader */}
      <svg
        className="animate-spin h-5 w-5 mr-3 text-orange-500" // Spin animation, size, color
        viewBox="0 0 24 24"
      >
        {/* Circle outline of the spinner */}
        <circle
          className="opacity-25" // Light color for the background circle
          cx="12" // X center position
          cy="12" // Y center position
          r="10" // Radius of the circle
          stroke="currentColor" // Use the current text color
          strokeWidth="4" // Width of the stroke
        ></circle>
        {/* Path for the spinning part */}
        <path
          className="opacity-75" // Darker color for the spinning part
          fill="currentColor" // Use the current text color
          d="M4 12a8 8 0 018-0v8h8a8 8 0 11-16 0z" // Path description for the spinner
        ></path>
      </svg>
      {/* Loading text next to the spinner */}
      <span className="text-oxford-blue text-lg">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
