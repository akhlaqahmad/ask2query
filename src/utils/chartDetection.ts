
export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'area' | 'none';
  data: any[];
  xAxis: string;
  yAxis: string;
  title: string;
}

export interface ColumnInfo {
  name: string;
  type: 'number' | 'date' | 'text' | 'boolean';
  nullCount: number;
  uniqueCount: number;
  sampleValues: any[];
}

export function analyzeColumns(columns: string[], values: any[][]): ColumnInfo[] {
  return columns.map((column, index) => {
    const columnValues = values.map(row => row[index]).filter(val => val !== null && val !== undefined);
    const uniqueValues = new Set(columnValues);
    
    // Detect data type
    let type: ColumnInfo['type'] = 'text';
    
    if (columnValues.length > 0) {
      // Check if numeric
      const numericValues = columnValues.filter(val => !isNaN(Number(val)) && val !== '');
      if (numericValues.length / columnValues.length > 0.8) {
        type = 'number';
      }
      // Check if date
      else if (columnValues.some(val => !isNaN(Date.parse(String(val))))) {
        const dateValues = columnValues.filter(val => !isNaN(Date.parse(String(val))));
        if (dateValues.length / columnValues.length > 0.5) {
          type = 'date';
        }
      }
      // Check if boolean
      else if (uniqueValues.size <= 2 && 
               Array.from(uniqueValues).every(val => 
                 ['true', 'false', '1', '0', 'yes', 'no', true, false, 1, 0].includes(val)
               )) {
        type = 'boolean';
      }
    }
    
    return {
      name: column,
      type,
      nullCount: values.length - columnValues.length,
      uniqueCount: uniqueValues.size,
      sampleValues: Array.from(uniqueValues).slice(0, 5)
    };
  });
}

export function detectChartType(columns: string[], values: any[][], columnInfo: ColumnInfo[]): ChartData {
  if (values.length === 0 || columns.length < 2) {
    return { type: 'none', data: [], xAxis: '', yAxis: '', title: 'No data available' };
  }
  
  const numericColumns = columnInfo.filter(col => col.type === 'number');
  const textColumns = columnInfo.filter(col => col.type === 'text');
  const dateColumns = columnInfo.filter(col => col.type === 'date');
  
  // Time series: date column + numeric column
  if (dateColumns.length >= 1 && numericColumns.length >= 1) {
    const dateCol = dateColumns[0];
    const numericCol = numericColumns[0];
    const dateIndex = columns.indexOf(dateCol.name);
    const numericIndex = columns.indexOf(numericCol.name);
    
    const chartData = values
      .filter(row => row[dateIndex] !== null && row[numericIndex] !== null)
      .map(row => ({
        [dateCol.name]: new Date(row[dateIndex]).toLocaleDateString(),
        [numericCol.name]: Number(row[numericIndex])
      }))
      .sort((a, b) => new Date(a[dateCol.name]).getTime() - new Date(b[dateCol.name]).getTime());
    
    return {
      type: 'line',
      data: chartData,
      xAxis: dateCol.name,
      yAxis: numericCol.name,
      title: `${numericCol.name} over ${dateCol.name}`
    };
  }
  
  // Categorical: text column + numeric column
  if (textColumns.length >= 1 && numericColumns.length >= 1) {
    const textCol = textColumns[0];
    const numericCol = numericColumns[0];
    const textIndex = columns.indexOf(textCol.name);
    const numericIndex = columns.indexOf(numericCol.name);
    
    // Group by category and sum values
    const grouped = values.reduce((acc, row) => {
      const category = String(row[textIndex] || 'Unknown');
      const value = Number(row[numericIndex]) || 0;
      acc[category] = (acc[category] || 0) + value;
      return acc;
    }, {} as Record<string, number>);
    
    const chartData = Object.entries(grouped)
      .map(([category, value]) => ({
        [textCol.name]: category,
        [numericCol.name]: value
      }))
      .sort((a, b) => b[numericCol.name] - a[numericCol.name])
      .slice(0, 10); // Limit to top 10 categories
    
    return {
      type: chartData.length <= 5 ? 'pie' : 'bar',
      data: chartData,
      xAxis: textCol.name,
      yAxis: numericCol.name,
      title: `${numericCol.name} by ${textCol.name}`
    };
  }
  
  // Simple numeric distribution
  if (numericColumns.length >= 1) {
    const numericCol = numericColumns[0];
    const numericIndex = columns.indexOf(numericCol.name);
    
    const numericValues = values
      .map(row => Number(row[numericIndex]))
      .filter(val => !isNaN(val))
      .sort((a, b) => a - b);
    
    if (numericValues.length > 0) {
      // Create histogram bins
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      const binCount = Math.min(10, Math.ceil(Math.sqrt(numericValues.length)));
      const binSize = (max - min) / binCount;
      
      const bins = Array.from({ length: binCount }, (_, i) => ({
        range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        count: 0
      }));
      
      numericValues.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
        bins[binIndex].count++;
      });
      
      return {
        type: 'bar',
        data: bins,
        xAxis: 'range',
        yAxis: 'count',
        title: `Distribution of ${numericCol.name}`
      };
    }
  }
  
  return { type: 'none', data: [], xAxis: '', yAxis: '', title: 'No suitable chart type detected' };
}
