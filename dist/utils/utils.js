"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadingsByCustomer = exports.saveNewReading = exports.checkReadingExists = exports.validateConfirmationData = exports.processImageWithLLM = exports.checkExistingReading = exports.validateUploadData = void 0;
const validateUploadData = (data) => {
    if (!data.customer_code || !data.measure_type || !data.image_data || !data.measure_datetime) {
        return "Campos obrigatórios não preenchidos";
    }
    // Validação adicional para `measure_type`
    if (!['WATER', 'GAS'].includes(data.measure_type.toUpperCase())) {
        return "Tipo de medição não permitida";
    }
    return null;
};
exports.validateUploadData = validateUploadData;
const checkExistingReading = async (customer_code, measure_type) => {
    // Implementação da verificação de leitura existente no banco de dados
    // Exemplo simplificado
    const existingReading = false; // Substitua com a lógica real de verificação
    return existingReading;
};
exports.checkExistingReading = checkExistingReading;
const processImageWithLLM = async (image_data) => {
    // Implementação da integração com a API LLM do Gemini para processar a imagem
    // Exemplo simplificado
    const leitura = 1234; // Substitua com a lógica real de processamento
    return { leitura };
};
exports.processImageWithLLM = processImageWithLLM;
const validateConfirmationData = (data) => {
    if (!data.measure_uuid || typeof data.confirmed_value !== 'number') {
        return "Campos obrigatórios não preenchidos ou inválidos";
    }
    return null;
};
exports.validateConfirmationData = validateConfirmationData;
const checkReadingExists = async (reading_code) => {
    // Verifique se a leitura existe no banco de dados
    // Exemplo simplificado
    const reading = { confirmed: false }; // Substitua com a lógica real de verificação
    return reading;
};
exports.checkReadingExists = checkReadingExists;
const saveNewReading = async (reading_code, new_value) => {
    // Implementação da lógica para salvar o novo valor no banco de dados
    // Exemplo simplificado
    const savedReading = { reading_code, new_value }; // Substitua com a lógica real de salvamento
    return savedReading;
};
exports.saveNewReading = saveNewReading;
const getReadingsByCustomer = async (customer_code, measure_type) => {
    // Implementação da lógica para buscar as leituras de um cliente
    // Exemplo simplificado
    const allMeasures = [
        {
            measure_uuid: "001",
            measure_datetime: new Date().toISOString(),
            measure_type: "WATER",
            has_confirmed: false,
            image_url: "http://example.com/image1.png"
        },
        {
            measure_uuid: "002",
            measure_datetime: new Date().toISOString(),
            measure_type: "GAS",
            has_confirmed: true,
            image_url: "http://example.com/image2.png"
        }
    ];
    if (measure_type) {
        return allMeasures.filter(measure => measure.measure_type.toUpperCase() === measure_type.toUpperCase());
    }
    return allMeasures;
};
exports.getReadingsByCustomer = getReadingsByCustomer;
