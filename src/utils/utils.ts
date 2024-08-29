export const validateUploadData = (data: any) => {
    if (!data.customer_code || !data.measure_type || !data.image_data || !data.measure_datetime) {
        return "Campos obrigatórios não preenchidos";
    }
    // Validação adicional para `measure_type`
    if (!['WATER', 'GAS'].includes(data.measure_type.toUpperCase())) {
        return "Tipo de medição não permitida";
    }
    return null;
};

export const checkExistingReading = async (customer_code: string, measure_type: string) => {
    // Implementação da verificação de leitura existente no banco de dados
    // Exemplo simplificado
    const existingReading = false; // Substitua com a lógica real de verificação
    return existingReading;
};

export const processImageWithLLM = async (image_data: string) => {
    // Implementação da integração com a API LLM do Gemini para processar a imagem
    // Exemplo simplificado
    const leitura = 1234; // Substitua com a lógica real de processamento
    return { leitura };
};

export const validateConfirmationData = (data: any) => {
    if (!data.measure_uuid || typeof data.confirmed_value !== 'number') {
        return "Campos obrigatórios não preenchidos ou inválidos";
    }
    return null;
};

export const checkReadingExists = async (reading_code: string) => {
    // Verifique se a leitura existe no banco de dados
    // Exemplo simplificado
    const reading = { confirmed: false }; // Substitua com a lógica real de verificação
    return reading;
};

export const saveNewReading = async (reading_code: string, new_value: number) => {
    // Implementação da lógica para salvar o novo valor no banco de dados
    // Exemplo simplificado
    const savedReading = { reading_code, new_value }; // Substitua com a lógica real de salvamento
    return savedReading;
};

export const getReadingsByCustomer = async (customer_code: string, measure_type?: string) => {
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
