let cWidth,
	cHeight,
	g,
	enemySpeed,
	gt,
	gtMax,
	A,
	Bullets,
	Enemys,
	bulletSize,
	Pause,
	USix,
	PauseTemp,
	SettingMaxCD = 60,
	SettingDMGColor = 30,
	Name = ',',
	AllLeaderBoard,
	ShowLeaderBoard = false,
	IsGatingName = false;

function reboot() {
	cWidth = document.documentElement.clientWidth;
	cHeight = document.documentElement.clientHeight;
	g = cWidth / 10000;
	enemySpeed = 4;
	gt = -100;
	gtMax = 150;
	A = new Main(cWidth, cHeight);
	Bullets = [];
	Enemys = [];
	bulletSize = A.size;
	Pause = true;

	USix = new UIX();
}

function GetLeaderBoard() {
	if (document.cookie != '') {
		AllLeaderBoard = document.cookie.split('; ');
		let temp;

		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9 - i; j++)
				if (
					int(AllLeaderBoard[j].slice(0, 1)) >
					int(AllLeaderBoard[j + 1][0].slice(0, 1))
				) {
					temp = AllLeaderBoard[j];
					AllLeaderBoard[j] = AllLeaderBoard[j + 1];
					AllLeaderBoard[j + 1] = temp;
				}

		for (let i = 0; i < AllLeaderBoard.length; i++) {
			AllLeaderBoard[i] = AllLeaderBoard[i].slice(2);
			AllLeaderBoard[i] = AllLeaderBoard[i].split(':');
		}
	} else AllLeaderBoard = [];
}

function EnterInLeaderBoard() {
	if (document.cookie == '') {
		for (let i = 0; i < 10; i++) {
			document.cookie = str(i) + '=A:-1';
		}
		document.cookie = str(0) + '=' + str(Name) + ':' + str(A.Score);
	} else {
		let LeaderBoard = document.cookie.split('; '),
		 temp;

		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9 - i; j++)
				if (
					int(LeaderBoard[j].slice(0, 1)) >
					int(LeaderBoard[j + 1][0].slice(0, 1))
				) {
					temp = LeaderBoard[j];
					LeaderBoard[j] = LeaderBoard[j + 1];
					LeaderBoard[j + 1] = temp;
				}

		for (let i = 0; i < LeaderBoard.length; i++) {
			LeaderBoard[i] = LeaderBoard[i].slice(2);
			LeaderBoard[i] = LeaderBoard[i].split(':');
		}

		if (int(LeaderBoard[9][1]) < A.Score) {
			LeaderBoard[9][0] = Name;
			LeaderBoard[9][1] = str(A.Score);
			for (let i = 8; i > -1; i--) {
				if (int(LeaderBoard[i][1]) < int(LeaderBoard[i + 1][1])) {
					temp = LeaderBoard[i][0];
					LeaderBoard[i][0] = LeaderBoard[i + 1][0];
					LeaderBoard[i + 1][0] = temp;

					temp = LeaderBoard[i][1];
					LeaderBoard[i][1] = LeaderBoard[i + 1][1];
					LeaderBoard[i + 1][1] = temp;
				} else break;
			}
		}

		for (let i = 0; i < 10; i++)
			document.cookie =
				str(i) + '=' + LeaderBoard[i][0] + ':' + LeaderBoard[i][1];
	}
}

function GetName() {
	IsGatingName = true;
	PauseTemp = Pause;
	Pause = false;
	Name = prompt('Имя пользователя', 'Евгений Олегович');
	IsGatingName = false;
	PauseTemp = Pause;
	Pause = true;
}

function EnemyGenerate() {
	let temp = Math.random() * (47 + A.lvl);
	if (temp < 30) {
		Enemys.push(new Enemy(A.size, cWidth / 500, 1));
	} else if (temp < 50) {
		Enemys.push(new Enemy(A.size * 1.3, cWidth / 1000, 2));
	} else {
		Enemys.push(new Enemy(A.size * 1.5, cWidth / 700, 3));
	}
}

function setup() {
	reboot();
	createCanvas(cWidth, cHeight);
	if (Name == ',')
		GetName();
	frameRate(200);
}

//T == 84
//R == 82
//P == 80

$(document.body).on('keydown', function (e) {
	if (IsGatingName == false) {
		switch (e.which) {
			case 82:
				EnterInLeaderBoard();
				setup();
				break;
			case 81:
				Pause = !Pause;
				break;
			case 84:
				ShowLeaderBoard = !ShowLeaderBoard;
				if (ShowLeaderBoard) GetLeaderBoard();
				break;
		}
	}
});

$(document.body).on('click', function (e) {
	//Buttons
	if (IsGatingName == false) {
		if (
			mouseY > USix.BtnPausePos[1] &&
			mouseY < USix.BtnPausePos[1] + USix.BtnSize
		) {
			if (
				mouseX > USix.BtnPausePos[0] &&
				mouseX < USix.BtnPausePos[0] + USix.BtnSize
			)
				Pause = !Pause;
			else if (
				mouseX > USix.BtnPerson[0] &&
				mouseX < USix.BtnPerson[0] + USix.BtnSize
			)
				GetName();
		}
	}
});

function draw() {
	if (Pause) {
		background('#011627');

		if (ShowLeaderBoard) {
			noStroke();
			//Цвет текста в Leader Board
			fill('#274054');
			textAlign(CENTER);
			let NowWidth = cWidth / 2,
			 NowHeight = cHeight / 6,
			 Size = (cHeight - NowHeight * 2) / 10;
			textSize(Size);

			for (let i = 0; i < AllLeaderBoard.length; i++) {
				if (int(AllLeaderBoard[i][1]) != -1)
					text(
						AllLeaderBoard[i][0] + ':' + AllLeaderBoard[i][1],
						NowWidth,
						NowHeight + Size * i
					);
				else break;
			}
			textAlign(LEFT);
			stroke(60);
		}

		A.move();

		//Timers
		if (A.countdown > 0) A.countdown--;

		gt += 1;

		//Shots
		if (A.countdown == 0 && mouseIsPressed) {
			if (cWidth / 40 + A.lvl < A.size)
				Bullets.push(
					new Bullet(
						A.pos[0],
						A.pos[1] + A.size / 2,
						bulletSize,
						cWidth / 80 + A.lvl,
						0
					)
				);
			else
				Bullets.push(
					new Bullet(
						A.pos[0],
						A.pos[1] + A.size / 2,
						bulletSize,
						A.size,
						0
					)
				);
			A.countdown = A.maxcountdown;
		}

		//Bulets Mecanics
		for (let i = 0; i < Bullets.length; i++) {
			if (Bullets[i].move()) {
				Bullets.splice(i, 1);
				i--;
				continue;
			}
			Bullets[i].draw();
		}

		//Enemy Generate
		if (gt == gtMax - A.lvl) {
			gt = 0;
			EnemyGenerate();
		}

		//Enemy move
		for (let i = 0; i < Enemys.length; i++) {
			if (Enemys[i].move()) {
				A.HP -= 1;
				Enemys.splice(i, 1);
				i--;
			} else Enemys[i].draw();
		}

		//Death
		if (A.HP <= 0) {
			document.getElementById('defaultCanvas0').remove();
			EnterInLeaderBoard();
			GetLeaderBoard();
			ShowLeaderBoard = true;
			setup();
		}

		A.draw();

		USix.draw();
	}
}
