const ACCESS_TOKEN = 'ACCESS_TOKEN';

export function saveAccessToke(accessToken) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

 export function autoLogin(store) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    return;
  }
  store.dispatch('login', accessToken);
 }