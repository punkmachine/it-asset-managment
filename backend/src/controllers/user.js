import { validationResult } from 'express-validator';
import { hashSync } from 'bcrypt';
import User from '../models/user.js';

class UserController {
	async getAll(request, response) {
		try {
      const users = await User.find();

			response.status(200).json(users);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async create(request, response) {
		try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }

      const { login, password } = request.body;
      const isCandidateExist = await User.findOne({ login });

      if (isCandidateExist) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = hashSync(password, 7);
      const newUser = {
        ...request.body,
        password: hashPassword,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        state: 'ACTIVE',
      };

      const createdUser = await User.create(newUser);

			response.status(201).json(createdUser);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async getById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка получения пользователя по ID. Не указан ID.' });
      }

      const user = await User.findById(id);

			response.status(200).json(user);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async updateById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка редактирования пользователя по ID. Не указан ID.' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...request.body,
            updatedDate: new Date().toISOString()
          }
        },
        { new: true }
      );

			response.status(200).json(updatedUser);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async deleteById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка удаления пользователя по ID. Не указан ID.' });
      }

      const deletedUser = await User.findById(id);
      if (!deletedUser) {
        return response.status(404).json({ message: 'Пользователь с указанным ID не найден.' });
      }

      deletedUser.state = 'DELETED';
      const updatedUser = await deletedUser.save();

			response.status(200).json(updatedUser);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};
}

export default new UserController();
