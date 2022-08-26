document.addEventListener('DOMContentLoaded', function() {
    var logoutBtn = document.getElementById("user-logout-btn");
    var loginBtn = document.getElementById("user-login-btn");
    if (logoutBtn != null){ 
    logoutBtn.addEventListener("click", function(){
        logout();
        
    });
    }
    loginBtn.addEventListener("click", function(){
        login(); 
        
    });
    /*var logoutForm = document.getElementById("logout-form");
    if (logoutForm != null){
        logoutForm.onsubmit = function(){
        logout();
        
        return false;
            
        }
    }
    var loginForm = document.getElementById("login-form");
    if (loginForm != null){
        loginForm.onsubmit = function(){
        login();
       
        }
    }*/
    
});

function login(){
    var email = document.getElementById("user-email").value;
    var password = document.getElementById("user-password").value;
    return fetch(`/api/auth/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.href = "/";
            
            if (data.status === "success"){
            }
        })
}


function logout(){
    fetch(`/api/auth/users/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload();
            if (data.status === "success"){
            }
        })
}

function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {

        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {

            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}