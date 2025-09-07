import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppQueryProvider from './app/providers/QueryClientProvider';
import AppRouter from './app/routes/AppRoutes';


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<AppQueryProvider>
<AppRouter />
</AppQueryProvider>
</React.StrictMode>,
);