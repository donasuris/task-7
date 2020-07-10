class UIX {
	constructor() {
		this.BtnSize = cHeight / 20;
		this.BtnPausePos = [cWidth - (this.BtnSize * 6) / 5, this.BtnSize / 5];
		this.BtnPerson = [cWidth - (this.BtnSize * 12) / 5, this.BtnSize / 5];
		this.cHeight = cHeight;
		this.cWidth = cWidth;

	}
	draw() {
		fill("#011627");
		rect(
			this.BtnPausePos[0],
			this.BtnPausePos[1],
			this.BtnSize,
			this.BtnSize
		);
		rect(this.BtnPerson[0], this.BtnPerson[1], this.BtnSize, this.BtnSize);
		fill('#5F7E97');
		noStroke();
		fill('#274054');
		text(
			"Q-пауза    R-перезапуск    T-таблица",
			this.cWidth / 2 - 360,
			this.cHeight - 8
		);
		fill("#5F7E97");
		ellipse(
			this.BtnPerson[0] + this.BtnSize / 2,
			this.BtnPerson[1] + this.BtnSize / 2.5,
			this.BtnSize / 2.5,
			this.BtnSize / 2.5
		);
		
		arc(
			this.BtnPerson[0] + this.BtnSize / 2,
			this.BtnPerson[1] + (this.BtnSize * 8) / 9,
			this.BtnSize / 1.3,
			this.BtnSize / 1.5,
			Math.PI,
			0,
			OPEN
		);

		rect(
			this.BtnPausePos[0] + this.BtnSize / 5,
			this.BtnPausePos[1] + this.BtnSize / 8,
			this.BtnSize / 6,
			(this.BtnSize * 6) / 8
		);
		rect(
			this.BtnPausePos[0] + (this.BtnSize * 3) / 5,
			this.BtnPausePos[1] + this.BtnSize / 8,
			this.BtnSize / 6,
			(this.BtnSize * 6) / 8
		);
		stroke(60);
	}
}
