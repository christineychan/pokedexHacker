import React from "react";
  import "./grid.css";
import { Redirect } from 'react-router-dom';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      counter: "",
      redirect: false

    };

    this.handleChange = this.handleChange.bind(this);
        this.retrieveReturnType = this.retrieveReturnType.bind(this);
        this.fetchReturnType = this.fetchReturnType.bind(this);

  }

  retrieveReturnType = (type1, type2) => {
    return this.fetchReturnType(type1, type2).then(response => {
      // debugger
      this.setState({ counter: response });
      this.setState({ redirect: true });

    });
  };

  fetchReturnType = (type1, type2) => {
    // debugger
    var body_post = { "type1": type1, "type2": type2 };
    var url = "http://localhost:5000" + "/best_counter_types";
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body_post)
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(function(data) {
        var data_parse = data;
        return data_parse;
      });
  };

  handleChange = (e, type) => {
    e.preventDefault();

    this.state.selected.push(type);

    console.log(this.state.selected);

    if (this.state.selected.length === 2) {
      console.log(this.state.selected)
      this.retrieveReturnType(this.state.selected[0], this.state.selected[1]);
    }

    // this.setState({ selectedOption });
    // this.retrieveReturnCounter(selectedOption.label);
  };

  render() {
    // debugger
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: "/result", state: this.state.counter }} />

    }
    return (
      <>
        <div className="grid-container roll-in-blurred-right">
          <button
            className={`type Normal`}
            onClick={e => {
              this.handleChange(e, "Normal");
            }}
          >
            Normal
          </button>

          <button
            className={`type Fire`}
            onClick={e => {
              this.handleChange(e, "Fire");
            }}
          >
            Fire
          </button>

          <button
            className={`type Water`}
            onClick={e => {
              this.handleChange(e, "Water");
            }}
          >
            Water
          </button>

          <button
            className={`type Grass`}
            onClick={e => {
              this.handleChange(e, "Grass");
            }}
          >
            Grass
          </button>

          <button
            className={`type Ground`}
            onClick={e => {
              this.handleChange(e, "Ground");
            }}
          >
            Ground
          </button>

          <button
            className={`type Electric`}
            onClick={e => {
              this.handleChange(e, "Electric");
            }}
          >
            Electric
          </button>

          <button
            className={`type Ghost`}
            onClick={e => {
              this.handleChange(e, "Ghost");
            }}
          >
            Ghost
          </button>

          <button
            className={`type Dark`}
            onClick={e => {
              this.handleChange(e, "Dark");
            }}
          >
            Dark
          </button>

          <button
            className={`type Fairy`}
            onClick={e => {
              this.handleChange(e, "Fairy");
            }}
          >
            Fairy
          </button>

          <button
            className={`type Dragon`}
            onClick={e => {
              this.handleChange(e, "Dragon");
            }}
          >
            Dragon
          </button>

          <button
            className={`type Steel`}
            onClick={e => {
              this.handleChange(e, "Steel");
            }}
          >
            Steel
          </button>

          <button
            className={`type Poison`}
            onClick={e => {
              this.handleChange(e, "Poison");
            }}
          >
            Poison
          </button>
        </div>
      </>
    );
  }
}

export default Grid;
