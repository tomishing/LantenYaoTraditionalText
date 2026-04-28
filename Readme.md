## 1. Purpose

The purpose of this application is to make it easier for researchers and users to manage traditional texts through, simple, clean, and a user-friendly interface. While a database is the most efficient way to manage a data collection, researchers are not necessarily skilled in database operations. Therefore, this application, named the Traditional Text Management System, is designed to help users browse, add, edit, and delete records without any technical knowledge of the underlying database.

## 2. Data

The data consists of traditional texts from Lanten Yao in Lao PDR. It is stored in MongoDB. Currently, 30 documents are stored as a test sample in a database called LantenDB.

## 3. Demonstration

- The home page displays documents as a list of cards. Each card shows the title of the document, a path to an image, the date it was collected, and notes, if available.

- At the top of the page, there is a search bar. You can search for documents by keywords contained in either the title or the notes.

- If you would like to see more information about a specific document, click the "View" button on the card.

- On the detail page, you can see a preview of the manuscript image, along with the location where the researchers collected the document.

- The map uses the Google Maps Geocoding API to obtain latitude and longitude based on the district name and country name stored in the database.

- You can also add, edit, and delete records from this application.

- For example, let us add a new record by clicking the "New Document" button. We fill in the fields and submit the form. As you can see, the new record now appears in the list.

- Next, we can update a record by clicking the "Edit" button. Let me change a few fields and click "Save." You can see the data has been updated on the detail page. We can also verify this change directly in MongoDB.

- Finally, if we want to delete this record, we click the "Delete" button. A confirmation dialog appears to prevent accidental deletion. Once we click "Delete," the document is permanently removed from the database.

## 4. Architecture diagram

- Frontend: React + TanStack Query + Bootstrap + React Router │

- API Layer: Axios (documentApi.js) 

- BACKEND: Express + Mongoose + Sharp (Image Processing) │

- DATABASE: MongoDB (Manuscript) 

I use TanStack Query instead of useEffect because it automatically handles data fetching concerns like caching, refetching, loading/error states, and keeping data in sync after mutations, which is more straightforward than using useEffect and useState. This reduces bugs, and contributes readability.

## 5. Highlight Key Frontend Features

Except using TanStack Query

- _Pagination_:
  Only 9 records are loaded at a time. This saves both loading time and memory, especially as the dataset grows.

- _Google Maps_:
  The frontend renders a Google Map by receiving latitude and longitude coordinates from the backend, which are geocoded from the district and country names stored in the database.

## Future Improvements

To make the application more usable for users, the following features should be implemented:

- Page Flip Viewer: A digital book viewer that allows users to flip through manuscript pages on the web browser, simulating the experience of reading a physical book.

- PDF Download: The ability to download an entire manuscript as a single PDF file.

- OCR (Optical Character Recognition): A feature that automatically extracts text from scanned manuscript images, converting them into searchable and editable text.
