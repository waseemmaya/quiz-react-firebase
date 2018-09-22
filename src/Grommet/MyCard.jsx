import React, { Component } from "react";
import Card from "grommet/components/Card";
import Anchor from "grommet/components/Anchor";
// import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";

class MyCard extends Component {
  render() {
    const { result } = this.props;
    return (
      <Tiles fill={true}>
        {result.map((val,i) => {
          return (
            <Tile key={i}>
              <Card
                thumbnail={val.urlToImage}
                label={val.author}
                heading={val.title}
                description={val.description}
                link={<Anchor href={val.url} label="Source" />}
                contentPad="medium"
              />
            </Tile>
          );
        })}
      </Tiles>
    );
  }
}

export default MyCard;
