import React, { Component } from "react";
import App from "grommet/components/App";
// import Heading from "grommet/components/Heading";
import Button from "grommet/components/Button";

import MyHeader from "./MyHeader";
import MyList from "./MyList";

class MainApp extends Component {
  state = {
    list: [
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " },
      { item: "Hey People, I am doing task " }
    ]
  };
  render() {
    const { list } = this.state;
    return (
      <App centerd="true">
        <MyHeader />
       
        <MyList list={list} />
      </App>
    );
  }
}

export default MainApp;
