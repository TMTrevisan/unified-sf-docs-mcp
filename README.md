# Unified Salesforce Documentation MCP Server

A powerful Model Context Protocol (MCP) server that empowers LLMs to scrape, digest, and search through modern and legacy Salesforce documentation. It elegantly handles deeply nested Shadow DOMs, typical of Lightning Web Components (LWC), and legacy iframe-based documentation structures.

## Features

-   **Deep Shadow DOM Piercing:** Bypasses 400KB+ of SPA boilerplate on `help.salesforce.com` and `developer.salesforce.com` to extract only the pure article Markdown.
-   **Hierarchical Spidering:** Automatically queues and scrapes all related pages linked from a central guide using `mass_extract_guide`.
-   **Offline RAG Capabilities:** Chunks and indexes scraped Markdown into a local SQLite database (`docs.db`) allowing for instantaneous local search using `search_local_docs`.

## Available Tools

1.  **`scrape_single_page`**: Provide a Salesforce documentation URL. The server will use a headless browser (Puppeteer) to load the page, wait for dynamic content, pierce all shadow DOMs, and return clean Markdown.
2.  **`mass_extract_guide`**: Provide a "Table of Contents" or central guide URL. The server will extract the parent page, find all hierarchical child links, scrape them concurrently, chunk their content, and save them to a local SQLite database for offline querying.
3.  **`search_local_docs`**: Provide a natural language query (e.g., `LWC lifecycle hooks`). The server queries the SQLite database using fuzzy SQL search to instantly return the best matching pre-scraped chunks of documentation.

## Running Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Build the Project:**
    ```bash
    npm run build
    ```
3.  **Start the MCP Server:**
    ```bash
    npm start
    ```
*(Note: To use the tools interactively, integrate this MCP server with an MCP client like Claude Desktop or Cursor.)*

## Testing

You can use the provided test scripts to verify the core functionality or the scraper against different Salesforce URL layouts:

```bash
# Test the database, chunking, and search functionality
npx tsx tests/test-core.js

# Test the robust Shadow DOM scraper against 4 different URL permutations
npx tsx tests/test-all.js
```
