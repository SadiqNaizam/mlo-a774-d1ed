import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, AlertCircle, Loader2 } from 'lucide-react';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label'; // Although shadcn FormField provides FormLabel, direct Label might be for footer or other text.

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For submission loading state

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    console.log('Password reset requested for:', values.email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmittedEmail(values.email);
    setFormSubmitted(true);
    setIsLoading(false);
    // form.reset(); // Optionally reset form after submission
  };

  const alertMessage = formSubmitted ? (
    <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400">
      <AlertCircle className="h-4 w-4 text-green-700 dark:text-green-400" />
      <AlertTitle>Request Submitted</AlertTitle>
      <AlertDescription>
        If an account with email <strong>{submittedEmail}</strong> exists, a password reset link has been sent. Please check your inbox (and spam folder).
      </AlertDescription>
    </Alert>
  ) : null;

  const footerContent = (
    <p className="text-sm text-center text-muted-foreground">
      Remember your password?{' '}
      <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
        Log In
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Forgot Your Password?"
          alertMessage={alertMessage}
          footerContent={footerContent}
          className="w-full max-w-md"
        >
          {!formSubmitted ? (
            <>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                No problem! Enter your email address below and we'll send you a link to reset your password.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Send Reset Link
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                You can close this page or <Link to="/" className="font-medium text-primary hover:underline">return to Login</Link>.
              </p>
            </div>
          )}
        </AuthFormCard>
      </main>
      <AuthFooter />
    </div>
  );
};

export default ForgotPasswordPage;