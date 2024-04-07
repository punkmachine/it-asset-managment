import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
import { compareSync, hashSync } from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../helpers/auth.js';

class AuthController {
  async login(request, response) {
    try {
      const { login, password } = request.body;

      const admin = await Admin.findOne({ login });
      if (!admin) {
        return response.status(404).json({ message: `Пользователь ${login} не найден` });
      }

      const validPassword = compareSync(password, admin.password);
      if (!validPassword) {
        return response.status(400).json({ message: 'Введен неверный пароль' });
      }

      const token = generateAccessToken(admin._id, admin.role);
      const refreshToken = generateRefreshToken(admin._id, admin.role);

      response.status(200).json({ token, refreshToken, adminId: admin._id });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async refresh(request, response) {
    try {
      const { refreshToken } = request.body;

      const data = jwt.verify(refreshToken, 'refresh-itam');
      const token = generateAccessToken(data.id, data.role);

      response.status(200).json({ token });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return response.status(401).json({ message: 'Срок действия refreshToken истек. Пожалуйста, войдите снова' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return response.status(401).json({ message: 'Неверный refreshToken. Пожалуйста, войдите снова' });
      } else {
        return response.status(401).json({ message: 'Невозможно обновить токен, пожалуйста, войдите снова' });
      }
    }
  }

  async createSuperAdmin(request, response) {
    try {
      const { password } = request.body;

      const hashPassword = hashSync(password, 7);
      const newAdmin = {
        ...request.body,
        password: hashPassword,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        firstName: 'SUPER',
        lastName: 'ADMIN',
        state: 'ACTIVE',
        role: 'SUPERADMIN',
      };

      const createdAdmin = await Admin.create(newAdmin);
      const token = generateAccessToken(createdAdmin._id);

      response.status(201).json({ token, adminId: createdAdmin._id });
		} catch (error) {
			response.status(500).json(error.message);
		}
  }
};

export default new AuthController();
