import fs from "fs/promises";
import { closeBrowser, scrapePage } from "./dist/scraper.js";

const urls = [
  "https://help.salesforce.com/s/articleView?id=ind.lsc_customer_engagement_setup_basics.htm&type=5",
  "https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_customer_engagement_data_model.htm",
];

async function run() {
  try {
    for (const u of urls) {
      console.error(`Scraping: ${u}`);
      const res = await scrapePage(u, new URL(u).origin);
      if (res.error) {
        console.error(`Error scraping ${u}: ${res.error}`);
        continue;
      }
      const safeName = u.replace(/[^a-z0-9]/gi, "_").slice(0, 120);
      const mdPath = `./output_${safeName}.md`;
      const info = `# URL: ${res.url}\n# Title: ${res.title}\n# Hash: ${res.hash}\n\n`;
      await fs.writeFile(mdPath, info + res.markdown, "utf8");
      console.log(`Saved markdown to ${mdPath}`);
    }
  } catch (e) {
    console.error("Fatal error:", e);
  } finally {
    await closeBrowser();
    console.error("Browser closed.");
  }
}

run();
