import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/Main.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Breweries from './pages/Breweries';
import Brewery from './pages/Brewery';
// import Rating from './pages/Rating';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Header from './components/Header';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/signup" 
                  element={<Signup />} 
                />
                <Route 
                  path="/me" 
                  element={<User />} 
                />
                <Route 
                  path="/users/:userId" 
                  element={<User />} 
                />
                <Route
                  path="/breweries"
                  element={<Breweries />}
                />
                <Route
                  path="/breweries/:breweryId"
                  element={<Brewery />}
                />
                {/* <Route 
                  path="/ratings/:ratingId"
                  element={<Rating />}
                /> */}
                <Route 
                  path="/aboutus"
                  element={<AboutUs />}
                />
                <Route 
                  path="/contact"
                  element={<Contact />}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>  
  );
}

export default App;
