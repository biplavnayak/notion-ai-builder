# Firebase to Supabase Migration Guide

This document outlines the migration from Firebase to Supabase for the Notion Template Builder.

## Overview

The Bartlabs tech stack uses Supabase instead of Firebase for:
- **Authentication**: More flexible, open-source, and cost-effective
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Built-in real-time subscriptions
- **Storage**: File storage capabilities

## What Changed

### Authentication

**Before (Firebase)**:
```typescript
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

await signInWithEmailAndPassword(auth, email, password);
```

**After (Supabase)**:
```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
await supabase.auth.signInWithPassword({ email, password });
```

### User Profile Access

**Before (Firebase)**:
```typescript
import { useAuth } from "@/lib/firebase/auth-context";

const { user } = useAuth();
```

**After (Supabase)**:
```typescript
import { useUser } from "@/lib/useUser";

const { user, isPro, canDownloadTemplate } = useUser();
```

### Database Queries

**Before (Firebase Firestore)**:
```typescript
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const snapshot = await getDocs(collection(db, "templates"));
```

**After (Supabase)**:
```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const { data } = await supabase.from("templates").select("*");
```

## Migration Steps

### 1. Export User Data (If You Have Existing Users)

If you have existing Firebase users, you'll need to migrate them:

1. **Export from Firebase**:
   ```bash
   # Use Firebase Admin SDK to export users
   # This is a manual process - contact Firebase support for bulk export
   ```

2. **Import to Supabase**:
   ```sql
   -- In Supabase SQL Editor
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES (...);
   ```

### 2. Update Authentication Code

All authentication code has been updated to use Supabase:

- ✅ `LoginModal.tsx` - Updated to use Supabase auth
- ✅ `layout.tsx` - Removed Firebase AuthProvider
- ✅ Created `useUser.ts` hook for auth state
- ✅ Created OAuth callback route

### 3. Database Schema

The new Supabase schema includes:

**Users Table**:
- All auth user data
- Subscription information
- Notion integration tokens
- Usage tracking (templates downloaded, AI generations)

**Template Downloads Table**:
- Track what users download
- Enforce usage limits

**AI Generations Table**:
- Track AI usage
- Enforce generation limits

### 4. Row Level Security (RLS)

Supabase uses RLS for security. Policies have been created:

```sql
-- Users can only see their own data
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

-- Users can only update their own data
create policy "Users can update own data" on public.users
  for update using (auth.uid() = id);
```

### 5. Environment Variables

**Removed**:
- All Firebase configuration variables

**Added**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 6. Dependencies

**Removed**:
```json
{
  "firebase": "^12.6.0"
}
```

**Added**:
```json
{
  "@supabase/ssr": "^0.5.2",
  "@supabase/supabase-js": "^2.45.4"
}
```

## Breaking Changes

### For Existing Users

⚠️ **Important**: Existing users will need to re-authenticate.

Options:
1. **Fresh Start**: All users create new accounts (simplest)
2. **Manual Migration**: Export Firebase users and import to Supabase
3. **Dual Auth**: Temporarily support both (complex, not recommended)

### For Developers

1. **Auth Context Removed**: Use `useUser()` hook instead
2. **Firebase SDK Removed**: All Firebase imports will fail
3. **Database Structure**: Different from Firestore (SQL vs NoSQL)

## New Features

### Subscription Tracking

The new system tracks:
- Current subscription plan (free/pro)
- Usage limits (templates downloaded, AI generations)
- Grandfathered pricing (price lock for existing users)

### Usage Limits

```typescript
const { canDownloadTemplate, canUseAI } = useUser();

if (!canDownloadTemplate) {
  // Show upgrade prompt
}
```

### Admin Dashboard

New admin panel at `/admin/keys` for:
- Viewing environment configuration
- Checking API key status
- Quick links to dashboards

## Testing Checklist

After migration, test:

- [ ] User signup with email/password
- [ ] User signup with Google OAuth
- [ ] User login with email/password
- [ ] User login with Google OAuth
- [ ] Session persistence across page reloads
- [ ] Logout functionality
- [ ] User profile data retrieval
- [ ] Usage limit enforcement
- [ ] Subscription status checks
- [ ] Admin dashboard access

## Rollback Plan

If you need to rollback:

1. Revert `package.json` to include Firebase
2. Restore Firebase auth files from git history
3. Update `.env.local` with Firebase credentials
4. Run `npm install`

## Support

For migration assistance:
- Email: support@bartlabs.in
- Documentation: https://bartlabs.in/docs
- Supabase Docs: https://supabase.com/docs

## Timeline

Estimated migration time: **2-4 hours**

- Setup Supabase project: 30 minutes
- Run database schema: 15 minutes
- Configure environment: 15 minutes
- Test authentication: 30 minutes
- Test full application: 1-2 hours
- Deploy to production: 30 minutes
