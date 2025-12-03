import { Client, Databases, Account } from "appwrite";

const client = new Client();

// Read environment variables (Vite exposes them via import.meta.env)
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT = import.meta.env.VITE_APPWRITE_PROJECT;

if (typeof APPWRITE_ENDPOINT === "string" && APPWRITE_ENDPOINT.length > 0) {
  client.setEndpoint(APPWRITE_ENDPOINT);
} else {
  console.warn(
    "VITE_APPWRITE_ENDPOINT is not set. Appwrite client endpoint not configured."
  );
}

if (typeof APPWRITE_PROJECT === "string" && APPWRITE_PROJECT.length > 0) {
  client.setProject(APPWRITE_PROJECT);
} else {
  console.warn(
    "VITE_APPWRITE_PROJECT is not set. Appwrite client project not configured."
  );
}

const databases = new Databases(client);
const account = new Account(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TRENDING_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TRENDING_ID;

// Save search to Appwrite (optional)
export async function updateSearchCount(query) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      TRENDING_COLLECTION_ID,
      "unique()",
      { query }
    );
  } catch (error) {
    console.log("Appwrite Error (updateSearchCount):", error);
  }
}

// Get trending movies (just dummy Appwrite function)
export async function getTrendingMovies() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TRENDING_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.log("Appwrite Error (getTrendingMovies):", error);
    return [];
  }
}

export { account, databases, client };
