
export interface ColumnAnalysis {
  name: string;
  type: 'number' | 'date' | 'string' | 'boolean';
  uniqueValues: number;
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

export function analyzeColumns(data: any[]): ColumnAnalysis[] {
  if (!data || data.length === 0) return [];
  
  const columns = Object.keys(data[0]);
  
  return columns.map(column => {
    const values = data.map(row => row[column]).filter(val => val !== null && val !== undefined);
    const uniqueValues = new Set(values).size;
    const nullCount = data.length - values.length;
    const sampleValues = values.slice(0, 5);
    
    // Determine column type
    let type: 'number' | 'date' | 'string' | 'boolean' = 'string';
    
    if (values.length > 0) {
      // Check if boolean
      const booleanValues = values.filter(val => 
        val === true || val === false || val === 'true' || val === 'false'
      );
      if (booleanValues.length / values.length > 0.8) {
        type = 'boolean';
      }
      // Check if number
      else {
        const numericValues = values.filter(val => {
          const num = Number(val);
          return !isNaN(num) && isFinite(num);
        });
        if (numericValues.length / values.length > 0.8) {
          type = 'number';
        }
        // Check if date
        else {
          const dateValues = values.filter(val => {
            const date = new Date(val);
            return !isNaN(date.getTime());
          });
          if (dateValues.length / values.length > 0.8) {
            type = 'date';
          }
        }
      }
    }
    
    return {
      name: column,
      type,
      uniqueValues,
      nullCount,
      sampleValues
    };
  });
}

export function detectChartType(data: any[], columns: ColumnAnalysis[]): ChartConfig {
  if (!data || data.length === 0 || columns.length === 0) {
    return { type: 'none' };
  }
  
  const numericColumns = columns.filter(col => col.type === 'number');
  const dateColumns = columns.filter(col => col.type === 'date');
  const stringColumns = columns.filter(col => col.type === 'string');
  
  // If we have date columns and numeric columns, prefer line chart
  if (dateColumns.length > 0 && numericColumns.length > 0) {
    return {
      type: 'line',
      xAxis: dateColumns[0].name,
      yAxis: numericColumns[0].name
    };
  }
  
  // If we have string categories and numeric values, use bar chart
  if (stringColumns.length > 0 && numericColumns.length > 0) {
    const categoryColumn = stringColumns.find(col => col.uniqueValues <= 20);
    if (categoryColumn) {
      return {
        type: 'bar',
        xAxis: categoryColumn.name,
        yAxis: numericColumns[0].name
      };
    }
  }
  
  // If we have one numeric column with reasonable unique values, use pie chart
  if (numericColumns.length === 1 && stringColumns.length === 1) {
    const categoryColumn = stringColumns[0];
    if (categoryColumn.uniqueValues <= 10 && categoryColumn.uniqueValues > 1) {
      return {
        type: 'pie',
        dataKey: numericColumns[0].name,
        nameKey: categoryColumn.name
      };
    }
  }
  
  return { type: 'none' };
}

export function calculateStats(data: any[], columns: ColumnAnalysis[]) {
  const stats = {
    totalRecords: data.length,
    totalColumns: columns.length,
    numericColumns: columns.filter(col => col.type === 'number').length,
    dateColumns: columns.filter(col => col.type === 'date').length,
    textColumns: columns.filter(col => col.type === 'string').length,
    booleanColumns: columns.filter(col => col.type === 'boolean').length
  };
  
  // Calculate column-specific statistics
  const columnStats = columns.map(column => {
    const values = data.map(row => row[column.name]).filter(val => val !== null && val !== undefined);
    
    let min: number | undefined;
    let max: number | undefined;
    let avg: number | undefined;
    
    if (column.type === 'number' && values.length > 0) {
      const numericValues = values.map(val => Number(val)).filter(num => !isNaN(num) && isFinite(num));
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
      fillRate: ((values.length / data.length) * 100).toFixed(1) + '%'
    };
  });
  
  return { ...stats, columnStats };
}
