import ReactDOM from "react-dom";
import App from "./App"; // Importing the App component
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App /> {/* Rendering the App component */}
    </Router>
  </Provider>
  ,
  document.getElementById("root") )// Make sure there's a corresponding div with id="root" in your HTML
