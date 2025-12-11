# Bartlabs Tech Stack - Setup Guide

This guide will help you set up the Notion Template Builder with the new Bartlabs tech stack.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (https://supabase.com)
- A Razorpay account (optional, for payments)
- OpenAI API key (optional, for AI features)

## Step 1: Install Dependencies

The required dependencies have been added to `package.json`. Install them by running:

```bash
npm install
```

This will install:
- `@supabase/ssr` - Supabase client for Next.js App Router
- `@supabase/supabase-js` - Supabase JavaScript client
- `class-variance-authority` - For component variants
- `clsx` - Utility for constructing className strings
- `tailwind-merge` - Merge Tailwind classes without conflicts

## Step 2: Set Up Supabase

1. **Create a new Supabase project** at https://supabase.com/dashboard

2. **Run the database schema**:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `src/config/schema.sql`
   - Paste and execute it in the SQL Editor

3. **Enable Google OAuth** (for social login):
   - Go to Authentication > Providers in Supabase
   - Enable Google provider
   - Add your Google OAuth credentials
   - Add `http://localhost:3000/auth/callback` to authorized redirect URLs for development
   - Add your production URL for production (e.g., `https://notion.bartlabs.in/auth/callback`)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="Notion Template Architect"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL="your-project-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Notion API (Required for Notion integration)
NOTION_CLIENT_ID="your-notion-client-id"
NOTION_CLIENT_SECRET="your-notion-client-secret"
NOTION_REDIRECT_URI="http://localhost:3000/api/auth/notion"

# Razorpay (Optional - for payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# OpenAI (Optional - for AI features)
OPENAI_API_KEY="your-openai-api-key"

# Bartlabs Ecosystem (Optional)
BARTLABS_APP_SECRET="your-app-secret"
BARTLABS_PAYMENT_URL="https://payments.bartlabs.in"

# Admin Dashboard (Optional)
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"
```

### Where to Find Your Keys:

**Supabase**:
- URL and Keys: Project Settings > API
- The anon key is safe to use in the browser
- Keep the service role key secret (server-side only)

**Notion**:
- Create an integration at https://www.notion.so/my-integrations
- Get your Client ID and Secret from the integration settings

**Razorpay**:
- Dashboard: https://dashboard.razorpay.com
- API Keys section

**OpenAI**:
- API Keys: https://platform.openai.com/api-keys

## Step 4: Verify Configuration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the admin dashboard at `http://localhost:3000/admin/keys`

3. Login with your admin password (default: `admin123`)

4. Verify that all required environment variables show as "Configured"

## Step 5: Test Authentication

1. Visit your app at `http://localhost:3000`

2. Click "Sign In" or "Get Started"

3. Try signing up with:
   - Email/password
   - Google OAuth

4. Verify that:
   - User profile is created in Supabase
   - Session persists across page reloads
   - Logout works correctly

## Step 6: Configure Pricing

The pricing configuration is in `src/config/pricing-config.json`. You can customize:

- Plan names and prices
- Feature limits (templates per month, AI generations)
- Trial period settings
- Currency (INR by default)

Example:
```json
{
  "plans": {
    "free": {
      "name": "Free",
      "price": 0,
      "limits": {
        "templatesPerMonth": 3,
        "aiGenerations": 5
      }
    },
    "pro": {
      "name": "Pro",
      "price": 200,
      "limits": {
        "templatesPerMonth": -1,
        "aiGenerations": -1
      }
    }
  }
}
```

Note: `-1` means unlimited.

## Step 7: Deploy to Production

1. **Update environment variables** in your hosting platform (Vercel, etc.)

2. **Update OAuth redirect URLs**:
   - Supabase: Add production URL to allowed redirect URLs
   - Notion: Update redirect URI to production URL

3. **Run database migrations** on production Supabase instance

4. **Test the full flow** in production

## Troubleshooting

### "Cannot find module '@supabase/ssr'"
Run `npm install` to install all dependencies.

### Authentication not working
- Check that Supabase URL and keys are correct
- Verify OAuth redirect URLs are configured
- Check browser console for errors

### Database errors
- Ensure schema.sql has been executed in Supabase
- Check that RLS policies are enabled
- Verify service role key is correct

### Admin dashboard not accessible
- Check NEXT_PUBLIC_ADMIN_PASSWORD is set
- Try the default password: `admin123`

## Next Steps

- Customize the pricing plans in `pricing-config.json`
- Set up payment integration with Razorpay
- Configure email notifications
- Add custom branding and styling
- Set up monitoring and analytics

## Support

For issues or questions:
- Check the documentation in `/docs`
- Visit https://bartlabs.in
- Contact support@bartlabs.in
