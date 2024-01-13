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

	async createByFile(request, response) {
		try {
      console.log('request');
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
        return response.status(400).json({ message: 'Ошибка редактирования филиала по ID. Не указан ID.' });
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
        return response.status(400).json({ message: 'Ошибка удаления филиала по ID. Не указан ID.' });
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

  async createComment(request, response) {
    try {
      const { equipmentId } = request.params;
      const { text } = request.body;

      if (!equipmentId) {
        return response.status(400).json({ message: 'Ошибка добавления комментария по ID. Не указан ID.' });
      }

      const equipment = await Equipment.findById(equipmentId);

      if (!equipment) {
        return response.status(404).json({ message: 'Оборудование не найдено.' });
      }

      equipment.comments.push(text);

      await equipment.save();

      return response.status(200).json(equipment);
		} catch (error) {
			response.status(500).json(error.message);
		}
  }
}

export default new EquipmentsController();
