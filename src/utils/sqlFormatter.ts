
export function formatSQL(sql: string): string {
  if (!sql || typeof sql !== 'string') return '';
  
  // Clean up the SQL first
  let formatted = sql.trim();
  
  // Replace multiple spaces with single space
  formatted = formatted.replace(/\s+/g, ' ');
  
  // Add line breaks after major SQL keywords
  const majorKeywords = [
    'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 
    'ORDER BY', 'LIMIT', 'OFFSET', 'UNION', 'EXCEPT', 'INTERSECT'
  ];
  
  majorKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${keyword}`);
  });
  
  // Add line breaks for JOIN clauses
  const joinTypes = ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN'];
  joinTypes.forEach(join => {
    const regex = new RegExp(`\\b${join}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${join}`);
  });
  
  // Add line breaks for logical operators in WHERE clauses
  formatted = formatted.replace(/\b(AND|OR)\b/gi, '\n  $1');
  
  // Split into lines and add proper indentation
  const lines = formatted.split('\n').filter(line => line.trim());
  const indentedLines = lines.map((line, index) => {
    const trimmed = line.trim();
    
    // No indentation for main clauses
    if (/^(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|OFFSET|UNION|EXCEPT|INTERSECT)/i.test(trimmed)) {
      return trimmed;
    }
    
    // Single indentation for JOIN clauses
    if (/^(JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|CROSS JOIN)/i.test(trimmed)) {
      return `  ${trimmed}`;
    }
    
    // Double indentation for AND/OR in WHERE clauses
    if (/^(AND|OR)/i.test(trimmed)) {
      return `    ${trimmed}`;
    }
    
    // Single indentation for other clauses
    return `  ${trimmed}`;
  });
  
  return indentedLines.join('\n');
}

export function highlightSQLKeywords(sql: string): string {
  // This function is used for basic highlighting in non-syntax-highlighter contexts
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS',
    'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'ON', 'AND', 'OR',
    'IN', 'NOT', 'NULL', 'IS', 'LIKE', 'BETWEEN', 'EXISTS', 'UNION', 'DISTINCT',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
  ];
  
  let highlighted = sql;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="sql-keyword">${keyword.toUpperCase()}</span>`);
  });
  
  return highlighted;
}
