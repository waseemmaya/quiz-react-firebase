import React, { Component } from "react";
import {
  Footer,
  Paragraph,
  Title,
  Box,
  Menu,
  Anchor
} from "grommet/components/..";
import Actions from "grommet/components/icons/base/Actions";

class MyFooter extends Component {
  render() {
    return (
      <Footer justify="between" size="large">
        <Title>
          <s />
        
        </Title>
        <Box direction="row" align="center" pad={{ between: "medium" }}>
          <Paragraph margin="none">© 2018 PANACLOUD</Paragraph>
          <Menu direction="row" size="small" dropAlign={{ right: "right" }}>
            <Anchor href="#">Support</Anchor>
            <Anchor href="#">Contact</Anchor>
            <Anchor href="#">About</Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default MyFooter;
