import { PortableText as BasePortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'
import { SanityImage } from '@/types/sanity'

// Custom components for rendering different portable text elements
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      return (
        <div className="my-8">
          <Image
            src={urlForImage(value).width(800).height(600).url()}
            alt="Blog post image"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>
      )
    },
  },
  block: {
    // Customize heading styles
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        {children}
      </h4>
    ),
    // Normal paragraph
    normal: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
    // Block quote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bulleted lists
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-1">{children}</li>
    ),
  },
  marks: {
    // Strong/bold text
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    // Emphasized/italic text
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    // Code text
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Links
    link: ({ children, value }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:text-primary-dark underline"
        >
          {children}
        </a>
      )
    },
  },
}

interface PortableTextProps {
  content: any[]
}

export default function PortableText({ content }: PortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <BasePortableText value={content} components={components} />
    </div>
  )
} 