
// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-red-500 text-lg font-bold">Error:</p>
        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
  
  export default ErrorMessage;
  