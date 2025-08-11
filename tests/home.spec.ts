import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render home page correctly', async ({ page }) => {
    await page.goto('/');

    // Check main heading is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Check navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();

    // Check hero section is visible
    await expect(page.locator('section[role="banner"]')).toBeVisible();

    // Check main CTAs are present
    await expect(page.getByRole('link', { name: /reserve|order|menu/i })).toHaveCount(3);

    // Check footer is present
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Nature Village/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Kurdish/);

    // Check open graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Nature Village/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu button should be visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();

    // Desktop navigation should be visible
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
  });

  test('should load hero image', async ({ page }) => {
    await page.goto('/');

    // Wait for hero image to load
    const heroImage = page.locator('img[alt*="Mountains"]').first();
    await expect(heroImage).toBeVisible();
    
    // Check image has loaded (not broken)
    await expect(heroImage).toHaveJSProperty('complete', true);
    await expect(heroImage).toHaveJSProperty('naturalWidth', expect.not.stringMatching('0'));
  });

  test('should have working skip link', async ({ page }) => {
    await page.goto('/');

    // Focus skip link with keyboard
    await page.keyboard.press('Tab');
    
    // Skip link should be visible when focused
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();

    // Click skip link
    await skipLink.click();

    // Main content should be focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should have accessible heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check heading levels are properly structured
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingTexts = await headings.allTextContents();
    
    expect(headingTexts.length).toBeGreaterThan(0);

    // Should have at least one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
  });
});
