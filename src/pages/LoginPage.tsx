import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react'; // For Alert icon

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous errors

    // Basic validation (more comprehensive validation would typically be here)
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    // Simulate API call for login
    console.log('Attempting login with:', { email, password });
    // Replace with actual API call
    // For demonstration, let's assume a mock validation:
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful');
      // On success, navigate to the post-login landing page
      navigate('/post-login-landing'); // Path from App.tsx
    } else {
      console.log('Login failed: Invalid credentials');
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const alertNode = errorMessage ? (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Login Failed</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  ) : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Login to Your Account"
          alertMessage={alertNode}
          footerContent={
            <>
              <Link
                to="/forgot-password" // Path from App.tsx
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
              <p className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link
                  to="/registration" // Path from App.tsx
                  className="text-primary hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </>
          }
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </AuthFormCard>
      </main>
      <AuthFooter />
    </div>
  );
};

export default LoginPage;