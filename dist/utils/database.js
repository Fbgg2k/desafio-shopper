"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadingsByCustomer = exports.findReadingByUUID = exports.addReading = exports.findReadingByCustomerAndMonth = void 0;
const readings = [];
const findReadingByCustomerAndMonth = (customer_code, measure_type, month, year) => {
    return readings.find(r => r.customer_code === customer_code &&
        r.measure_type === measure_type &&
        r.measure_datetime.getMonth() + 1 === month &&
        r.measure_datetime.getFullYear() === year);
};
exports.findReadingByCustomerAndMonth = findReadingByCustomerAndMonth;
const addReading = (reading) => {
    readings.push(reading);
};
exports.addReading = addReading;
const findReadingByUUID = (uuid) => {
    return readings.find(r => r.measure_uuid === uuid);
};
exports.findReadingByUUID = findReadingByUUID;
const getReadingsByCustomer = (customer_code, measure_type) => {
    return readings.filter(r => r.customer_code === customer_code &&
        (measure_type ? r.measure_type === measure_type : true));
};
exports.getReadingsByCustomer = getReadingsByCustomer;
