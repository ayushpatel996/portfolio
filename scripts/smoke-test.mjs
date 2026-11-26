import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';

const server = await preview({
  base: '/portfolio/',
  preview: { host: '127.0.0.1', port: 0, strictPort: true },
});

let browser;
try {
  const { port } = server.httpServer.address();
  const url = `http://127.0.0.1:${port}/portfolio/`;
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined });

  for (const width of [320, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(7000);
    try {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.getByRole('heading', { level: 1, name: 'Ayush Patel' }).waitFor();

      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
      await page.keyboard.press('Enter');
      await page.waitForURL('**/#main-content');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'main-content');

      const lightMode = page.getByRole('button', { name: 'Light mode. Switch to Dark mode' });
      const darkMode = page.getByRole('button', { name: 'Dark mode. Switch to Light mode' });
      await lightMode.click();
      await darkMode.waitFor();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await darkMode.waitFor();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'charcoal');
      assert.equal(await page.locator('html').evaluate((html) => getComputedStyle(html).scrollBehavior), 'auto');

      const experience = page.getByRole('region', { name: 'Quest log' });
      const timelineItem = experience.locator('ol > li').first();
      assert.equal(await timelineItem.evaluate((item) => getComputedStyle(item).opacity), '1');

      if (width === 320) {
        const quickNav = page.getByRole('navigation', { name: 'Quick navigation' });
        for (const [label, id] of [['Work', 'projects'], ['Experience', 'experience'], ['Contact', 'contact']]) {
          await quickNav.getByRole('link', { name: label, exact: true }).click();
          await page.waitForURL(`**/#${id}`);
          const destination = await page.locator(`#${id}`).boundingBox();
          const header = await page.getByRole('banner').boundingBox();
          assert.ok(destination.y >= header.y + header.height, `${label} should clear the sticky header`);
        }
      } else {
        const sections = page.getByRole('navigation', { name: 'Page sections' });
        await sections.getByRole('link', { name: 'Selected work' }).click();
        await page.waitForURL('**/#projects');
      }

      const overview = page.getByRole('region', { name: 'At a glance' });
      const companies = overview.getByRole('link', { name: /Companies/ });
      const projects = page.getByRole('region', { name: 'Selected work' });
      const skills = page.getByRole('region', { name: 'Skill tree' });
      assert.equal(await companies.innerText(), `${await experience.getByRole('article').count()}\nCompanies`);
      assert.equal(await overview.getByRole('link', { name: /Projects/ }).innerText(), `${await projects.getByRole('article').count()}\nProjects`);
      assert.equal(await overview.getByRole('link', { name: /Skill areas/ }).innerText(), `${await skills.getByRole('article').count()}\nSkill areas`);
      await companies.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL('**/#experience');

      const details = timelineItem.locator('details');
      await details.locator('summary').click();
      assert.equal(await details.evaluate((element) => element.open), true);
      assert.ok(await details.getByText('Built and deployed services with Docker and Kubernetes').isVisible());
      await page.getByRole('link', { name: 'GitHub', exact: true }).waitFor();
      await page.getByRole('link', { name: 'LinkedIn', exact: true }).waitFor();
      await page.getByRole('img', { name: 'HashedIn by Deloitte' }).evaluate((image) => image.decode());
      await page.getByRole('img', { name: 'Infosys' }).evaluate((image) => image.decode());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, 'The page must fit the viewport');
      assert.deepEqual(errors, []);
      console.log(`Portfolio smoke test passed at ${width}px`);
    } finally {
      await page.close();
    }
  }
} finally {
  try {
    await browser?.close();
  } finally {
    await server.close();
  }
}
