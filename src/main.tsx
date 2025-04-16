
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// We need to use the stable version of createRoot
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(<App />);
