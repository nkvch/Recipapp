import React from 'react';
import './App.css';
import MealPreview from './components/MealPreview';
import MealService from './services/MealService';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import Meals from './components/Meals';
import Meal from './components/Meal';
import MainScreen from './components/MainScreen';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Countries from './components/Countries';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column">
          <div className="content">
            <NavBar />
            <Switch>
              <Route path="/found-matches/:searchingFor"> <Meals /> </Route>
              <Route path="/meal/:id"> <Meal /> </Route>
              <Route exact path="/"> <MainScreen /> </Route>
              <Route exact path="/categories"> <Categories /> </Route>
              <Route exact path="/countries"> <Countries /> </Route>
              <Route path="/categories/:category"> <Meals /> </Route>
              <Route path="/countries/:country"> <Meals /> </Route>
            </Switch>
          </div>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
