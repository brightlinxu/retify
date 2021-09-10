export const getAuthUrl = (showDialog) => {
  // generates state for auth url
  const getStateKey = (stateLength) => {
    var key = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < stateLength; ++i) {
        key += possible[Math.floor(Math.random() * possible.length)];
    }

    return key;
  }

  // query parameters for auth request
  const auth_endpoint = 'https://accounts.spotify.com/authorize';
  const client_id = 'c4f6216c2386463795cfce5d9927b215';
  const scopes = ['user-top-read',
                'user-read-email',
                'user-read-private', 
                'streaming'];
  const redirect_uri = 'https://retify.brightxu.com/home'; // 'http://localhost:3000/home';
  const state = getStateKey(16);

  // auth request url
  const auth_url = `${auth_endpoint}` + 
              `?client_id=${client_id}` +
              `&response_type=token` +
              `&redirect_uri=${redirect_uri}` +
              `&state=${state}` +
              `&scope=${scopes.join('%20')}` +
              `&show_dialog=${showDialog}`;

  return auth_url;
}
