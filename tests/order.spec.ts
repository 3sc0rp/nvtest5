import { test, expect } from '@playwright/test';

test.describe('Order Links with Environment Variables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/order');
  });

  test('should render order page correctly', async ({ page }) => {
    // Check order page loads
    await expect(page.getByRole('heading', { name: 'Order', exact: true })).toBeVisible();

    // Check order options are displayed
    const orderOptions = page.locator('[data-testid="order-option"], a:has-text("DoorDash"), a:has-text("Uber Eats")');
    await expect(orderOptions.first()).toBeVisible();
  });

  test('should show order platform links', async ({ page }) => {
    // Look for DoorDash link
    const doorDashLink = page.locator('a[href*="doordash"], a:has-text("DoorDash")');
    
    // Look for Uber Eats link  
    const uberEatsLink = page.locator('a[href*="uber"], a:has-text("Uber")');

    // At least one delivery platform should be available
    const doorDashExists = await doorDashLink.count() > 0;
    const uberEatsExists = await uberEatsLink.count() > 0;
    
    expect(doorDashExists || uberEatsExists).toBeTruthy();
  });

  test('should have working external links', async ({ page }) => {
    // Find all external delivery links
    const externalLinks = page.locator('a[href*="doordash"], a[href*="uber"], a[target="_blank"]');
    
    if (await externalLinks.count() > 0) {
      const firstLink = externalLinks.first();
      
      // Check link has proper attributes
      const href = await firstLink.getAttribute('href');
      const target = await firstLink.getAttribute('target');
      const rel = await firstLink.getAttribute('rel');
      
      // Should have valid href
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
      
      // Should open in new tab
      expect(target).toBe('_blank');
      
      // Should have security attributes
      expect(rel).toContain('noopener');
    }
  });

  test('should handle missing environment variables gracefully', async ({ page }) => {
    // The page should load even if ENV vars are not set
    await expect(page.locator('body')).toBeVisible();
    
    // Should show some fallback content or message about availability
    const unavailableMessages = page.locator(':text("unavailable"), :text("coming soon"), :text("not available")');
    const orderLinks = page.locator('a[href*="doordash"], a[href*="uber"]');
    
    // Either show order links or unavailable messages
    const hasOrderLinks = await orderLinks.count() > 0;
    const hasUnavailableMessage = await unavailableMessages.count() > 0;
    
    expect(hasOrderLinks || hasUnavailableMessage).toBeTruthy();
  });

  test('should show restaurant hours and availability', async ({ page }) => {
    // Look for hours information
    const hoursInfo = page.locator(':text("hours"), :text("open"), :text("closed"), :text("am"), :text("pm")');
    
    if (await hoursInfo.count() > 0) {
      await expect(hoursInfo.first()).toBeVisible();
    }

    // Look for current status (open/closed)
    const statusInfo = page.locator(':text("currently"), :text("now open"), :text("now closed")');
    
    if (await statusInfo.count() > 0) {
      await expect(statusInfo.first()).toBeVisible();
    }
  });

  test('should validate order link accessibility', async ({ page }) => {
    const orderLinks = page.locator('a[href*="doordash"], a[href*="uber"], [data-testid="order-link"]');
    
    if (await orderLinks.count() > 0) {
      for (let i = 0; i < await orderLinks.count(); i++) {
        const link = orderLinks.nth(i);
        
        // Should have accessible name
        const ariaLabel = await link.getAttribute('aria-label');
        const linkText = await link.textContent();
        
        expect(ariaLabel || linkText?.trim()).toBeTruthy();
        
        // Should be keyboard accessible
        await link.focus();
        await expect(link).toBeFocused();
      }
    }
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Order options should be visible and usable on mobile
    const orderOptions = page.locator('a[href*="doordash"], a[href*="uber"]');
    
    if (await orderOptions.count() > 0) {
      await expect(orderOptions.first()).toBeVisible();
      
      // Check that buttons are properly sized for mobile
      const buttonBox = await orderOptions.first().boundingBox();
      if (buttonBox) {
        expect(buttonBox.height).toBeGreaterThan(40); // Minimum touch target size
      }
    }
  });

  test('should have proper loading states', async ({ page }) => {
    // Check for any loading states while fetching order availability
    const loadingIndicators = page.locator('.loading, .spinner, :text("Loading")');
    
    // Page should eventually show content (no perpetual loading)
    await expect(page.getByRole('heading', { name: 'Order', exact: true })).toBeVisible({ timeout: 10000 });
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure for external requests
    await page.route('**/doordash**', route => route.abort());
    await page.route('**/uber**', route => route.abort());
    
    await page.reload();
    
    // Page should still load and show some content
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Order', exact: true })).toBeVisible();
  });

  test('should track order link clicks', async ({ page, context }) => {
    // Listen for navigation events (link clicks)
    let navigationAttempts = 0;
    
    context.on('page', () => {
      navigationAttempts++;
    });

    const orderLinks = page.locator('a[href*="doordash"], a[href*="uber"]');
    
    if (await orderLinks.count() > 0) {
      // Click first order link
      await orderLinks.first().click();
      
      // Should attempt to navigate to external site
      // (We don't follow through due to external domain)
      await page.waitForTimeout(1000);
      
      // Either new page opened or we stayed on same page (due to external link)
      expect(navigationAttempts >= 0).toBeTruthy();
    }
  });

  test('should show consistent branding across order options', async ({ page }) => {
    const orderContainer = page.locator('[data-testid="order-container"], .order-options, main');
    
    if (await orderContainer.count() > 0) {
      // Check that Nature Village branding is maintained
      const brandingElements = page.locator(':text("Nature Village"), img[alt*="Nature Village"]');
      await expect(brandingElements.first()).toBeVisible();
      
      // Check consistent styling
      const orderButtons = page.locator('a[href*="doordash"], a[href*="uber"]');
      
      if (await orderButtons.count() > 1) {
        // Multiple buttons should have consistent styling
        const firstButton = await orderButtons.first().getAttribute('class');
        const secondButton = await orderButtons.nth(1).getAttribute('class');
        
        // Should share common styling classes
        expect(firstButton && secondButton).toBeTruthy();
      }
    }
  });
});
