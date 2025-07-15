
import React from 'react';
import { Database, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom';

export function DatabaseStatus() {
  const { currentDatabase, schema, removeDatabase, isCustomDatabase } = useDatabase();
  const navigate = useNavigate();

  if (!isCustomDatabase) {
    return (
      <Button
        variant="outline"
        onClick={() => navigate('/upload')}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Database
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
        <Database className="h-4 w-4 text-green-400" />
        <div className="text-sm">
          <span className="text-white font-medium">{currentDatabase}</span>
          <span className="text-slate-300 ml-2">
            ({schema?.tables.length || 0} tables)
          </span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={removeDatabase}
        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/upload')}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Upload className="h-4 w-4 mr-2" />
        New Upload
      </Button>
    </div>
  );
}
