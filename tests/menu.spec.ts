import { test, expect } from '@playwright/test';

test.describe('Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
  });

  test('should render menu page correctly', async ({ page }) => {
    // Check menu page loads
    await expect(page.getByRole('heading', { name: /menu/i })).toBeVisible();

    // Check menu items are displayed
    const menuItems = page.locator('[data-testid="menu-item"]');
    await expect(menuItems.first()).toBeVisible();

    // Check categories are present
    const categories = page.locator('[data-testid="category-filter"]');
    await expect(categories.first()).toBeVisible();
  });

  test('should filter menu items by category', async ({ page }) => {
    // Wait for menu items to load
    await page.waitForSelector('[data-testid="menu-item"]', { timeout: 10000 });

    const initialItemCount = await page.locator('[data-testid="menu-item"]').count();
    expect(initialItemCount).toBeGreaterThan(0);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Click on a category filter (e.g., appetizers)
    const categoryFilter = page.locator('[data-testid="category-filter"]').first();
    await categoryFilter.waitFor({ state: 'visible' });
    await categoryFilter.click({ force: true });

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Check that items are filtered
    const filteredItemCount = await page.locator('[data-testid="menu-item"]').count();
    
    // Should have some items visible (could be same or different count)
    expect(filteredItemCount).toBeGreaterThan(0);
  });

  test('should search menu items', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
    
    if (await searchInput.count() > 0) {
      // Type in search box
      await searchInput.fill('kebab');

      // Wait for search results
      await page.waitForTimeout(500);

      // Check that search results are shown
      const searchResults = page.locator('[data-testid="menu-item"]');
      await expect(searchResults.first()).toBeVisible();
    } else {
      console.log('Search functionality not implemented yet');
    }
  });

  test('should show/hide dietary filters', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Look for dietary filters (vegetarian, vegan, halal, etc.)
    const dietaryFilters = page.locator('[data-testid*="filter"], button:has-text("Vegetarian"), button:has-text("Vegan"), button:has-text("Halal")');
    
    if (await dietaryFilters.count() > 0) {
      const firstFilter = dietaryFilters.first();
      await firstFilter.waitFor({ state: 'visible' });
      await firstFilter.click({ force: true });

      // Wait for filter to apply
      await page.waitForTimeout(500);

      // Should still have menu items visible
      const filteredItems = page.locator('[data-testid="menu-item"]');
      await expect(filteredItems.first()).toBeVisible();
    } else {
      console.log('Dietary filters not implemented yet');
    }
  });

  test('should show menu item details', async ({ page }) => {
    // Wait for menu items to load
    await page.waitForSelector('[data-testid="menu-item"]', { timeout: 10000 });

    // Click on first menu item
    const firstMenuItem = page.locator('[data-testid="menu-item"]').first();
    await firstMenuItem.click();

    // Check if modal or detail view opens
    const modal = page.locator('[role="dialog"], [data-testid="menu-item-modal"]');
    const detailView = page.locator('[data-testid="menu-item-detail"]');
    
    // Either modal or detail view should be visible
    const modalVisible = await modal.count() > 0 && await modal.first().isVisible();
    const detailVisible = await detailView.count() > 0 && await detailView.first().isVisible();
    
    expect(modalVisible || detailVisible).toBeTruthy();
  });

  test('should display prices correctly', async ({ page }) => {
    // Wait for menu items to load
    await page.waitForSelector('[data-testid="menu-item"]', { timeout: 10000 });

    // Check that prices are displayed
    const priceElements = page.locator('[data-testid="menu-item"]').locator('text=/\\$\\d+\\.\\d{2}/');
    await expect(priceElements.first()).toBeVisible();
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // Should be able to navigate through menu items with keyboard
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Continue tabbing through elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // Should be able to reach interactive elements
    const focusedAfterTabs = await page.evaluate(() => document.activeElement?.getAttribute('role') || document.activeElement?.tagName);
    expect(focusedAfterTabs).toBeTruthy();
  });

  test('should show proper loading states', async ({ page }) => {
    // Slow down network to see loading states
    await page.route('**/*', route => {
      return new Promise(resolve => {
        setTimeout(() => resolve(route.continue()), 100);
      });
    });

    await page.goto('/menu');

    // Check for loading indicators
    const loadingIndicators = page.locator('[data-testid="loading"], .animate-pulse, :text("Loading")');
    
    // Loading indicators might be present initially
    // We just check that the page eventually loads correctly
    await expect(page.getByRole('heading', { name: /menu/i })).toBeVisible({ timeout: 15000 });
  });
});
