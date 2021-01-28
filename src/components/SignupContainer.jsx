import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import fire from "../config/firebaseConfig";

class SignupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      verify_password: "",
      animation: "come-down",
      loading: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { email, password, name, verify_password } = this.state;
    if (password === "" || email === "" || name === "") {
      NotificationManager.error("", "Please enter a valid email/password");
      return;
    }
    if (password.length <= 7) {
      NotificationManager.error(
        "",
        "Please enter a password of atleast 8 characters"
      );
      return;
    }
    if (password !== verify_password) {
      NotificationManager.error(
        "",
        "Password and Verify password do not match"
      );
      return;
    }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(email);

    if(!isEmailValid) {
        NotificationManager.error("", "Please enter a valid email");
        return;
    }

    this.handleSignup();

    // NotificationManager.success("", "Successfully signed up");
    // this.handleClickOnToLogin();
  };

  handleSignup = () => {
    const {
      email, password, name
    } = this.state;
    this.setState({
      loading: true
    });
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userRecord => {
        console.log('User signed in: ', userRecord);
        let user = fire.auth().currentUser;
          user.updateProfile({
            displayName: name
          })
          .then(() => {
            this.setState({
              loading: false,
              email: "",
              name: "",
              password: "",
              verify_password: "",
            });
          })
          .catch(error => {
            NotificationManager.error('', error.message);
          })
      })
      .catch(error => {
        NotificationManager.error('', error.message);
      })
  }

  handleClickOnToLogin = () => {
    this.setState({
      animation: "go-up",
    });
    setTimeout(this.props.toggleSignup, 1000);
  };

  render() {
    const { email, name, password, verify_password, animation, loading } = this.state;
    let disableSubmit = loading ? 'disabled' : '';

    return (
      <div className="hv100-wv100 col-12 p-0 sign-up-container">
        <div className={`col-12 h-100 bg-primary sign-up ${animation}`}>
          <div className="col-11">
            <p className="text-align-center mt-5 font-weight-bold text-light font-large">
              Sign Up
            </p>
          </div>
          <div className="col-11 mx-auto sign-up-form">
            <form action="">
              <div className="shadow-lg p-2 rounded">
                <div className="p-2">
                  <input
                    onChange={this.handleInputChange}
                    maxLength={40}
                    value={email}
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    id=""
                  />
                </div>
                <div className="p-2">
                  <input
                    onChange={this.handleInputChange}
                    maxLength={30}
                    value={name}
                    className="form-control"
                    type="name"
                    name="name"
                    placeholder="Your name"
                    id=""
                  />
                </div>
                <div className="p-2">
                  <input
                    onChange={this.handleInputChange}
                    maxLength={30}
                    value={password}
                    className="form-control"
                    type="password"
                    name="password"
                    id=""
                    placeholder="Set a password"
                  />
                </div>
                <div className="p-2">
                  <input
                    onChange={this.handleInputChange}
                    maxLength={30}
                    value={verify_password}
                    className="form-control"
                    type="password"
                    name="verify_password"
                    id=""
                    placeholder="Verify password"
                  />
                </div>
              </div>
              <div className="mt-4 mx-auto col-10">
                <button
                  onClick={this.handleSubmitClick}
                  type="submi"
                  className="col-12 btn btn-success form-control"
                  disabled={disableSubmit}
                >
                  Sign up
                  {loading && <i class="ml-2 fas fa-circle-notch fa-spin"></i>}
                </button>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <p
                  onClick={this.handleClickOnToLogin}
                  className="pointer font-small text-light"
                >
                  Already have an account? Sign in.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupContainer;
