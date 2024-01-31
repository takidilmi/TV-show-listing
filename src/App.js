import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';

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
      </Routes>
    </Router>
  );
}

export default App;
