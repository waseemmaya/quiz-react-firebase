import React, { Component } from "react";
import fire from "../fire";
import swal from "sweetalert";
import {
  Form,
  FormField,
  TextInput,
  Tab,
  Tabs,
  Footer,
  Button,
  Tile,
  Tiles
} from "grommet/components/..";
// import { format } from "path";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleLoginEmail: "",
      handleLoginPassword: "",
      showNum: 1,
      name: "",
      email: "",
      phone: "",
      password: ""
    };
  }

  render() {
    return (
      <Tabs activeIndex={this.state.showNum} onActive={this.toggleTab}>
        <Tab title="Sign Up">
          <Tiles fill={true} flush={false}>
            <Tile>
              <Form>
                <FormField>
                  <TextInput
                    onDOMChange={this.handleName}
                    id="item1"
                    name="Name"
                    placeHolder="Name"
                  />
                </FormField>

                <FormField>
                  <TextInput
                    id="item2"
                    onDOMChange={this.handleEmail}
                    name="Email"
                    placeHolder="Email"
                  />
                </FormField>

                <FormField>
                  <TextInput
                    id="item3"
                    name="Phone"
                    onDOMChange={this.handlePhone}
                    placeHolder="Phone No"
                  />
                </FormField>

                <FormField>
                  <TextInput
                    id="item4"
                    name="password"
                    placeHolder="Password"
                    type="password"
                    onDOMChange={this.handlePassword}
                  />
                </FormField>

                <Footer pad={{ vertical: "medium" }}>
                  <Button
                    onClick={this.handleSignup}
                    label="Submit"
                    type="submit"
                    primary={true}
                  />
                </Footer>
              </Form>
            </Tile>
          </Tiles>
        </Tab>

        <Tab title="Login">
          <Tiles fill={true} flush={false}>
            <Tile>
              <Form>
                <FormField>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={this.handleLoginEmail}
                  />
                </FormField>

                <FormField>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={this.handleLoginPassword}
                  />
                </FormField>

                <Footer pad={{ vertical: "medium" }}>
                  <Button
                    label="Submit"
                    type="submit"
                    onClick={this.handleLogin}
                    primary={true}
                  />
                </Footer>
              </Form>
            </Tile>
          </Tiles>
        </Tab>
      </Tabs>
    );
  }

  handleLoginEmail = e => {
    let handleLoginEmail = e.target.value;
    this.setState({
      handleLoginEmail
    });
  };

  handleLoginPassword = e => {
    let handleLoginPassword = e.target.value;
    this.setState({
      handleLoginPassword
    });
  };

  toggleTab = () => {
    const { showNum } = this.state;
    let i;
    showNum === 0 ? (i = 1) : (i = 0);

    this.setState({
      showNum: i
    });
  };

  //Handle Sign Up
  handleName = e => {
    let name = e.target.value;

    this.setState({
      name
    });
  };

  handleEmail = e => {
    let email = e.target.value;
    this.setState({
      email
    });
  };

  handlePhone = e => {
    let phone = e.target.value;
    this.setState({
      phone
    });
  };

  handlePassword = e => {
    let password = e.target.value;
    this.setState({
      password
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const { handleLoginEmail, handleLoginPassword, name } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(handleLoginEmail, handleLoginPassword)
      .then(a => {
        let userID = a.user.uid;
        console.log(userID);
        let myID = localStorage.setItem("myID", userID);

        var userRef = fire.database().ref(`Users/${userID}`);

        userRef.on("value", x => {
          let data = x.val();
          let uffName = data.displayName;
          let userName = localStorage.setItem("myName", uffName);
          swal("Login Successfully").then(val => {
            this.setState({
              name: uffName
            });
            this.props.enableList();
          });
        });
      })
      .catch(err => {
        // Handle Errors here.
        swal(err.message);
        // ...
      });
  };

  handleSignup = e => {
    e.preventDefault();
    const { name, email, phone, password } = this.state;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("signup", this.state);
        let userRef = fire.database().ref(`Users/${data.user.uid}`);
        userRef.set({
          displayName: name,
          email: email,
          phone: phone,
          userID: data.user.uid
        });

        userRef.on("value", function(x) {
          let data = x.val();
          let uffName = data.displayName;
          console.log(uffName);
          let userName = localStorage.setItem("myName", uffName);
        });

        swal("Sign Up Successfully");
        this.setState({
          showNum: 1
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        swal(error.message);
        // ...
      });
  };
}

export default Registration;
