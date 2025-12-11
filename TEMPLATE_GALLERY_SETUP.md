# Template Gallery Setup Guide

## Step 1: Create Template Gallery Workspace

1. Go to https://notion.so
2. Click "+ Add a page" in sidebar
3. Create a new workspace: "Bartlabs Template Gallery"
4. This will be your master template workspace

## Step 2: Build Each Template

For each of the 10 templates, you'll need to:

### Template List:
1. ✅ Habit Tracker
2. 📊 Project Tracker  
3. 💰 Expense Tracker
4. 📅 Content Calendar
5. 👥 Simple CRM
6. 🍽️ Meal Planner
7. 🎓 Student Dashboard
8. ✈️ Travel Planner
9. 🎯 Goal Tracker
10. 💪 Workout Tracker

### For Each Template:

#### A. Create the Template Structure
1. Create a new page in the gallery workspace
2. Name it exactly as shown above (with emoji)
3. Add the description from metadata.ts

#### B. Build Databases
Use the blueprints from `src/lib/templates/blueprints.ts`:

**Example for Habit Tracker:**
1. Create "Habits" database with properties:
   - Habit (Title)
   - Category (Select: Health, Productivity, Mindfulness, Learning, Social)
   - Frequency (Select: Daily, Weekly, Monthly)
   - Start Date (Date)
   - Current Streak (Number)
   - Best Streak (Number)
   - Status (Select: Active, Paused, Completed)

2. Create "Daily Logs" database with properties:
   - Date (Title)
   - Habit (Relation to Habits)
   - Completed (Checkbox)
   - Notes (Text)
   - Mood (Select: 😊 Great, 🙂 Good, 😐 Okay, 😔 Bad)

#### C. Add Sample Data
Use the data from `src/lib/templates/sampleData.ts`:

**Example for Habit Tracker:**
Add these entries to Habits database:
- Morning Exercise | Health | Daily | 2024-10-01 | 12 | 15 | Active
- Read 30 min | Learning | Daily | 2024-10-01 | 8 | 10 | Active
- Meditate | Mindfulness | Daily | 2024-10-05 | 7 | 7 | Active

Add these entries to Daily Logs:
- 2024-10-23 | ✅ | 😊 Great
- 2024-10-22 | ✅ | 🙂 Good
- 2024-10-21 | ❌ | 😐 Okay

#### D. Create Dashboard (if applicable)
For templates with dashboards:
1. Create a "Dashboard" page
2. Add linked database views
3. Add column layouts
4. Make it look professional

#### E. Add Instructions
Add a callout at the top:
```
💡 How to use this template:
1. Customize the databases to fit your needs
2. Add your own data
3. Explore the different views
4. Make it your own!
```

## Step 3: Generate Duplicate Links

For each template:

1. **Open the template page**
2. **Click "Share" button** (top right)
3. **Toggle "Share to web" ON**
4. **Toggle "Allow duplicate as template" ON**
5. **Copy the public URL**
6. **Add `?duplicate=true` to the end**
   - Example: `https://notion.so/Habit-Tracker-abc123` → `https://notion.so/Habit-Tracker-abc123?duplicate=true`
7. **Test the link:**
   - Open in incognito window
   - Click "Duplicate"
   - Verify it works

## Step 4: Update Metadata

Add the duplicate links to `src/lib/templates/metadata.ts`:

```typescript
{
    id: "habit-tracker",
    name: "Habit Tracker",
    // ... other fields
    duplicateLink: "https://notion.so/Habit-Tracker-abc123?duplicate=true"
},
```

## Step 5: Test Everything

1. Browse marketplace at http://localhost:3000/templates
2. Click on each template
3. Click "Get Template" button
4. Verify it opens in Notion
5. Click "Duplicate" in Notion
6. Verify template is added to your workspace
7. Verify sample data matches preview image

## Quick Reference: Template Blueprints

### Habit Tracker
- **Databases**: Habits, Daily Logs
- **Sample Data**: 3 habits, 3 daily logs
- **Views**: Table, Calendar

### Project Tracker
- **Databases**: Projects, Tasks
- **Sample Data**: 4 projects, 5 tasks
- **Views**: Kanban, Table, Timeline

### Expense Tracker
- **Databases**: Expenses, Budgets
- **Sample Data**: 4 expenses, 3 budgets
- **Views**: Table, Monthly view

### Content Calendar
- **Databases**: Content, Ideas
- **Sample Data**: 3 content items, 2 ideas
- **Views**: Calendar, Kanban

### Simple CRM
- **Databases**: Contacts, Deals
- **Sample Data**: 3 contacts, 2 deals
- **Views**: Table, Pipeline

### Meal Planner
- **Databases**: Recipes, Meal Plan
- **Sample Data**: 3 recipes, 3 meal plans
- **Views**: Gallery, Weekly calendar

### Student Dashboard
- **Databases**: Assignments, Notes
- **Sample Data**: 3 assignments, 2 notes
- **Views**: Table, Calendar

### Travel Planner
- **Databases**: Trips, Activities
- **Sample Data**: 2 trips, 2 activities
- **Views**: Table, Timeline

### Goal Tracker
- **Databases**: Goals, Milestones
- **Sample Data**: 3 goals, 2 milestones
- **Views**: Table, Progress board

### Workout Tracker
- **Databases**: Workouts, Exercises
- **Sample Data**: 3 workouts, 3 exercises
- **Views**: Table, Calendar

## Tips for Success

1. **Make it beautiful** - Use emojis, colors, covers
2. **Add clear instructions** - Help users understand how to use it
3. **Test thoroughly** - Duplicate each template yourself
4. **Match preview images** - Ensure sample data matches screenshots
5. **Keep it simple** - Don't overcomplicate the templates

## Estimated Time

- **Per template**: 30-45 minutes
- **Total for 10 templates**: 5-7 hours
- **Testing & polish**: 2-3 hours
- **Total**: 1-2 days of focused work

## Need Help?

Refer to:
- `src/lib/templates/blueprints.ts` - Database schemas
- `src/lib/templates/sampleData.ts` - Sample data
- `src/lib/templates/metadata.ts` - Template descriptions
