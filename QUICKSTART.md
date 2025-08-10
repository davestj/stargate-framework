# 🚀 Stargate Framework Quick Start Guide

## Complete Setup in 10 Minutes

### Step 1: Upload Core Files (2 minutes)

Upload these files to `/home/davestj/html/bthl/stargate_framework/`:

1. **header.php** - Shared header component
2. **footer.php** - Shared footer component  
3. **index.php** - Main landing page
4. **css/main.css** - Main stylesheet
5. **js/main.js** - Shared JavaScript
6. **test_setup.php** - Installation verifier

### Step 2: Convert Your HTML Files (3 minutes)

1. Upload `convert_html_to_php.php` to your directory
2. Run from command line:
   ```bash
   cd /home/davestj/html/bthl/stargate_framework/
   php convert_html_to_php.php
   ```
3. This will automatically:
   - Create backups of your HTML files
   - Extract CSS and JavaScript
   - Convert to PHP structure
   - Create necessary directories

### Step 3: Upload SEO Files (1 minute)

1. Create `robots.txt` with the content provided
2. Create `sitemap.xml` with the content provided
3. Create `.htaccess` for clean URLs

### Step 4: Fix Display Issues (2 minutes)

For the wormhole travel dashboard MacBook issue:
1. Upload `css/wormhole_travel_dashboard.css`
2. This fixes the cut-off screen problem

### Step 5: Test Installation (1 minute)

1. Visit: `https://davestj.com/bthl/stargate_framework/test_setup.php`
2. Verify all tests pass
3. Fix any issues shown

### Step 6: Update Header.php (1 minute)

Add these lines to your header.php before `</head>`:

```php
<?php
// Add meta tags
outputMetaTags($current_meta);

// Add analytics tracking
trackVisitor();
?>
```

---

## 🎯 Quick Links for Testing

Once setup is complete, test each tool:

- **Homepage**: https://davestj.com/bthl/stargate_framework/
- **Visualizations**: https://davestj.com/bthl/stargate_framework/interactive_visualization
- **Metrics**: https://davestj.com/bthl/stargate_framework/metrics_feasability_dashboard
- **3D Model**: https://davestj.com/bthl/stargate_framework/3d_interactive_model
- **Simulator**: https://davestj.com/bthl/stargate_framework/wormhole_travel_dashboard
- **Presentations**: https://davestj.com/bthl/stargate_framework/presentation_builder
- **Summaries**: https://davestj.com/bthl/stargate_framework/executive_summary_generator
- **Documentation**: https://davestj.com/bthl/stargate_framework/technical_docs

---

## 💰 Funding Quick Actions

### Week 1: Prepare Materials
1. Generate 3 executive summaries (investor, government, technical)
2. Create presentation deck for your primary target
3. Export metrics data as PDF

### Week 2: Initial Outreach
1. **Government**: Submit to DARPA, NASA NIAC
2. **VCs**: Contact Space Capital, Founders Fund
3. **Corporate**: Reach out to SpaceX partnerships team

### Best Pitch Flow (30 min)
1. Start with 3D model demo (5 min)
2. Show interactive visualizations (10 min)
3. Present metrics dashboard (5 min)
4. Run travel simulator (5 min)
5. Q&A with technical docs ready (5 min)

---

## 🛠️ Troubleshooting

### Common Issues:

**"Page not found" errors**
- Check if `.htaccess` was created
- Verify Apache mod_rewrite is enabled

**CSS/JS not loading**
- Check file permissions: `chmod 644 css/* js/*`
- Verify paths in header.php

**3D model not showing**
- Check Three.js CDN is accessible
- Try different browser (Chrome/Firefox recommended)

**Travel simulator cut off**
- Clear browser cache
- Check css/wormhole_travel_dashboard.css is loaded

---

## 📊 Track Your Success

### Simple Analytics:
1. Visit `/quick_stats.php` for visitor statistics
2. Check `visitor_logs/` directory for daily logs
3. Use Google Analytics for detailed insights

### Key Metrics to Watch:
- Most viewed tool (shows investor interest)
- Time spent on metrics dashboard (serious investors)
- Downloads of executive summaries
- Return visitor rate

---

## 🔐 Security Checklist

- [ ] Password protect `/theoretical_docs/` if sensitive
- [ ] Add `.htaccess` to protect PHP files
- [ ] Regular backups of visitor data
- [ ] Monitor server logs for unusual activity

---

## 📱 Mobile Optimization

The framework is responsive but optimize for:
- **Investors**: Often check on phones - test summaries
- **Engineers**: Use tablets - ensure docs are readable  
- **Demos**: May use various devices - test all tools

---

## 🚀 Launch Checklist

Before sharing with investors:

1. **Technical**
   - [ ] All pages load without errors
   - [ ] No JavaScript console errors
   - [ ] Fast load times (< 3 seconds)
   - [ ] Mobile responsive verified

2. **Content**
   - [ ] Contact info updated
   - [ ] Copyright notices current
   - [ ] Links to papers working
   - [ ] Professional images added

3. **Analytics**
   - [ ] Google Analytics installed
   - [ ] Visitor tracking active
   - [ ] Goal conversions set up
   - [ ] Event tracking configured

4. **SEO**
   - [ ] Meta tags on all pages
   - [ ] Sitemap submitted to Google
   - [ ] robots.txt configured
   - [ ] Schema markup added

---

## 📞 Support Contacts

- **Technical Issues**: davestj@gmail.com
- **GitHub**: https://github.com/davestj
- **Updates**: Check deployment_guide.md

---

## Next Steps

1. **Today**: Complete setup and test all tools
2. **This Week**: Generate materials for top 3 targets
3. **Next Week**: Begin outreach campaign
4. **Month 1**: Iterate based on feedback

Remember: Your visualization tools tell a compelling story. Let them do the heavy lifting while you guide the narrative.

**Good luck with your funding journey! 🌟**

---

*Created by David (davestj) - January 26, 2025*
*Stargate Framework v1.0*
