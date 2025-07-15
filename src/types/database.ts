
export interface EnhancedDatabaseSchema {
  databaseName: string;
  fileSize: number;
  totalTables: number;
  tables: TableSchema[];
}

export interface TableSchema {
  name: string;
  rowCount: number;
  columns: ColumnSchema[];
  sampleData: any[][];
  relationships: TableRelationship[];
}

export interface ColumnSchema {
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNotNull: boolean;
  defaultValue?: string;
  references?: {
    table: string;
    column: string;
  };
}

export interface TableRelationship {
  type: 'one-to-many' | 'many-to-many' | 'one-to-one';
  targetTable: string;
  column: string;
  targetColumn: string;
}
