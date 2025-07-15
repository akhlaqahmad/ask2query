import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDatabase } from "@/contexts/DatabaseContext";

interface ExampleQueriesProps {
  onSelectExample: (query: string) => void;
  onAutoGenerate: (query: string) => void;
  isLoading: boolean;
}

export function ExampleQueries({ onSelectExample, onAutoGenerate, isLoading }: ExampleQueriesProps) {
  const { isCustomDatabase, schema } = useDatabase();

  // Default examples for demo mode
  const defaultExamples = [
    {
      title: "Show all customers from USA",
      description: "Find customers in a specific country",
      query: "Show all customers from USA"
    },
    {
      title: "Find total revenue by product category", 
      description: "Calculate revenue grouped by category",
      query: "Find total revenue by product category"
    },
    {
      title: "List top 5 orders by amount",
      description: "Get highest value orders",
      query: "List top 5 orders by amount"
    },
    {
      title: "Show monthly sales trends",
      description: "Analyze sales over time",
      query: "Show monthly sales trends"
    },
    {
      title: "Find customers who haven't ordered recently",
      description: "Identify inactive customers",
      query: "Find customers who haven't ordered recently"
    }
  ];

  // Generic examples for custom databases
  const generateCustomExamples = () => {
    if (!schema || schema.tables.length === 0) return defaultExamples;
    
    const firstTable = schema.tables[0];
    const tableNames = schema.tables.map(t => t.name).slice(0, 3);
    
    return [
      {
        title: `Show all records from ${firstTable.name}`,
        description: "View all data in your main table",
        query: `Show all records from ${firstTable.name}`
      },
      {
        title: `Count records in each table`,
        description: "Get row counts for all tables",
        query: "Count records in each table"
      },
      {
        title: `Find unique values in ${firstTable.columns[0]?.name || 'first column'}`,
        description: "Get distinct values from a column",
        query: `Find unique values in ${firstTable.columns[0]?.name || 'column'}`
      },
      {
        title: `Show tables with most records`,
        description: "Compare table sizes",
        query: "Show tables with most records"
      },
      {
        title: `Describe the structure of ${tableNames.join(', ')}`,
        description: "Get schema information",
        query: `Describe the structure of ${tableNames.join(', ')}`
      }
    ];
  };

  const examples = isCustomDatabase ? generateCustomExamples() : defaultExamples;

  return (
    <div className="mt-12 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isCustomDatabase ? 'Example Queries for Your Database' : 'Try These Examples'}
        </h2>
        <p className="text-slate-400">
          {isCustomDatabase 
            ? 'Get started with these queries tailored to your uploaded database'
            : 'Click any example to auto-fill the input, or use "Generate SQL" to see results instantly'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Card key={index} className="bg-black/20 text-white border-white/10 hover:bg-white/10 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{example.title}</CardTitle>
              <CardDescription className="text-sm text-slate-400">{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">{example.query}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => {
                  onSelectExample(example.query);
                }}
                disabled={isLoading}
              >
                Select
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  onAutoGenerate(example.query);
                }}
                disabled={isLoading}
              >
                Generate SQL
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
