import React, { Component } from "react";
import "./grid/grid.css";

class Result extends Component {
   constructor(props) {
      super(props);
      // debugger 
   }

   render() {
      let results
      // if no results render default
      (this.props.history.location.state) ? (
          (results = this.props.history.location.state.value_return.map((type,index) => <div className={`type ${type}`} key={type}>{type}</div>))
      ) : (
         results = <div>TRY AGAIN</div>
      )
   return (
     // <div>{results}</div>
     <div className="resultsDiv roll-in-blurred-right">
       <h2> Counter with: </h2>
       <div>{results}</div>
     </div>
   );
   }
}
export default Result;