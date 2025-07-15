
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/FileUploadZone';
import { useDatabaseUpload } from '@/hooks/useDatabaseUpload';
import { useDatabase } from '@/contexts/DatabaseContext';

export default function DatabaseUpload() {
  const navigate = useNavigate();
  const { processFile, isProcessing, uploadProgress } = useDatabaseUpload();
  const { currentDatabase, schema, removeDatabase } = useDatabase();

  const handleFileProcessed = (filename: string, parsedSchema: any) => {
    processFile(filename, parsedSchema);
  };

  const handleRemoveDatabase = () => {
    removeDatabase();
  };

  const handleBackToQuery = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToQuery}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Query
          </Button>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Database
          </h1>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Current Database Status */}
          {currentDatabase && (
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Current Database: {currentDatabase}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {schema?.tables.length || 0} tables detected
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleRemoveDatabase}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Database
                </Button>
              </div>
              
              {/* Schema Preview */}
              {schema && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Detected Tables:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {schema.tables.map((table, index) => (
                      <div key={index} className="bg-black/20 rounded-md p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Database className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-medium text-white">{table.name}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {table.columns.length} columns
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload Zone */}
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentDatabase ? 'Upload New Database' : 'Upload Your Database'}
              </h2>
              <p className="text-slate-300">
                {currentDatabase 
                  ? 'Replace the current database with a new one'
                  : 'Upload your SQLite database or CSV file to get started with custom queries'
                }
              </p>
            </div>
            
            <FileUploadZone
              onFileProcessed={handleFileProcessed}
              isProcessing={isProcessing}
              uploadProgress={uploadProgress}
            />
          </div>

          {/* Instructions */}
          <div className="bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3">How it works:</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>• <strong>SQLite files:</strong> Upload .db, .sqlite, or .sqlite3 files to automatically extract the complete schema</p>
              <p>• <strong>CSV files:</strong> Upload CSV files to create temporary tables with auto-detected columns</p>
              <p>• <strong>Size limit:</strong> Files must be under 10MB for optimal performance</p>
              <p>• <strong>Custom queries:</strong> Once uploaded, generate SQL queries based on your actual data structure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
