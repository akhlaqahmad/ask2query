
import React, { useState } from 'react';
import { Search, Database, Table, Key, Link, ChevronDown, ChevronRight, Eye, Copy } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedDatabaseSchema, TableSchema, ColumnSchema } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

interface SchemaBrowserProps {
  schema: EnhancedDatabaseSchema | null;
  onInsertText: (text: string) => void;
}

export function SchemaBrowser({ schema, onInsertText }: SchemaBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  if (!schema) {
    return (
      <Sidebar className="w-80 border-r">
        <SidebarHeader className="p-4">
          <div className="text-center text-muted-foreground">
            <Database className="h-8 w-8 mx-auto mb-2" />
            <p>No database loaded</p>
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const filteredTables = schema.tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.columns.some(col => col.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleTable = (tableName: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName);
    } else {
      newExpanded.add(tableName);
    }
    setExpandedTables(newExpanded);
  };

  const handleInsert = (text: string) => {
    onInsertText(text);
    toast({ title: `Inserted "${text}" into query` });
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('int') || lowerType.includes('num') || lowerType.includes('real')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
    if (lowerType.includes('text') || lowerType.includes('char') || lowerType.includes('varchar')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
    if (lowerType.includes('date') || lowerType.includes('time')) {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  return (
    <Sidebar className="w-80 border-r">
      <SidebarHeader className="p-4 border-b">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <h2 className="font-semibold">Database Schema</h2>
          </div>
          
          {/* Database Statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Tables:</span>
                <Badge variant="secondary">{schema.totalTables}</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Size:</span>
                <span className="text-muted-foreground">{formatFileSize(schema.fileSize)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Name:</span>
                <span className="text-muted-foreground truncate ml-2">{schema.databaseName}</span>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tables & columns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-8"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <TooltipProvider>
          <SidebarGroup>
            <SidebarGroupLabel>Tables ({filteredTables.length})</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredTables.map((table) => (
                  <SidebarMenuItem key={table.name}>
                    <Collapsible
                      open={expandedTables.has(table.name)}
                      onOpenChange={() => toggleTable(table.name)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between group">
                          <div className="flex items-center gap-2">
                            <Table className="h-4 w-4" />
                            <span className="font-medium">{table.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {table.rowCount}
                            </Badge>
                          </div>
                          {expandedTables.has(table.name) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="ml-4 mt-2">
                        <div className="space-y-1">
                          {/* Table Actions */}
                          <div className="flex gap-1 mb-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleInsert(table.name)}
                                >
                                  <Copy className="h-3 w-3 mr-1" />
                                  Table
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Insert table name</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleInsert(`SELECT * FROM ${table.name} LIMIT 10`)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Insert preview query</TooltipContent>
                            </Tooltip>
                          </div>

                          {/* Columns */}
                          {table.columns.map((column) => (
                            <div
                              key={column.name}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer group"
                              onClick={() => handleInsert(column.name)}
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                  {column.isPrimaryKey && (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Key className="h-3 w-3 text-yellow-600" />
                                      </TooltipTrigger>
                                      <TooltipContent>Primary Key</TooltipContent>
                                    </Tooltip>
                                  )}
                                  {column.isForeignKey && (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Link className="h-3 w-3 text-blue-600" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Foreign Key → {column.references?.table}.{column.references?.column}
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                                
                                <span className="text-sm font-mono truncate">{column.name}</span>
                              </div>
                              
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ml-2 ${getTypeColor(column.type)}`}
                              >
                                {column.type}
                              </Badge>
                            </div>
                          ))}

                          {/* Sample Data */}
                          {table.sampleData.length > 0 && (
                            <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                              <div className="font-medium mb-1">Sample Data:</div>
                              <div className="space-y-1 max-h-20 overflow-y-auto">
                                {table.sampleData.slice(0, 3).map((row, idx) => (
                                  <div key={idx} className="text-muted-foreground truncate">
                                    {row.slice(0, 2).map(String).join(', ')}
                                    {row.length > 2 && '...'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Relationships */}
                          {table.relationships.length > 0 && (
                            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs">
                              <div className="font-medium mb-1">Relations:</div>
                              {table.relationships.map((rel, idx) => (
                                <div key={idx} className="text-blue-700 dark:text-blue-300">
                                  → {rel.targetTable}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </TooltipProvider>
      </SidebarContent>
    </Sidebar>
  );
}
