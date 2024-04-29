import React from 'react';
import { createContext, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// project styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import EditTeam from './EditTeam';
import Home from './Home';
import ErrorPage from './ErrorPage';

import { initialTeamState } from './reducers/team-reducer';
import { teamReducer } from './reducers/team-reducer';

export const TeamContext = createContext(null);

const TeamProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, initialTeamState);
  return (
    <TeamContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamContext.Provider>
  );
};

function Layout() {
  return (
    <>
      <div id="page-content">
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/edit-team',
        element: <EditTeam />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <TeamProvider>
    <RouterProvider router={router} />
  </TeamProvider>
);
