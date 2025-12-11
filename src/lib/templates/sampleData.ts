// Sample data generators for each template
// This ensures the created templates match the preview images

export interface SampleDataEntry {
    [key: string]: any;
}

export const SAMPLE_DATA: Record<string, Record<string, SampleDataEntry[]>> = {
    "project-tracker": {
        "projects_db": [
            {
                "Project Name": "Website Redesign",
                "Status": "In Progress",
                "Priority": "🔴 High",
                "Start Date": "2024-10-01",
                "Due Date": "2024-10-25",
                "Progress": 65
            },
            {
                "Project Name": "Q4 Marketing Plan",
                "Status": "In Progress",
                "Priority": "🟡 Medium",
                "Start Date": "2024-10-15",
                "Due Date": "2024-11-01",
                "Progress": 40
            },
            {
                "Project Name": "Client Feedback Review",
                "Status": "Planning",
                "Priority": "🟡 Medium",
                "Start Date": "2024-10-20",
                "Due Date": "2024-10-28",
                "Progress": 15
            },
            {
                "Project Name": "Project Redesign",
                "Status": "Completed",
                "Priority": "🟢 Low",
                "Start Date": "2024-09-01",
                "Due Date": "2024-09-28",
                "Progress": 100
            }
        ],
        "tasks_db": [
            {
                "Task": "Website Redesign",
                "Status": "To Do",
                "Priority": "High",
                "Due Date": "2024-10-25",
                "Completed": false
            },
            {
                "Task": "Q4 Marketing Plan",
                "Status": "In Progress",
                "Priority": "Medium",
                "Due Date": "2024-11-01",
                "Completed": false
            },
            {
                "Task": "Client Feedback Review",
                "Status": "To Do",
                "Priority": "Medium",
                "Due Date": "2024-10-28",
                "Completed": false
            },
            {
                "Task": "Project Redesign",
                "Status": "Done",
                "Priority": "Low",
                "Due Date": "2024-09-28",
                "Completed": true
            },
            {
                "Task": "Website Redesign",
                "Status": "Review",
                "Priority": "High",
                "Due Date": "2024-10-25",
                "Completed": false
            }
        ]
    },
    "habit-tracker": {
        "habits_db": [
            {
                "Habit": "Morning Exercise",
                "Category": "Health",
                "Frequency": "Daily",
                "Start Date": "2024-10-01",
                "Current Streak": 12,
                "Best Streak": 15,
                "Status": "Active"
            },
            {
                "Habit": "Read 30 min",
                "Category": "Learning",
                "Frequency": "Daily",
                "Start Date": "2024-10-01",
                "Current Streak": 8,
                "Best Streak": 10,
                "Status": "Active"
            },
            {
                "Habit": "Meditate",
                "Category": "Mindfulness",
                "Frequency": "Daily",
                "Start Date": "2024-10-05",
                "Current Streak": 7,
                "Best Streak": 7,
                "Status": "Active"
            }
        ],
        "daily_logs_db": [
            {
                "Date": "2024-10-23",
                "Completed": true,
                "Mood": "😊 Great"
            },
            {
                "Date": "2024-10-22",
                "Completed": true,
                "Mood": "🙂 Good"
            },
            {
                "Date": "2024-10-21",
                "Completed": false,
                "Mood": "😐 Okay"
            }
        ]
    },
    "expense-tracker": {
        "expenses_db": [
            {
                "Description": "Grocery Shopping",
                "Amount": 125.50,
                "Category": "Food & Dining",
                "Date": "2024-10-20",
                "Payment Method": "Credit Card",
                "Recurring": false
            },
            {
                "Description": "Uber Ride",
                "Amount": 18.75,
                "Category": "Transportation",
                "Date": "2024-10-21",
                "Payment Method": "Digital Wallet",
                "Recurring": false
            },
            {
                "Description": "Netflix Subscription",
                "Amount": 15.99,
                "Category": "Entertainment",
                "Date": "2024-10-22",
                "Payment Method": "Credit Card",
                "Recurring": true
            },
            {
                "Description": "Electricity Bill",
                "Amount": 89.00,
                "Category": "Bills & Utilities",
                "Date": "2024-10-15",
                "Payment Method": "Debit Card",
                "Recurring": true
            }
        ],
        "budgets_db": [
            {
                "Category": "Food & Dining",
                "Monthly Budget": 500,
                "Month": "2024-10-01",
                "Status": "On Track"
            },
            {
                "Category": "Transportation",
                "Monthly Budget": 200,
                "Month": "2024-10-01",
                "Status": "Under Budget"
            },
            {
                "Category": "Entertainment",
                "Monthly Budget": 100,
                "Month": "2024-10-01",
                "Status": "On Track"
            }
        ]
    },
    "content-calendar": {
        "content_db": [
            {
                "Title": "Instagram Reel - Product Launch",
                "Platform": "Instagram",
                "Status": "Ready",
                "Publish Date": "2024-10-25",
                "Type": "Reel",
                "Performance": "📈 High"
            },
            {
                "Title": "Twitter Thread - Industry Tips",
                "Platform": "Twitter",
                "Status": "In Progress",
                "Publish Date": "2024-10-26",
                "Type": "Post",
                "Performance": "📊 Medium"
            },
            {
                "Title": "LinkedIn Article - Case Study",
                "Platform": "LinkedIn",
                "Status": "Idea",
                "Publish Date": "2024-10-28",
                "Type": "Article",
                "Performance": "📈 High"
            }
        ],
        "ideas_db": [
            {
                "Idea": "Behind the scenes video",
                "Category": "Behind the Scenes",
                "Priority": "High",
                "Status": "New"
            },
            {
                "Idea": "Customer testimonial series",
                "Category": "Promotional",
                "Priority": "Medium",
                "Status": "In Development"
            }
        ]
    },
    "crm-simple": {
        "contacts_db": [
            {
                "Name": "John Smith",
                "Company": "Tech Corp",
                "Email": "john@techcorp.com",
                "Phone": "+1-555-0123",
                "Status": "Client",
                "Source": "Referral"
            },
            {
                "Name": "Sarah Johnson",
                "Company": "Design Studio",
                "Email": "sarah@designstudio.com",
                "Phone": "+1-555-0456",
                "Status": "Prospect",
                "Source": "Website"
            },
            {
                "Name": "Mike Davis",
                "Company": "Marketing Inc",
                "Email": "mike@marketing.com",
                "Phone": "+1-555-0789",
                "Status": "Lead",
                "Source": "Social Media"
            }
        ],
        "deals_db": [
            {
                "Deal Name": "Website Redesign Project",
                "Value": 15000,
                "Stage": "Proposal",
                "Close Date": "2024-11-15",
                "Probability": "75%"
            },
            {
                "Deal Name": "Annual Retainer",
                "Value": 50000,
                "Stage": "Negotiation",
                "Close Date": "2024-12-01",
                "Probability": "90%"
            }
        ]
    },
    "meal-planner": {
        "recipes_db": [
            {
                "Recipe Name": "Avocado Toast",
                "Category": "Breakfast",
                "Cuisine": "American",
                "Prep Time": 10,
                "Servings": 2,
                "Difficulty": "Easy"
            },
            {
                "Recipe Name": "Chicken Stir Fry",
                "Category": "Dinner",
                "Cuisine": "Asian",
                "Prep Time": 25,
                "Servings": 4,
                "Difficulty": "Medium"
            },
            {
                "Recipe Name": "Greek Salad",
                "Category": "Lunch",
                "Cuisine": "Mediterranean",
                "Prep Time": 15,
                "Servings": 3,
                "Difficulty": "Easy"
            }
        ],
        "meal_plan_db": [
            {
                "Date": "Monday, Oct 21",
                "Notes": "Meal prep day"
            },
            {
                "Date": "Tuesday, Oct 22",
                "Notes": ""
            },
            {
                "Date": "Wednesday, Oct 23",
                "Notes": "Dinner with friends"
            }
        ]
    },
    "student-dashboard": {
        "assignments_db": [
            {
                "Assignment": "Math Homework - Chapter 5",
                "Course": "Math",
                "Due Date": "2024-10-25",
                "Status": "In Progress",
                "Priority": "High",
                "Grade": null
            },
            {
                "Assignment": "Science Lab Report",
                "Course": "Science",
                "Due Date": "2024-10-28",
                "Status": "Not Started",
                "Priority": "Medium",
                "Grade": null
            },
            {
                "Assignment": "English Essay",
                "Course": "English",
                "Due Date": "2024-10-20",
                "Status": "Submitted",
                "Priority": "High",
                "Grade": 95
            }
        ],
        "notes_db": [
            {
                "Topic": "Algebra Basics",
                "Course": "Math",
                "Date": "2024-10-15",
                "Type": "Lecture"
            },
            {
                "Topic": "Cell Biology",
                "Course": "Science",
                "Date": "2024-10-16",
                "Type": "Reading"
            }
        ]
    },
    "travel-planner": {
        "trips_db": [
            {
                "Destination": "Paris, France",
                "Start Date": "2024-12-15",
                "End Date": "2024-12-22",
                "Budget": 3000,
                "Status": "Planning",
                "Type": "Vacation"
            },
            {
                "Destination": "Tokyo, Japan",
                "Start Date": "2025-03-10",
                "End Date": "2025-03-20",
                "Budget": 5000,
                "Status": "Planning",
                "Type": "Adventure"
            }
        ],
        "activities_db": [
            {
                "Activity": "Eiffel Tower Visit",
                "Date": "2024-12-16",
                "Cost": 25,
                "Booked": true,
                "Category": "Sightseeing"
            },
            {
                "Activity": "Louvre Museum",
                "Date": "2024-12-17",
                "Cost": 20,
                "Booked": false,
                "Category": "Sightseeing"
            }
        ]
    },
    "goal-tracker": {
        "goals_db": [
            {
                "Goal": "Learn Spanish",
                "Category": "Learning",
                "Target Date": "2025-06-30",
                "Status": "In Progress",
                "Progress": 35,
                "Priority": "High"
            },
            {
                "Goal": "Run a Marathon",
                "Category": "Health",
                "Target Date": "2025-04-15",
                "Status": "In Progress",
                "Progress": 50,
                "Priority": "High"
            },
            {
                "Goal": "Save $10,000",
                "Category": "Finance",
                "Target Date": "2024-12-31",
                "Status": "In Progress",
                "Progress": 70,
                "Priority": "Medium"
            }
        ],
        "milestones_db": [
            {
                "Milestone": "Complete Duolingo Level 5",
                "Due Date": "2024-11-30",
                "Completed": false
            },
            {
                "Milestone": "Run 10K without stopping",
                "Due Date": "2024-12-15",
                "Completed": true
            }
        ]
    },
    "workout-tracker": {
        "workouts_db": [
            {
                "Date": "Monday, Oct 21",
                "Type": "Strength",
                "Duration": 45,
                "Intensity": "High",
                "Calories": 350,
                "Notes": "Upper body focus"
            },
            {
                "Date": "Tuesday, Oct 22",
                "Type": "Cardio",
                "Duration": 30,
                "Intensity": "Moderate",
                "Calories": 280,
                "Notes": "Morning run"
            },
            {
                "Date": "Wednesday, Oct 23",
                "Type": "Flexibility",
                "Duration": 20,
                "Intensity": "Light",
                "Calories": 100,
                "Notes": "Yoga session"
            }
        ],
        "exercises_db": [
            {
                "Exercise": "Bench Press",
                "Category": "Upper Body",
                "Equipment": "Barbell",
                "Difficulty": "Intermediate"
            },
            {
                "Exercise": "Squats",
                "Category": "Lower Body",
                "Equipment": "Barbell",
                "Difficulty": "Intermediate"
            },
            {
                "Exercise": "Plank",
                "Category": "Core",
                "Equipment": "None",
                "Difficulty": "Beginner"
            }
        ]
    }
};
