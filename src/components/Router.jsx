import React,{ useState } from 'react';

const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState({});

  const navigate = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
  };

  return (
    <div>
      {React.cloneElement(children, { currentRoute, routeParams, navigate })}
    </div>
  );
};

export default Router