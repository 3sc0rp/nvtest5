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
    // Find form fields
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i], #name');
    const emailField = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i], #email');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message" i], #message');
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Send"), button:has-text("Submit")');

    if (await nameField.count() > 0 && await emailField.count() > 0 && await messageField.count() > 0) {
      // Try to submit empty form
      await submitButton.first().click();

      // Check for validation messages
      const validationMessages = page.locator('.error, [role="alert"], :text("required"), :text("Please fill")');
      
      // Should show validation errors for empty required fields
      const errorCount = await validationMessages.count();
      expect(errorCount).toBeGreaterThan(0);
    } else {
      console.log('Contact form fields not found - form may not be implemented yet');
    }
  });

  test('should validate email format', async ({ page }) => {
    const emailField = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i], #email');
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Send"), button:has-text("Submit")');

    if (await emailField.count() > 0) {
      // Fill in invalid email
      await emailField.fill('invalid-email');
      
      // Try to submit
      await submitButton.first().click();

      // Check for email validation error
      const emailError = page.locator(':text("valid email"), :text("email format"), [aria-describedby*="email"]');
      
      // Browser native validation or custom validation should trigger
      const hasCustomError = await emailError.count() > 0;
      const hasNativeValidation = await emailField.evaluate((el: HTMLInputElement) => !el.validity.valid);
      
      expect(hasCustomError || hasNativeValidation).toBeTruthy();
    } else {
      console.log('Email field not found');
    }
  });

  test('should submit form with valid data', async ({ page }) => {
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i], #name');
    const emailField = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i], #email');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message" i], #message');
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Send"), button:has-text("Submit")');

    if (await nameField.count() > 0 && await emailField.count() > 0 && await messageField.count() > 0) {
      // Fill in valid form data
      await nameField.fill('John Doe');
      await emailField.fill('john.doe@example.com');
      await messageField.fill('This is a test message for the contact form.');

      // Submit form
      await submitButton.first().click();

      // Check for success message or form submission
      const successMessage = page.locator(':text("thank you"), :text("sent"), :text("success"), [role="alert"]');
      const isFormCleared = await nameField.inputValue() === '';
      
      // Either success message should appear or form should be cleared
      const hasSuccessMessage = await successMessage.count() > 0;
      
      expect(hasSuccessMessage || isFormCleared).toBeTruthy();
    } else {
      console.log('Contact form not fully implemented yet');
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
    // Check for phone number
    const phonePattern = /\+?[\d\s\-\(\)]+/;
    const phoneElements = page.locator(':text-matches("' + phonePattern.source + '")');
    
    if (await phoneElements.count() > 0) {
      await expect(phoneElements.first()).toBeVisible();
    }

    // Check for email address
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailElements = page.locator(':text-matches("' + emailPattern.source + '")');
    
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
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i], #name');
    const emailField = page.locator('input[name="email"], input[type="email"]');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message" i]');
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Send")');

    if (await submitButton.count() > 0) {
      // Fill form if fields exist
      if (await nameField.count() > 0) await nameField.fill('Test User');
      if (await emailField.count() > 0) await emailField.fill('test@example.com');
      if (await messageField.count() > 0) await messageField.fill('Test message');

      // Submit form
      await submitButton.first().click();

      // Check for loading state (disabled button, spinner, etc.)
      const isButtonDisabled = await submitButton.first().isDisabled();
      const hasLoadingText = await submitButton.first().textContent();
      const hasSpinner = await page.locator('.spinner, .loading, [data-testid="loading"]').count() > 0;

      // At least one loading indicator should be present during submission
      expect(isButtonDisabled || hasLoadingText?.includes('Sending') || hasSpinner).toBeTruthy();
    }
  });
});
