
var empurl = "http://localhost:8080/api/employees";
function loadPerson() {
    var xmlhttp = new XMLHttpRequest();
    var currentEmployee = 3;
    xmlhttp.open("GET", empurl+ "/" + currentEmployee, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var persons = JSON.parse(xmlhttp.responseText);
            var name = `<div class="w-100">`;
            //main table content we fill from data from the rest call
            var main = "";
                main += `<h1 class="mb-0"></br>` + persons.lastName +`  <span class="text-primary">` +  persons.firstName + "</span></h1><br>" 
                 + `<div class="subheading mb-5">Email: <a href=""> ` + persons.emailId + ` </a> Role:<a href="">` + persons.title + `</a></div> `;  
            var title = "</div>";
            var info = name + main + title;
            document.getElementById("personinfo").innerHTML = info;
        }
    };
    xmlhttp.send();
}
var reimburl = "http://localhost:8080/api/reimbursements";
function loadPendingReimbursements() {
    var xmlhttp = new XMLHttpRequest();
    var currentEmployee = 3;
    xmlhttp.open("GET", reimburl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < data.length; i++) {
                if(data[i].status === "Pending" && data[i].employeeId === currentEmployee){
                main += "<tr><td>" + data[i].id + "</td><td>" + data[i].title + "</td><td>" 
                + data[i].amountRequested + "</td><td>" + data[i].dateRequested + "</td><td>" + 
                data[i].status + "</td></tr>";
                }
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("submited").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}

function loadResolvedReimbursements() {
    var xmlhttp = new XMLHttpRequest();
    var currentEmployee = 3;
    xmlhttp.open("GET", reimburl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th><th>Rsolved Status</th><th>Rsolved By</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < data.length; i++) {
                if(data[i].status === "Resolved"  && data[i].employeeId === currentEmployee){
                main += "<tr><td>" + data[i].id + "</td><td>" + data[i].title + "</td><td>" 
                + data[i].amountRequested + "</td><td>" + data[i].dateRequested + "</td><td>" + 
                data[i].status + "</td><td>" + data[i].resolvedStatus + "</td><td>" + data[i].resolvedBy + "</td></tr>";
                }
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("isresolved").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}

function sendJSON(){
    
    let result = document.querySelector('.result'); 
    let title = document.querySelector('#title'); 
    let amount = document.querySelector('#amount'); 
    var currentEmployee = 3;
       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/api/reimbursements"; 

    // open a connection 
    xhr.open("POST", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText; 

        } 
    }; 

    // Converting JSON data to string 
    var data = JSON.stringify({ "title": title.value, "amountRequested": amount.value, "employeeId" : currentEmployee, "status": "Pending"}); 

    // Sending data with the request 
    xhr.send(data); 
} 

var empurl = "http://localhost:8080/api/employees";
function loadPersonToUpdate() {
    var xmlhttp = new XMLHttpRequest();
    var currentEmployee = 3;
    xmlhttp.open("GET", empurl+ "/" + currentEmployee, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var persons = JSON.parse(xmlhttp.responseText);
            var name = `<div class="w-100">`;
            //main table content we fill from data from the rest call
            var main = "";
                main += `<h2 class="mb-0"></br><form ><input type="text" id="lname"> `+ persons.lastName +`<br> 
                 <span class="text-primary"><input type="text" id="fname">` +  persons.firstName + `</span></h1><br>` 
                 + `<div class="subheading mb-5"><input type="text" id="email"> ` + persons.emailId + `
                  </div><button onclick="window.location.reload(), updateJSON(`+ currentEmployee +`)" id="ok" class="btn btn-secondary">Upate Profile</button> </form>`;  
            var title = "</div>";
            var info = name + main + title;
            document.getElementById("upersoninfo").innerHTML = info;
        }
    };
    xmlhttp.send();
}

function updateJSON(a){ 
	let result = document.querySelector('.result'); 
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    var currentEmployee = 3;       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/api/employees/" + a; 
    // open a connection 
    xhr.open("PUT", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText; 
        } 
    }; 
    // Converting JSON data to string 
    var updatedata = JSON.stringify({"firstName" : fname, "lastName" : lname, "emailId" : email}); 


    // Sending data with the request 
    xhr.send(updatedata); 
}


function createEmployeeJSON(){ 
	let result = document.querySelector('.result'); 
    let inputFirst = document.getElementById("inputFirst").value;
    let inputLast = document.getElementById("inputLast").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputUsername = document.getElementById("inputUsername").value;
    let inputPassword = document.getElementById("inputPassword").value;
    var currentEmployee = 3;       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/api/employees"; 
    // open a connection 
    xhr.open("POST", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText; 
        } 
    }; 
    // Converting JSON data to string 
    var createdata = JSON.stringify({"firstName" : inputFirst, "lastName" : inputLast, "emailId" : inputEmail, "username": inputUsername,
    	"password": inputPassword, "title" : "Employee"}); 


    // Sending data with the request 
    xhr.send(createdata); 
}


window.onload = function () {
    loadPerson(); 
    loadPendingReimbursements();
    loadResolvedReimbursements();
    loadPersonToUpdate();
}

