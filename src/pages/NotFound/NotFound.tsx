const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-10">
        <h1 className="text-4xl text-primary font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="text-secondar underline">Go back home</a>
      </div>
    );
  };
  
  export default NotFound;
  