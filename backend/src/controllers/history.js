import xlsx from 'xlsx';
import History from '../models/history.js';

class HistoryController {
	async getHistoryByEquipmentId(request, response) {
		try {
      const { equipmentId } = request.params;

      if (!equipmentId) {
        return response.status(400).json({ message: 'Ошибка получения истории оборудования по ID. Не указан ID.' });
      }

      const historyItems = await History.find({ equipmentId }).populate('passedOn').populate('branch');

			response.status(200).json(historyItems);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

	async createHistoryItem(request, response) {
		try {
      const newHistory = {
        ...request.body,
        date: new Date().toISOString(),
        equipmentId: request.params.equipmentId,
      };

      const createdHistory = await History.create(newHistory);

			response.status(201).json(createdHistory);
		} catch (error) {
			response.status(500).json(error.message);
		}
	};

  async getFile(request, response) {
    try {
      const { equipmentId } = request.params;

      if (!equipmentId) {
        return response.status(400).json({ message: 'Ошибка получения истории оборудования по ID. Не указан ID.' });
      }

      const historyItems = await History.find({ equipmentId }).populate('passedOn').populate('branch');

      const worksheet = xlsx.utils.json_to_sheet(historyItems.map(item => ({
        date: item.date,
        accepted: item.accepted,
        equipmentState: item.equipmentState,
        branch: item.branch.title,
        invoiceNumber: item.invoiceNumber,
        passedOn: item.passedOn.login,
      })));

      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, `HistoryEquipment`);

      const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      response.setHeader('Content-Disposition', 'attachment; filename="equipments.xlsx"');
      response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      response.send(excelBuffer);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
}

export default new HistoryController();
