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
exports.GameStateService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const event_emitter_1 = require("@nestjs/event-emitter");
const game_created_event_1 = require("./events/game-created.event");
const game_entity_1 = require("./entities/game.entity");
let GameStateService = class GameStateService {
    constructor() {
        this.BASE_DIRECTORY_NAME = process.cwd() + '/_store-game-state/';
    }
    createGameJSONfile(payload) {
        this.createDirectory();
        const { gameId } = payload;
        if (fs.existsSync(`${this.BASE_DIRECTORY_NAME}/${gameId}.json`)) {
            console.log(`${gameId}.json already exists. Aborting creation process.`);
        }
        else {
            fs.writeFile(`${this.BASE_DIRECTORY_NAME}/${gameId}.json`, JSON.stringify(this.initializeGameData()), (err) => {
                if (err) {
                    console.error(`Error creating ${gameId}.json file:`, err);
                }
                else {
                    this.searchFileInDirectory(`${process.cwd()}/_store-game-state/`, '8097733f-9768-4078-adce-2cea43621aee')
                        .then((filePath) => {
                        if (filePath) {
                            console.log('File found:', filePath);
                        }
                        else {
                            console.log('File not found.');
                        }
                    })
                        .catch((err) => {
                        console.error('Error searching for file:', err);
                    });
                    console.log(`${gameId}.json created successfully.`);
                }
            });
        }
    }
    initializeGameData() {
        return {
            gameState: game_entity_1.GameStateEnum.CREATED,
            currentIndex: 0,
            playingNumbers: this.generatePlayNumbers(),
        };
    }
    createDirectory() {
        try {
            if (!fs.existsSync(this.BASE_DIRECTORY_NAME)) {
                fs.mkdirSync(this.BASE_DIRECTORY_NAME);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    searchFileInDirectory(directoryPath, fileNameWithoutExtension) {
        return new Promise((resolve, reject) => {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                const matchingFiles = files.filter((file) => {
                    const fileWithoutExtension = file.split('.')[0];
                    return fileWithoutExtension === fileNameWithoutExtension;
                });
                if (matchingFiles.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(directoryPath + matchingFiles[0]);
                }
            });
        });
    }
    generatePlayNumbers() {
        const numbers = Array.from({ length: 75 }, (_, index) => index + 1);
        return this.shuffleArray(numbers);
    }
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    getGameStateData(filename) {
        try {
            const gameJSONData = fs.readFileSync(this.BASE_DIRECTORY_NAME + filename, 'utf8');
            const gameData = JSON.parse(gameJSONData);
            return gameData;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    updateGameState(filename, newGameData) {
        try {
            const gameData = this.getGameStateData(filename);
            gameData.currentIndex = newGameData.currentIndex;
            gameData.gameState = newGameData.gameState;
            fs.writeFileSync(this.BASE_DIRECTORY_NAME + filename, JSON.stringify(gameData));
            return gameData;
        }
        catch (err) {
            console.log('Error:  ', err);
        }
    }
};
exports.GameStateService = GameStateService;
__decorate([
    (0, event_emitter_1.OnEvent)('game.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_created_event_1.GameCreatedEvent]),
    __metadata("design:returntype", void 0)
], GameStateService.prototype, "createGameJSONfile", null);
exports.GameStateService = GameStateService = __decorate([
    (0, common_1.Injectable)()
], GameStateService);
//# sourceMappingURL=game-state.service.js.map