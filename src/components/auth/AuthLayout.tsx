
import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side (form) */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
      
      {/* Right side (image/branding) */}
      <div className="hidden lg:block bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-digitek-600/20 via-digitek-900/30 to-digitek-950/50" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center p-12">
          <div className="space-y-2">
            <h1 className={cn(
              "text-3xl font-bold tracking-tight text-white sm:text-5xl"
            )}>
              Digitek Club Hub
            </h1>
            <p className="text-white/80 max-w-lg">
              Streamline your college club's role management, event planning, and task assignments all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
