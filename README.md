# Movie App Upscale

Modern movie discovery application built with Angular 19, featuring real-time search, dark mode, and responsive design.

## Features

- Real-time movie search with debounce
- Dark/Light theme with system preference detection
- Responsive pagination
- Movie details with transitions
- Grid layout for movie listings

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 19.0.7

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-app-upscale.git
   cd movie-app-upscale
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create src/environments/environment.ts:

   ```typescript
   export const environment = {
     production: false,
     movieDbApiKey: "YOUR_TMDB_API_KEY",
     movieDbUrl: "https://api.themoviedb.org/3",
   };
   ```

## Development server

Start the development server:

```bash
npm run start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Project Structure

```bash
  src/
  ├── app/
  │   ├── core/          # Interceptors, guards, services
  │   ├── features/      # Feature modules
  │   └── shared/        # Shared components
  ├── environments/      # Environment configurations
  └── assets/           # Static assets
```

## Technologies

- Angular 19
- TailwindCSS
- TMDB API
- TypeScript
- RxJS
- Angular Signals

## Contributing

- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch

## License

This project is licensed under the MIT License
