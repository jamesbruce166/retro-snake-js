export const LEFT = 'left';
export const RIGHT = 'right';
export const UP = 'up';
export const DOWN = 'down';

export default class Controls {
	constructor() {
		this.direction = LEFT;
		this.paused = false;

		document.onkeydown = (event) => {
			const callback = {
				ArrowLeft: () =>
					this.direction == RIGHT ? null : (this.direction = LEFT),
				ArrowRight: () =>
					this.direction == LEFT ? null : (this.direction = RIGHT),
				ArrowUp: () =>
					this.direction == DOWN ? null : (this.direction = UP),
				ArrowDown: () =>
					this.direction == UP ? null : (this.direction = DOWN),
				p: () => (this.paused = !this.paused),
			}[event.key];

			callback?.();
		};
	}
}
