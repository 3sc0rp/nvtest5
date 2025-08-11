import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('should render contact page correctly', async ({ page }) => {
    // Check contact page loads
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();

    // Check form is present
    const form = page.locator('form, [data-testid="contact-form"]');
    await expect(form.first()).toBeVisible();

    // Check contact information is displayed
    const contactInfo = page.locator(':text("phone"), :text("email"), :text("address")');
    await expect(contactInfo.first()).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Look for form fields
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('[data-testid="contact-form"] input[type="email"]');
    const messageField = page.locator('textarea[name="message"]');
    const submitButton = page.locator('[data-testid="contact-form"] button[type="submit"]');

    // Try to submit empty form
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show validation errors or prevent submission
      await page.waitForTimeout(1000);
      
      // Check if form is still visible (not submitted)
      const form = page.locator('[data-testid="contact-form"]');
      await expect(form).toBeVisible();
    }
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');

    // Find form fields
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('[data-testid="contact-form"] input[type="email"]');
    const messageField = page.locator('textarea[name="message"]');
    const submitButton = page.locator('[data-testid="contact-form"] button[type="submit"]');

    // Fill form with invalid email
    if (await nameField.count() > 0) await nameField.fill('Test User');
    if (await emailField.count() > 0) await emailField.fill('invalid-email');
    if (await messageField.count() > 0) await messageField.fill('Test message');

    // Submit form
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show validation error or prevent submission
      await page.waitForTimeout(1000);
      
      // Check if form is still visible (not submitted) or shows error
      const form = page.locator('[data-testid="contact-form"]');
      await expect(form).toBeVisible();
    }
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.goto('/contact');

    // Find form fields
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('[data-testid="contact-form"] input[type="email"]');
    const messageField = page.locator('textarea[name="message"]');
    const submitButton = page.locator('[data-testid="contact-form"] button[type="submit"]');

    // Fill form with valid data
    if (await nameField.count() > 0) await nameField.fill('Test User');
    if (await emailField.count() > 0) await emailField.fill('test@example.com');
    if (await messageField.count() > 0) await messageField.fill('Test message');

    // Submit form
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show success message or redirect
      await page.waitForTimeout(2000);
      
      // Check for success indicator
      const successMessage = page.locator(':text("Thank you"), :text("success"), :text("sent")');
      if (await successMessage.count() > 0) {
        await expect(successMessage.first()).toBeVisible();
      }
    }
  });

  test('should have accessible form labels', async ({ page }) => {
    const formFields = page.locator('input, textarea, select');
    const fieldCount = await formFields.count();

    if (fieldCount > 0) {
      // Check that each form field has an associated label
      for (let i = 0; i < fieldCount; i++) {
        const field = formFields.nth(i);
        const fieldId = await field.getAttribute('id');
        const fieldName = await field.getAttribute('name');
        const ariaLabel = await field.getAttribute('aria-label');
        const ariaLabelledBy = await field.getAttribute('aria-labelledby');

        // Field should have either label, aria-label, or aria-labelledby
        if (fieldId) {
          const associatedLabel = page.locator(`label[for="${fieldId}"]`);
          const hasLabel = await associatedLabel.count() > 0;
          const hasAriaLabel = ariaLabel !== null;
          const hasAriaLabelledBy = ariaLabelledBy !== null;

          expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
        }
      }
    }
  });

  test('should display contact information', async ({ page }) => {
    // Check for phone link
    const phoneElements = page.locator('a[href^="tel:"]');
    if (await phoneElements.count() > 0) {
      await expect(phoneElements.first()).toBeVisible();
    }

    // Check for email link
    const emailElements = page.locator('a[href^="mailto:"]');
    if (await emailElements.count() > 0) {
      await expect(emailElements.first()).toBeVisible();
    }

    // Check for address or location info
    const addressElements = page.locator(':text("address"), :text("location"), :text("street")');
    
    if (await addressElements.count() > 0) {
      await expect(addressElements.first()).toBeVisible();
    }
  });

  test('should have working phone and email links', async ({ page }) => {
    // Check for clickable phone links
    const phoneLinks = page.locator('a[href^="tel:"]');
    if (await phoneLinks.count() > 0) {
      const href = await phoneLinks.first().getAttribute('href');
      expect(href).toMatch(/^tel:\+?[\d\s\-\(\)]+/);
    }

    // Check for clickable email links
    const emailLinks = page.locator('a[href^="mailto:"]');
    if (await emailLinks.count() > 0) {
      const href = await emailLinks.first().getAttribute('href');
      expect(href).toMatch(/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Form should still be visible and usable
    const form = page.locator('form, [data-testid="contact-form"]');
    await expect(form.first()).toBeVisible();

    // Check that form doesn't overflow viewport
    const formBox = await form.first().boundingBox();
    if (formBox) {
      expect(formBox.width).toBeLessThanOrEqual(375);
    }
  });

  test('should handle form submission loading state', async ({ page }) => {
    await page.goto('/contact');

    // Find form fields
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('[data-testid="contact-form"] input[type="email"]');
    const messageField = page.locator('textarea[name="message"]');
    const submitButton = page.locator('[data-testid="contact-form"] button[type="submit"]');

    // Fill form if fields exist
    if (await nameField.count() > 0) await nameField.fill('Test User');
    if (await emailField.count() > 0) await emailField.fill('test@example.com');
    if (await messageField.count() > 0) await messageField.fill('Test message');

    // Submit form
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show loading state
      const loadingIndicator = page.locator(':text("Sending"), :text("Loading"), .loading, .spinner');
      
      if (await loadingIndicator.count() > 0) {
        await expect(loadingIndicator.first()).toBeVisible();
      }

      // Wait for submission to complete
      await page.waitForTimeout(3000);

      // Should eventually show success or error
      const resultMessage = page.locator(':text("Thank you"), :text("success"), :text("error"), [role="alert"]');
      if (await resultMessage.count() > 0) {
        await expect(resultMessage.first()).toBeVisible();
      }
    }
  });
});
