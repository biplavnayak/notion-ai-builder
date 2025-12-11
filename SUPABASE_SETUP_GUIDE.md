# Supabase Setup Guide - Step by Step

Follow these steps to set up Supabase for your Notion Template Builder.

## Step 1: Create a Supabase Account & Project

### 1.1 Sign Up
1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with GitHub (recommended) or email

### 1.2 Create New Project
1. Click **"New Project"** button
2. Fill in the details:
   - **Name**: `notion-template-builder` (or your preferred name)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `ap-south-1` for India)
   - **Pricing Plan**: Free tier is fine for development
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be provisioned

## Step 2: Get Your API Keys

### 2.1 Navigate to API Settings
1. In your Supabase project dashboard, click **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** in the left menu

### 2.2 Copy Your Credentials
You'll see three important values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this - you'll need it for `NEXT_PUBLIC_SUPABASE_URL`

**anon public (public key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Copy this - you'll need it for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**service_role (secret key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
⚠️ **Keep this secret!** - you'll need it for `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Set Up the Database Schema

### 3.1 Open SQL Editor
1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** button

### 3.2 Run the Schema
1. Open the file `src/config/schema.sql` in your code editor
2. Copy ALL the contents (Cmd+A, Cmd+C)
3. Paste into the Supabase SQL Editor
4. Click **"Run"** button (or press Cmd+Enter)
5. You should see "Success. No rows returned" - this is correct!

### 3.3 Verify Tables Created
1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ `users`
   - ✅ `template_downloads`
   - ✅ `ai_generations`

## Step 4: Enable Google OAuth

### 4.1 Get Google OAuth Credentials
First, you need to create OAuth credentials in Google Cloud Console:

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Go to **"APIs & Services"** > **"Credentials"**
4. Click **"Create Credentials"** > **"OAuth client ID"**
5. Choose **"Web application"**
6. Add authorized redirect URIs:
   - For development: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
   - (Replace `YOUR-PROJECT-REF` with your actual Supabase project reference)
7. Click **"Create"**
8. Copy the **Client ID** and **Client Secret**

### 4.2 Configure in Supabase
1. In Supabase, go to **"Authentication"** in the left sidebar
2. Click **"Providers"**
3. Find **"Google"** and click to expand
4. Toggle **"Enable Sign in with Google"** to ON
5. Paste your **Client ID** and **Client Secret** from Google
6. Click **"Save"**

### 4.3 Note Your Callback URL
The callback URL format is:
```
https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
```

You'll also need to add this to your app's allowed redirects:
```
http://localhost:3000/auth/callback
```

## Step 5: Configure Environment Variables

### 5.1 Create .env.local File
In your project root (`notion-builder/`), create a file called `.env.local`:

```bash
cd /Users/bijaynayak/Documents/SAAS/03\ Notion\ Template\ Builder/notion-builder
cp .env.example .env.local
```

### 5.2 Fill in Your Credentials
Open `.env.local` and update these values with what you copied from Supabase:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="Notion Template Architect"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase (REQUIRED - from Step 2)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Keep your existing Notion, Razorpay, OpenAI keys...
```

## Step 6: Install Dependencies

```bash
cd /Users/bijaynayak/Documents/SAAS/03\ Notion\ Template\ Builder/notion-builder
npm install
```

This will install:
- `@supabase/ssr`
- `@supabase/supabase-js`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

## Step 7: Test the Setup

### 7.1 Start Development Server
```bash
npm run dev
```

### 7.2 Check Admin Dashboard
1. Open http://localhost:3000/admin/keys
2. Login with password: `admin123`
3. Verify these show as "Configured":
   - ✅ NEXT_PUBLIC_SUPABASE_URL
   - ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   - ✅ SUPABASE_SERVICE_ROLE_KEY

### 7.3 Test Authentication
1. Go to http://localhost:3000
2. Click "Sign In" or "Get Started"
3. Try creating an account with email/password
4. Check Supabase dashboard > Authentication > Users
5. You should see your new user!

### 7.4 Verify Database
1. In Supabase, go to **"Table Editor"**
2. Click on **"users"** table
3. You should see your user profile with:
   - Email
   - Subscription plan (default: "free")
   - Usage counters (0)

## Step 8: Configure Additional Settings (Optional)

### 8.1 Email Templates
1. Go to **"Authentication"** > **"Email Templates"**
2. Customize the confirmation email, reset password email, etc.

### 8.2 URL Configuration
1. Go to **"Authentication"** > **"URL Configuration"**
2. Add your site URL: `http://localhost:3000`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/**` (for wildcards)

### 8.3 Rate Limiting (Recommended)
1. Go to **"Authentication"** > **"Rate Limits"**
2. Keep default settings or adjust as needed

## Troubleshooting

### Issue: "Invalid API key"
- Double-check you copied the full key (they're very long!)
- Make sure there are no extra spaces
- Verify you're using the `anon` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Failed to fetch"
- Check your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Make sure it starts with `https://`
- Verify your project is fully provisioned (wait a few minutes)

### Issue: Google OAuth not working
- Verify redirect URI in Google Cloud Console matches Supabase
- Check that Google provider is enabled in Supabase
- Make sure Client ID and Secret are correct

### Issue: Users table not found
- Go back to SQL Editor and re-run `schema.sql`
- Check for any error messages in the SQL execution
- Verify RLS is enabled on the tables

### Issue: TypeScript errors
- Run `npm install` to install all dependencies
- Restart your IDE/editor
- Clear `.next` folder: `rm -rf .next`

## Next Steps

Once everything is working:

1. ✅ Test the full authentication flow
2. ✅ Try downloading a template (check usage limits)
3. ✅ Verify usage tracking in database
4. ✅ Test with both free and pro accounts
5. ✅ Prepare for production deployment

## Production Setup

When ready to deploy:

1. Create a production Supabase project
2. Run the same schema.sql
3. Update Google OAuth redirect URIs to production domain
4. Update environment variables in Vercel/hosting platform
5. Change admin password from `admin123`!

---

Need help? Check the other documentation files or reach out to support@bartlabs.in
