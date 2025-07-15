
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Download,
  Copy,
  FileJson,
  FileSpreadsheet
} from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { downloadJSON, downloadCSV, copyToClipboard, formatTableAsText } from '@/utils/exportData';
import { ColumnInfo } from '@/utils/chartDetection';
import { useToast } from '@/hooks/use-toast';

interface EnhancedTableProps {
  columns: string[];
  values: any[][];
  columnInfo: ColumnInfo[];
}

type SortDirection = 'asc' | 'desc' | null;

export function EnhancedTable({ columns, values, columnInfo }: EnhancedTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const { toast } = useToast();

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return values;
    
    return values.filter(row =>
      row.some(cell => 
        cell !== null && cell !== undefined && 
        String(cell).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [values, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (sortColumn === null || sortDirection === null) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      // Handle null values
      if (aVal === null || aVal === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bVal === null || bVal === undefined) return sortDirection === 'asc' ? -1 : 1;
      
      // Determine comparison based on column type
      const columnType = columnInfo[sortColumn]?.type;
      
      if (columnType === 'number') {
        const numA = Number(aVal);
        const numB = Number(bVal);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      } else if (columnType === 'date') {
        const dateA = new Date(aVal).getTime();
        const dateB = new Date(bVal).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const strA = String(aVal).toLowerCase();
        const strB = String(bVal).toLowerCase();
        return sortDirection === 'asc' 
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
    });
  }, [filteredData, sortColumn, sortDirection, columnInfo]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (columnIndex: number) => {
    if (sortColumn !== columnIndex) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline ml-1" /> : 
      <ChevronDown className="h-4 w-4 inline ml-1" />;
  };

  const getTypeIcon = (type: ColumnInfo['type']) => {
    const colors = {
      number: 'bg-blue-100 text-blue-800',
      date: 'bg-green-100 text-green-800',
      text: 'bg-gray-100 text-gray-800',
      boolean: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge variant="secondary" className={`text-xs ${colors[type]}`}>
        {type}
      </Badge>
    );
  };

  const handleExportJSON = () => {
    const exportData = {
      columns,
      data: sortedData,
      total: sortedData.length,
      exported_at: new Date().toISOString()
    };
    downloadJSON(exportData);
    toast({ title: "JSON exported successfully" });
  };

  const handleExportCSV = () => {
    downloadCSV(columns, sortedData);
    toast({ title: "CSV exported successfully" });
  };

  const handleCopyTable = async () => {
    const tableText = formatTableAsText(columns, paginatedData);
    const success = await copyToClipboard(tableText);
    toast({ 
      title: success ? "Table copied to clipboard" : "Failed to copy table",
      variant: success ? "default" : "destructive"
    });
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search results..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyTable}
            className="hidden sm:flex"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportCSV}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportJSON}
          >
            <FileJson className="h-4 w-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>Total: {sortedData.length} records</span>
        <span>•</span>
        <span>Page {currentPage} of {totalPages}</span>
        <span>•</span>
        <span>Showing {startIndex + 1}-{Math.min(endIndex, sortedData.length)}</span>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead 
                    key={index} 
                    className="cursor-pointer hover:bg-muted/50 select-none min-w-[120px]"
                    onClick={() => handleSort(index)}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <span className="font-medium">{column}</span>
                        {getSortIcon(index)}
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(columnInfo[index]?.type || 'text')}
                        <span className="text-xs text-muted-foreground">
                          {columnInfo[index]?.uniqueCount} unique
                        </span>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-muted/50">
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="max-w-[200px]">
                      {cell === null || cell === undefined ? (
                        <span className="text-muted-foreground italic">NULL</span>
                      ) : (
                        <span className="break-words">{String(cell)}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
