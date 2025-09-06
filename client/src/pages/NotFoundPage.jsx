import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for was not found.
      </p>
      <Link
        to="/"
        className="text-primary-600 hover:text-primary-500 font-medium"
      >
        Go back home
      </Link>
    </div>
  );
}
