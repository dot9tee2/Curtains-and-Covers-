export default {
  name: 'material',
  title: 'Material',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Material Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the material and its properties'
    },
    {
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text description with detailed material information'
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
      name: 'image',
      title: 'Material Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Primary image showing the material texture/pattern'
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
      description: 'Additional images showcasing the material in different contexts'
    },
    // Category and Tags for better organization
    {
      name: 'category',
      title: 'Material Category',
      type: 'string',
      options: {
        list: [
          {title: 'Canvas', value: 'canvas'},
          {title: 'Vinyl', value: 'vinyl'},
          {title: 'Polyester', value: 'polyester'},
          {title: 'Acrylic', value: 'acrylic'},
          {title: 'Mesh', value: 'mesh'},
          {title: 'Marine Grade', value: 'marine'},
          {title: 'Awning Fabric', value: 'awning'},
          {title: 'Tarpaulin', value: 'tarpaulin'},
          {title: 'Specialty', value: 'specialty'}
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Keywords for better searchability (e.g., outdoor, heavy-duty, commercial)'
    },
    // Technical Specifications
    {
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        {
          name: 'composition',
          title: 'Material Composition',
          type: 'string',
          description: 'e.g., "100% Solution Dyed Acrylic", "Vinyl/Polyester Blend"'
        },
        {
          name: 'weight',
          title: 'Weight (GSM)',
          type: 'number',
          description: 'Grams per square meter'
        },
        {
          name: 'thickness',
          title: 'Thickness (mm)',
          type: 'number',
          description: 'Material thickness in millimeters'
        },
        {
          name: 'width',
          title: 'Available Width (cm)',
          type: 'array',
          of: [{type: 'number'}],
          description: 'Available fabric widths in centimeters'
        },
        {
          name: 'finish',
          title: 'Surface Finish',
          type: 'string',
          options: {
            list: [
              {title: 'Matte', value: 'matte'},
              {title: 'Glossy', value: 'glossy'},
              {title: 'Semi-Gloss', value: 'semi-gloss'},
              {title: 'Textured', value: 'textured'},
              {title: 'Embossed', value: 'embossed'}
            ]
          }
        },
        {
          name: 'breathability',
          title: 'Breathability',
          type: 'string',
          options: {
            list: [
              {title: 'Non-breathable', value: 'non-breathable'},
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'}
            ]
          }
        }
      ],
      description: 'Detailed technical specifications of the material'
    },
    // Enhanced Properties with ratings
    {
      name: 'properties',
      title: 'Material Properties',
      type: 'object',
      fields: [
        {
          name: 'weightCategory',
          title: 'Weight Category',
          type: 'string',
          options: {
            list: [
              {title: 'Lightweight', value: 'lightweight'},
              {title: 'Medium Weight', value: 'medium'},
              {title: 'Heavy Duty', value: 'heavy'},
              {title: 'Extra Heavy Duty', value: 'extra-heavy'}
            ]
          }
        },
        {
          name: 'waterproofRating',
          title: 'Waterproof Rating (1-5)',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(5),
          description: '1 = Not waterproof, 5 = Completely waterproof'
        },
        {
          name: 'uvResistanceRating',
          title: 'UV Resistance Rating (1-5)',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(5),
          description: '1 = Poor UV resistance, 5 = Excellent UV resistance'
        },
        {
          name: 'tearStrength',
          title: 'Tear Strength Rating (1-5)',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(5),
          description: '1 = Low tear resistance, 5 = Very high tear resistance'
        },
        {
          name: 'abrasionResistance',
          title: 'Abrasion Resistance (1-5)',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(5),
          description: '1 = Low abrasion resistance, 5 = Very high abrasion resistance'
        },
        {
          name: 'temperatureResistance',
          title: 'Temperature Resistance',
          type: 'object',
          fields: [
            {
              name: 'minTemp',
              title: 'Minimum Temperature (°C)',
              type: 'number'
            },
            {
              name: 'maxTemp',
              title: 'Maximum Temperature (°C)',
              type: 'number'
            }
          ]
        },
        {
          name: 'fireRetardant',
          title: 'Fire Retardant',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'antimicrobial',
          title: 'Antimicrobial Treatment',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'antiStatic',
          title: 'Anti-Static',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'pvcCoated',
          title: 'PVC Coated',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'wipeClean',
          title: 'Wipe Clean',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'warranty',
          title: 'Warranty Period',
          type: 'string',
          description: 'e.g., "5 years", "10 years", "Lifetime"'
        },
        {
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Industry certifications (e.g., GREENGUARD, OEKO-TEX, ISO 9001)'
        }
      ],
      description: 'Material properties and performance characteristics'
    },
    // Care and Maintenance
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'object',
      fields: [
        {
          name: 'cleaning',
          title: 'Cleaning Instructions',
          type: 'text',
          rows: 3,
          description: 'How to clean and maintain the material'
        },
        {
          name: 'storage',
          title: 'Storage Recommendations',
          type: 'text',
          rows: 2,
          description: 'How to store the material when not in use'
        },
        {
          name: 'washable',
          title: 'Machine Washable',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'dryCleanOnly',
          title: 'Dry Clean Only',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'bleachSafe',
          title: 'Bleach Safe',
          type: 'boolean',
          initialValue: false
        }
      ],
      description: 'Care and maintenance guidelines'
    },
    // Sustainability Information
    {
      name: 'sustainability',
      title: 'Sustainability',
      type: 'object',
      fields: [
        {
          name: 'recyclable',
          title: 'Recyclable',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'recycledContent',
          title: 'Recycled Content (%)',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
          description: 'Percentage of recycled materials used'
        },
        {
          name: 'biodegradable',
          title: 'Biodegradable',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'ecoFriendly',
          title: 'Eco-Friendly Manufacturing',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'carbonFootprint',
          title: 'Carbon Footprint Rating',
          type: 'string',
          options: {
            list: [
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'}
            ]
          }
        },
        {
          name: 'sustainabilityCertifications',
          title: 'Sustainability Certifications',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Environmental certifications (e.g., GREENGUARD, Cradle to Cradle)'
        }
      ],
      description: 'Environmental impact and sustainability information'
    },
    // Applications and Use Cases
    {
      name: 'applications',
      title: 'Applications',
      type: 'object',
      fields: [
        {
          name: 'recommended',
          title: 'Recommended Uses',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Best applications for this material'
        },
        {
          name: 'notRecommended',
          title: 'Not Recommended For',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Applications where this material is not suitable'
        },
        {
          name: 'indoorUse',
          title: 'Indoor Use',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'outdoorUse',
          title: 'Outdoor Use',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'commercialGrade',
          title: 'Commercial Grade',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'marineUse',
          title: 'Marine Use',
          type: 'boolean',
          initialValue: false
        }
      ],
      description: 'Suitable applications and use cases'
    },
    // Supplier and Availability
    {
      name: 'supplier',
      title: 'Supplier Information',
      type: 'object',
      fields: [
        {
          name: 'supplierName',
          title: 'Supplier Name',
          type: 'string'
        },
        {
          name: 'supplierCode',
          title: 'Supplier Product Code',
          type: 'string'
        },
        {
          name: 'leadTime',
          title: 'Lead Time',
          type: 'string',
          description: 'e.g., "In Stock", "2-3 weeks", "Special Order"'
        },
        {
          name: 'minimumOrder',
          title: 'Minimum Order Quantity',
          type: 'number',
          description: 'Minimum meters/yards required'
        },
        {
          name: 'stockLevel',
          title: 'Current Stock Level',
          type: 'string',
          options: {
            list: [
              {title: 'In Stock', value: 'in-stock'},
              {title: 'Low Stock', value: 'low-stock'},
              {title: 'Out of Stock', value: 'out-of-stock'},
              {title: 'Special Order', value: 'special-order'}
            ]
          }
        }
      ],
      description: 'Supplier and availability information'
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
              name: 'colorCode',
              title: 'Manufacturer Color Code',
              type: 'string',
              description: 'Official color code from manufacturer'
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
              description: 'Actual color swatch image'
            },
            {
              name: 'price',
              title: 'Additional Price',
              type: 'number',
              initialValue: 0,
              description: 'Additional cost for this color (if any)'
            },
            {
              name: 'popularity',
              title: 'Popularity Rating (1-5)',
              type: 'number',
              validation: (Rule: any) => Rule.min(1).max(5),
              description: 'How popular this color is with customers'
            },
            {
              name: 'fastness',
              title: 'Color Fastness Rating (1-5)',
              type: 'number',
              validation: (Rule: any) => Rule.min(1).max(5),
              description: 'How well the color resists fading'
            },
            {
              name: 'inStock',
              title: 'In Stock',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'seasonal',
              title: 'Seasonal Color',
              type: 'boolean',
              initialValue: false,
              description: 'Limited availability seasonal color'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'colorCode',
              media: 'image'
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: selection.subtitle || selection.hex,
                media: selection.image
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.custom((colors: any[], context: any) => {
        const hasColors = context.document?.hasColors
        if (hasColors === false) {
          // If material doesn't have colors, colors array should be empty or undefined
          return true
        }
        // If material has colors, require at least one color
        if (!colors || colors.length === 0) {
          return 'At least one color is required for materials with colors'
        }
        return true
      }),
      description: 'Colors available for this material (leave empty for clear/transparent materials)',
      hidden: ({ document }: any) => document?.hasColors === false
    },
    // Has Colors Field
    {
      name: 'hasColors',
      title: 'Has Colors',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false for clear/transparent materials that don\'t have color options'
    },
    // SEO and Marketing
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: (Rule: any) => Rule.max(160),
          description: 'SEO meta description (max 160 characters)'
        },
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Keywords for search engine optimization'
        },
        {
          name: 'featured',
          title: 'Featured Material',
          type: 'boolean',
          initialValue: false,
          description: 'Show this material prominently in material selection'
        },
        {
          name: 'newProduct',
          title: 'New Product',
          type: 'boolean',
          initialValue: false,
          description: 'Mark as new for promotional purposes'
        },
        {
          name: 'bestseller',
          title: 'Bestseller',
          type: 'boolean',
          initialValue: false,
          description: 'Mark as bestseller for promotional purposes'
        }
      ],
      description: 'SEO and marketing information'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this material is available for selection'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this material (lower numbers first)'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Popularity',
      name: 'popularity',
      by: [
        {field: 'seo.featured', direction: 'desc'},
        {field: 'seo.bestseller', direction: 'desc'},
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'multiplier',
      media: 'image'
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `${selection.subtitle} • ${selection.description}x multiplier`,
        media: selection.media
      }
    }
  }
} 