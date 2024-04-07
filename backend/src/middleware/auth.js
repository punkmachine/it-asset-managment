import jwt, { decode } from 'jsonwebtoken';

export default function (request, response, next) {
  if (request.method === "OPTIONS") {
    next();
  }

  try {
    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      return response.status(403).json({ message: "Пользователь не авторизован" });
    }

    const decodedData = jwt.verify(token, 'itam-secret');

    request.user = decodedData;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: "Срок действия токена истек" });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ message: "Невалидный токен" });
    } else {
      return response.status(500).json({ message: "Ошибка сервера при обработке токена" });
    }
  }
}
