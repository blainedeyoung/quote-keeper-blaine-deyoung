import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './components/Auth.js'
import QuotesPage from './components/QuotesPage.js'
import AddQuote from './components/AddQuote.js'
import { withUser } from './context/UserProvider.js'
import Navbar from './components/Navbar.js'
import Profile from './components/Profile.js'
import ProtectedRoute from './shared/ProtectedRoute.js'
import DetailsPage from './components/DetailsPage.js'
import './styles.css'


const App = (props) => {
  const { user: {username}, token, logout } = props
  return (
    <div>
        { token && <Navbar logout={logout}/> }
        <Switch>
            <Route exact path="/"  render={rProps => !token ? <Auth {...rProps}/> : <Redirect to="/quotes"/>} />
            <ProtectedRoute 
                path="/quotes"
                token={token}
                component={QuotesPage}
                redirectTo="/"
            />
            <ProtectedRoute 
                path="/profile"
                token={token}
                component={Profile}
                redirectTo="/"
                username={username}/>

            <ProtectedRoute
                path="/addQuote"
                token={token}
                component={AddQuote}
                redirectTo="/"
                username={username}/>

            <ProtectedRoute
                path="/detailsPage/:id"       
                token={token}
                component={DetailsPage}
                redirectTo="/"
                username={username}/>
        </Switch>
    </div>
  )
}

export default withUser(App);
