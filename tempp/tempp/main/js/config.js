const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

if(window.location.hash == "") window.location.hash = "#home"

function loading() {

    $('.loader-container').classList.remove('fader-out')
    $('html').classList.add('loader')
    window.scrollTo(0, 0);

    setTimeout(() => {
        $('.loader-container').classList.add('fader-out')
        $('html').classList.remove('loader')
    }, 1500)
}

var date = new Date();
let timeExpired = new Date(JSON.parse(localStorage.getItem("timeExpired")));

// if(date.getDate() >= timeExpired.getDate()) {
//     localStorage.setItem("userCurrent", JSON.stringify(''));
// }


function formatMoney(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
  
  

  

  

const success = "fa-check-circle";
const warning = "fa-exclamation-circle";
const danger = "fa-exclamation-triangle";
const info = "fa-info-circle";

let icon = {
    "success" : success,
    "warning" : warning,
    "danger" : danger,
    "info" : info
}

let options = {
    product : {
        name : {
            min : 8,
            max : 25
        },
    },
    user : {
        username : {
            min : 5,
            max : 13
        }
    },
    category : {
        name : {
            min : 5,
            max : 20
        }
    }
}

let lang  = language.vi;
const LIMIT = 6;
