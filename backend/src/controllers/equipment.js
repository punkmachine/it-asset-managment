import Equipment from '../models/equipment.js';

class EquipmentsController {
	async getAll(request, response) {
		try {
      const equipments = await Equipment.find();

			response.status(200).json(equipments);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async create(request, response) {
		try {
      const newEquipment = {
        ...request.body,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        state: 'ACTIVE',
        comments: [],
        // как записать branch?
      };

      const createdEquipment = await Equipment.create(newEquipment);

			response.status(201).json(createdEquipment);
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

      const branch = await Equipment.findById(id);

			response.status(200).json(branch);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

  // @todo: блокирование на редактирование полей
	async updateById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        throw new Error('Ошибка редактирования филиала по ID. Не указан ID.');
      }

      const updatedEquipment = await Equipment.findByIdAndUpdate(id, request.body, { new: true });

			response.status(200).json(updatedEquipment);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async deleteById(request, response) {
		try {
      const { id } = request.params;

      if (!id) {
        throw new Error('Ошибка удаления филиала по ID. Не указан ID.');
      }

      const deletedEquipment = await Equipment.findById(id);
      if (!deletedEquipment) {
        return response.status(404).json({ message: 'Оборудование с указанным ID не найден.' });
      }

      deletedEquipment.state = 'DELETED';
      const updatedEquipment = await deletedEquipment.save();

			response.status(200).json(updatedEquipment);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};
}

export default new EquipmentsController();
