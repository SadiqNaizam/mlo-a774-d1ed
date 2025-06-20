import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const PostLoginLandingPage = () => {
  console.log('PostLoginLandingPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear any auth tokens/session state here
    console.log('User logging out');
    navigate('/'); // Navigate to LoginPage, which is at the root path "/"
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <AuthHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-md text-gray-600 dark:text-gray-400 pt-2">
              You have successfully logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1529517309669-f09c93707708?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlbGNvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
              alt="Welcome illustration" 
              className="w-48 h-48 object-cover rounded-lg"
            />
            <p className="text-center text-gray-700 dark:text-gray-300">
              This is your personal dashboard. More features coming soon!
              For now, you can explore or log out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto" 
                onClick={() => alert('Explore feature clicked! This could navigate to another section.')}
              >
                Explore (Placeholder)
              </Button>
              <Button 
                onClick={handleLogout} 
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
         <p className="mt-8 text-sm text-muted-foreground">
            Need help? Visit our <Link to="/support" className="underline hover:text-primary">Support Page</Link> (Link example, not in App.tsx).
          </p>
      </main>
      <AuthFooter />
    </div>
  );
};

export default PostLoginLandingPage;