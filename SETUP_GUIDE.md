# Quick Setup Guide

## Option 1: Public Integration (Full OAuth - Recommended for Production)

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Select **"Public integration"** type
4. Fill in:
   - Name: "AI Template Builder"
   - Workspace: Your workspace
5. In **Capabilities**, enable:
   - Read content
   - Update content  
   - Insert content
6. In **Redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/notion/callback
   ```
7. Click **Submit**
8. Copy:
   - **OAuth client ID** → `NOTION_CLIENT_ID`
   - **OAuth client secret** → `NOTION_CLIENT_SECRET`

## Option 2: Internal Integration (Quick Test - No OAuth)

If you can't find OAuth settings, Notion may have created an **Internal Integration** by default.

For testing purposes, you can use the Internal Integration Token directly:

1. Go to your integration page
2. Copy the **"Internal Integration Secret"** (starts with `secret_...`)
3. In your Notion workspace:
   - Open any page
   - Click **"..."** menu → **"Add connections"**
   - Select your integration
4. Update `.env.local`:
   ```env
   NOTION_TOKEN=secret_your_token_here
   OPENAI_API_KEY=sk-your_openai_key
   ```

Then we'll need to modify the app to support token-based auth (simpler flow).

---

## Getting OpenAI Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-...`)
4. Paste into `.env.local` as `OPENAI_API_KEY`

---

**Which option do you prefer?** Let me know and I can help you set it up!
