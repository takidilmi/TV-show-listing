# TV Show Listing Application

This is a React application that uses the TVmaze API to display information about TV shows. It includes features such as searching for shows, viewing details about a specific show, booking tickets for a show, and viewing recommended shows.

## Features

- **Show List**: Displays a list of TV shows with their details. You can navigate through the list using the pagination controls at the bottom of the page.
- **Search**: You can search for shows using the search bar at the top of the Show List page. The list will update in real-time as you type.
- **Show Details**: Click on a show to view more details about it. This includes the show's name, creator, rating, language, status, genres, summary, schedule, and cast. You can also book a ticket for the show from this page.
- **Booking Form**: Click on the "Book a ticket" button on the Show Details page to open a form where you can enter your details and book a ticket for the show. Your booking details will be stored in local storage.
- **Recommended Shows**: On the Show Details page, you'll also see a section for Recommended Shows. This section displays shows from the same genre as the current show.

## How to Use

1. **Navigate to the Show List page**: When you open the application, you'll see a list of TV shows. You can navigate through the list using the pagination controls at the bottom of the page.
2. **Search for shows**: Use the search bar at the top of the Show List page to search for shows. The list will update in real-time as you type.
3. **View show details**: Click on a show to view more details about it. This will take you to the Show Details page.
4. **Book a ticket**: On the Show Details page, click on the "Book a ticket" button to open the booking form. Enter your details and click "Submit" to book a ticket. Your booking details will be stored in local storage.
5. **View recommended shows**: On the Show Details page, scroll down to the Recommended Shows section to see shows from the same genre as the current show.

## Running the Project Locally

1. Clone the repository: `git clone https://github.com/yourusername/yourrepository.git`
2. Navigate into the project directory: `cd yourrepository`
3. Install the dependencies: `npm install`
4. Start the application: `npm start`
5. Open your browser and navigate to `http://localhost:3000` to view the application.