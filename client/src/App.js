import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import Dashboard from './pages/dashboard';
import Project from './pages/project';
import ShowProject from './pages/project/ShowProject';
import Task from './pages/Task';
import Calendar from './pages/Calendar';
import Bug from './pages/Bug';
import Client from './pages/Client';
import Team from './pages/Team';
import Faq from './pages/Faq';
import Bar from './pages/chart/Bar';
import Pie from './pages/chart/Pie';
import Line from './pages/chart/Line';
import Geography from './pages/chart/Geography';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
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
            <div className='app'>
              <Sidebar isSidebar={isSidebar} />
              <main className='content'>
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/projects' element={<Project />} />
                  <Route path='/projects/:id' element={<ShowProject />} />
                  <Route path='/tasks' element={<Task />} />
                  <Route path='/calendar' element={<Calendar />} />
                  <Route path='/bugs' element={<Bug />} />
                  <Route path='/clients' element={<Client />} />
                  <Route path='/team' element={<Team />} />
                  <Route path='/faq' element={<Faq />} />
                  <Route path='/bar' element={<Bar />} />
                  <Route path='/pie' element={<Pie />} />
                  <Route path='/line' element={<Line />} />
                  <Route path='/geography' element={<Geography />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App;