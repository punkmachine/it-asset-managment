import jwt from 'jsonwebtoken';

export const generateAccessToken = (id, role) => {
  const payload = { id, role };

  return jwt.sign(payload, 'secret-key', { expiresIn: "24h" } )
}
