
import React, { createContext, useContext, ReactNode } from 'react';
import { useSQLiteDatabase } from '@/hooks/useSQLiteDatabase';

const SQLiteDatabaseContext = createContext<ReturnType<typeof useSQLiteDatabase> | undefined>(undefined);

export function SQLiteDatabaseProvider({ children }: { children: ReactNode }) {
  const database = useSQLiteDatabase();
  
  return (
    <SQLiteDatabaseContext.Provider value={database}>
      {children}
    </SQLiteDatabaseContext.Provider>
  );
}

export function useSQLiteDatabaseContext() {
  const context = useContext(SQLiteDatabaseContext);
  if (context === undefined) {
    throw new Error('useSQLiteDatabaseContext must be used within a SQLiteDatabaseProvider');
  }
  return context;
}
