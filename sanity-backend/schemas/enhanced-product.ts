export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Product SKU for inventory tracking'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for product cards'
    },
    {
      name: 'basePrice',
      title: 'Base Price (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' }
        ]
      },
      initialValue: 'USD'
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Simple Product', value: 'simple' },
          { title: 'Complex Product', value: 'complex' }
        ]
      },
      initialValue: 'simple',
      description: 'Simple products use basic form, Complex products use advanced configurator'
    },
    {
      name: 'materials',
      title: 'Available Materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Material Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'multiplier',
              title: 'Price Multiplier',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0.1).max(10),
              initialValue: 1.0,
              description: 'e.g., 1.5 = 50% price increase'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'multiplier'
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: `${selection.subtitle}x multiplier`
              }
            }
          }
        }
      ]
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Color Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'hex',
              title: 'Hex Code',
              type: 'string',
              validation: (Rule: any) => Rule.regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color code')
            },
            {
              name: 'image',
              title: 'Color Swatch Image',
              type: 'image',
              description: 'Optional: Upload actual color swatch image'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'hex',
              media: 'image'
            }
          }
        }
      ]
    },
    {
      name: 'addons',
      title: 'Available Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Add-on Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'price',
              title: 'Additional Price',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price'
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: `+$${selection.subtitle}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for filtering and search'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      description: 'Additional product images'
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'minWidth',
      title: 'Minimum Width (inches)',
      type: 'number',
      initialValue: 12,
      description: 'Minimum allowed width for custom sizing'
    },
    {
      name: 'maxWidth',
      title: 'Maximum Width (inches)',
      type: 'number',
      initialValue: 120,
      description: 'Maximum allowed width for custom sizing'
    },
    {
      name: 'minHeight',
      title: 'Minimum Height (inches)',
      type: 'number',
      initialValue: 12,
      description: 'Minimum allowed height for custom sizing'
    },
    {
      name: 'maxHeight',
      title: 'Maximum Height (inches)',
      type: 'number',
      initialValue: 120,
      description: 'Maximum allowed height for custom sizing'
    },
    // SEO Fields
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule: any) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category.title',
      productType: 'productType',
      basePrice: 'basePrice'
    },
    prepare(selection: any) {
      const { title, media, category, productType, basePrice } = selection
      return {
        title: title,
        subtitle: `${category || 'No category'} • ${productType} • $${basePrice}`,
        media: media
      }
    }
  }
} 