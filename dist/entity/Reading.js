"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
const Confirmation_1 = require("./Confirmation");
let Reading = class Reading {
    id;
    customer;
    measure_type;
    value;
    reading_date;
    confirmed;
    created_at;
    confirmations;
};
exports.Reading = Reading;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reading.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, customer => customer.readings),
    __metadata("design:type", Customer_1.Customer)
], Reading.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reading.prototype, "measure_type", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Reading.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reading.prototype, "reading_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reading.prototype, "confirmed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reading.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Confirmation_1.Confirmation, confirmation => confirmation.reading),
    __metadata("design:type", Array)
], Reading.prototype, "confirmations", void 0);
exports.Reading = Reading = __decorate([
    (0, typeorm_1.Entity)()
], Reading);
