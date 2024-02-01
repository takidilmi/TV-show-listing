import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import NotFound from './components/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ShowList />}
        />
        <Route
          path="/shows"
          element={<ShowList />}
        />
        <Route
          path="/shows/:id"
          element={<ShowDetails />}
        />
        <Route
          path="/shows/:id/:title"
          element={<ShowDetails />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;
