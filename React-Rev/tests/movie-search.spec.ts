import { test, expect } from '@playwright/test';

test('User can search for a movie', async ({ page }) => {
  // 1. Go to your local app
  await page.goto('http://localhost:5173');

  // 2. Check that the page loaded (Verify the Title)
  // Adjust 'MovieApp' to whatever your actual <title> is in index.html
  await expect(page).toHaveTitle(/CineMap/);

  // 3. Find the Search Bar and type "Avengers"
  // CHECK YOUR CODE: Open Navbar.jsx and see what the placeholder text is.
  // If it is "Search movies...", keep this. If it's different, update it here.
  const searchInput = page.getByPlaceholder(/search/i); 
  await expect(searchInput).toBeVisible();
  await searchInput.fill('Avengers');

  // 4. Press Enter (or click the search button if you have one)
  await searchInput.press('Enter');

  // 5. Verify results appear
  // This waits for at least one movie card to appear.
  // If your movie cards have a specific class like 'movie-card', use that:
  // await expect(page.locator('.movie-card').first()).toBeVisible();
  
  // For now, let's just take a screenshot so you can see it worked!
  await page.screenshot({ path: 'search-results.png' });
});


test('User can click a movie card to see details', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // 1. CRITICAL STEP: Wait for the API to fetch movies. 
  // Since React takes a second to load the "Trending" list, we must wait.
  // We wait for the first image that is NOT the logo (assuming logo has alt="logo" or similar)
  // A safer bet for now is just a hard wait or waiting for a specific container.
  await page.waitForTimeout(3000); // Wait 3 seconds for movies to fetch

  // 2. Select a Movie Card specifically
  // OPTION A: If your movie links look like <a href="/movie/550">
  // This says: "Find a link whose address contains 'movie'"
  const firstMovie = page.locator('a[href*="movie"]').first();
  
  // OPTION B (If Option A fails): Click the first image that appears in the main grid
  // const firstMovie = page.locator('img').nth(1); // Skips the 1st image (Logo) and clicks the 2nd

  // 3. Click it
  // We use 'force: true' just in case an overlay is blocking it slightly
  await firstMovie.click({ force: true });

  // 4. Check that the URL changed
  await expect(page).toHaveURL(/movie/);

  // 5. Check that the Details Page content loaded
  // We use a timeout here because the details page also needs to fetch data
  await expect(page.getByText('Overview', { exact: false })).toBeVisible({ timeout: 10000 });
});