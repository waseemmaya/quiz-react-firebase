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
    const { isAuth, logout } = this.props;
    return (
      <Header fixed={true} size="medium" splash={false}>
        <Title onClick={this.props.goHome}>
          <Heading
            tag="h4"
            strong={true}
            uppercase={true}
            truncate={false}
            align="start"
            margin="small"
          >
            PanaCloud
          </Heading>
        </Title>
        <Box flex={true} justify="end" direction="row" responsive={false}>
          <Heading
            tag="h5"
            strong={true}
            uppercase={true}
            truncate={true}
            align="end"
            margin="small"
          >
            {this.props.displayName}
          </Heading>
          {isAuth && (
            <Menu icon={<Actions />} dropAlign={{ right: "right" }}>
            <br/>
            <br/>
            <br/>
              {/* <Anchor href="#" className="active">
              
            </Anchor>
            <Anchor href="#">Second</Anchor> */}
              <Anchor onClick={logout} href="#">
                Logout
              </Anchor>
            </Menu>
          )}
        </Box>
      </Header>
    );
  }
}

export default MyHeader;
