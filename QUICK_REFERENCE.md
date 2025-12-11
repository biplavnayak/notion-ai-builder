# Bartlabs Tech Stack - Quick Reference

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/config/env.ts` | Environment variable validation |
| `src/config/pricing-config.json` | Pricing plans configuration |
| `src/config/schema.sql` | Supabase database schema |
| `src/lib/useUser.ts` | User authentication hook |
| `src/lib/pricing.ts` | Pricing helper functions |
| `.env.local` | Your environment variables (create from `.env.example`) |

## 🔑 Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-key"
```

## 🎯 Common Tasks

### Check User Authentication
```typescript
import { useUser } from "@/lib/useUser";

const { user, isAuthenticated, isPro } = useUser();
```

### Check Usage Limits
```typescript
const { canDownloadTemplate, canUseAI } = useUser();

if (!canDownloadTemplate) {
  // Show upgrade prompt
}
```

### Get Pricing Info
```typescript
import { getPlanDetails, formatPrice } from "@/lib/pricing";

const plan = getPlanDetails("pro");
const price = formatPrice(plan.price, plan.currency); // "₹200"
```

### Access Supabase Client
```typescript
// Client-side
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// Server-side
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();
```

## 🔐 Admin Dashboard

- **URL**: `/admin/keys`
- **Default Password**: `admin123` (change in production!)
- **Purpose**: View environment configuration, verify API keys

## 📊 Pricing Plans

| Plan | Price | Templates/Month | AI Generations |
|------|-------|-----------------|----------------|
| Free | ₹0 | 3 | 5 |
| Pro | ₹200 | Unlimited | Unlimited |

Edit in `src/config/pricing-config.json`

## 🗄️ Database Tables

### users
- User profiles and subscription data
- Notion integration tokens
- Usage tracking

### template_downloads
- Track template downloads
- Enforce monthly limits

### ai_generations
- Track AI usage
- Enforce generation limits

## 🔒 Security

- **RLS Enabled**: All tables have Row Level Security
- **Type-Safe Env**: Validated at build time
- **Password Protected**: Admin dashboard requires authentication
- **OAuth Support**: Google sign-in enabled

## 🐛 Troubleshooting

### "Cannot find module '@supabase/ssr'"
```bash
npm install
```

### Authentication not working
1. Check Supabase URL and keys in `.env.local`
2. Verify OAuth redirect URLs in Supabase dashboard
3. Check browser console for errors

### Database errors
1. Ensure `schema.sql` was executed in Supabase
2. Check RLS policies are enabled
3. Verify service role key is correct

## 📚 Documentation

- [BARTLABS_SETUP.md](./BARTLABS_SETUP.md) - Complete setup guide
- [FIREBASE_TO_SUPABASE_MIGRATION.md](./FIREBASE_TO_SUPABASE_MIGRATION.md) - Migration guide
- [BARTLABS_INTEGRATION_SUMMARY.md](./BARTLABS_INTEGRATION_SUMMARY.md) - What changed

## 🆘 Support

- **Bartlabs**: https://bartlabs.in
- **Email**: support@bartlabs.in
- **Supabase Docs**: https://supabase.com/docs

## ✅ Pre-Deployment Checklist

- [ ] Run `npm install`
- [ ] Create Supabase project
- [ ] Execute `schema.sql` in Supabase
- [ ] Configure `.env.local`
- [ ] Enable Google OAuth
- [ ] Test authentication flow
- [ ] Change admin password
- [ ] Update production environment variables
