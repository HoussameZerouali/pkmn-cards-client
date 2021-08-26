import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllCards from "./pages/AllCards";
import OneCard from "./components/OneCard/OneCard"
import Auctions from "./pages/Auctions";
import CardsList from "./components/CardsList/CardsList";
import FormSale from "./components/Forms/FormSale";
import UserAuctions from "./pages/UserAuctions";
// import TestApi from "./pages/TestApi";
import OpenForExchanges from "./components/Exchange/OpenForExchange"
import UserExchanges from "./components/Exchange/UserExchanges";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        {/* <Route path="/test" component={TestApi} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component= {Signin} />
        <Route exact path="/signup" component= {Signup} />
        <Route exact path="/cards" component= {AllCards} />
        <Route exact path="/cards/:id" component ={OneCard} />
        <Route exact path="/auctions" component= {Auctions} />
        <Route exact path="/exchanges" component={OpenForExchanges} />
        <ProtectedRoute exact path="/profile" component= {Profile} />
        <ProtectedRoute path="/profile/cards" component={CardsList} />
        <ProtectedRoute exact path="/profile/cards/:id" component={FormSale} />
        <ProtectedRoute path="/profile/auctions" component={UserAuctions} />
        <ProtectedRoute path="/profile/exchanges" component={UserExchanges} />
      </Switch>
    </div>
  );
}

export default App;
