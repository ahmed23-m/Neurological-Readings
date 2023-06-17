// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjan3X86EnK2UCibt6SO39yo66MDABK0A",
    authDomain: "noro-14113.firebaseapp.com",
    databaseURL: "https://noro-14113-default-rtdb.firebaseio.com",
    projectId: "noro-14113",
    storageBucket: "noro-14113.appspot.com",
    messagingSenderId: "761578432013",
    appId: "1:761578432013:web:175bc5a9ef337580a75744",
    measurementId: "G-WPM8CBFMJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var Signals;
var details = document.querySelector(".Details p");

import { getDatabase, ref, child, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const database = getDatabase();

onValue(child(ref(database), "Signals"), (snapshot) => {
    Signals = snapshot.val();
    // console.log(Signals);
});
onValue(child(ref(database), "The Ratio"), (snapshot) => {
    details.textContent = snapshot.val();
});

const ctx = document.getElementById('myChart');

var myChart = new myChart(ctx, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [
            {
                label: 'Signals speed(HZ)',
                data: [0],
                borderWidth: 1,
                pointRadius: 0
            }
        ]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time(seconds)'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Signals speed(HZ)'
                }
            }
        }
    }
});
window.setInterval(mycallback, 1000);
var i =0;
function mycallback() {
    i++;
    myChart.data.labels.push(i);
    myChart.data.datasets[0].data.push(Signals);
    if(myChart.data.labels.length>20)
    {
        myChart.data.labels.splice(0,4);
        myChart.data.datasets[0].data.splice(0,4);
    }
    myChart.update();
}
