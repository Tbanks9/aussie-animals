import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Notification from 'react-notify-toast'
import 'bulma'
import './styles/main.scss'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import AnimalIndex from './components/animals/AnimalIndex'
import AnimalShow from './components/animals/AnimalShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => (
  <BrowserRouter>
    <main>
      {/* <Notification /> */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <SecureRoute path="/cheeses/:id/edit" component={AnimalEdit} />
        <SecureRoute path="/cheeses/new" component={AnimalNew} /> */}
        <Route path="/animals" component={AnimalIndex} />
        <Route path="/animals/:id" component={AnimalShow} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch> 
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// async function getData() {
//   const response = await fetch('/api/animals')
//   const data = await response.json()
//   console.log(data)
// }
// getData()