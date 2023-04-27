import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './authContext/AuthContext';
import { SearchContextProvider } from './searchContext/SearchContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
      <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);