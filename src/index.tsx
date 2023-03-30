import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllRoutes from './pages/AllRoutes';
import RouteDetailWrapper from './pages/RouteDetailWrapper';
import ProtectedRoute from './pages/ProtectedRoute';
import NewRoute from './pages/NewRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/routes/update/:id',
        element: (
          <ProtectedRoute>
            <NewRoute />
          </ProtectedRoute>
        ),
      },
      { path: '/routes', element: <AllRoutes /> },
      { path: '/routes/:id', element: <RouteDetailWrapper /> },
      {
        path: '/routes/new',
        element: (
          <ProtectedRoute>
            <NewRoute />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

