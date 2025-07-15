
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DatabaseSchema {
  tables: {
    name: string;
    columns: {
      name: string;
      type: string;
    }[];
  }[];
}

export interface DatabaseContextType {
  currentDatabase: string | null;
  schema: DatabaseSchema | null;
  isCustomDatabase: boolean;
  setDatabase: (name: string, schema: DatabaseSchema) => void;
  removeDatabase: () => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null);
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);

  const setDatabase = (name: string, newSchema: DatabaseSchema) => {
    setCurrentDatabase(name);
    setSchema(newSchema);
  };

  const removeDatabase = () => {
    setCurrentDatabase(null);
    setSchema(null);
  };

  const isCustomDatabase = currentDatabase !== null;

  return (
    <DatabaseContext.Provider 
      value={{
        currentDatabase,
        schema,
        isCustomDatabase,
        setDatabase,
        removeDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
