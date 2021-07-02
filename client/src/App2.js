import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth, Hub } from 'aws-amplify'

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
export default App;