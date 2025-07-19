import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom components for markdown elements
const markdownComponents: Components = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0 border-b border-slate-700 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-white mb-4 mt-6 border-b border-slate-700 pb-1">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-white mb-3 mt-5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-slate-200 mb-2 mt-4">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base font-semibold text-slate-200 mb-2 mt-3">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-semibold text-slate-300 mb-2 mt-3">
      {children}
    </h6>
  ),

  // Paragraphs and text
  p: ({ children }) => (
    <p className="text-slate-300 leading-relaxed mb-4">
      {children}
    </p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="text-slate-300 mb-4 space-y-1 list-disc list-inside pl-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-slate-300 mb-4 space-y-1 list-decimal list-inside pl-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-slate-300">
      {children}
    </li>
  ),

  // Links
  a: ({ href, children }) => (
    <a 
      href={href}
      className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // Code blocks and inline code
  code: ({ className, children, ...props }: any) => {
    const isInline = !className?.includes('language-');
    if (isInline) {
      return (
        <code 
          className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code 
        className={`block bg-slate-900 text-slate-200 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4 ${className || ''}`}
        {...props}
      >
        {children}
      </code>
    );
  },

  pre: ({ children }) => (
    <div className="mb-4">
      {children}
    </div>
  ),

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-slate-800/50 italic text-slate-300">
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-700">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="bg-slate-800/50">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-slate-700">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left text-white font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-slate-300">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="border-slate-700 my-6" />
  ),

  // Images
  img: ({ src, alt }) => (
    <img 
      src={src} 
      alt={alt}
      className="max-w-full h-auto rounded-lg mb-4 border border-slate-700"
    />
  ),

  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="text-white font-semibold">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="text-slate-200 italic">
      {children}
    </em>
  ),
};

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
