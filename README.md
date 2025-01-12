# HotelManagementApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Project Overview

The Hotel Management App is designed to manage room bookings, handle customer feedback, and provide an admin interface for hotel staff. It is built using Angular for the frontend and Firebase for authentication, database management, and hosting.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building the Project

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Firebase Setup

1. Create a new project on [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Authentication, Firestore, and Hosting.
3. Add your Angular app to the Firebase project and download the `firebaseConfig` object.
4. Update your `environment.ts` file with the `firebaseConfig` object.

## Project Features and Functionality

- **Authentication**: User login, registration, forgot password, and logout features. Role-based access for Admin, Staff, and Guests.
- **Room Booking System**: Display a list of available rooms with details, allow users to filter/search for rooms, and enable room bookings.
- **Admin Panel**: Admins can manage room details, bookings, and customer details, and view reports and booking statistics.
- **Customer Feedback**: Users can leave feedback and reviews for their stay, which will be displayed in a public section.
- **Payment Integration** (Optional): Dummy payment flow for booking confirmation.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Author

GitHub: [nkululeko111](https://github.com/nkululeko111)

