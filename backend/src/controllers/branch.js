import Branch from '../models/branch.js';
import paginate from '../helpers/paginate.js';

class BranchesController {
	async getAll(request, response) {
		try {
      const { page, limit } = request.query;

      const paginationResult = await paginate(Branch, {}, { page, limit });

      response.status(200).json(paginationResult);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async create(request, response) {
		try {
      const newBranch = {
        ...request.body,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        state: 'ACTIVE',
      };

      const createdBranch = await Branch.create(newBranch);

			response.status(201).json(createdBranch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async getById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка получения филиала по ID. Не указан ID.' });
      }

      const branch = await Branch.findById(id);

			response.status(200).json(branch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async updateById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка редактирования филиала по ID. Не указан ID.' });
      }

      const updatedBranch = await Branch.findByIdAndUpdate(id, request.body, { new: true });

			response.status(200).json(updatedBranch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

  async deleteById(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'Ошибка удаления филиала по ID. Не указан ID.' });
      }

      const deletedBranch = await Branch.findById(id);
      if (!deletedBranch) {
        return response.status(404).json({ message: 'Филиал с указанным ID не найден.' });
      }

      deletedBranch.state = 'DELETED';
      const updatedBranch = await deletedBranch.save();

      response.status(200).json(updatedBranch);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  async searchBranches(request, response) {
    try {
      const { searchText, page, limit } = request.query;

      if (!searchText) {
        return response.status(400).json({ error: 'Для поиска филиала необходимо указать параметр searchText' });
      }

      const searchQuery = {
        $or: [
          { title: { $regex: new RegExp(searchText, 'i') } },
          { description: { $regex: new RegExp(searchText, 'i') } },
        ],
      };

      const paginationResult = await paginate(Branch, searchQuery, { page, limit });

      response.status(200).json(paginationResult);
		} catch (error) {
			response.status(500).json(error.message);
		}
  };
}

export default new BranchesController();
