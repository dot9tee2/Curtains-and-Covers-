# Sample Product: Custom Cover with Style-Specific Measurements

## Product Configuration Example

### Product: Custom Boat Cover
**Base Price:** €0 (custom pricing based on materials and features)

### Product-Level Measurements
**None** - All measurements are now handled at the style level

### Style Options with Different Measurements

#### Style A: Standard Rectangular Cover
**Style ID:** `standard-rectangular`
**Style Name:** Standard Rectangular Cover
**Description:** Traditional rectangular cover with standard measurements
**Style-Specific Measurements:**
- Length (inches) - Required
- Width (inches) - Required
- Height (inches) - Required

#### Style B: Custom Shape Cover
**Style ID:** `custom-shape`
**Style Name:** Custom Shape Cover
**Description:** Cover for irregular shapes requiring multiple side measurements
**Style-Specific Measurements:**
- Side 1 (inches) - Required
- Side 2 (inches) - Required
- Side 3 (inches) - Required
- Side 4 (inches) - Required
- Side 5 (inches) - Required

#### Style C: Round Cover
**Style ID:** `round`
**Style Name:** Round Cover
**Description:** Circular cover requiring diameter measurement
**Style-Specific Measurements:**
- Diameter (inches) - Required
- Height (inches) - Required

#### Style D: No Measurements Required
**Style ID:** `standard-size`
**Style Name:** Standard Size Cover
**Description:** Pre-made cover in standard sizes
**Style-Specific Measurements:** None (no measurements required)

## Customer Experience Flow

### Step 1: Style Selection
Customer sees all 4 style options with measurement counts:
- Standard Rectangular Cover (3 measurements required)
- Custom Shape Cover (5 measurements required)
- Round Cover (2 measurements required)
- Standard Size Cover (No measurements required)

### Step 2: Measurement Input (Dynamic)
Depending on the selected style:

**If Style A (Standard Rectangular) is selected:**
- Shows 3 input fields: Length, Width, Height
- All are required
- Validation checks all 3 measurements

**If Style B (Custom Shape) is selected:**
- Shows 5 input fields: Side 1, Side 2, Side 3, Side 4, Side 5
- All are required
- Validation checks all 5 measurements

**If Style C (Round) is selected:**
- Shows 2 input fields: Diameter, Height
- Both are required
- Validation checks both measurements

**If Style D (Standard Size) is selected:**
- Shows message: "No measurements required for this style"
- No validation needed for measurements
- Customer can proceed to next step

### Step 3: Validation
- Only validates measurements for the selected style
- If style changes, previous measurements are cleared
- Error messages are specific to the selected style's requirements

## Implementation Benefits

1. **Clarity**: No confusion about where to add measurements
2. **Flexibility**: Each style can have completely different measurement requirements
3. **User Experience**: Customers only see relevant measurements
4. **Validation**: Only validates what's actually required
5. **Visual Feedback**: Clear indication of measurement requirements per style

## Sanity Studio Setup

### In Product Variations → Style Options:
1. **Standard Rectangular Cover:**
   - Add 3 measurements: Length, Width, Height
   
2. **Custom Shape Cover:**
   - Add 5 measurements: Side 1, Side 2, Side 3, Side 4, Side 5
   
3. **Round Cover:**
   - Add 2 measurements: Diameter, Height
   
4. **Standard Size Cover:**
   - Leave measurements empty (no measurements required)

### Product-Level Measurements:
- **Skip this section entirely** - it's been removed
- All measurements are now handled at the style level 