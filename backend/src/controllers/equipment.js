import Equipment from '../models/equipment.js';
import User from '../models/user.js';

class EquipmentsController {
	async getAll(request, response) {
		try {
      const equipments = await Equipment.find()
        .populate('branch').populate('financiallyResponsiblePerson');

			response.status(200).json(equipments);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async createEquipments(request, response) {
		try {
      const data = request.body;

      if (!Array.isArray(data)) {
        return response.status(400).json({ error: 'Не валидная структура данных' });
      }

      const preSavedEquipments = data.map(item => {
        return {
          ...item,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          state: 'ACTIVE',
          comments: [],
          recipient: '',
        }
      });

      const savedEquipments = await Equipment.create(preSavedEquipments)
        .populate('branch').populate('financiallyResponsiblePerson');

      response.status(200).json(savedEquipments);
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

      const branch = await Equipment.findById(id).populate('branch').populate('financiallyResponsiblePerson');

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

      const updatedEquipment = await Equipment.findByIdAndUpdate(id, request.body, { new: true })
        .populate('branch').populate('financiallyResponsiblePerson');

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

      if (!text) {
        return response.status(400).json({ message: 'А текст указать не судьба?' });
      }

      if (text.length === 0) {
        return response.status(400).json({ message: 'Длина комментария должны быть больше нуля' });
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
  };

  async searchEquipments(request, response) {
    try {
      const { searchText } = request.query;

      if (!searchText) {
        return response.status(400).json({ error: 'Для поиска оборудования необходимо указать параметр searchText' });
      }

      const searchRegex = new RegExp(searchText, 'i');

      const equipments = await Equipment.find({
        $or: [
          { assetNumber: { $regex: searchRegex } },
          // { inventoryNumber: { $regex: searchRegex } },
          // { name: { $regex: searchRegex } },
          // { description: { $regex: searchRegex } },
          // { inventoryNumber: { $regex: searchRegex } },
          // { financiallyResponsiblePerson: { $regex: searchRegex } },
          // { recipient: { $regex: searchRegex } },
          // { invoiceNumber: { $regex: searchRegex } },
          // { serialNumber: { $regex: searchRegex } },
        ],
      });

      response.status(200).json(equipments);
		} catch (error) {
			response.status(500).json(error.message);
		}
  };
}

export default new EquipmentsController();
