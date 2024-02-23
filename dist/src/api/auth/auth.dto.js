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
exports.AuthDto = void 0;
const nestjs_swagger_dto_1 = require("nestjs-swagger-dto");
class AuthDto {
}
exports.AuthDto = AuthDto;
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({
        minLength: 2,
        maxLength: 35,
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "name", void 0);
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({ pattern: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
        } }),
    __metadata("design:type", String)
], AuthDto.prototype, "email", void 0);
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({
        minLength: 8,
        maxLength: 16,
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "password", void 0);
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({
        optional: true
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "role", void 0);
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({
        optional: true
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "bossId", void 0);
__decorate([
    (0, nestjs_swagger_dto_1.IsString)({
        optional: true
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "adminId", void 0);
//# sourceMappingURL=auth.dto.js.map