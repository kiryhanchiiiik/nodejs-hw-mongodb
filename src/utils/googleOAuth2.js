import { OAuth2Client } from 'google-auth-library';
import * as path from 'node:path';
import { readFile } from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

const googleOauthJSONPath = path.resolve('google-oauth.json');

const authConfig = JSON.parse(await readFile(googleOauthJSONPath, 'utf-8'));

const clientId = getEnvVar('GOOGLE_OAUTH-CLIENT_ID');
const clientSecret = getEnvVar('GOOGLE_OAUTH-CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: authConfig.web.redirect_uris[0],
});

export const generateOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response?.tokens?.id_token)
    throw createHttpError(401, 'Google OAuth code invalid');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getUsernameFromGoogleTokenPayload = (payload) => {
  if (payload.name) return payload.name;
  let username = '';
  if (payload.given_name) {
    username += payload.given_name;
  }
  if (payload.given_name && payload.family_name) {
    username += ` ${payload.family_name}`;
  }
  if (!payload.given_name && payload.family_name) {
    username = payload.family_nam;
    return username;
  }
};
