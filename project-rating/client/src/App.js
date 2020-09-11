import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Context
import {PollProvider} from "./context/PollContext";

// Components
import Home from "./components/Home/Home";
import MejorProfesor from "./components/MejorProfesor";

// Styling
import './styling/css/style.css';

const App = () => {
  return (
    <div className="App">
      <PollProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mejor-profesor" component={MejorProfesor} />
          </Switch>
        </Router>
      </PollProvider>
    </div>
  );
}

export default App;
