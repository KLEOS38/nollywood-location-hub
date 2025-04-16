
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element once
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create a stable root instance
const root = createRoot(rootElement);

// Render the app only once with a stable key
root.render(<App />);
