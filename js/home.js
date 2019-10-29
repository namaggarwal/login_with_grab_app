let config = {}

function loadConfig() {
  fetch('/login_with_grab/config.json').
  then(res => res.json()).
  then(res => {
    config = res;
  });
}

function loginWithGrab() {
  const grabIdClient = new GrabID(GrabID.getGrabUrls().STAGING, config)
  grabIdClient.getOpenIdConfiguration()
  .then(() => {
    grabIdClient.makeAuthorizationRequest()
  })
  .catch(error => alert(error.toString()))
}

function attachEvents() {
  document.getElementById("btnLogin").onclick = loginWithGrab;
}

(() => {
  loadConfig();
  attachEvents();
})();