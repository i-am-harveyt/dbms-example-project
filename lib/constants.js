export class StatusCode {
  static OK = 200;
  static CREATED = 201;
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
}
export const JWT_ALG = "HS256";
export const JWT_SECRET = new TextEncoder().encode("secret"); // think if this can be used without explicitly shown
