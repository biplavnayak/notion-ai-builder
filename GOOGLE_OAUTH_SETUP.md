# 🔐 Google OAuth Setup Guide for NotionStruct

## ✅ Current Status
- Supabase is **UNPAUSED** and working ✅
- Google login **redirects to Google** successfully ✅
- Need to complete OAuth configuration to finish the login flow ⏳

---

## 📋 Step-by-Step Google OAuth Setup

### Part 1: Create Google OAuth Credentials

#### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com/

#### 1.2 Create or Select a Project
- Click on the project dropdown at the top
- Either select an existing project or create a new one
- Project name suggestion: "NotionStruct" or "Notion Builder"

#### 1.3 Enable Google+ API (if not already enabled)
1. Go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and click **Enable**

#### 1.4 Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click **Create**
4. Fill in the required fields:
   - **App name**: NotionStruct
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **Save and Continue**
6. Skip **Scopes** (click Save and Continue)
7. Add test users if needed (optional for development)
8. Click **Save and Continue**

#### 1.5 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Name: "NotionStruct Web Client"
6. **Authorized JavaScript origins**: (leave empty for now)
7. **Authorized redirect URIs**: Add this EXACT URL:
   ```
   https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback
   ```
8. Click **CREATE**
9. **SAVE YOUR CREDENTIALS:**
   - Client ID (looks like: `123456789-abc123.apps.googleusercontent.com`)
   - Client Secret (looks like: `GOCSPX-abc123xyz789`)

---

### Part 2: Configure Google Provider in Supabase

#### 2.1 Log in to Supabase
Visit: https://supabase.com/dashboard/sign-in

#### 2.2 Navigate to Auth Providers
Direct link: https://supabase.com/dashboard/project/gxncoofcwpvzbktjgvhw/auth/providers

#### 2.3 Enable Google Provider
1. Find **Google** in the list of providers
2. Click on it to expand the configuration
3. Toggle the switch to **Enable**
4. Enter your credentials from Google Cloud Console:
   - **Client ID**: Paste the Client ID from step 1.5
   - **Client Secret**: Paste the Client Secret from step 1.5
5. Verify the **Redirect URL** shows:
   ```
   https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback
   ```
6. Click **Save**

---

### Part 3: Test Google Login

#### 3.1 Test on Localhost
1. Go to http://localhost:3000
2. Click **Sign In**
3. Click **Continue with Google**
4. Select your Google account
5. You should be redirected back to the app and logged in ✅

#### 3.2 If Login Fails
Check these common issues:
- ✅ Verify the redirect URI in Google Cloud matches exactly: `https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback`
- ✅ Ensure Google provider is enabled in Supabase
- ✅ Check that Client ID and Secret are correct
- ✅ Make sure Supabase project is not paused
- ✅ Clear browser cache and cookies

---

## 🚀 After Google OAuth is Working

Once Google login works on localhost, you need to:

### 1. Add Environment Variables to Vercel
Go to: https://vercel.com/bart-labs-projects/notion-ai-builder/settings/environment-variables

Add all 8 variables (see COMPLETE_SETUP_GUIDE.md for the full list)

### 2. Configure Custom Domain
Go to: https://vercel.com/bart-labs-projects/notion-ai-builder/settings/domains

Add: `notionstruct.bartlabs.in`

### 3. Update Google OAuth for Production
Once your custom domain is set up, add an additional redirect URI in Google Cloud Console:
```
https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback
```
(This should already be there, just verify it)

---

## 📸 Visual Checklist

### Google Cloud Console
- [ ] Project created/selected
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Redirect URI added: `https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback`
- [ ] Client ID and Secret saved

### Supabase Dashboard
- [ ] Logged in to Supabase
- [ ] Navigated to Auth Providers
- [ ] Google provider enabled
- [ ] Client ID entered
- [ ] Client Secret entered
- [ ] Configuration saved

### Testing
- [ ] Localhost Google login works
- [ ] User is redirected back after login
- [ ] User profile shows in app

---

## 🆘 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:** The redirect URI in Google Cloud Console must EXACTLY match:
```
https://gxncoofcwpvzbktjgvhw.supabase.co/auth/v1/callback
```
No trailing slashes, no http (must be https), exact match.

### Error: "Access blocked: This app's request is invalid"
**Solution:** 
1. Make sure OAuth consent screen is configured
2. Add your email as a test user
3. Verify the app is not in "Production" mode (use "Testing" mode for development)

### Error: DNS_PROBE_FINISHED_NXDOMAIN
**Solution:** This means Supabase was paused. You've already fixed this! ✅

### Login redirects but doesn't complete
**Solution:**
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check Supabase logs: https://supabase.com/dashboard/project/gxncoofcwpvzbktjgvhw/logs/explorer

---

## ✅ Success Criteria

You'll know Google OAuth is working when:
1. ✅ Clicking "Continue with Google" redirects to Google
2. ✅ Selecting an account redirects back to your app
3. ✅ User is logged in (profile shows in top right)
4. ✅ No errors in browser console
5. ✅ User data is stored in Supabase auth.users table

---

**Last Updated:** December 11, 2025
**Status:** Ready for configuration
