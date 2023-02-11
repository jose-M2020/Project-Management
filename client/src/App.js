import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import Dashboard from './pages/dashboard';
import Projects from './pages/project/Projects';
import ProjectDetails from './pages/project/ProjectDetails';
import ProjectForm from './pages/project/ProjectForm';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Bugs from './pages/bug/Bugs';
import Clients from './pages/client/Clients';
import ClientForm from './pages/client/ClientForm';
import Team from './pages/team/Team';
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
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/projects/:id' element={<ProjectDetails />} />
                  <Route path='/projects/add' element={<ProjectForm />} />
                  <Route path='/projects/:id/edit' element={<ProjectForm />} />
                  <Route path='/tasks' element={<Tasks />} />
                  <Route path='/calendar' element={<Calendar />} />
                  <Route path='/bugs' element={<Bugs />} />
                  <Route path='/clients' element={<Clients />} />
                  <Route path='/clients/add' element={<ClientForm />} />
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