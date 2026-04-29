## 1. Purpose

The purpose of this application is to make it easier for researchers and users to manage traditional texts through, simple, clean, and a user-friendly interface. While a database is the most efficient way to manage a data collection, researchers are not necessarily skilled in database operations. Therefore, this application, named the Traditional Text Management System, is designed to help users browse, add, edit, and delete records without any technical knowledge of the underlying database.

## 2. Data

The data consists of traditional texts from Lanten Yao in Lao PDR. It is stored in PostgreSQL. Currently, 30 documents are stored as a test sample in a database called lanten_db.

## 3. Demonstration

- The home page displays documents as a list of cards. Each card shows the title of the document, the district, the date it was taken, and notes, if available.

- At the top of the page, there is a search bar. You can search for documents by keywords contained in either the title or the notes.

- If you would like to see more information about a specific document, click the "View" button on the card.

- On the detail page, you can see a preview of the manuscript image, along with the location where the researchers collected the document.

- The map uses the Google Maps Geocoding API to obtain latitude and longitude based on the district name and country name stored in the database.

- The application supports adding, editing, and deleting records. These actions are protected by administrative authentication to secure the application against unauthorized write operations.

- For example, an authenticated administrator can add a new record by clicking the "New Document" button. We fill in the fields and submit the form. As you can see, the new record now appears in the list.

- Next, we can update a record by clicking the "Edit" button. Let me change a few fields and click "Save." You can see the data has been updated on the detail page. We can also verify this change directly in PostgreSQL.

- Finally, if we want to delete this record, we click the "Delete" button. A confirmation dialog appears to prevent accidental deletion. Once we click "Delete," the document is permanently removed from the database.

## 4. Architecture diagram

- Frontend: React + TanStack Query + Bootstrap + React Router 

- API Layer: Axios (documentApi.js) 

- BACKEND: Express + pg (PostgreSQL Client) 

- DATABASE: PostgreSQL (Manuscript) 

I use TanStack Query instead of useEffect because it automatically handles data fetching concerns like caching, refetching, loading/error states, and keeping data in sync after mutations, which is more straightforward than using useEffect and useState. This reduces bugs, and contributes readability.

## 5. Highlight Key Frontend Features

Except using TanStack Query

- _Pagination_:
  Only 9 records are loaded at a time. This saves both loading time and memory, especially as the dataset grows.

- _Google Maps_:
  The frontend renders a Google Map by receiving latitude and longitude coordinates from the backend, which are geocoded from the district and country names stored in the database.

## 6. How to Run This App

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **PostgreSQL** (running and accessible)

### 1. Database Setup
Ensure PostgreSQL is running and create a new database for the application (e.g., `lanten_db`). You can create the database using the `psql` command-line tool or your preferred PostgreSQL client:
```sql
CREATE DATABASE lanten_db;
```

### 2. Server Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the required backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `server` directory. You will need to provide the following configuration values (make sure to replace the dummy values with your actual data):
   ```env
   PORT=3000
   GOOGLE_API_KEY=your_google_maps_api_key
   PG_URI=postgresql://postgres:postgres@localhost:5432/lanten_db
   ADMIN_USER=ADMIN_USER
   ADMIN_PASS=ADMIN_PASS
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Client Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the required frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your web browser and visit the URL provided by Vite (typically `http://localhost:5173`).

## 7. Future Improvements

To make the application more usable for users, the following features should be implemented:

- OCR (Optical Character Recognition): A feature that automatically extracts text from scanned manuscript images, converting them into searchable and editable text.
