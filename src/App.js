import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Comic from './pages/Comic';
import Carousel from './components/Carousel'


//IMPORTAÇÃO DOS ESTILOS CSS
import './styles/App.css'


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Carousel} />
          <Route path="/Comic/:index" exact component={Comic} />
          <Carousel />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
