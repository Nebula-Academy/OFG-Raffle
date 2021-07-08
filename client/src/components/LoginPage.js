
import './LoginPage.css'

import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';
function App() {
  const [user, updateUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'));
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          return updateUser(data.payload.data);
        case 'signOut':
          return updateUser(null);
      }
    });
  }, [])
  if (user) {
    return (
      <div>
        <h1>Hello {user.username}</h1>
        <AmplifySignOut />
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            {
              type: "password",
              label: "Custom Password Label",
              placeholder: "custom password placeholder"
            },
            { type: "email" }
          ]} 
        />
      </AmplifyAuthenticator>
    </div>
  );
}
export default App

//#802 page color 
// class LoginPage extends React.Component {
//     render() {
//         return (
//             <div id="login-page">
//                 <div className="signin">
//                     <h1> Sign In </h1>
//                     <div id="user-form">
//                         <input name= "E-Mail" placeholder="E-Mail"/>
//                         <input name= "Password" placeholder="Password"/>
//                         <button id="forgotbttn"> Forgot Password? </button>
//                         <button> Sign In </button>
//                     </div>
//                 </div>
//                 <div className="signUp">
//                     <h1> Sign Up </h1>
//                     <div id="new-user-signup">
//                         <input name="E-Mail" placeholder="E-Mail"/>
//                         <input name="Password" placeholder="Password"/>
//                         <input name="Confirm Password" placeholder="Confirm Password"/>
//                         <button> Sign Me Up </button>
//                     </div>
//                 </div>
//                 <div className="forgot-password">

//                 </div>
//             </div>
//         )
//     }
// }

// export default LoginPage;