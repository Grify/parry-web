window.location.href.match("https")||(window.location.href=window.location.href.replace("http","https"));
function getCookie(e){for(var n=e+"=",t=decodeURIComponent(document.cookie).split(";"),o=0;o<t.length;o++){for(var r=t[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(n))return r.substring(n.length,r.length)}return""}
var account = {"username": getCookie("username"), "authstring": getCookie("authstring"), status: "fetching"}
if(account.authstring == "" || account.username == ""){
	account.status = "none"
}else{
	account.status = "cached"
}
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed
	let h2 = 0x41c6ce57 ^ seed
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return (h2>>>0).toString(16).padStart(8,0)+(h1>>>0).toString(16).padStart(8,0);
};

//function print(str){console.log(str)}
function e(){return new Error()}
print = function(msg, e = new Error()) {//See https://stackoverflow.com/a/27074218/470749
	if (!e.stack)
		try {
			throw e;
		} catch (e) {
			if (!e.stack) {
				alert("browser is unsupported")
			}
		}
	var stack = e.stack.toString().split(/\r\n|\n/);
	if (msg === '') {
		msg = '""';
	}
	var stktstr = stack[1].toString()
	console.log('\x1b[30m[' + stktstr.substr(35,stktstr.length - 36) + ']\x1b[0m '+msg);		
}

print("a",new Error())//use this to show line number
function HTTPFromUrl(url, method, data){
	//HTTPFromUrl("https://google.com", "POST", "test")
	if(method == "POST"){
		fetch("https://parry-host.grify.repl.co", {
			method: "POST", 
			body: JSON.stringify(data)
		}).then(res => {
			console.log("Request complete! response:", JSON.stringify(res).toString());
			
		});
	}else{
		return new Promise (function (resolve, reject) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				print("type is "+typeof xhttp.responseText.toString()+" and thisrS "+this.readyState.toString()+" for "+url)
				if (this.readyState == 4) {
					console.log("resolivg!"+xhttp.responseText.toString())
					resolve({"status": this.status, "res": xhttp.responseText, "ok": true})
				}else{
					console.log(xhttp.responseText.toString().substr(0,10))
					//reject({"status": false, "res": "Error: no data","ok": false})
				}
			};
		xhttp.open("GET", url, true);
		xhttp.send();
		})
	}
}
function getHTTPFromUrl(url, data){
	return HTTPFromUrl(url, "GET", data)
}
function getHTTP(req){
	return getHTTPFromUrl("https://parry-host.grify.repl.co/req"+req)
}
function postHTTPToURL(url, data){
	return HTTPFROMUrl(url, "POST", data)
}
function postDataToURL(url, data){
	return fetch(url, {method: "POST", body: JSON.stringify(data)});
}
function postXMLDataToURL(url, data){
	
}
async function checkAuth(auth){

	fetch('https://parry-host.grify.repl.co/auth').then(response => response.json()).then(data => console.log(data));

	auth.bool = true
	return auth
}
async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

function authHash(username, password){
	return cyrb53(username.toString()+""+password.toString())
}

async function loaded(){
	var p = document.getElementById('p')
	p.innerHTML = "Ladet"
	//print("here", e())
	p.innerHTML = "Laden"
	p.classList.add('inactive')
	//auth = checkAuth()
	document.getElementsByTagName('perry')[0].innerHTML = ""
	auth = {}
	auth.bool = false
	
	//move everything below this to its own Login function
	await postData('https://parry-host.grify.repl.co/auth', { authHash: "" }).then(data => {console.log(data.json());});//parsed by `data.json()` (no, i have no idea what that means either wait yes i do)
	if(auth.bool){
		//server
	}else{
		//ask user again
	}
	console.log("here")

	console.log("i hate async functions")
	HTTPFromUrl("https://google.com", "POST", "ping")

}
var reload_timeout = setTimeout(function() {
	window.location.reload();
}, 3600000)