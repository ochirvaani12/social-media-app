import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import { client } from './graphql/Graphql'
import { UserProvider } from './context/auth'

// IMPORTING COMPONENTS
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
