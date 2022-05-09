const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import Controls from './controls.js';
import Snake from './snake.js';
import Food from './food.js';

const FPS = 8;
const GRID_LENGTH = 600;
const PIXEL_ROW_COUNT = 44;
const PIXEL_SIZE = GRID_LENGTH / PIXEL_ROW_COUNT;

const OBJECT_CODE = {
	SNAKE: 1,
	FOOD: 2,
};

class Game {
	constructor() {
		this.grid = [];

		this.controls = new Controls();
		this.snake = new Snake({ x: 22, y: 22 });
		this.food = new Food({ x: 3, y: 4 });

		this.setGrid();
		this.start();
	}

	start() {
		const next = () => this.update();
		setInterval(next, 1000 / FPS);
	}

	update() {
		if (this.controls.paused) return;

		// Refresh frame
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Update state
		this.snake.direction = this.controls.direction;
		const { foodCollision, snakeCollision } = this.snakeCollision();
		if (snakeCollision) {
			this.reset();
			return;
		}
		if (foodCollision) {
			this.food.respawn(this.snake.body, PIXEL_ROW_COUNT);
		}
		this.snake.move({ shouldGrow: foodCollision });
		this.applyInfiniteBoundary();

		// Redraw updated position
		this.drawFrame();
	}

	drawFrame() {
		// food
		this.drawPixel(this.food.x, this.food.y, OBJECT_CODE.FOOD);

		// snake
		for (let coord of this.snake.body) {
			const [x, y] = coord;
			this.drawPixel(x, y, OBJECT_CODE.SNAKE);
		}
	}

	reset() {
		this.snake = new Snake({ x: 22, y: 22 });
		this.food = new Food({ x: 3, y: 4 });

		this.setGrid();
	}

	snakeCollision() {
		const [headX, headY] = this.snake.body[0];

		for (let [idx, coord] of this.snake.body.entries()) {
			const [x, y] = coord;
			if (x === this.food.x && y === this.food.y) {
				return { foodCollision: true, snakeCollision: false };
			}

			if (idx > 0 && headX === x && headY === y) {
				return { foodCollision: false, snakeCollision: true };
			}
		}

		return { foodCollision: false, snakeCollision: false };
	}

	setGrid() {
		for (let i = 0; i < PIXEL_ROW_COUNT; i++) {
			for (let j = 0; j < PIXEL_ROW_COUNT; j++) {
				if (!this.grid[i]) this.grid[i] = [];
				this.grid[i][j] = 0;
			}
		}
	}

	applyInfiniteBoundary() {
		const [headX, headY] = this.snake.body[0];
		headX < 0 ? (this.snake.body[0] = [PIXEL_ROW_COUNT - 1, headY]) : null;
		headX > PIXEL_ROW_COUNT ? (this.snake.body[0] = [0, headY]) : null;

		headY < 0 ? (this.snake.body[0] = [headX, PIXEL_ROW_COUNT - 1]) : null;
		headY > PIXEL_ROW_COUNT ? (this.snake.body[0] = [headX, 0]) : null;
	}

	drawPixel(x, y, code) {
		if (code == OBJECT_CODE.SNAKE) {
			ctx.fillStyle = 'rgb(0,230,0)';
		} else if (code == OBJECT_CODE.FOOD) {
			ctx.fillStyle = 'rgb(230,0,0)';
		}
		ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
	}

	clearPixel(x, y) {
		ctx.fillStyle = '#111';
		ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
	}
}

new Game();
