"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils/utils");
const router = (0, express_1.Router)();
router.post('/upload', async (req, res) => {
    const validationError = (0, utils_1.validateUploadData)(req, res);
    if (validationError)
        return validationError;
    const doubleReportError = (0, utils_1.checkExistingReading)(req, res);
    if (doubleReportError)
        return doubleReportError;
    return await (0, utils_1.processImageWithLLM)(req, res);
});
router.patch('/confirm', (req, res) => {
    const validationError = (0, utils_1.validateConfirmationData)(req, res);
    if (validationError)
        return validationError;
    const reading = (0, utils_1.checkReadingExists)(req, res);
    if (typeof reading === 'object' && reading.error_code)
        return reading;
    return (0, utils_1.saveNewReading)(req, res, reading);
});
router.get('/:customer_code/list', utils_1.getReadingsByCustomer);
exports.default = router;
