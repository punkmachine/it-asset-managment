import Admin from '../models/admin.js';
import { compareSync, hashSync } from 'bcrypt';
import { generateAccessToken } from '../helpers/auth.js';

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

      const token = generateAccessToken(admin._id); // @todo: роль

      response.status(200).json({ token, adminId: admin._id });
    } catch (error) {
      response.status(500).json(error.message);
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
