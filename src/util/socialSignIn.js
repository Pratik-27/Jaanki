import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

export async function onGoogleButtonPress() {
  GoogleSignin.configure({
    webClientId:
      '532623419588-uire1dk88i0lq2a2fh2s75bcof2sbpfo.apps.googleusercontent.com',
  });
  // Get the users ID token

  const {idToken} = await GoogleSignin.signIn();

  console.log('Token', idToken);
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  console.log('facebookCredential', facebookCredential);

  // Sign-in the user with the credential

  return auth().signInWithCredential(facebookCredential);
}
