
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      // This would call your actual password reset logic
      console.log('Requesting password reset for:', email);
      
      // Simulate API delay
      await new Promise(r => setTimeout(r, 1000));
      
      // For demo purposes, always show success
      setSuccess(true);
    } catch (err) {
      setError('An error occurred while requesting a password reset');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      {success ? (
        <CardContent className="space-y-4">
          <div className="p-3 text-sm bg-green-100 border border-green-200 text-green-800 rounded">
            Password reset link has been sent to your email address.
          </div>
          <p className="text-sm text-muted-foreground">
            Please check your email and follow the instructions to reset your password.
          </p>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="you@example.com" 
                autoComplete="email"
                required 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-digitek-600 hover:bg-digitek-700" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
            <div className="text-sm flex justify-center">
              <Link 
                to="/login" 
                className="text-digitek-600 hover:text-digitek-700 dark:text-digitek-400 dark:hover:text-digitek-300 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </form>
      )}
    </Card>
  );
};

export default ForgotPassword;
