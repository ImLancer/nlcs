import React, { Suspense, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Header from './components/Header';
import { setByHand } from 'features/Greedy/greedySlice';
import { useDispatch } from 'react-redux';

const Greedy = React.lazy(() => import('./features/Greedy'))

function App() {
  const dispatch = useDispatch();

  const getValueFromHeader = (status) => {
    let action = setByHand(!status);
    dispatch(action);
  };

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header handleClickApp={getValueFromHeader} />

          <Switch>
            <Redirect exact from="/" to="/greedy" />

            <Route path="/greedy" component={Greedy} />
            <Route component={NotFound} />
          </Switch>

        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
