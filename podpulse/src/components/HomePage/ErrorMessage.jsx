// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center h-screen">
      {/* Container for the error message, centered vertically and horizontally */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        {/* Title of the error message */}
        <p className="text-red-500 text-lg font-bold">Error:</p>
        {/* Display the actual error message */}
        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
  
  export default ErrorMessage;
  