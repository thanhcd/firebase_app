// import React, { useEffect } from 'react';
// import { Button, Alert } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri } from 'expo-auth-session';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

// WebBrowser.maybeCompleteAuthSession();

// const GoogleSignInButton = () => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     webClientId: '668832502837-4ealueue8gmirl91eo4r7r3krdjcpf48.apps.googleusercontent.com',
//     iosClientId: '668832502837-626bghf3bm9v57isp8cft351gg18pld2.apps.googleusercontent.com',
//     redirectUri: 'https://auth.expo.io/@vinhvien0916/my-app'

//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.authentication || {};
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential)
//         .then(() => {
//           Alert.alert('Thành công', 'Đăng nhập bằng Google thành công!');
//         })
//         .catch((error) => {
//           Alert.alert('Lỗi', error.message);
//         });
//     }
//   }, [response]);

//   return (
//     <Button
//       title="Đăng nhập với Google"
//       disabled={!request}
//       onPress={() => promptAsync()}
//     />
//   );
// };

// export default GoogleSignInButton;
