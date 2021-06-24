import React from 'react';
import './LoginPage.css'

//#802 page color 
class LoginPage extends React.Component {
    render() {
        return (
            <div id="page">
                <div className="signin">
                    <h1> Sign In </h1>
                    <div id="user-form">
                        <input name= "E-Mail" placeholder="E-Mail"/>
                        <input name= "Password" placeholder="Password"/>
                        <button id="forgotbttn"> Forgot Password? </button>
                        <button> Sign In </button>
                    </div>
                </div>
                <div className="signUp">
                    <h1> Sign Up </h1>
                    <div id="new-user-signup">
                        <input name="E-Mail" placeholder="E-Mail"/>
                        <input name="Password" placeholder="Password"/>
                        <input name="Confirm Password" placeholder="Confirm Password"/>
                        <button> Sign Me Up </button>
                    </div>
                </div>
                <div className="forgot-password">

                </div>
            </div>
        )
    }
}

export default LoginPage;