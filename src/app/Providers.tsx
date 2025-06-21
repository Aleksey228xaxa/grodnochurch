'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { LoadingBar } from './component/LoadingBar';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <LoadingBar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#333',
          },
        }}
      />
    </>
  );
}; 