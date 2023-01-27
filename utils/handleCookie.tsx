const handleCookies = {
  setCookie(key: string, value: string, expiredays: number): void {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie =
      key +
      "=" +
      encodeURI(value) +
      "; path=/; expires=" +
      todayDate.toUTCString() +
      ";";
  },
  delCookie(key: string): void {
    let todayDate = new Date();
    document.cookie =
      key + "=; path=/; expires=" + todayDate.toUTCString() + ";";
  },
};

export default handleCookies;
export const { setCookie, delCookie } = handleCookies;
