function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-300">
      <h1 className="text-8xl font-extrabold text-blue-500 dark:text-blue-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-2">
        Oops! Page not found.
      </h2>
      <p className="text-center text-lg md:text-xl max-w-md mb-6">
        We can’t seem to find the page you’re looking for. It might have been
        moved or deleted.
      </p>
      <a
        href="/"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFoundPage;
