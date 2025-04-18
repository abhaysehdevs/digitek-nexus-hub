
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to the dashboard page
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-digitek-600">Digitek Club Hub</h1>
        <p className="text-xl text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
