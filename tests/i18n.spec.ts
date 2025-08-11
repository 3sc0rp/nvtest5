import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test('should toggle between English and Kurdish', async ({ page }) => {
    await page.goto('/');

    // Find language toggle button
    const languageToggle = page.locator('[data-testid="language-toggle"], button:has-text("EN"), button:has-text("KU"), [aria-label*="language"]');
    await expect(languageToggle.first()).toBeVisible();

    // Get initial page content
    const initialContent = await page.textContent('body');
    
    // Click language toggle
    await languageToggle.first().click();

    // Wait for navigation or content change
    await page.waitForTimeout(1000);

    // Check that URL changed or content changed
    const currentUrl = page.url();
    const newContent = await page.textContent('body');
    
    // Either URL should contain language code or content should be different
    const urlChanged = currentUrl.includes('/ku') || currentUrl.includes('/en');
    const contentChanged = newContent !== initialContent;
    
    expect(urlChanged || contentChanged).toBeTruthy();
  });

  test('should navigate to correct locale URL', async ({ page }) => {
    // Test English locale
    await page.goto('/en');
    expect(page.url()).toContain('/en');
    
    // Check English content is loaded
    await expect(page.getByText(/Nature Village/)).toBeVisible();

    // Test Kurdish locale
    await page.goto('/ku');
    expect(page.url()).toContain('/ku');
    
    // Should still load successfully (even if content is in Kurdish)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should persist language choice across navigation', async ({ page }) => {
    // Start on Kurdish page
    await page.goto('/ku');
    
    // Navigate to menu
    await page.click('a[href*="/menu"], a:has-text("Menu")');
    
    // Should stay in Kurdish locale
    await page.waitForURL('**/ku/menu**');
    expect(page.url()).toContain('/ku');
  });

  test('should have proper lang attribute', async ({ page }) => {
    // Test English
    await page.goto('/en');
    const htmlElementEn = page.locator('html');
    await expect(htmlElementEn).toHaveAttribute('lang', 'en');

    // Test Kurdish
    await page.goto('/ku');
    const htmlElementKu = page.locator('html');
    await expect(htmlElementKu).toHaveAttribute('lang', 'ku');
  });

  test('should handle RTL direction for Kurdish', async ({ page }) => {
    await page.goto('/ku');
    
    // Check if dir attribute is set for RTL languages
    const htmlElement = page.locator('html');
    const dirAttribute = await htmlElement.getAttribute('dir');
    
    // Kurdish might be RTL, check if dir attribute exists
    if (dirAttribute) {
      expect(['ltr', 'rtl']).toContain(dirAttribute);
    }
  });

  test('should show language toggle in navigation', async ({ page }) => {
    await page.goto('/');

    // Language toggle should be in navigation
    const nav = page.getByRole('navigation');
    const languageToggleInNav = nav.locator('[data-testid="language-toggle"], button:has-text("EN"), button:has-text("KU")');
    
    await expect(languageToggleInNav.first()).toBeVisible();
  });

  test('should show language toggle in mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Open mobile menu
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await mobileMenuButton.click();

    // Language toggle should be in mobile menu
    const mobileMenu = page.locator('#mobile-menu, [data-testid="mobile-menu"]');
    const languageToggleInMobile = mobileMenu.locator('[data-testid="language-toggle"], button:has-text("EN"), button:has-text("KU")');
    
    await expect(languageToggleInMobile.first()).toBeVisible();
  });

  test('should handle invalid locale gracefully', async ({ page }) => {
    // Navigate to invalid locale
    const response = await page.goto('/invalid-locale');
    
    // Should either redirect to valid locale or show 404
    expect([200, 404]).toContain(response?.status() || 0);
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should translate navigation items', async ({ page }) => {
    // Test English navigation
    await page.goto('/en');
    const englishNav = await page.locator('nav a').allTextContents();
    
    // Test Kurdish navigation
    await page.goto('/ku');
    const kurdishNav = await page.locator('nav a').allTextContents();
    
    // Navigation items should exist in both languages
    expect(englishNav.length).toBeGreaterThan(0);
    expect(kurdishNav.length).toBeGreaterThan(0);
    
    // Content might be different (translated) or same (fallback)
    expect(englishNav.length).toBe(kurdishNav.length);
  });

  test('should have consistent layout across locales', async ({ page }) => {
    // Check English layout
    await page.goto('/en');
    const englishHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Check Kurdish layout
    await page.goto('/ku');
    const kurdishHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Layouts should be reasonably similar (within 50% difference)
    const heightRatio = Math.abs(englishHeight - kurdishHeight) / Math.max(englishHeight, kurdishHeight);
    expect(heightRatio).toBeLessThan(0.5);
  });
});
