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
        throw new Error('Ошибка получения филиала по ID. Не указан ID.');
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
        throw new Error('Ошибка редактирования филиала по ID. Не указан ID.');
      }

      const updatedBranch = await Branch.findByIdAndUpdate(id, request.body, { new: true });

			response.status(200).json(updatedBranch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

  // @todo: блокировать, а не удалять
	async deleteById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        throw new Error('Ошибка удаления филиала по ID. Не указан ID.');
      }

      const deletedBranch = await Branch.findByIdAndDelete(id);

			response.status(200).json(deletedBranch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};
}

export default new BranchesController();
