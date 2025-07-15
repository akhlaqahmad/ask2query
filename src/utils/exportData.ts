
export function downloadJSON(data: any, filename: string = 'query-results.json') {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCSV(columns: string[], values: any[][], filename: string = 'query-results.csv') {
  const csvContent = [
    columns.join(','),
    ...values.map(row => 
      row.map(cell => {
        const cellStr = cell === null || cell === undefined ? '' : String(cell);
        return cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n') 
          ? `"${cellStr.replace(/"/g, '""')}"` 
          : cellStr;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
}

export function formatTableAsText(columns: string[], values: any[][]) {
  if (values.length === 0) return columns.join('\t');
  
  return [
    columns.join('\t'),
    ...values.map(row => 
      row.map(cell => cell === null || cell === undefined ? 'NULL' : String(cell)).join('\t')
    )
  ].join('\n');
}
