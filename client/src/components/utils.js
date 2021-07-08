export const getTokenFromStorage = () => {
  for(let item in localStorage) {
    if(item.includes('accessToken')){
      return localStorage.getItem(item);
    } 
  }
  return null;
}