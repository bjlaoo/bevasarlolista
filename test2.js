  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyCiNJapIQl7q_HAmumYSdBI1cIyBP3SCsE",
  authDomain: "wrud-5ced6.firebaseapp.com",
  databaseURL: "https://wrud-5ced6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wrud-5ced6",
  storageBucket: "wrud-5ced6.appspot.com",
  messagingSenderId: "197962461246",
  appId: "1:197962461246:web:c9f34f9268b20c8c28a16f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  import{getDatabase, ref, child, get ,set ,update, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
  const db=getDatabase();
  document.querySelector("button").addEventListener("click",function(){
      set(ref(db,"Employee/"+"asdf"),{
          asdf:"érték"
      })
      .catch((error)=>{
          console.log(error);
      })
  })

    document.querySelector(".lekeres").addEventListener("click",function(){
        get(child(dbRef, 'Employee/'+"asdf")).then((snapshot)=>{
            if(snapshot.exists()){
                console.log(snapshot.val().asdf);
            }
        })
    })


    
    document.querySelector(".torles").addEventListener("click",function(){
        remove(ref(db,"Employee/"+"asdf"),{
        })
        .catch((error)=>{
            console.log(error);
        })
    })
  
  
  

      