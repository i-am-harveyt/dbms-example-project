import * as jose from "jose";
import { JWT_SECRET, JWT_ALG } from "./constants.js";

/**
 * @typedef {Object} Payload
 */

/**
 * This function sign a JWT with given payload
 *
 * @param {Payload} payload
 * @returns {Promise<string>}
 */
export async function signJWT(payload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setExpirationTime("2h")
    .sign(JWT_SECRET);
}

/**
 * This function verify a JWT and extract the payload
 *
 * @param {string} jwt
 * @returns {Promise<Payload>}
 */
export async function verifyJWT(jwt) {
  const { payload } = await jose.jwtVerify(jwt, JWT_SECRET, {});
  return payload;
}
