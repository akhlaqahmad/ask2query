
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Database, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface FileUploadZoneProps {
  onFileProcessed: (filename: string, schema: any) => void;
  isProcessing: boolean;
  uploadProgress: number;
}

export function FileUploadZone({ onFileProcessed, isProcessing, uploadProgress }: FileUploadZoneProps) {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validExtensions = ['.db', '.sqlite', '.sqlite3', '.csv'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please select a SQLite (.db, .sqlite, .sqlite3) or CSV file",
        variant: "destructive",
      });
      return;
    }

    try {
      let schema;
      
      if (fileExtension === '.csv') {
        schema = await processCSVFile(file);
      } else {
        schema = await processSQLiteFile(file);
      }
      
      onFileProcessed(file.name, schema);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed and schema extracted`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error processing file",
        description: "The file appears to be corrupted or in an unsupported format",
        variant: "destructive",
      });
    }
  }, [onFileProcessed, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-sqlite3': ['.db', '.sqlite', '.sqlite3'],
      'text/csv': ['.csv'],
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const processCSVFile = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const Papa = require('papaparse');
      
      Papa.parse(file, {
        header: true,
        preview: 5, // Only read first 5 rows to detect schema
        complete: (results: any) => {
          if (results.errors.length > 0) {
            reject(new Error('CSV parsing failed'));
            return;
          }

          const columns = results.meta.fields.map((field: string) => ({
            name: field,
            type: 'TEXT' // Default to TEXT for CSV
          }));

          const schema = {
            tables: [{
              name: file.name.replace('.csv', ''),
              columns
            }]
          };

          resolve(schema);
        },
        error: (error: any) => reject(error)
      });
    });
  };

  const processSQLiteFile = async (file: File): Promise<any> => {
    const arrayBuffer = await file.arrayBuffer();
    const SQL = await import('sql.js');
    
    const db = new SQL.Database(new Uint8Array(arrayBuffer));
    
    // Get table names
    const tablesResult = db.exec("SELECT name FROM sqlite_master WHERE type='table'");
    const tables = [];
    
    if (tablesResult.length > 0) {
      for (const tableName of tablesResult[0].values.flat()) {
        // Get column info for each table
        const columnsResult = db.exec(`PRAGMA table_info(${tableName})`);
        const columns = columnsResult[0]?.values.map((row: any) => ({
          name: row[1], // column name
          type: row[2], // column type
        })) || [];
        
        tables.push({
          name: tableName,
          columns
        });
      }
    }
    
    db.close();
    
    return { tables };
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive || dragActive 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <>
              <Upload className="h-12 w-12 text-blue-500 animate-pulse" />
              <div className="space-y-2 w-full max-w-xs">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Processing file...
                </p>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="flex space-x-4">
                <Database className="h-8 w-8 text-slate-400" />
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Drop your database file here or click to browse
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Supports SQLite (.db, .sqlite, .sqlite3) and CSV files up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
