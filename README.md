# ConcertMaster

ConcertMaster is a mono-repo application built with [Nx](https://nx.dev) that functions like Ticketmaster. It allows administrators to create and manage concert events while enabling users to browse and purchase tickets. The app leverages a graph database for generating personalized concert recommendations.

## Features

### Admin Features
- Create and manage events with details such as name, description, date, venue, ticket pricing, and genres.
- View, update, or delete existing events.
- Manage users and their bookings.

### User Features
- Browse and search for available concerts by date, location, or genre.
- Purchase tickets for concerts.
- View past orders and upcoming bookings.
- Receive personalized recommendations based on genres of interest or inferred preferences from user behavior.

### Recommendations
- **Graph-Based Recommendations**:
  - Users are recommended concerts based on the genres they like or have previously interacted with.
  - Neo4j graph database is used to link users, concerts, and genres, enabling highly relevant suggestions.
  - Recommendations can introduce users to new genres they might enjoy based on network proximity.

## Technologies Used

### Mono-Repo Framework
- **Nx**: For managing and integrating the mono-repo structure, ensuring seamless development across frontend and backend.

### Backend
- **NestJS**: Scalable and maintainable framework for the API.
- **Neo4j**: Graph database used for storing concert, genre, and user relationship data, powering the recommendation engine.
- **TypeORM**: For other data persistence requirements.
- **Dependency Injection**: To manage services and ensure code modularity.
- **Repository Pattern**: For clean and maintainable data access logic.

### Frontend
- **Angular**: Framework for building a dynamic and responsive user interface.
- **Angular Material**: To deliver a modern, accessible design system.
- **GraphQL**: For efficient and flexible data fetching from the backend.

## Code Design Patterns
- **Repository Pattern**: Separates business logic from database interactions for clean and testable code.
- **Dependency Injection**: Simplifies service management and improves maintainability.
- **Event-Driven Architecture**: Handles user interactions and system updates efficiently, ensuring a seamless experience.
