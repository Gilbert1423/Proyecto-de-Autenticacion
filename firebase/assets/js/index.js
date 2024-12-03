   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
   import{
       getAuth, 
       createUserWithEmailAndPassword,
       signInWithEmailAndPassword,
       onAuthStateChanged,
       signOut
   }from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
     apiKey: "AIzaSyDsNqUNxPx9sFr3ugwHgOn1yp3cS7bL5kM",
     authDomain: "autenticacion-fd560.firebaseapp.com",
     projectId: "autenticacion-fd560",
     storageBucket: "autenticacion-fd560.firebasestorage.app",
     messagingSenderId: "952035426783",
     appId: "1:952035426783:web:ff08842bc24426198d446a",
     measurementId: "G-S5HHPMSQ7K"
   };
 
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const auth = getAuth(app)

   const registroForm = document.getElementById('registroForm');
   registroForm.addEventListener('submit', (e) =>{
       e.preventDefault();
       const Email = document.getElementById('correoRegistro').value;
       const password = document.getElementById('passwordRegistro').value;
       
       createUserWithEmailAndPassword(auth, Email, password)
       .then((userCredential) => {
           const user = userCredential.user;
           console.log('usuario registrado', user);
       })
       .catch((error) =>{
           console.error('no ah sido registrado', error)
       })
   }); //lo que se nesecita para registrar un usuario

   const loginForm = document.getElementById('loginForm');
   loginForm.addEventListener('submit', (e) =>{
       e.preventDefault();
       const Email = document.getElementById('correoLogin').value;
       const password = document.getElementById('passwordLogin').value;
       
       signInWithEmailAndPassword(auth, Email, password)
       .then((userCredential) => {
           const user = userCredential.user;
           console.log('el ususario a iniciado sesion', user);
       })
       .catch((error) =>{
           console.error('no ah sido posible iniciar session', error)
       })
   });

   const logoutButton = document.getElementById('cerrarSession');
   logoutButton.addEventListener('click', () =>{
       signOut (auth)
       .then(()=>{
           console.log('el usuario ha cerrado session');
       })
       .catch((error) =>{
           console.error("no ha sido posible cerrer sesison", error)
       })
   });
   onAuthStateChanged(auth,(user)=>{
       if(user){
           new Notification('Bienvenido')
           document.getElementById('auth').style.display = 'none'
           document.getElementById('content').style.display = 'block'
       }else{
           new Notification('inicia session')
           document.getElementById('auth').style.display = 'block'
           document.getElementById('content').style.display = 'none'
       }
   });