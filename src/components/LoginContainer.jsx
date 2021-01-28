import React, { Component, createRef } from "react";
import { NotificationManager } from "react-notifications";
import { withRouter } from "react-router-dom";
import SignupContainer from "./SignupContainer";
import fire from '../config/firebaseConfig';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      email: "", 
      password: "", 
      showSignup: false,
      loading: false
    };

    this.usernameRef = createRef();
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleSignup = () => {
    this.setState((prevState) => {
      return {
        showSignup: !prevState.showSignup,
      };
    });
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (password === "" || email === "") {
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
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(email);

    if (!isEmailValid) {
      NotificationManager.error("", "Please enter a valid email");
      return;
    }
    this.setState({
      loading: true
    });
    this.handleLogin();
  };

  handleLogin = () => {
    const {
      email, password
    } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userRecord => {
        console.log(userRecord);
        this.setState({
          loading: false,
          email: '',
          password: ''
        });
        this.props.history.push('/chatlist');
      })
      .catch(error => {
        NotificationManager.error('', error.message);
      });
  } 

  authListner = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        this.props.setUser(user);
      }else{
        this.props.setUser('');
      }
    })
  }

  componentDidMount() {
    this.usernameRef.current.focus();
    this.authListner();
  }

  render() {
    const { email, password, showSignup, loading } = this.state;
    let disableSubmit = loading ? 'disabled' : '';

    return (
      <div>
        <div className="shadow title-container come-down-bounce bg-primary pt-5 pb-5 p-0 m-0 col-12">
          <p className="text-light m-0 p-0 letter-spacing-1 font-weight-bold font-xlarge text-align-center">
            Chatting Box
          </p>
        </div>
        <div className="col-11 mx-auto login">
          <div className="mt-5">
            <p className="text-align-center font-large font-weight-bold">
              Login
            </p>
          </div>
          <form action="">
            <div className="input-containers mt-4 bg-very-light-gray p-3 rounded-12">
              <label
                htmlFor="email-login"
                className="font-small text-secondary"
              >
                Your email
              </label>
              <input
                onChange={this.handleInputChange}
                value={email}
                id="email-login"
                maxLength={40}
                className="font-weight-bold p-0 form-control border-0 bg-transparent"
                type="text"
                name="email"
                placeholder="Enter email id"
                ref={this.usernameRef}
              />
            </div>
            <div className="input-containers mt-4 bg-very-light-gray p-3 rounded-12">
              <label
                htmlFor="password-login"
                className="font-small text-secondary"
              >
                Your password
              </label>
              <input
                onChange={this.handleInputChange}
                value={password}
                maxLength={30}
                className="form-control border-0 bg-transparent p-0"
                type="password"
                name="password"
                id="password-login"
                placeholder="password"
              />
            </div>
            <div className="mt-4 mx-auto col-10">
              <button
                onClick={this.handleSubmitClick}
                type="submit"
                className="col-12 btn btn-primary form-control"
                disabled={disableSubmit}
              >
                Login
                {loading && <i class="ml-2 fas fa-circle-notch fa-spin"></i>}
              </button>
            </div>
          </form>
          <div className="mt-3 d-flex justify-content-end">
            <p
              onClick={this.toggleSignup}
              className="font-small text-primary pointer"
            >
              Don't have an account? Sign up
            </p>
          </div>
        </div>
        {showSignup && <SignupContainer toggleSignup={this.toggleSignup} />}
      </div>
    );
  }
}

export default withRouter(LoginContainer);
