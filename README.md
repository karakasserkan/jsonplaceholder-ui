# JSONPlaceholder UI

A modern, responsive user interface for the JSONPlaceholder API built with React, TypeScript, and Bootstrap.

![JSONPlaceholder UI Screenshot](screenshot.png)

## Features

- **Modern UI**: Clean and responsive design using Bootstrap 5 with custom styling
- **TypeScript Support**: Full type safety across the application
- **React Router**: Dynamic routing with loaders for data fetching
- **State Management**: Global state handling with Zustand
- **Favorites System**: Save your favorite posts and photos with local storage persistence
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop

## Demo

View the live demo: [JSONPlaceholder UI Demo](https://yourusername.github.io/jsonplaceholder-ui)

## Tech Stack

- **React 18**: For building the user interface
- **TypeScript**: For type safety
- **Vite**: For fast development and building
- **React Router 6**: For client-side routing and data fetching
- **Bootstrap 5**: For responsive design components
- **Zustand**: For state management
- **JSONPlaceholder API**: For mock data

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jsonplaceholder-ui.git
   cd jsonplaceholder-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
jsonplaceholder-ui/
├── public/              # Public assets
├── src/                 # Source files
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── loaders/         # React Router data loaders
│   ├── pages/           # Page components
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── App.css          # Global styles
│   ├── index.css        # Root styles
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## API Integration

This project uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch:

- Users
- Posts
- Comments
- Albums
- Photos
- Todos

## Color Palette

The UI uses a natural color palette with earthy tones:

- Dark Green: `#283618`
- Medium Green: `#606c38`
- Cream: `#fefae0`
- Light Amber: `#dda15e`
- Amber: `#bc6c25`

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 576px)
- Tablets (576px - 992px)
- Desktops (> 992px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the free API
- [Bootstrap](https://getbootstrap.com/) for the responsive framework
- [React](https://reactjs.org/) for the JavaScript library

---

Built with ❤️ by [Your Name](https://github.com/yourusername)
