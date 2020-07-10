class Bullet {
	constructor(w, h, size, speedX, speedY) {
		this.pos = [
			w, h,
		];
		this.speed = [
			speedX, speedY,
		];
		this.size = size;
	}
	move() {
		this.speed[1] += g;
		this.pos[0] += this.speed[0];
		this.pos[1] += this.speed[1];
		for (let i = 0; i < Enemys.length; i++) {
			if (
				Math.pow(this.pos[0] - Enemys[i].pos[0], 2) +
					Math.pow(this.pos[1] - Enemys[i].pos[1], 2) <=
				(this.size * this.size) / 4 +
					(Enemys[i].size * Enemys[i].size) / 4
			) {
				Enemys[i].HP--;
				Enemys[i].color += SettingDMGColor;
				A.Score += 1;
				let temp = Enemys[i].size;
				//LEVEL_UP
				if (Enemys[i].HP == 0) {
					A.Exp += Enemys[i].Exp;
					if (A.Exp > A.needForLvl) {
						A.lvl += 1;
						A.HP = 10 + A.lvl - 1;
						A.Exp -= A.needForLvl;
						A.needForLvl = int(A.needForLvl * 1.5);
						A.maxcountdown = SettingMaxCD - A.lvl;
						if (A.lvl < 6)
							bulletSize *= 0.8;
						if (A.maxcountdown < 5)
							A.maxcountdown = 5;
					}
					Enemys.splice(i, 1);
				}
				if (this.size < temp) return 1;
			}
		}
		if (
			this.pos[0] > cWidth + this.size ||
			this.pos[1] > cHeight + this.size
		)
			return 1;
		return 0;
	}
	draw() {
		fill(102);
		ellipse(this.pos[0], this.pos[1], this.size, this.size);
	}
}
