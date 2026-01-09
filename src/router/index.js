// import React from 'react';
import authRoutes from 'src/modules/auth/config/routes';
import appRoutes from 'src/modules/app/config/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotAccessible from 'src/components/App/NotAccessible';

const routes = [...authRoutes, ...appRoutes];

function AppRouter() {
  const permissions = useSelector((state) => state.auth?.permissions);

  return (
    <>
      <Routes>
        {routes.map(({ title, component: Component, url, exact, permission }) => {
          return (
            <Route
              exact
              key={url}
              path={url}
              element={
                !permission || permissions?.[permission] === 'yes' ? (
                  <Component />
                ) : (
                  <NotAccessible />
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default AppRouter;
