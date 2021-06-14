import Home from "./pages/Home";
import EditPerson from "./pages/EditPerson";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import PersonContext from "./context/PersonContext";
function App() {
  const [people, setPeople] = useState([]);
  const [extraInfo, setExtraInfo] = useState({
    totalErrors: 0,
    file: null,
  });

  return (
    <>
      <BrowserRouter>
        <PersonContext.Provider
          value={{ people, setPeople, extraInfo, setExtraInfo }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/editperson" component={EditPerson} />
          </Switch>
        </PersonContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
