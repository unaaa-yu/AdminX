import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// 1. Root → /login
await page.goto('http://localhost:5173/');
await page.waitForURL('**/login', { timeout: 6000 });
console.log('✓ Root redirects to /login');
await page.screenshot({ path: '/tmp/01-login.png' });

// 2. Login as admin
await page.fill('input[placeholder="用户名"]', 'admin');
await page.fill('input[placeholder="密码"]', 'admin');
await page.click('button[type="submit"]');
await page.waitForURL('**/home', { timeout: 6000 });
await page.waitForTimeout(1800);
console.log('✓ Login → /home');
await page.screenshot({ path: '/tmp/02-home.png' });

// 3. ECharts canvases
const canvases = await page.locator('canvas').count();
console.log('✓ ECharts canvases:', canvases);

// 4. Sidebar
const menuItems = await page.locator('.ant-menu-item').allTextContents();
console.log('✓ Sidebar:', menuItems);

// 5. Breadcrumb
const breadcrumb = await page.locator('.ant-breadcrumb').textContent();
console.log('✓ Breadcrumb:', breadcrumb.trim());

// 6. User page
await page.click('text=用户管理');
await page.waitForURL('**/user', { timeout: 5000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/03-user.png' });
const rowCount = await page.locator('.ant-table-row').count();
console.log('✓ User page rows:', rowCount);

// 7. Add user modal — find the exact button
const addBtn = page.locator('button', { hasText: '新增用户' });
console.log('  add button visible:', await addBtn.isVisible());
await addBtn.click();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/04-after-click.png' });

// try multiple modal selectors
const modalSelectors = ['.ant-modal-content', '[role="dialog"]', '.ant-modal', '.ant-drawer-content'];
for (const sel of modalSelectors) {
  const count = await page.locator(sel).count();
  if (count > 0) console.log('  modal found with:', sel);
}
await page.screenshot({ path: '/tmp/04-modal.png' });

// 8. Close modal if open and navigate to mall
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// 9. Mall page
await page.click('text=商品管理');
await page.waitForURL('**/mall', { timeout: 5000 });
await page.screenshot({ path: '/tmp/05-mall.png' });
const mallBreadcrumb = await page.locator('.ant-breadcrumb').textContent();
console.log('✓ Mall breadcrumb:', mallBreadcrumb.trim());

// 10. Logout
await page.click('.ant-avatar');
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/06-dropdown.png' });
const logoutBtn = page.locator('text=退出登录');
console.log('  logout visible:', await logoutBtn.isVisible());
await logoutBtn.click();
await page.waitForURL('**/login', { timeout: 5000 });
console.log('✓ Logout → /login');
await page.screenshot({ path: '/tmp/07-loggedout.png' });

await browser.close();
console.log('\nAll checks passed ✓');
