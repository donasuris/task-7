class Enemy {
	constructor(size, speed, hp) {
		this.pos = [
			cWidth,
			Math.random() * (cHeight - size * 2 - (A.textSize * 12) / 5) +
				size +
				(A.textSize * 7) / 5,
		];
		this.size = size;
		this.speed = speed;
		this.HP = hp;
		this.Exp = 2 * hp;
		this.color = 200 - hp * SettingDMGColor;
	}

	move() {
		this.pos[0] -= enemySpeed + this.speed;

		if (this.pos[0] < 0) return 1;
		return 0;
	}

	draw() {
		fill(this.color);
		ellipse(this.pos[0], this.pos[1], this.size, this.size);
	}
}
