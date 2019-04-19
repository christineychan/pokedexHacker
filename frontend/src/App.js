import React, { Component } from "react";
import "./App.css";
import Splash from "./splash_page/splash";
import Result from "./result";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Link} from 'react-router-dom';
import ash from './ash.gif';
import pokeball from './pokeball.png';

class App extends Component {

  // state = {
  //     pokemon: '',
  // }

//   retrieveCounter = (pokemon) => {
//     return this.fetchReturnCounter(pokemon).then((response) => {
//         console.log(response)
//         this.setState({pokemon: response})
//     })
// }

// fetchReturnCounter= (pokemon) => {
//     var body_post = {'pokemon' : pokemon}
//     var url = "http://localhost:5000" + '/best_counter_pokemon'
//     return fetch(url,{
//         method:'POST',
//         body: JSON.stringify(body_post),
//     }).then(res => res.text())
//     .catch(error => console.error('Error:', error))
//     .then(function(data){
//         var data_parse = data
//         return data_parse
//     })
// }


//   componentDidMount(){
//     this.retrieveCounter('charmander')
//   }

  render() {
    return (
      <div className="wallpaper">
        <div className="App">
          <Router>
            <Link to="/">
              <img
                alt="pokemon icon"
                className="pokeballAnchor roll-in-blurred-right"
                src={pokeball}
              />
            </Link>

            <img
              alt="ash"
              className="ashGif roll-in-blurred-right"
              src={ash}
            />

            <div className="logo roll-in-blurred-right">
              <p className="tracking-in-expand">Pokedex hacker</p>
            </div>

            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/result" component={Result} />
              {/* <Route path="*" component={page404} /> */}
            </Switch>
          </Router>

          {/* {this.state.pokemon} */}
        </div>
      </div>
    );
  }
}

export default App;
