interface ICookieOptions {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  [key: string]: string | number | boolean | Date | undefined;
}

export function setCookie(name: string, value: string | null, options: ICookieOptions | number = {}): void {
  let props: ICookieOptions = {};

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

  const encodedValue = encodeURIComponent(value ?? '');
  let updatedCookie = `${name}=${encodedValue}`;

  Object.entries(props).forEach(([propName, propValue]) => {
    updatedCookie += `; ${propName}`;
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}
