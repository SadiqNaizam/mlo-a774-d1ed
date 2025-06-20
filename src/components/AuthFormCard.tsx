import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming cn utility is available as per shadcn/ui setup

interface AuthFormCardProps {
  title: string;
  children: React.ReactNode; // For form inputs, submit button, etc.
  footerContent?: React.ReactNode; // For supplementary links like "Forgot Password?", "Sign Up"
  alertMessage?: React.ReactNode; // For displaying error or success messages within the card
  className?: string; // Allow additional styling customization from parent
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  children,
  footerContent,
  alertMessage,
  className,
}) => {
  console.log('AuthFormCard loaded with title:', title);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alertMessage && <div className="w-full">{alertMessage}</div>}
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-center justify-center space-y-2 pt-6">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;