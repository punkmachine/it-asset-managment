import { validationResult } from 'express-validator';
import { hashSync } from 'bcrypt';
import Admin from '../models/admin.js';
import paginate from '../helpers/paginate.js';

class AdminController {
	async getAll(request, response) {
		try {
      const { page, limit } = request.query;

      const paginationResult = await paginate(Admin, {}, { page, limit });

      response.status(200).json(paginationResult);
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
      const isCandidateExist = await Admin.findOne({ login });

      if (isCandidateExist) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = hashSync(password, 7);
      const newAdmin = {
        ...request.body,
        password: hashPassword,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        state: 'ACTIVE',
        role: 'ADMIN',
      };

      const createdAdmin = await Admin.create(newAdmin);

			response.status(201).json(createdAdmin);
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

      const admin = await Admin.findById(id);

			response.status(200).json(admin);
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

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        {
          $set: {
            ...request.body,
            updatedDate: new Date().toISOString()
          }
        },
        { new: true }
      );

			response.status(200).json(updatedAdmin);
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

      const deletedAdmin = await Admin.findById(id);
      if (!deletedAdmin) {
        return response.status(404).json({ message: 'Пользователь с указанным ID не найден.' });
      }

      deletedAdmin.state = 'DELETED';
      deletedAdmin.updatedDate = new Date().toISOString();
      const updatedAdmin = await deletedAdmin.save();

			response.status(200).json(updatedAdmin);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

  async searchAdmins(request, response) {
    try {
      const { searchText, page, limit } = request.query;

      if (!searchText) {
        return response.status(400).json({ error: 'Для поиска филиала необходимо указать параметр searchText' });
      }

      const searchRegex = new RegExp(searchText, 'i');
      const searchQuery = {
        $or: [
          { firstName: { $regex: searchRegex } },
          { lastName: { $regex: searchRegex } },
        ],
      };

      const paginationResult = await paginate(Admin, searchQuery, { page, limit });

      response.status(200).json(paginationResult);
		} catch (error) {
			response.status(500).json(error.message);
		}
  }
}

export default new AdminController();
