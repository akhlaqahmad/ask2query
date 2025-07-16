
import { useState } from 'react';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useToast } from '@/hooks/use-toast';

export function useDatabaseUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setDatabase } = useDatabase();
  const { toast } = useToast();

  const processFile = async (filename: string, schema: any, onProcessingComplete?: () => void) => {
    setIsProcessing(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Process the schema
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Store in database context
      setDatabase(filename, schema);
      
      // Complete
      setTimeout(() => {
        setIsProcessing(false);
        setUploadProgress(0);
        // Call the completion callback if provided
        if (onProcessingComplete) {
          onProcessingComplete();
        }
      }, 500);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setIsProcessing(false);
      setUploadProgress(0);
      
      toast({
        title: "Upload failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    processFile,
    isProcessing,
    uploadProgress,
  };
}
