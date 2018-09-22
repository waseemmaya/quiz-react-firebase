import React, { Component } from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import Button from "grommet/components/Button";
import Close from "grommet/components/icons/base/Close";

class MyList extends Component {
  render() {
    const { list } = this.props;
    // console.log("list", list);

    return (
      <List>
        {list.map((val, i) => {
          return (
            <ListItem key={i} justify="between" separator="horizontal">
              <span>
                {val.text}
              </span>
              <span className="secondary">

                <Button
                  icon={<Close size="small" />}

                />
              </span>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default MyList;
