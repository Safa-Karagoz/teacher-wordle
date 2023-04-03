import jwtDecode from "jwt-decode";

var name = "google-oauth-assembly.session"

export function checkCookie() {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
      var token = match[2];
      var decodedToken=jwtDecode(token, {complete: true});
      var dateNow = new Date();
      if(decodedToken.exp < dateNow.getTime()){ return false; }
    } else {
      return true
    }

}

export function resetCookie() {
    document.cookie = name + "=null; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=lax"
}

export function getCookieValue() {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
      var token = match[2];
      var decodedToken=jwtDecode(token, {complete: true});
      var dateNow = new Date();

      if(decodedToken.exp < dateNow.getTime()){ 
        return decodedToken.email;
      }
    } else {
      return null
    }
}