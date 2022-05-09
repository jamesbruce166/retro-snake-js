export default class Snake {
	constructor({ x, y }) {
		this.body = [];

		this.body.push([x, y]);
	}

	move(direction) {
		const [x, y] = this.body[0];
		switch (direction) {
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
	}

	popBody() {
		this.body.pop();
	}
}
