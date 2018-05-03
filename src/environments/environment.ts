// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCnBkK1AnE21ydNQsBxh6IIccJWdnArkLc",
    authDomain: "shm-develop.firebaseapp.com",
    databaseURL: "https://shm-develop.firebaseio.com",
    projectId: "shm-develop",
    storageBucket: "shm-develop.appspot.com",
    messagingSenderId: "38389948904"
  }
};
