
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { makeStore } from './store/store.tsx';
import AppRouter from './Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={makeStore()}>
      <AppRouter />
    </Provider>
  </StrictMode>,
)
