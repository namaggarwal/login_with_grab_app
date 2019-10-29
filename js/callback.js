
function loadConfig() {
  return fetch('/login_with_grab/config.json').
    then(res => res.json());
}

function processRedirect(config) {
  const grabIdClient = new GrabID(GrabID.getGrabUrls().STAGING, config)
  GrabID.handleAuthorizationCodeFlowResponse()
  grabIdClient.getOpenIdConfiguration()
    .then(() => {
      grabIdClient.makeTokenRequest()
        .then(handleTokenResponse)
        .catch(error => alert(error.toString()))
    })
    .catch(error => alert(error.toString()))
}

function handleTokenResponse() {
  const result = GrabID.getResult();
  const accessToken = result.accessToken;
  getProfile(accessToken)
}

function getProfile(accessToken) {
  fetch('https://partner-api.stg-myteksi.com/grabid/v1/oauth2/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(result => result.json())
  .then(result => {
    console.log(result);
    document.getElementById("name").innerHTML = result.name;
  })
}



(() => {
  loadConfig().then((config) => {
    processRedirect(config)
  })
})();