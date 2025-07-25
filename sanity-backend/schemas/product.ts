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
                              validation: (Rule: any) => Rule.required(),
                              description: 'Unique identifier (e.g., panel1_width, corner_radius)'
                            },
                            {
                              name: 'name',
                              title: 'Display Name',
                              type: 'string',
                              validation: (Rule: any) => Rule.required(),
                              description: 'What customer sees (e.g., "Panel 1 Width", "Corner Radius")'
                            },
                            {
                              name: 'group',
                              title: 'Measurement Group',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Main Dimensions', value: 'main' },
                                  { title: 'Panel 1', value: 'panel1' },
                                  { title: 'Panel 2', value: 'panel2' },
                                  { title: 'Panel 3', value: 'panel3' },
                                  { title: 'Panel 4', value: 'panel4' },
                                  { title: 'Corners & Curves', value: 'corners' },
                                  { title: 'Hardware Placement', value: 'hardware' },
                                  { title: 'Special Features', value: 'special' },
                                  { title: 'Installation Details', value: 'installation' }
                                ]
                              },
                              initialValue: 'main',
                              description: 'Group related measurements together'
                            },
                            {
                              name: 'order',
                              title: 'Display Order',
                              type: 'number',
                              initialValue: 1,
                              description: 'Order within the group (1, 2, 3...)'
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
                              options: {
                                list: [
                                  { title: 'Inches', value: 'inches' },
                                  { title: 'Feet', value: 'feet' },
                                  { title: 'Centimeters', value: 'cm' },
                                  { title: 'Meters', value: 'meters' },
                                  { title: 'Degrees', value: 'degrees' }
                                ]
                              },
                              initialValue: 'inches'
                            },
                            {
                              name: 'type',
                              title: 'Input Type',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Number', value: 'number' },
                                  { title: 'Text', value: 'text' },
                                  { title: 'Dropdown', value: 'select' }
                                ]
                              },
                              initialValue: 'number'
                            },
                            {
                              name: 'role',
                              title: 'Calculation Role',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Width/Length', value: 'width' },
                                  { title: 'Height/Drop', value: 'height' },
                                  { title: 'Diameter', value: 'diameter' },
                                  { title: 'Radius', value: 'radius' },
                                  { title: 'Side Measurement', value: 'side' },
                                  { title: 'Angle', value: 'angle' },
                                  { title: 'Curve', value: 'curve' },
                                  { title: 'Offset', value: 'offset' },
                                  { title: 'Other', value: 'other' }
                                ]
                              },
                              description: 'How this measurement affects area calculation'
                            },
                            {
                              name: 'placeholder',
                              title: 'Placeholder Text',
                              type: 'string',
                              description: 'Helpful example (e.g., "Enter width in inches")'
                            },
                            {
                              name: 'helpText',
                              title: 'Help Text',
                              type: 'text',
                              description: 'Detailed instructions for this specific measurement'
                            },
                            {
                              name: 'defaultValue',
                              title: 'Default Value',
                              type: 'number',
                              description: 'Default value for this measurement (optional)'
                            },
                            {
                              name: 'minValue',
                              title: 'Minimum Value',
                              type: 'number',
                              description: 'Minimum allowed value'
                            },
                            {
                              name: 'maxValue',
                              title: 'Maximum Value',
                              type: 'number',
                              description: 'Maximum allowed value'
                            },
                            {
                              name: 'dependsOn',
                              title: 'Depends On',
                              type: 'string',
                              description: 'Show only if another measurement has a specific value'
                            },
                            {
                              name: 'options',
                              title: 'Dropdown Options',
                              type: 'array',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    {
                                      name: 'label',
                                      title: 'Label',
                                      type: 'string',
                                      validation: (Rule: any) => Rule.required()
                                    },
                                    {
                                      name: 'value',
                                      title: 'Value',
                                      type: 'string',
                                      validation: (Rule: any) => Rule.required()
                                    }
                                  ]
                                }
                              ],
                              hidden: ({ parent }: { parent: any }) => parent?.type !== 'select'
                            }
                          ],
                          preview: {
                            select: {
                              title: 'name',
                              subtitle: 'group',
                              description: 'required'
                            },
                            prepare(selection: any) {
                              return {
                                title: selection.title,
                                subtitle: `${selection.subtitle} ${selection.description ? '(Required)' : '(Optional)'}`
                              }
                            }
                          }
                        }
                      ],
                      description: 'All measurements required for this style - supports complex products with many measurements'
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

    // Default Configuration
    {
      name: 'defaultConfiguration',
      title: 'Default Configuration',
      type: 'object',
      description: 'Default selections to show customers a starting price',
      fields: [
        {
          name: 'defaultMaterial',
          title: 'Default Material',
          type: 'string', 
          description: 'Material ID to select by default (most popular option)'
        },
        {
          name: 'defaultColor',
          title: 'Default Color', 
          type: 'string',
          description: 'Color ID to select by default'
        },
        {
          name: 'defaultStyle',
          title: 'Default Style',
          type: 'string',
          description: 'Style ID to select by default'
        },
        {
          name: 'defaultMeasurements',
          title: 'Default Measurements',
          type: 'object',
          description: 'Typical measurements for this product (e.g., 6ft x 4ft)',
          fields: [
            {
              name: 'width',
              title: 'Default Width',
              type: 'number',
              description: 'Default width in inches',
              initialValue: 72
            },
            {
              name: 'height', 
              title: 'Default Height',
              type: 'number',
              description: 'Default height in inches',
              initialValue: 48
            },
            {
              name: 'customMeasurements',
              title: 'Custom Default Measurements',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'measurementId',
                      title: 'Measurement ID',
                      type: 'string',
                      description: 'Must match a measurement ID from style options'
                    },
                    {
                      name: 'value',
                      title: 'Default Value',
                      type: 'number'
                    }
                  ]
                }
              ],
              description: 'Default values for specific measurements'
            }
          ]
        },
        {
          name: 'showDefaultPrice',
          title: 'Show Default Price',
          type: 'boolean',
          initialValue: true,
          description: 'Whether to show default pricing immediately'
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
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
        subtitle: `${categoryText} • Enhanced Product • ${price}`,
        media: media
      }
    }
  }
}