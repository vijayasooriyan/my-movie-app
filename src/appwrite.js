import { Client, Databases, Account, ID, Query } from "appwrite";

const client = new Client();

// Environment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT = import.meta.env.VITE_APPWRITE_PROJECT;

if (APPWRITE_ENDPOINT) client.setEndpoint(APPWRITE_ENDPOINT);
if (APPWRITE_PROJECT) client.setProject(APPWRITE_PROJECT);

const databases = new Databases(client);
const account = new Account(client);

// Database & collection IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TRENDING_ID;

/* -----------------------------------------
   UPDATE SEARCH COUNT
------------------------------------------ */

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Check if searchTerm already exists
    // @ts-ignore - Appwrite `Databases` APIs are marked deprecated in the SDK types
    // but still work at runtime. Replace with `TablesDB` API when migrating.
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // 2. If exists → Update count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      // @ts-ignore - suppress deprecation warning from Appwrite types
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } 
    // 3. Otherwise create new record
    else {
      // @ts-ignore - suppress deprecation warning from Appwrite types
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
         count: 1,
         movie_id: movie.id,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Appwrite Error (updateSearchCount):", error);
  }
};

/* -----------------------------------------
   GET TRENDING MOVIES
------------------------------------------ */

export const getTrendingMovies = async () => {
  try {
    // @ts-ignore - Appwrite `Databases` APIs are marked deprecated in the SDK types
    // but still work at runtime. Replace with `TablesDB.listRows` when migrating.
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents;
  } catch (error) {
    console.error("Appwrite Error (getTrendingMovies):", error);
    return [];
  }
};

export { account, databases, client };
