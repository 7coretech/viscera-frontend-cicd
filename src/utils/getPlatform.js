const getPlatform = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/electron/.test(ua)) return 'electron';
  return 'web';
};

export default getPlatform;
