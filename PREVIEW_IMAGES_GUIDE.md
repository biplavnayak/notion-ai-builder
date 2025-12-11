# Template Preview Image Generation Guide

## Missing Preview Images

The following templates need preview images generated:

1. **Travel Planner** (`/public/templates/travel-planner.png`)
2. **Goal Tracker** (`/public/templates/goal-tracker.png`)
3. **Workout Tracker** (`/public/templates/workout-tracker.png`)

## How to Generate Preview Images

### Option 1: AI Image Generation (Recommended)
Use the generate_image tool with prompts like:

```
A clean, modern Notion template preview showing a [Template Name] dashboard. The interface should have:
- A header with "[Template Name]" title and [emoji] emoji
- [Specific view description - table/calendar/board]
- Sample data entries
- Clean, minimalist Notion-style design with light background
- Professional typography and spacing
- Notion's signature clean aesthetic
```

### Option 2: Manual Screenshots
1. Install the template in a test Notion workspace
2. Take a clean screenshot of the main dashboard
3. Crop to show the full template layout
4. Save as PNG with dimensions around 1200x800px
5. Place in `/public/templates/[template-id].png`

### Option 3: Design Tools
Use Figma/Sketch to create mockups that look like Notion:
- Use Notion's color scheme (white background, gray text)
- Include Notion's UI elements (sidebar, properties, views)
- Add realistic sample data
- Export as PNG

## Current Status

✅ **Has Preview Images:**
- Habit Tracker
- Project Tracker
- Expense Tracker
- Content Calendar
- Simple CRM
- Meal Planner
- Student Dashboard

❌ **Needs Preview Images:**
- Travel Planner
- Goal Tracker  
- Workout Tracker

## Updating Metadata

After generating images, update `/src/lib/templates/metadata.ts`:

```typescript
{
    id: "template-id",
    // ... other fields
    previewImage: "/templates/template-id.png"
}
```

## Preview Image Best Practices

1. **Resolution**: 1200x800px minimum
2. **Format**: PNG for best quality
3. **Content**: Show the main dashboard/homepage
4. **Data**: Include 3-5 sample entries
5. **Views**: Show the most useful view (table, board, calendar)
6. **Branding**: Include template title and icon
7. **Clean**: No personal data, clean UI
8. **Realistic**: Make it look like an actual Notion page
