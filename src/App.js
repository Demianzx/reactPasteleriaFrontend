import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import  {About} from './components/About'
import {Pasteles} from './components/Pasteles'
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className= "container p-2">
        <Switch>
          <Route path= "/about" component={About}/>
          <Route path= "/" component= {Pasteles}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
