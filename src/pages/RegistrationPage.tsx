import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Though FormLabel is often used within FormField
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Show error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const [formSubmissionStatus, setFormSubmissionStatus] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    console.log('Registration form submitted:', data);
    setFormSubmissionStatus(null); // Clear previous status

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example: Simulate success
    if (data.email !== "test@example.com") { // Simulate that any other email is successful
        setFormSubmissionStatus({ type: 'success', message: 'Account created successfully! You can now login.' });
        //  form.reset(); // Optionally reset form
        //  setTimeout(() => navigate('/'), 2000); // Redirect to login after a delay
    } else { // Simulate error if email is test@example.com
        setFormSubmissionStatus({ type: 'error', message: 'This email address is already registered.' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Create your Account"
          alertMessage={
            formSubmissionStatus && (
              <Alert variant={formSubmissionStatus.type === 'error' ? 'destructive' : 'default'}>
                {formSubmissionStatus.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                <AlertTitle>{formSubmissionStatus.type === 'error' ? 'Registration Failed' : 'Success'}</AlertTitle>
                <AlertDescription>{formSubmissionStatus.message}</AlertDescription>
              </Alert>
            )
          }
          footerContent={
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link to="/" className="font-semibold text-primary hover:underline">
                Login
              </Link>
            </p>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <AuthFooter />
    </div>
  );
};

export default RegistrationPage;