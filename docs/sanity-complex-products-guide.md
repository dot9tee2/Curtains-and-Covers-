# Adding Products in Sanity CMS

Your Sanity backend has been optimized to focus exclusively on advanced product management. Every product uses the comprehensive configurator with advanced features like variations, measurements, and file uploads.

## Overview

### All Products Are Complex:
- **Advanced Configurator**: Every product gets the full configurator experience
- **Dynamic Pricing**: Material and feature-based pricing for all products
- **Professional Interface**: Step-by-step configuration for customers

## Getting Started

### 1. Access Sanity Studio
Navigate to your Sanity Studio (usually `localhost:3333` or your hosted studio URL)

### 2. Create a New Product
1. Click **"Products"** in the sidebar
2. Click **"Create new Product"**
3. You'll see the comprehensive product form

## Creating a Product

### Step 1: Basic Information
Fill out these essential fields:

```
Product Title: "Custom Bench Covers | Hand-Stitched"
Slug: Will auto-generate from title
SKU: "BENCH-COVER-001" (optional)
Description: Add multiple bullet points:
  - "Fully customized, personalized hand-stitched covers"
  - "Protection from dust, rain, snow, moisture, and Sun"
  - "Custom-made for residential and commercial benches"
  - "Equipped with tie-downs and splits with variety of colors"
  - "Heavy duty covers for long-term use with 2-5 years warranty"
Base Price: 0 (pricing comes from materials)
Currency: EUR
Tags: bench, park-bench, storage-bench, wooden-bench
Category: Select "Outdoor Furniture Covers"
```

### Step 2: Images
- **Main Image**: Upload the primary product image (REQUIRED)
- **Image Gallery**: Add 4-6 additional images showing different angles, styles, or examples

### Step 3: Product Variations (REQUIRED)

#### A. Style Options
```
Required Selection: ✅ Yes
Available Styles:
  Style 1:
    - Style ID: style1
    - Style Name: Style 1
    - Description: Standard bench cover
    - Image: Upload style image
  
  Style 2:
    - Style ID: style2
    - Style Name: Style 2  
    - Description: Storage bench cover with extended sides
    - Image: Upload style image
  
  (Continue for all 5 styles...)
```

#### B. Material Options (REQUIRED)
```
Required Selection: ✅ Yes
Available Materials:
  12oz PVC:
    - Material ID: 12oz-pvc
    - Material Name: PVC Coated Vinyl - 12oz
    - Additional Price: 134
    - Description: Medium weight, 100% waterproof, 3 years warranty
    - Image: Upload material swatch
    - Properties:
      - Weight: Medium weight
      - Warranty: 3 years
      - Use Case: Indoor/Outdoor, moderate weather conditions
      - Waterproof: ✅ Yes
      - UV Resistant: 100%
  
  18oz PVC:
    - Material ID: 18oz-pvc
    - Material Name: PVC Coated Vinyl - 18oz
    - Additional Price: 153.40
    - Description: Heavy weight, 100% waterproof, 5 years warranty
    - Image: Upload material swatch
    - Properties:
      - Weight: Heavy weight
      - Warranty: 5 years
      - Use Case: Outdoor, extreme weather conditions
      - Waterproof: ✅ Yes
      - UV Resistant: 100%
```

#### C. Color Options (REQUIRED)
```
Required Selection: ✅ Yes
Available Colors:
  Brown:
    - Color ID: brown
    - Color Name: Brown
    - Hex Code: #8B4513
    - Additional Price: 0
    - Image: Upload color swatch image
  
  Tan:
    - Color ID: tan
    - Color Name: Tan / Beige
    - Hex Code: #D2B48C
    - Additional Price: 0
    - Image: Upload color swatch image
  
  (Continue for all 8 colors: Brown, Tan, Blue, Gray, Black, White, Olive Green, Navy Blue)
```

#### D. Feature Options

**Tie Down Options (REQUIRED):**
```
Required Selection: ✅ Yes
Label: Tie Downs
Available Options:
  No Tie Down:
    - Option ID: none
    - Option Name: No Tie Down
    - Additional Price: 0
  
  Grommets with Draw-string:
    - Option ID: grommets-drawstring
    - Option Name: Grommets with Draw-string
    - Additional Price: 6.93
    - Description: Metal grommets with adjustable draw-string
  
  Draw-string Only:
    - Option ID: drawstring
    - Option Name: Draw-string
    - Additional Price: 5.78
    - Description: Adjustable draw-string closure
  
  (Continue for all tie-down options...)
```

**Cover Split Options (REQUIRED):**
```
Required Selection: ✅ Yes
Label: Cover Splits
Available Options:
  No Split:
    - Option ID: none
    - Option Name: No Split
    - Additional Price: 0
  
  Split with Velcro:
    - Option ID: velcro
    - Option Name: Split with Velcro
    - Additional Price: 6.93
    - Description: Velcro closure for easy access
  
  Split with Zipper:
    - Option ID: zipper
    - Option Name: Split with Zipper
    - Additional Price: 6.93
    - Description: Heavy-duty zipper closure
```

**Custom Branding Options (Optional):**
```
Required Selection: ❌ No (Optional)
Label: Custom Logo / Custom Text / Custom Image / Warning Labels
Available Options:
  No Branding:
    - Option ID: none
    - Option Name: No
    - Additional Price: 0
  
  Small Logo:
    - Option ID: small
    - Option Name: Up to 200 Sq/Inches
    - Additional Price: 34.65
    - Description: Custom logo or text up to 200 square inches
  
  (Continue for medium and large options...)
```

### Step 4: Measurements (REQUIRED)
Add required measurement fields:

```
Measurement 1:
  - Measurement ID: side1
  - Measurement Name: Side 1
  - Required: ✅ Yes
  - Unit: inches
  - Placeholder Text: Enter measurement
  - Input Type: Number

Measurement 2:
  - Measurement ID: side2
  - Measurement Name: Side 2
  - Required: ✅ Yes
  - Unit: inches
  - Placeholder Text: Enter measurement
  - Input Type: Number

(Continue for all 7 sides...)
```

### Step 5: Measurement Guidelines
Add helpful tips for customers:

```
- "Give exact measurement from edge to edge"
- "Don't provide extra inches in your measurement" 
- "We add 1\" to 1.5\" leeway on the given width/depth for easy pull-in and pull-out"
- "Air pockets are not available for covers with height below 15\""
```

### Step 6: File Upload Requirements (REQUIRED)

```
Main Image Upload:
  - Upload ID: main-image
  - Upload Name: Upload Image
  - Required: ✅ Yes
  - Accepted File Types: image/jpeg, image/png, image/gif
  - Maximum File Size: 10MB
  - Description: Upload an image of your item for custom fitting

Reference Image Upload:
  - Upload ID: reference-image
  - Upload Name: Upload Reference Image (Optional)
  - Required: ❌ No
  - Accepted File Types: image/jpeg, image/png, image/gif
  - Maximum File Size: 10MB
  - Description: Upload additional reference images if needed
```

### Step 7: Special Requests Configuration

```
Enable Special Requests: ✅ Yes
Placeholder Text: "Enter any special requests or additional information"
```

### Step 8: Product Status & SEO

```
Featured Product: ✅ Yes (if you want it on homepage)
In Stock: ✅ Yes

SEO Settings:
  Meta Title: "Custom Bench Covers | Hand-Stitched | Your Company"
  Meta Description: "Fully customized hand-stitched bench covers with 2-5 year warranty. Protection from weather with custom materials and colors."
  SEO Keywords: custom bench covers, outdoor furniture covers, waterproof covers
```

## Quick Setup Templates

### Template 1: Furniture Cover
```json
{
  "title": "Custom Outdoor Furniture Covers",
  "basePrice": 0,
  "currency": "EUR",
  "tags": ["furniture", "outdoor", "custom"],
  "variations": {
    "materials": {
      "required": true,
      "options": [
        {
          "id": "12oz-pvc",
          "name": "PVC Coated Vinyl - 12oz",
          "price": 134
        },
        {
          "id": "18oz-pvc", 
          "name": "PVC Coated Vinyl - 18oz",
          "price": 153.40
        }
      ]
    }
  }
}
```

### Template 2: Equipment Cover
```json
{
  "title": "Industrial Equipment Covers",
  "basePrice": 0,
  "currency": "EUR",
  "tags": ["industrial", "equipment", "heavy-duty"],
  "variations": {
    "materials": {
      "required": true,
      "options": [
        {
          "id": "22oz-pvc",
          "name": "PVC Coated Vinyl - 22oz",
          "price": 180,
          "properties": {
            "weight": "Heavy weight",
            "warranty": "5 years"
          }
        }
      ]
    }
  }
}
```

## Testing Your Product

1. **Save & Publish** your product in Sanity
2. **Navigate** to `/product/your-product-slug` on your website
3. **Verify** that:
   - All variations appear correctly
   - Pricing calculates dynamically
   - Required fields show validation
   - File uploads work
   - Measurement form displays
   - Step-by-step configurator works

## Best Practices

### Organization
- **Use consistent IDs**: Keep option IDs short and descriptive
- **Group related options**: Use logical groupings for materials and features
- **Clear descriptions**: Write customer-friendly descriptions

### Pricing Strategy
- **Base price**: Usually 0 for all products
- **Material pricing**: Set realistic prices based on material costs
- **Feature pricing**: Price add-ons appropriately

### Images
- **High quality**: Use high-resolution images (1200px minimum)
- **Consistent style**: Maintain consistent lighting and backgrounds
- **Multiple angles**: Show products from various perspectives

### Testing
- **Preview mode**: Always test in preview before publishing
- **Price calculation**: Verify all pricing combinations work
- **Required fields**: Test validation for required selections

## Troubleshooting

### Common Issues

**Q: Variations not showing**
A: Ensure you've set `required: true` and added options array for materials and colors

**Q: Pricing not calculating**
A: Check that material options have `price` field set

**Q: Images not displaying**
A: Verify images are uploaded and have proper alt text

**Q: Measurements not saving**
A: Ensure measurement IDs are unique and contain no special characters

**Q: Configurator not loading**
A: Verify all required fields (variations, measurements, fileUploads) are properly configured

## System Benefits

### Simplified Management
- **Single product type** - No confusion between product types
- **Consistent interface** - Every product gets the same professional treatment
- **Unified pricing** - Same pricing model for all products

### Professional Customer Experience
- **Advanced configurator** - Every product gets step-by-step configuration
- **Real-time pricing** - Immediate feedback on all selections
- **File upload support** - Professional custom fitting process
- **Comprehensive validation** - Ensures complete configurations

This simplified system ensures every product in your catalog gets the professional, advanced configurator treatment that your customers expect! 