export const isMobile = () => {
  let ua = window.navigator.userAgent.toLocaleLowerCase();
  let reg = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;
  if (reg.test(ua)) {
    return true;
  }
  return false;
};
