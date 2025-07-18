'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-blue-50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  a: ({ children, href, ...props }: any) => (
    <Link href={href} className="text-blue-600 hover:text-blue-800 underline" {...props}>
      {children}
    </Link>
  ),
  hr: ({ ...props }: any) => (
    <hr className="my-8 border-gray-300" {...props} />
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-gray-300" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-gray-300 px-4 py-2" {...props}>
      {children}
    </td>
  ),
}

interface MDXContentProps {
  content: string
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
} 