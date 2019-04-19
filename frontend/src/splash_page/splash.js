import React from "react";

import Search from "../search/search";
import Grid from "../grid/grid.js";

class SplashPage extends React.Component {
  render() {
    return (
      <>
        <Search />
        <Grid />
      </>
    );
  }
}

export default SplashPage;
