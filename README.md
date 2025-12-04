# My Movie App

A small React app that shows movie search results and tracks trending searches using Appwrite as the backend.

**Why this project**: lightweight starter demonstrating React + Vite + Appwrite integration for storing search counts and trending items.

**Features**
- Search for movies (TMDB image links used for posters)
- Track search counts and show top trending searches
- Simple authentication (Appwrite `Account`)

**Prerequisites**
- Node.js (>= 18 recommended)
- npm or yarn
- An Appwrite project with Database/Tables configured (see Env variables)

**Quick Start**
1. Install dependencies:

	`npm install`

2. Create a `.env` or set environment variables (Vite uses `VITE_` prefix). Required variables used in the project:

	- `VITE_APPWRITE_ENDPOINT` - Your Appwrite endpoint (e.g. `https://cloud.appwrite.io/v1`)
	- `VITE_APPWRITE_PROJECT` - Appwrite project ID
	- `VITE_APPWRITE_DATABASE_ID` - Database ID
	- `VITE_APPWRITE_TRENDING_ID` - Collection ID (or table ID if migrated)

	Example (in `.env`):

	`VITE_APPWRITE_ENDPOINT=https://your-appwrite.example/v1`
	`VITE_APPWRITE_PROJECT=your_project_id`
	`VITE_APPWRITE_DATABASE_ID=your_database_id`
	`VITE_APPWRITE_TRENDING_ID=your_collection_or_table_id`

3. Start the dev server:

	`npm run dev`

4. Open `http://localhost:5173` (or the port shown by Vite).

**Build for production**

`npm run build`

**Appwrite notes & migration**
- This project currently uses the Appwrite `Databases` (collection/document) methods. The Appwrite SDK types mark those APIs deprecated in favor of the `TablesDB` APIs (`listRows`, `createRow`, `updateRow`, etc.).
- The code works with the Appwrite SDK in place, but if you prefer to remove deprecation warnings or migrate to Tables:
  - Create corresponding tables in the Appwrite console (or migrate data)
  - Replace `Databases` calls with `TablesDB` equivalents and adjust parameter names (`collectionId` → `tableId`, `documentId` → `rowId`, etc.)

 
**Project structure (important files)**
- `src/appwrite.js` — Appwrite client and helper functions (search tracking + trending queries)
- `src/components` — UI components (MovieCard, NavBar, Search, Spinner)
- `src/auth` — login/register and protected route helpers

	  
**Contributing**
- Pull requests and issues are welcome!

If you want, I can:
- Migrate `src/appwrite.js` to `TablesDB` and update environment notes.
- Add a sample `.env.example` file or a brief deployment section.

