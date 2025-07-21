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
      description: 'Image showing the material texture/pattern'
    },
    // Properties field for material characteristics
    {
      name: 'properties',
      title: 'Properties',
      type: 'object',
      fields: [
        {
          name: 'weight',
          title: 'Weight',
          type: 'string',
          description: 'e.g., "Heavy duty", "Lightweight", "Medium weight"'
        },
        {
          name: 'waterproof',
          title: 'Waterproof',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'waterResistant',
          title: 'Water Resistant',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'uvResistant',
          title: 'UV Resistant',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'tearResistant',
          title: 'Tear Resistant',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'abrasionResistant',
          title: 'Abrasion Resistant',
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
          title: 'Warranty',
          type: 'string',
          description: 'e.g., "5 years", "Lifetime"'
        },
        {
          name: 'useCase',
          title: 'Use Case',
          type: 'string',
          description: 'e.g., "Outdoor furniture", "Indoor use only", "Commercial"'
        }
      ],
      description: 'Material properties and characteristics'
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
            },
            {
              name: 'price',
              title: 'Additional Price',
              type: 'number',
              initialValue: 0,
              description: 'Additional cost for this color (if any)'
            },
            {
              name: 'inStock',
              title: 'In Stock',
              type: 'boolean',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'hex',
              media: 'image'
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: selection.image
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1),
      description: 'Colors available for this material'
    },
    {
      name: 'featured',
      title: 'Featured Material',
      type: 'boolean',
      initialValue: false,
      description: 'Show this material prominently in material selection'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this material is available for selection'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'multiplier',
      media: 'image'
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `${selection.subtitle}x multiplier`,
        media: selection.image
      }
    }
  }
} 