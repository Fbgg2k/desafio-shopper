"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const router = express_1.default.Router();
// POST /upload
router.post('/upload', async (req, res) => {
    try {
        const { customer_code, measure_type, image_data } = req.body;
        const validationErrors = (0, utils_1.validateUploadData)(req.body);
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }
        const existingReading = await (0, utils_1.checkExistingReading)(customer_code, measure_type);
        if (existingReading) {
            return res.status(409).json({ message: 'Leitura já existe para este mês.' });
        }
        const processedData = await (0, utils_1.processImageWithLLM)(image_data);
        if (!processedData) {
            return res.status(500).json({ message: 'Erro ao processar imagem.' });
        }
        res.status(201).json({ message: 'Leitura processada com sucesso', data: processedData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});
// PATCH /confirm
router.patch('/confirm', async (req, res) => {
    try {
        const { reading_code, new_value } = req.body;
        const validationErrors = (0, utils_1.validateConfirmationData)(req.body);
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }
        const existingReading = await (0, utils_1.checkReadingExists)(reading_code);
        if (!existingReading) {
            return res.status(404).json({ message: 'Leitura não encontrada.' });
        }
        if (existingReading.confirmed) {
            return res.status(409).json({ message: 'Leitura já confirmada.' });
        }
        const updatedReading = await (0, utils_1.saveNewReading)(reading_code, new_value);
        res.status(200).json({ message: 'Leitura confirmada com sucesso.', data: updatedReading });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});
// GET /<customer_code>/list
router.get('/:customer_code/list', async (req, res) => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;
        const readings = await (0, utils_1.getReadingsByCustomer)(customer_code, measure_type);
        if (!readings.length) {
            return res.status(404).json({ message: 'Nenhuma leitura encontrada.' });
        }
        res.status(200).json({ readings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});
exports.default = router;
