import React, { Component } from "react";
import {
  Header,
  Heading,
  Title,
  Box,
  Menu,
  Anchor
} from "grommet/components/..";
import Actions from "grommet/components/icons/base/Actions";

class MyHeader extends Component {
  render() {
  const {isAuth, logout } = this.props;
    return (
      <Header fixed={false} size="medium" splash={false}>
        <Title onClick={this.props.goHome}>Quiz App</Title>
        <Box flex={true} justify="end" direction="row" responsive={false}>
          <Heading>{this.props.name}</Heading>
          {isAuth && <Menu icon={<Actions />} dropAlign={{ right: "right" }}>
            {/* <Anchor href="#" className="active">
              
            </Anchor>
            <Anchor href="#">Second</Anchor> */}
            <Anchor onClick={logout} href="#">Logout</Anchor>
          </Menu>}
        </Box>
      </Header>
    );
  }
}

export default MyHeader;
