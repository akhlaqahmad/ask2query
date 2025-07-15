
export interface ColumnAnalysis {
  name: string;
  type: 'number' | 'date' | 'string' | 'boolean';
  uniqueValues: number;
  nullCount: number;
  sampleValues: any[];
}

export interface ColumnInfo {
  name: string;
  type: 'number' | 'date' | 'string' | 'boolean';
  uniqueCount: number;
  nullCount: number;
  sampleValues: any[];
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'none';
  xAxis?: string;
  yAxis?: string;
  dataKey?: string;
  nameKey?: string;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'none';
  data: any[];
  xAxis?: string;
  yAxis?: string;
  title?: string;
}

export function analyzeColumns(columns: string[], values: any[][]): ColumnInfo[] {
  if (!columns || !values || values.length === 0) return [];
  
  return columns.map((column, columnIndex) => {
    const columnValues = values.map(row => row[columnIndex]).filter(val => val !== null && val !== undefined);
    const uniqueValues = new Set(columnValues).size;
    const nullCount = values.length - columnValues.length;
    const sampleValues = columnValues.slice(0, 5);
    
    // Determine column type
    let type: 'number' | 'date' | 'string' | 'boolean' = 'string';
    
    if (columnValues.length > 0) {
      // Check if boolean
      const booleanValues = columnValues.filter(val => 
        val === true || val === false || val === 'true' || val === 'false'
      );
      if (booleanValues.length / columnValues.length > 0.8) {
        type = 'boolean';
      }
      // Check if number
      else {
        const numericValues = columnValues.filter(val => {
          const num = Number(val);
          return !isNaN(num) && isFinite(num);
        });
        if (numericValues.length / columnValues.length > 0.8) {
          type = 'number';
        }
        // Check if date
        else {
          const dateValues = columnValues.filter(val => {
            const date = new Date(val);
            return !isNaN(date.getTime());
          });
          if (dateValues.length / columnValues.length > 0.8) {
            type = 'date';
          }
        }
      }
    }
    
    return {
      name: column,
      type,
      uniqueCount: uniqueValues,
      nullCount,
      sampleValues
    };
  });
}

export function detectChartType(columns: string[], values: any[][]): ChartData {
  if (!columns || !values || values.length === 0) {
    return { type: 'none', data: [] };
  }
  
  // Convert data format for easier analysis
  const data = values.map(row => {
    const obj: any = {};
    columns.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
  
  const columnInfo = analyzeColumns(columns, values);
  const numericColumns = columnInfo.filter(col => col.type === 'number');
  const dateColumns = columnInfo.filter(col => col.type === 'date');
  const stringColumns = columnInfo.filter(col => col.type === 'string');
  
  // If we have date columns and numeric columns, prefer line chart
  if (dateColumns.length > 0 && numericColumns.length > 0) {
    return {
      type: 'line',
      data,
      xAxis: dateColumns[0].name,
      yAxis: numericColumns[0].name,
      title: `${numericColumns[0].name} over ${dateColumns[0].name}`
    };
  }
  
  // If we have string categories and numeric values, use bar chart
  if (stringColumns.length > 0 && numericColumns.length > 0) {
    const categoryColumn = stringColumns.find(col => col.uniqueCount <= 20);
    if (categoryColumn) {
      return {
        type: 'bar',
        data,
        xAxis: categoryColumn.name,
        yAxis: numericColumns[0].name,
        title: `${numericColumns[0].name} by ${categoryColumn.name}`
      };
    }
  }
  
  // If we have one numeric column with reasonable unique values, use pie chart
  if (numericColumns.length === 1 && stringColumns.length === 1) {
    const categoryColumn = stringColumns[0];
    if (categoryColumn.uniqueCount <= 10 && categoryColumn.uniqueCount > 1) {
      return {
        type: 'pie',
        data,
        xAxis: categoryColumn.name,
        yAxis: numericColumns[0].name,
        title: `${numericColumns[0].name} distribution by ${categoryColumn.name}`
      };
    }
  }
  
  return { type: 'none', data };
}

export function calculateStats(columns: string[], values: any[][]) {
  const columnInfo = analyzeColumns(columns, values);
  
  const stats = {
    totalRecords: values.length,
    totalColumns: columns.length,
    numericColumns: columnInfo.filter(col => col.type === 'number').length,
    dateColumns: columnInfo.filter(col => col.type === 'date').length,
    textColumns: columnInfo.filter(col => col.type === 'string').length,
    booleanColumns: columnInfo.filter(col => col.type === 'boolean').length
  };
  
  // Calculate column-specific statistics
  const columnStats = columnInfo.map((column, columnIndex) => {
    const columnValues = values.map(row => row[columnIndex]).filter(val => val !== null && val !== undefined);
    
    let min: number | undefined;
    let max: number | undefined;
    let avg: number | undefined;
    
    if (column.type === 'number' && columnValues.length > 0) {
      const numericValues = columnValues.map(val => Number(val)).filter(num => !isNaN(num) && isFinite(num));
      if (numericValues.length > 0) {
        min = Math.min(...numericValues);
        max = Math.max(...numericValues);
        avg = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
      }
    }
    
    return {
      ...column,
      min,
      max,
      avg: avg ? Number(avg.toFixed(2)) : undefined,
      fillRate: ((columnValues.length / values.length) * 100).toFixed(1) + '%'
    };
  });
  
  return { ...stats, columnStats };
}
