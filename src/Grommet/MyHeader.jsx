import React, { Component } from "react";
import Header from "grommet/components/Header";
// import {Title, Box, Search, Menu, Anchor} from 'grommet/components'
// import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
// import Menu from "grommet/components/Menu";
// import Anchor from "grommet/components/Anchor";
// import Down from "grommet/components/icons/base/Menu";
import Heading from "grommet/components/Heading";
import Add from "grommet/components/icons/base/Add";
import Button from "grommet/components/Button";

class MyHeader extends Component {
  render() {
    return (
      <Header fixed="true" size="small">
        <Button icon={<Add />} label="New" size='small' href="#" primary={true} />

        <Heading uppercase={true} truncate={true} align='center' margin="medium">
          ToDo App
        </Heading>
        <Box flex={true} justify="end" direction="row" responsive={true}>
          <Search inline={true} responsive='true' placeHolder="Search Todos" />
        </Box>
      </Header>
    );
  }
}

export default MyHeader;
