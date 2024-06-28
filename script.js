var authstyle
var uniuser
var i=1
const firebaseConfig = {
  apiKey: "AIzaSyDCGhnUcJCkvOB3lBrknTbtaHU5qAjisIs",
  authDomain: "hacathon-login.firebaseapp.com",
  databaseURL: "https://hacathon-login-default-rtdb.firebaseio.com",
  projectId: "hacathon-login",
  storageBucket: "hacathon-login.appspot.com",
  messagingSenderId: "552244573786",
  appId: "1:552244573786:web:fa0f830f9856122a698a63"
}; 
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function login() {
  InitLogin();;
   authstyle = 'li'
}

function signup(){
  InitLogin();
   authstyle = 'su'
}
function AfterAuth(){
  
  console.log('Auth !')
if (authstyle == 'su'){

  var user_data = {
    email: AUTH_EMAIL,
    username:document.getElementById('text').value,
    last_login: Date.now(),
    tickets: 0
  };
  
  // Write user data to the database
  if (AUTH_EMAIL.includes('@')) {
  
  var database_ref = database.ref();
  database_ref.child('users/' + AUTH_EMAIL.replace('.', ',')).set(user_data)
    .then(() => {
        console.log("User data written successfully!");
    })
  }
}else if(authstyle == 'li'){
  console.log(AUTH_EMAIL )
  database.ref('users/' +  AUTH_EMAIL.replace('.', ',')+ '/username').once('value')
    .then((snapshot) => {
        // Handle snapshot data here
        console.log("Snapshot value:", snapshot.val());
        uniuser = snapshot.val()
        deal()
    })
  }
}
function deal(){

  if (document.getElementById('text').value == uniuser){
    localStorage.setItem("username", uniuser);

    var database_ref = database.ref();
   database_ref.child('users/' + AUTH_EMAIL.replace('.', ',')).update({last_login: Date.now()})
     .then(() => {
         console.log("User data written successfully!");
      })
      window.location.href = '/home/home.html#'+ uniuser+'/'+AUTH_EMAIL
    }else{console.error('Username is incorrect!')
      alert('Username registered with this email is incorrect!')
     
    }
}