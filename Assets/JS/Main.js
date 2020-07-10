class Main {
	constructor(w, h) {
		this.size = h / 20;
		this.pos = [
			0, h / 2,
		];
		this.Exp = 0;
		this.lvl = 1;
		this.needForLvl = 15;
		this.vel = 0;
		this.slow = 20;
		this.countdown = 0;
		this.maxcountdown = SettingMaxCD;
		this.HP = 10;
		this.textSize = cHeight / 20;
		this.Score = 0;
	}

	move() {
		if (mouseY > 0 && mouseY < cHeight - (this.textSize * 6) / 5) {
			this.vel = (mouseY - this.size / 2 - this.pos[1]) / this.slow;
		}
		this.pos[1] += this.vel;
		if (this.pos[1] > cHeight - this.size - (this.textSize * 6) / 5) {
			this.pos[1] = cHeight - this.size - (this.textSize * 6) / 5;
			this.vel = 0;
		}
		if (this.pos[1] < 0) {
			this.vel = 0;
			this.pos[1] = 0;
		}
	}

	draw() {
		fill('#01111D');
		rect(
			0,
			cHeight - (this.textSize * 6) / 5,
			cWidth,
			(this.textSize * 6) / 5
		);
		fill(130);
		rect(this.pos[0], this.pos[1], this.size, this.size);
		fill(102);
		rect(
			this.pos[0],
			this.pos[1],
			(this.size * this.countdown) / this.maxcountdown,
			this.size
		);
		noStroke();
		fill('#5F7E97');
		textSize(this.textSize);
		textAlign(RIGHT);
		text(
			str(this.Exp) + '/' + str(this.needForLvl),
			cWidth - this.textSize / 10,
			cHeight - this.textSize / 5
		);
		textAlign(CENTER);
		text(
			'Score: ' + str(this.Score),
			cWidth / 2,
			this.textSize + cHeight / 1000
		);
		textAlign(LEFT);
		text(str(this.HP), this.textSize / 10, cHeight - this.textSize / 5);
		stroke(60);
	}
}
