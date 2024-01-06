import Branch from '../models/branch';

// @todo: валидации
class BranchesService {
	async getAll() {
		const branches = await Branch.find();

		return branches;
	};

	async create(branch) {
		const createdBranch = await Branch.create(branch);

		return createdBranch;
	};

	async getById(id) {
		if (!id) {
			throw new Error('Ошибка получения филиала по ID. Не указан ID.');
		}

		const branch = await Branch.findById(id);

		return branch;
	};

	async updateById(id, branch) {
		if (!id) {
			throw new Error('Ошибка редактирования филиала по ID. Не указан ID.');
		}

		const updatedBranch = await Author.findByIdAndUpdate(id, branch, { new: true });

		return updatedBranch;
	};

	async deleteById(id) {
		if (!id) {
			throw new Error('Ошибка удаления филиала по ID. Не указан ID.');
		}

		const deletedBranch = await Branch.findByIdAndDelete(id);

		return deletedBranch;
	};
};

export default new BranchesService();
