import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Shield, BarChart4 } from 'lucide-react';
import img from "../assets/home_image.png";
const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Simplify User <span className="text-blue-600">Management</span> With Our Platform
                </h1>
                <p className="text-lg text-gray-600">
                  A comprehensive solution for managing users, streamlining workflows, and enhancing productivity.
                </p>
                <div className="flex flex-wrap gap-4">
                  {isAuthenticated ? (
                    <Link to="/users">
                      <Button size="lg" className="gap-2">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button size="lg" className="gap-2">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={img}
                  alt="User Management"
                  className="rounded-lg shadow-xl w-full object-cover max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">UserHub</h3>
              <p className="text-gray-400 max-w-md">
                A comprehensive user management platform designed to simplify your workflow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                  <li><Link to="/users" className="hover:text-blue-400 transition-colors">Users</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} UserHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;