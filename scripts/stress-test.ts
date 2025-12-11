
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { NotionBuilder } from '../src/lib/notion/builder';
import { generateBlueprint } from '../src/lib/ai/generator';

const PROMPTS = [
    "Enterprise CRM with multi-pipeline sales tracking, contact management, and revenue forecasting",
    "Agile Project Management System with sprints, epics, user stories, and bug tracking",
    "Personal Finance Dashboard with expense tracking, budget planning, investment portfolio, and subscription manager",
    "Content Creation Hub for YouTubers with video ideation, script writing, production schedule, and sponsorship tracking",
    "University Student OS with course schedule, assignment tracker, grade calculator, and spaced repetition study system",
    "Freelance Business OS with client portal, invoice generator, project timeline, and tax estimator",
    "HR Recruitment Pipeline with candidate tracking, interview scheduling, onboarding checklist, and employee directory",
    "Travel Planner with itinerary builder, packing lists, expense splitting, and destination research",
    "Habit Tracker & Goal Setting System with OKRs, daily routines, streak tracking, and monthly reviews",
    "Recipe Manager & Meal Planner with grocery list generation, nutritional info, and pantry inventory",
    "Fitness & Workout Logger with exercise library, progress photos, body measurements, and PR tracking",
    "Reading List & Book Tracker with reading goals, book reviews, author database, and genre analysis",
    "Language Learning Workspace with vocabulary flashcards, grammar notes, practice log, and resource library",
    "Home Renovation Planner with budget tracker, contractor contacts, design moodboards, and timeline",
    "Wedding Planner with guest list, seating chart, vendor management, and budget breakdown",
    "Inventory Management System for small retail business with stock alerts, supplier database, and sales log",
    "Event Planning Dashboard for conferences with speaker management, attendee registration, and run of show",
    "Software Development Wiki with code snippets, documentation, API references, and tech stack overview",
    "Digital Garden & Zettelkasten Knowledge Base with interconnected notes, tags, and graph view optimization",
    "Social Media Content Calendar for agencies with client approval workflow, platform-specific specs, and analytics",
    "Real Estate Portfolio Manager with property details, tenant leases, maintenance requests, and cash flow analysis",
    "Podcast Production Workflow with guest outreach, episode planning, editing checklist, and show notes",
    "E-commerce Product Launch Planner with marketing roadmap, inventory check, competitor analysis, and launch day timeline",
    "Non-profit Volunteer Management with shift scheduling, hours tracking, skill matching, and impact reporting",
    "Music Production Studio Manager with track versions, sample library, gear inventory, and session logs",
    "Gardening Journal with plant database, watering schedule, seasonal tasks, and harvest log",
    "Pet Care Dashboard with vet visits, vaccination records, feeding schedule, and training progress",
    "Car Maintenance Log with service history, fuel efficiency tracker, insurance details, and repair schedule",
    "Job Search Tracker with application status, interview notes, resume versions, and networking contacts",
    "Daily Journal & Gratitude Log with mood tracking, weather, photo of the day, and morning pages",
    "Subscription Box Business Manager with subscriber database, box curation, shipping labels, and churn analysis",
    "Film Production Pre-production Hub with script breakdown, casting calls, location scouting, and shot lists",
    "Interior Design Client Portal with room measurements, furniture selection, color palettes, and budget approval",
    "Teacher's Classroom Manager with lesson plans, student attendance, behavior logs, and parent communication",
    "Influencer Marketing Campaign Manager with influencer database, contract status, content deliverables, and ROI tracking",
    "Bug Bounty Hunter Workspace with target scope, vulnerability reports, payout tracking, and methodology notes",
    "Crypto Portfolio Tracker with transaction history, coin research, wallet addresses, and profit/loss calculation",
    "Genealogy Research Workspace with family tree database, document archive, DNA results, and research logs",
    "Board Game Collection Manager with play logs, rulebooks, expansion packs, and win/loss stats",
    "Wine Tasting Journal with cellar inventory, tasting notes, region maps, and pairing suggestions",
    "Dream Journal & Analysis with recurring themes, lucidity tracking, sleep quality, and symbol dictionary",
    "Startup Pitch Deck Builder with slide outline, investor Q&A, competitor research, and funding milestones",
    "User Research Repository with interview transcripts, persona profiles, usability test results, and insight tagging",
    "Construction Site Daily Log with weather reports, crew attendance, safety incidents, and progress photos",
    "Legal Case Management for solo practitioners with client files, court dates, billing hours, and document templates",
    "Airbnb Host Dashboard with booking calendar, cleaning checklist, guest guidebook, and revenue tracking",
    "Marathon Training Plan with run logs, pace calculator, nutrition plan, and race day checklist",
    "Video Game Backlog & Achievement Tracker with game library, completion status, trophy guide, and review scores",
    "Sewing & Knitting Project Planner with pattern library, fabric stash, measurement chart, and project queue",
    "Emergency Preparedness Kit with supply inventory, evacuation plan, important contacts, and first aid manual"
];

async function runStressTest() {
    console.log("🚀 Starting Notion Template Builder Stress Test...");

    const accessToken = process.env.NOTION_TOKEN;
    if (!accessToken) {
        console.error("❌ Missing NOTION_TOKEN in .env.local");
        process.exit(1);
    }

    const builder = new NotionBuilder(accessToken);

    // 1. Find or Create Root "Stress Test" Page
    console.log("🔍 Finding root page...");
    let rootPageId = await builder.search("Notion Template Architect");

    if (!rootPageId) {
        console.log("⚠️ 'Notion Template Architect' page not found. Creating one...");
        // Fallback to searching for ANY page to use as parent for the root page
        // This is a bit chicken-and-egg, but we assume the user has access to at least one page
        const anyPageId = await builder.search("");
        if (!anyPageId) {
            console.error("❌ No pages found in workspace. Cannot create root page.");
            process.exit(1);
        }

        // Temporarily disabled - createPage is private
        // const rootPage = await builder.createPage(anyPageId, {
        //     title: "Notion Template Architect",
        //     icon: "🏗️",
        //     blocks: [{ type: "paragraph", content: "Root page for generated templates." }]
        // });
        // rootPageId = rootPage.id;
        console.error("❌ Cannot create root page automatically. Please create manually.");
        process.exit(1);
    }

    console.log(`✅ Using Root Page ID: ${rootPageId}`);

    // Create a specific page for this run
    // Temporarily disabled - createPage is private
    // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    // const runPage = await builder.createPage(rootPageId, {
    //     title: `Stress Test Run ${timestamp}`,
    //     icon: "🧪",
    //     blocks: [{ type: "paragraph", content: `Starting stress test with ${PROMPTS.length} templates.` }]
    // });
    const runPageId = rootPageId; // Use root page directly
    console.log(`✅ Using Root Page for test run`);

    // 2. Iterate through prompts
    for (let i = 0; i < PROMPTS.length; i++) {
        const prompt = PROMPTS[i];
        console.log(`\n--------------------------------------------------`);
        console.log(`Processing Template ${i + 1}/${PROMPTS.length}: ${prompt}`);

        try {
            // Generate Blueprint
            console.log("🧠 Generating blueprint...");
            const blueprint = await generateBlueprint(prompt);
            console.log(`✅ Blueprint generated: ${blueprint.title}`);

            // Build Template
            console.log("🏗️ Building template in Notion...");
            const pageId = await builder.build(blueprint, runPageId);
            console.log(`✅ Template built successfully! Page ID: ${pageId}`);

        } catch (error: any) {
            console.error(`❌ Failed to process template: ${prompt}`);
            console.error(error.message);
            // Continue to next template even if one fails
        }
    }

    console.log("\n🎉 Stress Test Complete!");
}

runStressTest().catch(console.error);
