#!/usr/bin/env node

/**
 * Performance Audit Script for Nature Village
 * Measures Core Web Vitals and Lighthouse scores
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceAudit(url = 'http://localhost:3000') {
  console.log('🚀 Starting Performance Audit for Nature Village...\n');

  let chrome;
  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    });

    // Run Lighthouse audit
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
      throttlingMethod: 'simulate',
      throttling: {
        rttMs: 150,
        throughputKbps: 1.6 * 1024,
        cpuSlowdownMultiplier: 4,
      },
      emulatedFormFactor: 'mobile',
    };

    console.log('📱 Running mobile performance audit...');
    const mobileResults = await lighthouse(url, options);
    
    // Switch to desktop
    options.emulatedFormFactor = 'desktop';
    options.throttling = {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    };

    console.log('💻 Running desktop performance audit...');
    const desktopResults = await lighthouse(url, options);

    // Parse results
    const mobileScore = Math.round(mobileResults.lhr.categories.performance.score * 100);
    const desktopScore = Math.round(desktopResults.lhr.categories.performance.score * 100);

    // Core Web Vitals
    const mobileAudits = mobileResults.lhr.audits;
    const desktopAudits = desktopResults.lhr.audits;

    console.log('\n📊 PERFORMANCE RESULTS\n');
    console.log('=' .repeat(50));
    
    // Lighthouse scores
    console.log('\n🎯 LIGHTHOUSE SCORES:');
    console.log(`Mobile:  ${mobileScore}/100 ${mobileScore >= 95 ? '✅' : mobileScore >= 90 ? '⚠️' : '❌'}`);
    console.log(`Desktop: ${desktopScore}/100 ${desktopScore >= 95 ? '✅' : desktopScore >= 90 ? '⚠️' : '❌'}`);

    // Core Web Vitals - Mobile
    console.log('\n📱 CORE WEB VITALS (Mobile):');
    
    const mobileMetrics = {
      'First Contentful Paint': mobileAudits['first-contentful-paint']?.displayValue || 'N/A',
      'Largest Contentful Paint': mobileAudits['largest-contentful-paint']?.displayValue || 'N/A',
      'Cumulative Layout Shift': mobileAudits['cumulative-layout-shift']?.displayValue || 'N/A',
      'First Input Delay': mobileAudits['max-potential-fid']?.displayValue || 'N/A',
      'Speed Index': mobileAudits['speed-index']?.displayValue || 'N/A',
      'Total Blocking Time': mobileAudits['total-blocking-time']?.displayValue || 'N/A'
    };

    Object.entries(mobileMetrics).forEach(([metric, value]) => {
      console.log(`${metric}: ${value}`);
    });

    // Core Web Vitals - Desktop
    console.log('\n💻 CORE WEB VITALS (Desktop):');
    
    const desktopMetrics = {
      'First Contentful Paint': desktopAudits['first-contentful-paint']?.displayValue || 'N/A',
      'Largest Contentful Paint': desktopAudits['largest-contentful-paint']?.displayValue || 'N/A',
      'Cumulative Layout Shift': desktopAudits['cumulative-layout-shift']?.displayValue || 'N/A',
      'First Input Delay': desktopAudits['max-potential-fid']?.displayValue || 'N/A',
      'Speed Index': desktopAudits['speed-index']?.displayValue || 'N/A',
      'Total Blocking Time': desktopAudits['total-blocking-time']?.displayValue || 'N/A'
    };

    Object.entries(desktopMetrics).forEach(([metric, value]) => {
      console.log(`${metric}: ${value}`);
    });

    // Performance opportunities
    console.log('\n💡 OPTIMIZATION OPPORTUNITIES:');
    
    const opportunities = mobileResults.lhr.audits;
    const majorOpportunities = Object.values(opportunities)
      .filter(audit => 
        audit.score !== null && 
        audit.score < 0.9 && 
        audit.details?.overallSavingsMs > 100
      )
      .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
      .slice(0, 5);

    if (majorOpportunities.length === 0) {
      console.log('✅ No major performance opportunities found!');
    } else {
      majorOpportunities.forEach(audit => {
        const savings = audit.details?.overallSavingsMs || 0;
        console.log(`• ${audit.title}: ${Math.round(savings)}ms savings`);
      });
    }

    // Success criteria check
    console.log('\n🎯 SUCCESS CRITERIA:');
    console.log(`Mobile Performance ≥95: ${mobileScore >= 95 ? '✅ PASS' : '❌ FAIL'} (${mobileScore}/100)`);
    
    const mobileCLS = parseFloat(mobileAudits['cumulative-layout-shift']?.numericValue || 1);
    console.log(`CLS <0.05: ${mobileCLS < 0.05 ? '✅ PASS' : '❌ FAIL'} (${mobileCLS.toFixed(3)})`);

    // Resource analysis
    console.log('\n📦 RESOURCE ANALYSIS:');
    const resourceSummary = mobileAudits['resource-summary'];
    if (resourceSummary?.details?.items) {
      resourceSummary.details.items.forEach(item => {
        console.log(`${item.resourceType}: ${item.requestCount} requests, ${Math.round(item.transferSize / 1024)}KB`);
      });
    }

    console.log('\n' + '='.repeat(50));
    console.log('🏁 Performance audit completed!');
    
    // Overall status
    if (mobileScore >= 95 && mobileCLS < 0.05) {
      console.log('🎉 ALL PERFORMANCE TARGETS MET!');
    } else {
      console.log('⚠️  Some performance targets need improvement.');
    }

  } catch (error) {
    console.error('❌ Error running performance audit:', error.message);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Run the audit
const url = process.argv[2] || 'http://localhost:3000';
runPerformanceAudit(url).catch(console.error);
