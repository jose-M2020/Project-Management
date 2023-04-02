import { Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './layouts/Dashboard/components/Topbar';
import Dashboard from './pages/dashboard';
import Projects from './pages/project/ProjectList';
import ProjectForm from './pages/project/ProjectForm';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Bugs from './pages/bug/Bugs';
import Clients from './pages/client/Clients';
import ClientForm from './pages/client/ClientForm';
import Team from './pages/team/Team';
import TeamForm from './pages/team/TeamForm';
import Faq from './pages/Faq';
import Bar from './pages/chart/Bar';
import Pie from './pages/chart/Pie';
import Line from './pages/chart/Line';
import Geography from './pages/chart/Geography';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { ColorModeContext, useMode } from './theme';
import DashboardLayout from './layouts/Dashboard';
import Settings from './pages/project/Settings';
import Overview from './pages/project/Overview';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        developers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tasks: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        events: {
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
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ApolloProvider client={client}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app'>
              <Topbar />
              <Routes>
                <Route path='/projects' element={<Projects />} />
                <Route path='/projects/add' element={<ProjectForm />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/clients/add' element={<ClientForm />} />
                <Route path='/team' element={<Team />} />
                <Route path='/team/add' element={<TeamForm />} />
                <Route
                  path='/'
                  element={<DashboardLayout />}
                >
                  <Route path='/projects/:id/overview' element={<Overview />} />
                  
                  <Route path='/projects/:id/settings' element={<Settings />} />
                  {/* <Route path='/projects/:id/edit' element={<ProjectForm />} /> */}
                  <Route path='/projects/:id/tasks' element={<Tasks />} />
                  <Route path='/projects/:id/calendar' element={<Calendar />} />
                  <Route path='/projects/:id/bugs' element={<Bugs />} />
                  <Route path='/bar' element={<Bar />} />
                  <Route path='/pie' element={<Pie />} />
                  <Route path='/line' element={<Line />} />
                  <Route path='/geography' element={<Geography />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App;