# Bartlabs Notion Templates - Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Notion Template Marketplace"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Configure Environment Variables** (Optional for now)
   - In Vercel dashboard → Settings → Environment Variables
   - Add `OPENAI_API_KEY` (only needed for custom template generation)

4. **Done!**
   - Your site is live at `your-project.vercel.app`
   - Automatic deployments on every git push

---

## Custom Domain Setup

### Option 1: Use bartlabs.in subdomain
1. In Vercel → Settings → Domains
2. Add `templates.bartlabs.in`
3. Update DNS:
   - Type: CNAME
   - Name: templates
   - Value: cname.vercel-dns.com

### Option 2: New domain
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel → Settings → Domains
3. Add your domain
4. Follow DNS instructions

---

## Environment Variables

### Current Setup
- `NOTION_TOKEN` - No longer needed (can remove)
- `OPENAI_API_KEY` - Only for custom templates (optional)
- `NODE_TLS_REJECT_UNAUTHORIZED=0` - Remove for production

### For Production
Remove `.env.local` and add to Vercel:
```
OPENAI_API_KEY=your_key_here
```

---

## Before Deployment Checklist

- [ ] All 10 templates have duplicate links in metadata.ts
- [ ] Test all duplicate links work
- [ ] Remove `NODE_TLS_REJECT_UNAUTHORIZED=0`
- [ ] Update domain in metadata (layout.tsx)
- [ ] Test marketplace locally
- [ ] Add analytics (optional)

---

## Post-Deployment

### Monitor
- Vercel Analytics (automatic)
- Check error logs in Vercel dashboard

### Update
- Push to GitHub
- Vercel auto-deploys

### Scale
- Free tier: 100GB bandwidth, unlimited requests
- Upgrade to Pro ($20/month) if needed

---

## Alternative: Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

---

## Troubleshooting

### Build Fails
- Check Node version (use 18.x or 20.x)
- Run `npm install` locally
- Check for TypeScript errors

### Duplicate Links Don't Work
- Ensure templates are shared publicly in Notion
- Verify "Allow duplicate as template" is enabled
- Test links in incognito mode

### Slow Performance
- Enable Vercel Analytics
- Check image optimization
- Consider upgrading to Pro

---

## Next Steps

1. Deploy to Vercel
2. Add custom domain
3. Set up analytics
4. Start marketing!

---

## Support

Questions? Contact: support@bartlabs.in
