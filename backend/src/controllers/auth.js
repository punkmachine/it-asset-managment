import User from '../models/user.js';
import { compareSync, hashSync } from 'bcrypt';
import { generateAccessToken } from '../helpers/auth.js';

class AuthController {
  async login(request, response) {
    try {
      const { login, password } = request.body;

      const user = await User.findOne({ login });
      if (!user) {
        return response.status(404).json({ message: `Пользователь ${login} не найден` });
      }

      const validPassword = compareSync(password, user.password);
      if (!validPassword) {
        return response.status(400).json({ message: 'Введен неверный пароль' });
      }

      const token = generateAccessToken(user._id); // @todo: роль

      response.status(200).json({ token, userId: user._id });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async createSuperAdmin(request, response) {
    try {
      const { password } = request.body;

      const hashPassword = hashSync(password, 7);
      const newUser = {
        ...request.body,
        password: hashPassword,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        firstName: 'SUPER',
        lastName: 'ADMIN',
        state: 'ACTIVE',
        role: 'SUPERADMIN',
      };

      const createdUser = await User.create(newUser);
      const token = generateAccessToken(createdUser._id);

      response.status(201).json({ token, userId: createdUser._id });
		} catch (error) {
			response.status(500).json(error.message);
		}
  }
};

export default new AuthController();
