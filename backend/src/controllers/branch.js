import Branch from '../models/branch.js';

class BranchesController {
	async getAll(request, response) {
		try {
      const branches = await Branch.find();

			response.status(200).json(branches);
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
      const { searchText } = request.query;

      if (!searchText) {
        return response.status(400).json({ error: 'Для поиска филиала необходимо указать параметр searchText' });
      }

      const searchRegex = new RegExp(searchText, 'i');

      const branches = await Branch.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      });

      response.status(200).json(branches);
		} catch (error) {
			response.status(500).json(error.message);
		}
  };
}

export default new BranchesController();
