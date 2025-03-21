
import React from 'react';
import Header from '@/components/Header';
import ExpenseTracker from '@/components/ExpenseTracker';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />
      <main className="flex-1 pb-20">
        <ExpenseTracker />
      </main>
    </div>
  );
};

export default Index;
