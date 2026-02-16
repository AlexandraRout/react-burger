export function setCookie(name, value, options = {}) {
  let props = {};

  if (typeof options === 'number') {
    props.expires = options * 60;
  } else {
    props = { ...options };
  }

  let exp = props.expires;

  if (typeof exp === 'number' && exp) {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + exp * 1000);
    exp = expiresAt;
  }

  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);
  let updatedCookie = `${name}=${encodedValue}`;

  Object.entries(props).forEach(([propName, propValue]) => {
    updatedCookie += `; ${propName}`;
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
