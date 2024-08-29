"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils/utils");
const generative_ai_1 = require("@google/generative-ai");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY não está definido nas variáveis de ambiente');
}
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('API de Leitura de Consumo');
});
app.post('/upload', async (req, res) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    // Validação dos parâmetros
    const validationError = (0, utils_1.validateUploadData)({ image_data: image, customer_code, measure_type });
    if (validationError) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: validationError
        });
    }
    // Verificação de leitura mensal
    const alreadyExists = await (0, utils_1.checkExistingReading)(customer_code, measure_type);
    if (alreadyExists) {
        return res.status(409).json({
            error_code: "DOUBLE_REPORT",
            error_description: "Leitura do mês já realizada"
        });
    }
    // Integração com API de LLM
    try {
        const { leitura } = await (0, utils_1.processImageWithLLM)(image);
        res.status(200).json({
            image_url: 'http://example.com/temp-link',
            measure_value: leitura,
            measure_uuid: '1234-5678-91011'
        });
    }
    catch (error) {
        res.status(500).send('Error processing image');
    }
});
app.patch('/confirm', async (req, res) => {
    const { measure_uuid, confirmed_value } = req.body;
    // Validação dos parâmetros
    if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Parâmetros inválidos"
        });
    }
    // Verificação se a leitura existe
    const reading = await (0, utils_1.checkReadingExists)(measure_uuid);
    if (!reading) {
        return res.status(404).json({
            error_code: "MEASURE_NOT_FOUND",
            error_description: "Leitura não encontrada"
        });
    }
    // Verificação se a leitura já foi confirmada
    if (reading.confirmed) {
        return res.status(409).json({
            error_code: "CONFIRMATION_DUPLICATE",
            error_description: "Leitura já confirmada"
        });
    }
    // Salvar o novo valor no banco de dados
    try {
        await (0, utils_1.saveNewReading)(measure_uuid, confirmed_value);
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).send('Erro ao salvar a leitura');
    }
});
app.get('/:customer_code/list', async (req, res) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;
    // Validação do parâmetro measure_type
    if (measure_type && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
        return res.status(400).json({
            error_code: "INVALID_TYPE",
            error_description: "Tipo de medição não permitida"
        });
    }
    // Busca das leituras no banco de dados
    try {
        const measures = await (0, utils_1.getReadingsByCustomer)(customer_code, measure_type);
        if (measures.length === 0) {
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "Nenhuma leitura encontrada"
            });
        }
        res.status(200).json({
            customer_code,
            measures
        });
    }
    catch (error) {
        res.status(500).send('Erro ao buscar leituras');
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
const genAI = new generative_ai_1.GoogleGenerativeAI(geminiApiKey); // Usando geminiApiKey diretamente
// Exemplo de uso
async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = "Este produto parece caseiro ou comprado em loja?";
        const image = {
            inlineData: {
                data: Buffer.from(fs_1.default.readFileSync('imagem.png')).toString('base64'),
                mimeType: 'image/png', // Corrigido mimeType
            },
        };
        const result = await model.generateContent([prompt, image]);
        console.log(result.response.text());
    }
    catch (error) {
        console.error('Erro ao processar imagem:', error);
    }
}
run();
