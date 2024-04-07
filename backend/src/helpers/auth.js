import jwt from 'jsonwebtoken';

export const generateAccessToken = (id, role) => {
  const payload = { id, role };

  return jwt.sign(payload, 'itam-secret', { expiresIn: "30m" } )
}


export const generateRefreshToken = (id, role) => {
  const payload = { id, role };

  return jwt.sign(payload, 'refresh-itam', { expiresIn: '1d' });
};
