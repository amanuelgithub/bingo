import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { OnEvent } from '@nestjs/event-emitter';
import { GameCreatedEvent } from './events/game-created.event';
import { GameStateEnum } from './entities/game.entity';
import { IGameData } from './interface/game-data.interface';

@Injectable()
export class GameStateService {
  private readonly BASE_DIRECTORY_NAME = process.cwd() + '/_store-game-state/';

  @OnEvent('game.created')
  createGameJSONfile(payload: GameCreatedEvent) {
    this.createDirectory();

    const { gameId } = payload;

    if (fs.existsSync(`${this.BASE_DIRECTORY_NAME}/${gameId}.json`)) {
      console.log(`${gameId}.json already exists. Aborting creation process.`);
    } else {
      fs.writeFile(
        `${this.BASE_DIRECTORY_NAME}/${gameId}.json`,
        // writing the initialGameData
        JSON.stringify(this.initializeGameData()),
        (err) => {
          if (err) {
            console.error(`Error creating ${gameId}.json file:`, err);
          } else {
            this.searchFileInDirectory(
              `${process.cwd()}/_store-game-state/`,
              '8097733f-9768-4078-adce-2cea43621aee',
            )
              .then((filePath) => {
                if (filePath) {
                  console.log('File found:', filePath);
                  // Perform operations with the matching file...
                } else {
                  console.log('File not found.');
                }
              })
              .catch((err) => {
                console.error('Error searching for file:', err);
              });

            console.log(`${gameId}.json created successfully.`);
          }
        },
      );
    }
  }

  initializeGameData(): IGameData {
    return {
      gameState: GameStateEnum.CREATED,
      currentIndex: 0,
      playingNumbers: this.generatePlayNumbers(),
    };
  }

  //   create directory if it does not exists first
  createDirectory() {
    try {
      if (!fs.existsSync(this.BASE_DIRECTORY_NAME)) {
        fs.mkdirSync(this.BASE_DIRECTORY_NAME);
      }
    } catch (err) {
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
          resolve(null); // File not found
        } else {
          resolve(directoryPath + matchingFiles[0]); // Return the path of the matching file
        }
      });
    });
  }

  // generated_play_numbers
  generatePlayNumbers(): number[] {
    const numbers: number[] = Array.from(
      { length: 75 },
      (_, index) => index + 1,
    );

    return this.shuffleArray(numbers);
  }

  shuffleArray<T>(array: T[]): T[] {
    // Create a new array to avoid modifying the original array
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      // generate random index between 1 - 74
      const j = Math.floor(Math.random() * (i + 1));
      // destructuring assignment
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // reading and writing on the specified file
  getGameStateData(filename: string) {
    try {
      const gameJSONData = fs.readFileSync(
        this.BASE_DIRECTORY_NAME + filename,
        'utf8',
      );
      const gameData = JSON.parse(gameJSONData);

      return gameData;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  updateGameState(filename: string, newGameData: IGameData) {
    try {
      const gameData = this.getGameStateData(filename) as IGameData;

      gameData.currentIndex = newGameData.currentIndex;
      gameData.gameState = newGameData.gameState;

      fs.writeFileSync(
        this.BASE_DIRECTORY_NAME + filename,
        JSON.stringify(gameData),
      );

      return gameData;
    } catch (err) {
      console.log('Error:  ', err);
    }
  }
}
