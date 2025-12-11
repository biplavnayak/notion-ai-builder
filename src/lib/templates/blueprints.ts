import { TemplateBlueprint } from "../types/blueprint";

// Habit Tracker Template
export const habitTrackerTemplate: TemplateBlueprint = {
    title: "✅ Habit Tracker",
    description: "Track your daily habits and build consistent routines",
    databases: [
        {
            key: "habits_db",
            title: "Habits",
            description: "Your daily habits to track",
            properties: {
                "Habit": { type: "title" },
                "Category": { type: "select", options: ["Health", "Productivity", "Mindfulness", "Learning", "Social"] },
                "Frequency": { type: "select", options: ["Daily", "Weekly", "Monthly"] },
                "Start Date": { type: "date" },
                "Current Streak": { type: "number" },
                "Best Streak": { type: "number" },
                "Status": { type: "select", options: ["Active", "Paused", "Completed"] }
            }
        },
        {
            key: "daily_logs_db",
            title: "Daily Logs",
            description: "Track your daily habit completions",
            properties: {
                "Date": { type: "title" },
                "Habit": { type: "relation", relation_target: "habits_db" },
                "Completed": { type: "checkbox" },
                "Notes": { type: "rich_text" },
                "Mood": { type: "select", options: ["😊 Great", "🙂 Good", "😐 Okay", "😔 Tough"] }
            }
        }
    ],
    pages: [
        {
            title: "📊 Habit Dashboard",
            icon: "📊",
            blocks: [
                { type: "heading_1", content: "Welcome to Your Habit Tracker" },
                { type: "callout", content: "🎯 Build better habits, one day at a time. Track your progress and celebrate your wins!", icon: "🎯" },
                { type: "divider" },
                { type: "heading_2", content: "📖 How to Use This Template" },
                { type: "numbered_list_item", content: "Add your habits to the Habits database below" },
                { type: "numbered_list_item", content: "Set the category and frequency for each habit" },
                { type: "numbered_list_item", content: "Log your daily completions in the Daily Logs section" },
                { type: "numbered_list_item", content: "Watch your streaks grow and stay motivated!" },
                { type: "divider" },
                { type: "heading_2", content: "✅ Your Habits" },
                { type: "linked_database", linked_database_source: "habits_db", linked_database_view: { layout: "table", properties: ["Habit", "Category", "Frequency", "Current Streak", "Status"] } },
                { type: "divider" },
                { type: "heading_2", content: "📅 Daily Log" },
                { type: "linked_database", linked_database_source: "daily_logs_db", linked_database_view: { layout: "table", properties: ["Date", "Habit", "Completed", "Mood"] } },
                { type: "divider" },
                { type: "heading_2", content: "💡 Pro Tips" },
                { type: "bulleted_list_item", content: "Start with 2-3 habits max - consistency beats quantity" },
                { type: "bulleted_list_item", content: "Track your mood to see how habits affect your wellbeing" },
                { type: "bulleted_list_item", content: "Celebrate small wins - every streak starts with day 1!" }
            ]
        }
    ]
};

// Project Tracker Template
export const projectTrackerTemplate: TemplateBlueprint = {
    title: "📊 Project Tracker",
    description: "Manage your projects and tasks efficiently",
    databases: [
        {
            key: "projects_db",
            title: "Projects",
            description: "All your projects in one place",
            properties: {
                "Project Name": { type: "title" },
                "Status": { type: "select", options: ["Planning", "In Progress", "On Hold", "Completed", "Cancelled"] },
                "Priority": { type: "select", options: ["🔴 High", "🟡 Medium", "🟢 Low"] },
                "Start Date": { type: "date" },
                "Due Date": { type: "date" },
                "Owner": { type: "people" },
                "Progress": { type: "number" }
            }
        },
        {
            key: "tasks_db",
            title: "Tasks",
            description: "Individual tasks for your projects",
            properties: {
                "Task": { type: "title" },
                "Project": { type: "relation", relation_target: "projects_db" },
                "Status": { type: "select", options: ["To Do", "In Progress", "Review", "Done"] },
                "Priority": { type: "select", options: ["High", "Medium", "Low"] },
                "Assignee": { type: "people" },
                "Due Date": { type: "date" },
                "Completed": { type: "checkbox" }
            }
        }
    ],
    pages: [
        {
            title: "📊 Project Dashboard",
            icon: "📊",
            blocks: [
                { type: "heading_1", content: "Project Command Center" },
                { type: "callout", content: "🚀 Manage all your projects and tasks in one place. Stay organized, meet deadlines, and achieve your goals!", icon: "🚀" },
                { type: "divider" },
                { type: "heading_2", content: "📖 Quick Start Guide" },
                { type: "numbered_list_item", content: "Create a new project in the Projects database" },
                { type: "numbered_list_item", content: "Add tasks to your project and assign them" },
                { type: "numbered_list_item", content: "Update task status as you progress" },
                { type: "numbered_list_item", content: "Track project completion and celebrate wins!" },
                { type: "divider" },
                { type: "heading_2", content: "📁 Active Projects" },
                { type: "linked_database", linked_database_source: "projects_db", linked_database_view: { layout: "table", properties: ["Project Name", "Status", "Priority", "Due Date", "Progress"] } },
                { type: "divider" },
                { type: "heading_2", content: "✅ All Tasks" },
                { type: "linked_database", linked_database_source: "tasks_db", linked_database_view: { layout: "board", properties: ["Task", "Project", "Priority", "Due Date"] } },
                { type: "divider" },
                { type: "heading_2", content: "💡 Best Practices" },
                { type: "bulleted_list_item", content: "Break large projects into smaller, manageable tasks" },
                { type: "bulleted_list_item", content: "Set realistic deadlines and update them as needed" },
                { type: "bulleted_list_item", content: "Review your projects weekly to stay on track" }
            ]
        }
    ]
};

// Expense Tracker Template
export const expenseTrackerTemplate: TemplateBlueprint = {
    title: "💰 Expense Tracker",
    description: "Monitor your spending and stay within budget",
    databases: [
        {
            key: "expenses_db",
            title: "Expenses",
            description: "Track all your expenses",
            properties: {
                "Description": { type: "title" },
                "Amount": { type: "number" },
                "Category": { type: "select", options: ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills & Utilities", "Healthcare", "Other"] },
                "Date": { type: "date" },
                "Payment Method": { type: "select", options: ["Cash", "Credit Card", "Debit Card", "Digital Wallet"] },
                "Recurring": { type: "checkbox" }
            }
        },
        {
            key: "budgets_db",
            title: "Budgets",
            description: "Set monthly budgets by category",
            properties: {
                "Category": { type: "title" },
                "Monthly Budget": { type: "number" },
                "Month": { type: "date" },
                "Status": { type: "select", options: ["Under Budget", "On Track", "Over Budget"] }
            }
        }
    ],
    pages: [
        {
            title: "💰 Finance Dashboard",
            icon: "💰",
            blocks: [
                { type: "heading_1", content: "Your Financial Overview" },
                { type: "callout", content: "💡 Track every dollar, stay within budget, and achieve your financial goals!", icon: "💡" },
                { type: "divider" },
                { type: "heading_2", content: "📖 How to Use" },
                { type: "numbered_list_item", content: "Set your monthly budgets for each category" },
                { type: "numbered_list_item", content: "Log every expense as it happens" },
                { type: "numbered_list_item", content: "Review your spending weekly to stay on track" },
                { type: "numbered_list_item", content: "Adjust budgets based on your patterns" },
                { type: "divider" },
                { type: "heading_2", content: "💸 Recent Expenses" },
                { type: "linked_database", linked_database_source: "expenses_db", linked_database_view: { layout: "table", properties: ["Description", "Amount", "Category", "Date", "Payment Method"] } },
                { type: "divider" },
                { type: "heading_2", content: "📊 Monthly Budgets" },
                { type: "linked_database", linked_database_source: "budgets_db", linked_database_view: { layout: "table", properties: ["Category", "Monthly Budget", "Month", "Status"] } },
                { type: "divider" },
                { type: "heading_2", content: "💡 Money Tips" },
                { type: "bulleted_list_item", content: "Log expenses immediately to avoid forgetting" },
                { type: "bulleted_list_item", content: "Review your spending patterns monthly" },
                { type: "bulleted_list_item", content: "Set realistic budgets based on your actual spending" }
            ]
        }
    ]
};

// Content Calendar Template
const contentCalendarTemplate: TemplateBlueprint = {
    title: "📅 Content Calendar",
    description: "Plan and schedule your content across platforms",
    databases: [
        {
            key: "content_db",
            title: "Content",
            description: "All your content pieces",
            properties: {
                "Title": { type: "title" },
                "Platform": { type: "select", options: ["Instagram", "Twitter", "LinkedIn", "YouTube", "Blog", "TikTok"] },
                "Status": { type: "select", options: ["Idea", "In Progress", "Ready", "Published"] },
                "Publish Date": { type: "date" },
                "Type": { type: "select", options: ["Post", "Video", "Article", "Story", "Reel"] },
                "Performance": { type: "select", options: ["📈 High", "📊 Medium", "📉 Low"] }
            }
        },
        {
            key: "ideas_db",
            title: "Content Ideas",
            description: "Your content idea bank",
            properties: {
                "Idea": { type: "title" },
                "Category": { type: "select", options: ["Educational", "Entertainment", "Promotional", "Behind the Scenes"] },
                "Priority": { type: "select", options: ["High", "Medium", "Low"] },
                "Status": { type: "select", options: ["New", "In Development", "Used"] }
            }
        }
    ],
    pages: [{
        title: "📅 Content Hub",
        icon: "📅",
        blocks: [
            { type: "heading_1", content: "Content Planning Hub" },
            { type: "callout", content: "📱 Plan, create, and publish amazing content consistently!", icon: "📱" },
            { type: "divider" },
            { type: "heading_2", content: "📅 Content Calendar" },
            { type: "linked_database", linked_database_source: "content_db", linked_database_view: { layout: "calendar", properties: ["Title", "Platform", "Status"] } },
            { type: "divider" },
            { type: "heading_2", content: "💡 Idea Bank" },
            { type: "linked_database", linked_database_source: "ideas_db", linked_database_view: { layout: "table", properties: ["Idea", "Category", "Priority", "Status"] } }
        ]
    }]
};

// Simple CRM Template
const crmTemplate: TemplateBlueprint = {
    title: "👥 Simple CRM",
    description: "Manage client relationships and deals",
    databases: [
        {
            key: "contacts_db",
            title: "Contacts",
            description: "Your client and prospect database",
            properties: {
                "Name": { type: "title" },
                "Company": { type: "rich_text" },
                "Email": { type: "email" },
                "Phone": { type: "phone_number" },
                "Status": { type: "select", options: ["Lead", "Prospect", "Client", "Inactive"] },
                "Source": { type: "select", options: ["Referral", "Website", "Social Media", "Event", "Cold Outreach"] }
            }
        },
        {
            key: "deals_db",
            title: "Deals",
            description: "Track your sales pipeline",
            properties: {
                "Deal Name": { type: "title" },
                "Contact": { type: "relation", relation_target: "contacts_db" },
                "Value": { type: "number" },
                "Stage": { type: "select", options: ["Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"] },
                "Close Date": { type: "date" },
                "Probability": { type: "select", options: ["25%", "50%", "75%", "90%"] }
            }
        }
    ],
    pages: [{
        title: "👥 CRM Dashboard",
        icon: "👥",
        blocks: [
            { type: "heading_1", content: "Client Relationship Manager" },
            { type: "callout", content: "💼 Manage your clients and close more deals!", icon: "💼" },
            { type: "divider" },
            { type: "heading_2", content: "👥 Contacts" },
            { type: "linked_database", linked_database_source: "contacts_db", linked_database_view: { layout: "table", properties: ["Name", "Company", "Email", "Status"] } },
            { type: "divider" },
            { type: "heading_2", content: "💰 Sales Pipeline" },
            { type: "linked_database", linked_database_source: "deals_db", linked_database_view: { layout: "board", properties: ["Deal Name", "Contact", "Value", "Close Date"] } }
        ]
    }]
};

// Meal Planner Template
const mealPlannerTemplate: TemplateBlueprint = {
    title: "🍽️ Meal Planner",
    description: "Plan your weekly meals and track recipes",
    databases: [
        {
            key: "recipes_db",
            title: "Recipes",
            description: "Your recipe collection",
            properties: {
                "Recipe Name": { type: "title" },
                "Category": { type: "select", options: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"] },
                "Cuisine": { type: "select", options: ["Italian", "Asian", "Mexican", "American", "Mediterranean", "Other"] },
                "Prep Time": { type: "number" },
                "Servings": { type: "number" },
                "Difficulty": { type: "select", options: ["Easy", "Medium", "Hard"] }
            }
        },
        {
            key: "meal_plan_db",
            title: "Meal Plan",
            description: "Your weekly meal schedule",
            properties: {
                "Date": { type: "title" },
                "Breakfast": { type: "relation", relation_target: "recipes_db" },
                "Lunch": { type: "relation", relation_target: "recipes_db" },
                "Dinner": { type: "relation", relation_target: "recipes_db" },
                "Notes": { type: "rich_text" }
            }
        }
    ],
    pages: [{
        title: "🍽️ Meal Planning Hub",
        icon: "🍽️",
        blocks: [
            { type: "heading_1", content: "Meal Planning Made Easy" },
            { type: "callout", content: "🥗 Plan healthy, delicious meals for the week ahead!", icon: "🥗" },
            { type: "divider" },
            { type: "heading_2", content: "📅 This Week's Meals" },
            { type: "linked_database", linked_database_source: "meal_plan_db", linked_database_view: { layout: "table", properties: ["Date", "Breakfast", "Lunch", "Dinner"] } },
            { type: "divider" },
            { type: "heading_2", content: "📖 Recipe Collection" },
            { type: "linked_database", linked_database_source: "recipes_db", linked_database_view: { layout: "gallery", properties: ["Recipe Name", "Category", "Prep Time"] } }
        ]
    }]
};

// Student Dashboard Template
const studentDashboardTemplate: TemplateBlueprint = {
    title: "🎓 Student Dashboard",
    description: "All-in-one student workspace",
    databases: [
        {
            key: "assignments_db",
            title: "Assignments",
            description: "Track all your assignments",
            properties: {
                "Assignment": { type: "title" },
                "Course": { type: "select", options: ["Math", "Science", "English", "History", "Other"] },
                "Due Date": { type: "date" },
                "Status": { type: "select", options: ["Not Started", "In Progress", "Submitted"] },
                "Priority": { type: "select", options: ["High", "Medium", "Low"] },
                "Grade": { type: "number" }
            }
        },
        {
            key: "notes_db",
            title: "Notes",
            description: "Your study notes",
            properties: {
                "Topic": { type: "title" },
                "Course": { type: "select", options: ["Math", "Science", "English", "History", "Other"] },
                "Date": { type: "date" },
                "Type": { type: "select", options: ["Lecture", "Reading", "Study Guide"] }
            }
        }
    ],
    pages: [{
        title: "🎓 Student Hub",
        icon: "🎓",
        blocks: [
            { type: "heading_1", content: "Student Command Center" },
            { type: "callout", content: "📚 Stay organized and ace your classes!", icon: "📚" },
            { type: "divider" },
            { type: "heading_2", content: "📝 Upcoming Assignments" },
            { type: "linked_database", linked_database_source: "assignments_db", linked_database_view: { layout: "table", properties: ["Assignment", "Course", "Due Date", "Status"] } },
            { type: "divider" },
            { type: "heading_2", content: "📖 Study Notes" },
            { type: "linked_database", linked_database_source: "notes_db", linked_database_view: { layout: "list", properties: ["Topic", "Course", "Date"] } }
        ]
    }]
};

// Travel Planner Template
const travelPlannerTemplate: TemplateBlueprint = {
    title: "✈️ Travel Planner",
    description: "Plan your trips with itineraries and budgets",
    databases: [
        {
            key: "trips_db",
            title: "Trips",
            description: "Your travel plans",
            properties: {
                "Destination": { type: "title" },
                "Start Date": { type: "date" },
                "End Date": { type: "date" },
                "Budget": { type: "number" },
                "Status": { type: "select", options: ["Planning", "Booked", "In Progress", "Completed"] },
                "Type": { type: "select", options: ["Vacation", "Business", "Weekend Getaway", "Adventure"] }
            }
        },
        {
            key: "activities_db",
            title: "Activities",
            description: "Things to do on your trips",
            properties: {
                "Activity": { type: "title" },
                "Trip": { type: "relation", relation_target: "trips_db" },
                "Date": { type: "date" },
                "Cost": { type: "number" },
                "Booked": { type: "checkbox" },
                "Category": { type: "select", options: ["Sightseeing", "Food", "Adventure", "Relaxation", "Shopping"] }
            }
        }
    ],
    pages: [{
        title: "✈️ Travel Hub",
        icon: "✈️",
        blocks: [
            { type: "heading_1", content: "Your Travel Planning Hub" },
            { type: "callout", content: "🌍 Plan amazing trips and create unforgettable memories!", icon: "🌍" },
            { type: "divider" },
            { type: "heading_2", content: "🗺️ Upcoming Trips" },
            { type: "linked_database", linked_database_source: "trips_db", linked_database_view: { layout: "table", properties: ["Destination", "Start Date", "End Date", "Budget", "Status"] } },
            { type: "divider" },
            { type: "heading_2", content: "🎯 Activities & Itinerary" },
            { type: "linked_database", linked_database_source: "activities_db", linked_database_view: { layout: "list", properties: ["Activity", "Trip", "Date", "Booked"] } }
        ]
    }]
};

// Goal Tracker Template
const goalTrackerTemplate: TemplateBlueprint = {
    title: "🎯 Goal Tracker",
    description: "Set and achieve your goals with milestones",
    databases: [
        {
            key: "goals_db",
            title: "Goals",
            description: "Your goals and aspirations",
            properties: {
                "Goal": { type: "title" },
                "Category": { type: "select", options: ["Career", "Health", "Finance", "Personal", "Learning"] },
                "Target Date": { type: "date" },
                "Status": { type: "select", options: ["Not Started", "In Progress", "Achieved", "On Hold"] },
                "Progress": { type: "number" },
                "Priority": { type: "select", options: ["High", "Medium", "Low"] }
            }
        },
        {
            key: "milestones_db",
            title: "Milestones",
            description: "Break down goals into milestones",
            properties: {
                "Milestone": { type: "title" },
                "Goal": { type: "relation", relation_target: "goals_db" },
                "Due Date": { type: "date" },
                "Completed": { type: "checkbox" },
                "Notes": { type: "rich_text" }
            }
        }
    ],
    pages: [{
        title: "🎯 Goal Dashboard",
        icon: "🎯",
        blocks: [
            { type: "heading_1", content: "Goal Achievement System" },
            { type: "callout", content: "🚀 Set ambitious goals and track your progress!", icon: "🚀" },
            { type: "divider" },
            { type: "heading_2", content: "🎯 Active Goals" },
            { type: "linked_database", linked_database_source: "goals_db", linked_database_view: { layout: "table", properties: ["Goal", "Category", "Target Date", "Progress", "Status"] } },
            { type: "divider" },
            { type: "heading_2", content: "📍 Milestones" },
            { type: "linked_database", linked_database_source: "milestones_db", linked_database_view: { layout: "list", properties: ["Milestone", "Goal", "Due Date", "Completed"] } }
        ]
    }]
};

// Workout Tracker Template
const workoutTrackerTemplate: TemplateBlueprint = {
    title: "💪 Workout Tracker",
    description: "Log workouts and track fitness progress",
    databases: [
        {
            key: "workouts_db",
            title: "Workouts",
            description: "Your workout sessions",
            properties: {
                "Date": { type: "title" },
                "Type": { type: "select", options: ["Strength", "Cardio", "Flexibility", "Sports", "Rest Day"] },
                "Duration": { type: "number" },
                "Intensity": { type: "select", options: ["Light", "Moderate", "High", "Max"] },
                "Calories": { type: "number" },
                "Notes": { type: "rich_text" }
            }
        },
        {
            key: "exercises_db",
            title: "Exercise Library",
            description: "Your exercise database",
            properties: {
                "Exercise": { type: "title" },
                "Category": { type: "select", options: ["Upper Body", "Lower Body", "Core", "Cardio", "Full Body"] },
                "Equipment": { type: "select", options: ["None", "Dumbbells", "Barbell", "Machine", "Resistance Band"] },
                "Difficulty": { type: "select", options: ["Beginner", "Intermediate", "Advanced"] }
            }
        }
    ],
    pages: [{
        title: "💪 Fitness Hub",
        icon: "💪",
        blocks: [
            { type: "heading_1", content: "Fitness Tracking Dashboard" },
            { type: "callout", content: "🏋️ Track your workouts and build strength!", icon: "🏋️" },
            { type: "divider" },
            { type: "heading_2", content: "📅 Workout Log" },
            { type: "linked_database", linked_database_source: "workouts_db", linked_database_view: { layout: "table", properties: ["Date", "Type", "Duration", "Intensity", "Calories"] } },
            { type: "divider" },
            { type: "heading_2", content: "💪 Exercise Library" },
            { type: "linked_database", linked_database_source: "exercises_db", linked_database_view: { layout: "gallery", properties: ["Exercise", "Category", "Equipment"] } }
        ]
    }]
};

// Export all templates
export const TEMPLATE_BLUEPRINTS: Record<string, TemplateBlueprint> = {
    "habit-tracker": habitTrackerTemplate,
    "project-tracker": projectTrackerTemplate,
    "expense-tracker": expenseTrackerTemplate,
    "content-calendar": contentCalendarTemplate,
    "crm-simple": crmTemplate,
    "meal-planner": mealPlannerTemplate,
    "student-dashboard": studentDashboardTemplate,
    "travel-planner": travelPlannerTemplate,
    "goal-tracker": goalTrackerTemplate,
    "workout-tracker": workoutTrackerTemplate
};
