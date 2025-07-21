export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Basic Product Information
    {
      name: 'title',
      title: 'Product Title',
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
      type: 'array',
      of: [
        { type: 'string' }
      ],
      description: 'Product description - add multiple bullet points'
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
      title: 'Base Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
      description: 'Base price (usually 0 - pricing comes from materials)',
      initialValue: 0
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'EUR', value: 'EUR' },
          { title: 'USD', value: 'USD' },
          { title: 'GBP', value: 'GBP' }
        ]
      },
      initialValue: 'EUR'
    },
    {
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for filtering and search (e.g., bench, outdoor, custom)'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1),
      description: 'Select one or more categories for this product'
    },

    // Images
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

    // Product Variations
    {
      name: 'variations',
      title: 'Product Variations',
      type: 'object',
      fields: [
        // Styles
        {
          name: 'styles',
          title: 'Style Options',
          type: 'object',
          fields: [
            {
              name: 'required',
              title: 'Required Selection',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'options',
              title: 'Available Styles',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'id',
                      title: 'Style ID',
                      type: 'string',
                      validation: (Rule: any) => Rule.required()
                    },
                    {
                      name: 'name',
                      title: 'Style Name',
                      type: 'string',
                      validation: (Rule: any) => Rule.required()
                    },
                    {
                      name: 'description',
                      title: 'Style Description',
                      type: 'string'
                    },
                    {
                      name: 'image',
                      title: 'Style Image',
                      type: 'image'
                    },
                    {
                      name: 'measurements',
                      title: 'Style-Specific Measurements',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'id',
                              title: 'Measurement ID',
                              type: 'string',
                              validation: (Rule: any) => Rule.required()
                            },
                            {
                              name: 'name',
                              title: 'Measurement Name',
                              type: 'string',
                              validation: (Rule: any) => Rule.required()
                            },
                            {
                              name: 'required',
                              title: 'Required',
                              type: 'boolean',
                              initialValue: true
                            },
                            {
                              name: 'unit',
                              title: 'Unit',
                              type: 'string',
                              initialValue: 'inches'
                            },
                            {
                              name: 'placeholder',
                              title: 'Placeholder Text',
                              type: 'string'
                            },
                            {
                              name: 'type',
                              title: 'Input Type',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Number', value: 'number' },
                                  { title: 'Text', value: 'text' }
                                ]
                              },
                              initialValue: 'number'
                            }
                          ],
                          preview: {
                            select: {
                              title: 'name',
                              subtitle: 'unit'
                            },
                            prepare(selection: any) {
                              return {
                                title: selection.title,
                                subtitle: `Unit: ${selection.subtitle}`
                              }
                            }
                          }
                        }
                      ],
                      description: 'Custom measurements required for this specific style (overrides product-level measurements)'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'description',
                      media: 'image'
                    }
                  }
                }
              ]
            }
          ]
        },

        // Materials (now centralized)
        {
          name: 'materials',
          title: 'Available Materials',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'material' }]
            }
          ],
          validation: (Rule: any) => Rule.required().min(1),
          description: 'Select materials available for this product'
        },

        // Features
        {
          name: 'features',
          title: 'Feature Options',
          type: 'object',
          fields: [
            {
              name: 'tieDowns',
              title: 'Tie Down Options',
              type: 'object',
              fields: [
                {
                  name: 'required',
                  title: 'Required Selection',
                  type: 'boolean',
                  initialValue: true
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  initialValue: 'Tie Downs'
                },
                {
                  name: 'options',
                  title: 'Available Options',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'id',
                          title: 'Option ID',
                          type: 'string',
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          name: 'name',
                          title: 'Option Name',
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
                            subtitle: selection.subtitle === 0 ? 'Free' : `+€${selection.subtitle}`
                          }
                        }
                      }
                    }
                  ]
                }
              ],
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'splits',
              title: 'Cover Split Options',
              type: 'object',
              fields: [
                {
                  name: 'required',
                  title: 'Required Selection',
                  type: 'boolean',
                  initialValue: true
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  initialValue: 'Cover Splits'
                },
                {
                  name: 'options',
                  title: 'Available Options',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'id',
                          title: 'Option ID',
                          type: 'string',
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          name: 'name',
                          title: 'Option Name',
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
                      ]
                    }
                  ]
                }
              ],
              validation: (Rule: any) => Rule.required(),
              preview: {
                select: {
                  title: 'label',
                  options: 'options'
                },
                prepare(selection: any) {
                  return {
                    title: selection.title || 'Cover Splits',
                    subtitle: `${selection.options?.length || 0} options available`
                  }
                }
              }
            },
            {
              name: 'branding',
              title: 'Custom Branding Options',
              type: 'object',
              fields: [
                {
                  name: 'required',
                  title: 'Required Selection',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  initialValue: 'Custom Logo / Custom Text / Custom Image / Warning Labels'
                },
                {
                  name: 'options',
                  title: 'Available Options',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'id',
                          title: 'Option ID',
                          type: 'string',
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          name: 'name',
                          title: 'Option Name',
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
                      ]
                    }
                  ]
                }
              ],
              preview: {
                select: {
                  title: 'label',
                  options: 'options'
                },
                prepare(selection: any) {
                  return {
                    title: selection.title || 'Custom Branding',
                    subtitle: `${selection.options?.length || 0} options available`
                  }
                }
              }
            }
          ]
        }
      ],
      description: 'Product variations and options',
      validation: (Rule: any) => Rule.required()
    },



    // Measurement Tips
    {
      name: 'measurementTips',
      title: 'Measurement Guidelines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tips to help customers measure correctly'
    },

    // File Upload Requirements
    {
      name: 'fileUploads',
      title: 'File Upload Requirements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Upload ID',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'name',
              title: 'Upload Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'acceptedTypes',
              title: 'Accepted File Types',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                list: [
                  { title: 'JPEG Image', value: 'image/jpeg' },
                  { title: 'PNG Image', value: 'image/png' },
                  { title: 'GIF Image', value: 'image/gif' },
                  { title: 'PDF Document', value: 'application/pdf' }
                ]
              }
            },
            {
              name: 'maxSize',
              title: 'Maximum File Size',
              type: 'string',
              initialValue: '10MB'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'maxSize'
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: `Max: ${selection.subtitle}`
              }
            }
          }
        }
      ],
      description: 'File upload requirements for custom work'
    },

    // Special Requests
    {
      name: 'specialRequests',
      title: 'Special Requests Configuration',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Special Requests',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'placeholder',
          title: 'Placeholder Text',
          type: 'string',
          initialValue: 'Enter any special requests or additional information'
        }
      ]
    },

    // Product Status
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
      basePrice: 'basePrice',
      currency: 'currency',
      categories: 'categories'
    },
    prepare(selection: any) {
      const { title, media, basePrice, currency, categories } = selection
      const price = currency === 'EUR' ? `€${basePrice}` : `$${basePrice}`
      const categoryText = categories && categories.length > 0 ? 'Categorized' : 'No category'
      return {
        title: title,
        subtitle: `${categoryText} • Complex Product • ${price}`,
        media: media
      }
    }
  }
} 