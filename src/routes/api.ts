import express from 'express';
import { validateUploadData, checkExistingReading, processImageWithLLM, validateConfirmationData, checkReadingExists, saveNewReading, getReadingsByCustomer } from '../utils/utils';

const router = express.Router();

// POST /upload
router.post('/upload', async (req, res) => {
    try {
        const { customer_code, measure_type, image_data } = req.body;

        const validationErrors = validateUploadData(req.body);
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }

        const existingReading = await checkExistingReading(customer_code, measure_type);
        if (existingReading) {
            return res.status(409).json({ message: 'Leitura já existe para este mês.' });
        }

        const processedData = await processImageWithLLM(image_data);
        if (!processedData) {
            return res.status(500).json({ message: 'Erro ao processar imagem.' });
        }

        res.status(201).json({ message: 'Leitura processada com sucesso', data: processedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// PATCH /confirm
router.patch('/confirm', async (req, res) => {
    try {
        const { reading_code, new_value } = req.body;

        const validationErrors = validateConfirmationData(req.body);
        if (validationErrors) {
            return res.status(400).json({ errors: validationErrors });
        }

        const existingReading = await checkReadingExists(reading_code);
        if (!existingReading) {
            return res.status(404).json({ message: 'Leitura não encontrada.' });
        }
        if (existingReading.confirmed) {
            return res.status(409).json({ message: 'Leitura já confirmada.' });
        }

        const updatedReading = await saveNewReading(reading_code, new_value);
        res.status(200).json({ message: 'Leitura confirmada com sucesso.', data: updatedReading });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// GET /<customer_code>/list
router.get('/:customer_code/list', async (req, res) => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;

        const readings = await getReadingsByCustomer(customer_code, measure_type as string | undefined);
        if (!readings.length) {
            return res.status(404).json({ message: 'Nenhuma leitura encontrada.' });
        }

        res.status(200).json({ readings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

export default router;
