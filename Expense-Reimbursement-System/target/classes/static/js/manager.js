//
//this load All Employees
//
var empurl = "http://localhost:8080/api/employees";
function loadPersons() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", empurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var persons = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Username</th><th>Title</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < persons.length; i++) {
                main += "<tr><td>" + persons[i].id + "</td><td>" + persons[i].firstName + "</td><td>" 
                + persons[i].lastName + "</td><td>" + persons[i].emailId + "</td><td>" + 
                persons[i].username + "</td><td>" + persons[i].title + "</td></tr>";
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("personinfo").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}
//
//this load All reimbursements
//
var reimburl = "http://localhost:8080/api/reimbursements";
function loadReimbursements() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", reimburl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var persons = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th><th>Resolved Status</th><th>Rsolved By</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < data.length; i++) {
                main += "<tr><td>" + data[i].id + "</td><td>" + data[i].title + "</td><td>" 
                + data[i].amountRequested + "</td><td>" + data[i].dateRequested + "</td><td>" + 
                data[i].status + "</td><td>" + data[i].resolvedStatus + "</td><td>" + data[i].resolvedBy + "</td></tr>";
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("reimbinfo").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}
//
//this load Pending reimbursements
//
function loadPendingReimbursements() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", reimburl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th><th>Approve</th><th>Deny</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < data.length; i++) {
                if(data[i].status === "Pending"){
                main += "<tr><td>" + data[i].id + "</td><td>" + data[i].title + "</td><td>" 
                + data[i].amountRequested + "</td><td>" + data[i].dateRequested + "</td><td>" + 
                data[i].status + `</td><td><button onclick="okJSON(`+ data[i].id +`)" id="ok" class="btn-success">Approve</button></p></td>
                <td><button onclick="noJSON(`+ data[i].id +`)" id="no" class="btn-danger">Deny</button></td></tr>`;
                }
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("submited").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}
//
//this load Resolved reimbursements
//
function loadResolvedReimbursements() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", reimburl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table class="table table-striped">
                <tr><th>Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th><th>Rsolved Status</th><th>Rsolved By</th></tr>`;
            //main table content we fill from data from the rest call
            var main = "";
            for (i = 0; i < data.length; i++) {
                if(data[i].status === "Resolved"){
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

function okJSON(a){    
    let result = document.querySelector('.result'); 
    let title = document.querySelector('#ok');     
    var currentEmployee = 2;       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/api/reimbursements/" + a; 
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
    var data = JSON.stringify({"status": "Resolved", "resolvedStatus": "Approved","resolvedBy": currentEmployee}); 

    // Sending data with the request 
    xhr.send(data); 
}

function noJSON(a){    
    let result = document.querySelector('.result'); 
    let title = document.querySelector('#no');     
    var currentEmployee = 2;       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/api/reimbursements/" + a; 
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
    var data = JSON.stringify({"status": "Resolved", "resolvedStatus": "Denied","resolvedBy": currentEmployee}); 
    // Sending data with the request 
    xhr.send(data); 
}
//need work on this one

//function loadReimbursementsById() {
//    var xmlhttp = new XMLHttpRequest();
//    let empId = document.getElementById("empid").value;
//    var reimburlbyid = "http://localhost:8080/api/employees/" + empId;
//    xmlhttp.open("GET", reimburlbyid, true);
//    xmlhttp.onreadystatechange = function () {
//        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//            var data = JSON.parse(xmlhttp.responseText);
//            var tbltop = `<h3>`persons[1].firstName` +" "+ `persons[1].lastName`</h3></br><table class="table table-striped">
//                <tr><th>Employee Id</th><th>Reimbursement</th><th>Amount</th><th>Date Requested</th><th>Status</th><th>Approve</th><th>Deny</th></tr>`;
//            //main table content we fill from data from the rest call
//            var main = "";
//            for (i = 0; i < data.length; i++) {
//                if(data[i].employeeId === empId){
//                	 main += "<tr><td>" + data[i].employeeId + "</td><td>" + data[i].title + "</td><td>" 
//                     + data[i].amountRequested + "</td><td>" + data[i].dateRequested + "</td><td>" + 
//                     data[i].status + "</td><td>" + data[i].resolvedStatus + "</td><td>" + data[i].resolvedBy + "</td></tr>";
//                }
//            }
//            var tblbottom = "</table>";
//            var tbl = tbltop + main + tblbottom;
//            document.getElementById("reimbinfobyid").innerHTML = tbl;
//        }
//    };
//    xmlhttp.send();
//}

window.onload = function () {
    loadPersons();
    loadReimbursements();
    loadPendingReimbursements();
    loadResolvedReimbursements();
    loadReimbursementsById();
}
