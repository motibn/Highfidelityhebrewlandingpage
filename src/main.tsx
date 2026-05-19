import { configureOrigamiFields, persistAttributionFromUrl } from './app/utils/origamiAttribution.ts';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './app/App.tsx';
import './styles/index.css';

persistAttributionFromUrl();
configureOrigamiFields();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
  