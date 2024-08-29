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
exports.Confirmation = void 0;
const typeorm_1 = require("typeorm");
const Reading_1 = require("./Reading");
let Confirmation = class Confirmation {
    id;
    reading;
    confirmed_at;
};
exports.Confirmation = Confirmation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Confirmation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Reading_1.Reading, reading => reading.confirmations),
    __metadata("design:type", Reading_1.Reading)
], Confirmation.prototype, "reading", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Confirmation.prototype, "confirmed_at", void 0);
exports.Confirmation = Confirmation = __decorate([
    (0, typeorm_1.Entity)()
], Confirmation);
