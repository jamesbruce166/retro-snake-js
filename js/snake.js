export default class Snake {
	constructor({ x, y }) {
		this.body = [];
		this.direction = '';

		this.body.push([x, y]);
	}

	move({ shouldGrow }) {
		const [x, y] = this.body[0];
		switch (this.direction) {
			case 'left':
				this.body.unshift([x - 1, y]);
				break;
			case 'right':
				this.body.unshift([x + 1, y]);
				break;
			case 'up':
				this.body.unshift([x, y - 1]);
				break;
			case 'down':
				this.body.unshift([x, y + 1]);
				break;
			default:
				break;
		}

		!shouldGrow && this.body.pop();
	}
}
