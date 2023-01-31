import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import Header from './components/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import { ColorModeContext, useMode } from './theme';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ApolloProvider client={client}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              {/* <Header /> */}
              <div className='app'>
                <Sidebar isSidebar={isSidebar} />
                <main className='content'>
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/projects/:id' element={<Project />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;