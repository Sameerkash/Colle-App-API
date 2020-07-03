"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = require("../utils/token");
var header_1 = require("../utils/header");
var Mutation = {
    signUp: function (_parent, _a, _b, _info) {
        var _c = _a.data, email = _c.email, password = _c.password, name = _c.name;
        var prisma = _b.prisma;
        return __awaiter(this, void 0, void 0, function () {
            var userCheck, hashedPassword, user;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, prisma.user({ email: email })];
                    case 1:
                        userCheck = _d.sent();
                        if (userCheck) {
                            throw new Error("Email is already registered");
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
                    case 2:
                        hashedPassword = _d.sent();
                        password = hashedPassword;
                        return [4 /*yield*/, prisma.createUser({
                                email: email,
                                password: password,
                                name: name,
                            })];
                    case 3:
                        user = _d.sent();
                        return [2 /*return*/, {
                                user: user,
                                token: token_1.generateToken(user.id),
                            }];
                }
            });
        });
    },
    signin: function (_, _a, _b, info) {
        var _c = _a.data, email = _c.email, password = _c.password;
        var prisma = _b.prisma;
        return __awaiter(this, void 0, void 0, function () {
            var userCheck, isMatch;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, prisma.user({ email: email })];
                    case 1:
                        userCheck = _d.sent();
                        if (!userCheck) {
                            throw new Error("User Not Found");
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, userCheck.password)];
                    case 2:
                        isMatch = _d.sent();
                        if (!isMatch) {
                            throw Error("Wrong Credentials");
                        }
                        return [2 /*return*/, {
                                user: userCheck,
                                token: token_1.generateToken(userCheck.id),
                            }];
                }
            });
        });
    },
    deleteUser: function (_parent, _a, ctx, _info) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, userCheck;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = header_1.getUserId(ctx.request);
                        return [4 /*yield*/, ctx.prisma.user({
                                id: id,
                            })];
                    case 1:
                        userCheck = _b.sent();
                        if (!userCheck) {
                            throw new Error("User not found");
                        }
                        if (!(userId == id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.prisma.deleteUser({
                                id: id,
                            })];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Not Authorized to delete");
                    case 4: return [2 /*return*/, user];
                }
            });
        });
    },
    createPost: function (_, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = header_1.getUserId(ctx.request);
                        return [4 /*yield*/, ctx.prisma.createPost({
                                title: args.data.title,
                                body: args.data.body,
                                author: {
                                    connect: {
                                        id: userId,
                                    },
                                },
                            }, info)];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    },
};
exports.default = { Mutation: Mutation };
//# sourceMappingURL=mutations.js.map