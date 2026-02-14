import { test, expect } from '@playwright/test';

test.describe('Navbar Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  // TEST 1: Sign Up (This works because it IS a Link)
  test('Sign Up button redirects to register page', async ({ page }) => {
    const signupBtn = page.getByRole('link', { name: 'Sign Up', exact: true });
    await expect(signupBtn).toBeVisible();
    await signupBtn.click();
    await expect(page).toHaveURL(/signup|register/);
  });

  // TEST 2: Movies Tab (FIXED)
  test('Movies button becomes active on click', async ({ page }) => {
    // 1. Find the Movies button
    const moviesBtn = page.getByRole('button', { name: 'Movies', exact: true });

    // 2. Click it
    await moviesBtn.click();

    // 3. FIXED: Don't check URL. Check that the class 'text-blue-400' was added.
    // This confirms the tab switched successfully.
    await expect(moviesBtn).toHaveClass(/text-blue-400/);
  });

  // TEST 3: Genres Dropdown (FIXED for Hover)
  test('Genres dropdown opens on hover', async ({ page }) => {
    const genresBtn = page.getByRole('button', { name: 'Genres' });

    // CRITICAL FIX: Your React code uses 'onMouseEnter', not 'onClick' for desktop!
    // So we must use .hover() instead of .click()
    await genresBtn.hover();

    // Verify "Action" appears in the menu
    // We use a broader selector because 'Action' appears inside the list
    const actionOption = page.getByRole('button', { name: 'Action' }); 
    await expect(actionOption).toBeVisible();
  });

});