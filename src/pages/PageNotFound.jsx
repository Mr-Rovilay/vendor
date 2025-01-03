import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Card className="w-full max-w-lg overflow-hidden bg-white shadow-lg rounded-xl">
        {/* Card Header */}
        <CardHeader className="py-6 text-center text-white bg-gradient-to-r from-red-500 to-red-600">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 animate-bounce" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
          <p className="mt-2 text-base font-light">
            Sorry, we couldn’t find the page you were looking for.
          </p>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="px-6 py-8 space-y-6 text-center">
          <p className="text-gray-600">
            The page might have been moved, deleted, or perhaps it never existed. Let&#39;s get you back on track!
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="default" size="lg" className="hover:scale-105">
              <Link to="/" className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.reload()}
              className="hover:scale-105 hover:border-red-500 hover:text-red-500"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reload Page
            </Button>
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="py-4 text-sm text-center text-gray-500 bg-gray-100">
          <p>If you believe this is a mistake, contact our support team for assistance.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PageNotFound;
