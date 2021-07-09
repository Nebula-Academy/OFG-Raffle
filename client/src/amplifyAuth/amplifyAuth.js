import { Auth } from 'aws-amplify';

// We should only have to use the username and password properties
// The username is by default a users password
// const input = {
//   username: "tefedrb1@gmail.com",
//   password: "testing123"
// }

export async function signUp(userInput){
  try {
    // The outer object is a ISignUpResult
    // The user object embedded is a CognitoUser
    const signUpResult = await Auth.signUp({
      username: userInput.email,
      password: userInput.password
    });
    return signUpResult;
  } catch (error) {
    console.log('error signing up: ', error);
  }
}

export async function confirmSignUp(username, code){
  try {
    const res = await Auth.confirmSignUp(username, code);
    return res;
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}


export async function signIn(username, password){
  try {
    const signedInUser = await Auth.signIn(username, password);
    return signedInUser;
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function getCurrentAuthUser(){
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error){
    console.log('error getting auth user', error);
  }
}

export async function getSession(){
  try {
    const session = await Auth.currentSession();
    return session;
  } catch(error){
    console.log('error getting session:', error);
  }
}

export async function signOut(){
  try {
    const res = await Auth.signOut();
    console.log(res, '<--- sign out return');
  } catch(error){
    console.log('error signing out', error);
  }
}