import React from "react";
import "./LoginPage.css";
import { signUp, confirmSignUp, signIn } from "../amplifyAuth/amplifyAuth";
import { createMember } from "./NetworkRequests";

/* TO DO:
  We need to run a test to see whether or not the user entered a valid email address...
  What do we get back?

  What happens after signup?
  How do we establish a user is signed in and able to use our own API?

  What happens when a user Signs Up and maybe leaves the page... should Sign In work with an unverified user?
  What we should see is the "Verification Required" UI when trying to Sign In.

  How long does a verification code last?

  Within the CognitoUser, and in the idToken (JWT), we can find the users email.
  
  Notes: 
                              (CognitoIdToken)
    CognitoUser.signInUserSession.idToken.payload
*/

const SignUp = ({ handleChange, signMeUp }) => {
  return (
    <div className="signUp">
      <h1> Sign Up </h1>
      <div className="new-user-signup">
        <input
          onChange={handleChange}
          name="email"
          placeholder="E-Mail"
        />
        <input
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        {/* <input name="Confirm Password" placeholder="Confirm Password"/> */}
        <button onClick={signMeUp}> Sign Me Up </button>
      </div>
    </div>
  )
}

const Verify = ({ handleChange, verify, email }) => {
  return (
    <div className="verify-new-user">
      <h1> Enter Verification Code </h1>
        <div className="new-user-signup">
          <input
              onChange={handleChange}
              name="email"
              placeholder="E-Mail"
          />
          <input
            onChange={handleChange}
            name="code"
            placeholder="Verification Code"
          />
          <button onClick={verify}> Verify </button>
      </div>
    </div>
  )
}

const SignIn = ({ handleChange, signIn }) => {
  return (
    <div className="signin">
    <h1> Sign In </h1>
    <div id="user-form">
      <input onChange={handleChange} name="email" placeholder="E-Mail" />
      <input onChange={handleChange} type="password" name="password" placeholder="Password" />
      <button id="forgotbttn"> Forgot Password? </button>
      <button onClick={signIn}> Sign In </button>
    </div>
  </div>
  )
}

//#802 page color
class LoginPage extends React.Component {
  state = { email: null, password: null, code: null, verification: false };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = async () => {
    // Returns CognitoUser
    const res = await signIn(this.state.email, this.state.password);
    console.log(res, "<--- user");
    // Need error handling when auth fails
    if(res.authenticationFlowType === "USER_SRP_AUTH"){
      // HERE WE NEED TO FIGURE OUT WHAT TO DO NEXT... STORE THE TOKEN? WHERE? HMMM...
      window.location.pathname = "/";
    } else {
      alert(" Something went wrong ...");
    } 
  }

  signMeUp = async () => {
    // If we delete user in Cognito we also need to delete user in postgres...
    // Returns an object - ISignUpResult (check documentaion)
    const res = await signUp({ email: this.state.email, password: this.state.password })
    // userConfirmed: false
    if(res.user.authenticationFlowType === "USER_SRP_AUTH"){
      createMember({ username: this.state.email });
      this.setState({ verification: true })
    } else {
      alert(" Something went wrong ...");
    } 
  };

  verify = async () => {
    // Returns a 'SUCCESS' string or authentication error / alert
    const res = await confirmSignUp(this.state.email, this.state.code);
    console.log(res, "<--- verify response");
    if(res === 'SUCCESS') {
      this.setState({verification: true});
    }
    return res === 'SUCCESS';
  }

  render() {
    return (
      <div id="page">
        <SignIn handleChange={this.handleChange} signIn={this.signIn} />
        { this.state.verification ?
          <Verify email={this.state.email} handleChange={this.handleChange} verify={this.verify} />
        :
          <SignUp handleChange={this.handleChange} signMeUp={this.signMeUp} />
        }
       </div>
    );
  }
}

export default LoginPage;