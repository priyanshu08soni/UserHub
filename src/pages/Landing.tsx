import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Shield, BarChart4 } from 'lucide-react';

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
                  src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1000&auto=format&fit=crop"
                  alt="User Management"
                  className="rounded-lg shadow-xl w-full object-cover max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers a comprehensive set of tools to help you manage your users effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">User Management</h3>
                  <p className="text-gray-600">
                    Easily manage your users with our intuitive interface. Add, edit, and remove users with just a few clicks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure Access</h3>
                  <p className="text-gray-600">
                    Protect your data with our secure authentication system. Control who has access to your platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <BarChart4 className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Analytics</h3>
                  <p className="text-gray-600">
                    Gain insights into user behavior with our comprehensive analytics dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already using our platform
              to manage their users effectively.
            </p>
            {!isAuthenticated && (
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  Sign In Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/users">
                <Button size="lg" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
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