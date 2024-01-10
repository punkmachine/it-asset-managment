import History from '../models/history.js';

class HistoryController {
	async getHistoryByEquipmentId(request, response) {
		try {
      const { equipmentId } = request.params;

      if (!equipmentId) {
        throw new Error('Ошибка получения филиала по ID. Не указан ID.');
      }

      const historyItems = await History.find({ equipmentId });

			response.status(200).json(historyItems);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async createHistoryItem(request, response) {
		try {
      const newHistory = {
        ...request.body,
        date: new Date(),
      };

      const createdHistory = await History.create(newHistory);

			response.status(201).json(createdHistory);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};
}

export default new HistoryController();
