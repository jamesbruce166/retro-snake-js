export default class Food {
	constructor({ x, y }) {
		this.x = x;
		this.y = y;
	}

	respawn(snakeBody, pixelCount) {
		let safePosition = false;
		while (!safePosition) {
			for (let coord of snakeBody) {
				const [x, y] = coord;
				const newX = this.rand(0, pixelCount - 1);
				const newY = this.rand(0, pixelCount - 1);

				if (newX !== x && newY !== y) {
					this.x = newX;
					this.y = newY;
					safePosition = true;
					break;
				}
			}
		}
	}

	rand(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
