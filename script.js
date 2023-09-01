const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const inputImage1 = document.getElementById('inputImage1');
const inputImage2 = document.getElementById('inputImage2');
const speed1Input = document.getElementById('speed1');
const direction1CheckBox = document.getElementById('direction1');
const speed2Input = document.getElementById('speed2');
const direction2CheckBox = document.getElementById('direction2');
const pauseRotationButton = document.getElementById('pauseRotation');
const resetRotationButton = document.getElementById('resetRotation');
const sameDesignCheckBox = document.getElementById('sameDesign');
const sameDesignText = document.getElementById('sameDesignText');
const flipDesignCheckBox = document.getElementById('flipped');
const flipDesignText = document.getElementById('flippedText');

let isPaused = false;
let initialSpeed1 = parseFloat(speed1Input.value);
let initialSpeed2 = parseFloat(speed2Input.value);

inputImage1.addEventListener('change', (event) => {
	const file = event.target.files[0];
	if (file) {
		const imageUrl = URL.createObjectURL(file);
		image1.src = imageUrl;
	}
});

inputImage2.addEventListener('change', (event) => {
	const file = event.target.files[0];
	if (file) {
		const imageUrl = URL.createObjectURL(file);
		image2.src = imageUrl;
	}
});

speed1Input.addEventListener('input', () => {
	if (!isPaused) {
		updateImageRotation(image1, speed1Input, direction1CheckBox);
	}
});

direction1CheckBox.addEventListener('click', () => {
	updateImageRotation(image1, speed1Input, direction1CheckBox);
});

speed2Input.addEventListener('input', () => {
	if (!isPaused) {
		updateImageRotation(image2, speed2Input, direction2CheckBox);
	}
});

direction2CheckBox.addEventListener('click', () => {
	updateImageRotation(image2, speed2Input, direction2CheckBox);
});

pauseRotationButton.addEventListener('click', () => {
	isPaused = !isPaused;
	if (pauseRotationButton.textContent === 'Start') {
		speed1Input.value = 5;
		speed2Input.value = 5;
		pauseRotationButton.textContent = 'Pause Rotation';
		isPaused = !isPaused;
		resetAnimation();
		updateImageRotation(image1, speed1Input, direction1CheckBox);
		updateImageRotation(image2, speed2Input, direction2CheckBox);
	}
	if (isPaused) {
		pauseRotationButton.textContent = 'Resume Rotation';
		pauseRotation();
	} else {
		pauseRotationButton.textContent = 'Pause Rotation';
		resumeRotation();
	}

	resetAnimation();
});

resetRotationButton.addEventListener('click', () => {
	resetAnimation();
});

sameDesignCheckBox.addEventListener('click', (event) => {
	if (event.target.checked) {
		flipDesignCheckBox.style.display = "inline-grid";
		flipDesignText.style.display = "inline-block";
		image2.src = image1.src;
	} else {
		flipDesignCheckBox.style.display = "none";
		flipDesignText.style.display = "none";
	}
});

flipDesignCheckBox.addEventListener('click', (event) => {
	if (event.target.checked) {
		image2.style.scale = "-1 1";
	} else {
		image2.style.scale = "1 1";
	}
});

function load() {
	pauseRotation();
	pauseRotationButton.textContent = 'Start';
}

function updateImageRotation(image, speedInput, directionSelect) {
	const speed = parseFloat(speedInput.value);
	const direction = directionSelect.checked === false ? 'normal' : 'reverse';
	image.style.setProperty('--rotation-speed', `${speed}s`);
	image.style.setProperty('--rotation-direction', direction);
}

function pauseRotation() {
	initialSpeed1 = parseFloat(speed1Input.value);
	initialSpeed2 = parseFloat(speed2Input.value);
	speed1Input.value = '0';
	speed2Input.value = '0';
	updateImageRotation(image1, speed1Input, direction1CheckBox);
	updateImageRotation(image2, speed2Input, direction2CheckBox);
}

function resumeRotation() {
	if (parseFloat(speed1Input.value) == 0) speed1Input.value = initialSpeed1;
	if (parseFloat(speed2Input.value) == 0) speed2Input.value = initialSpeed2;
	updateImageRotation(image1, speed1Input, direction1CheckBox);
	updateImageRotation(image2, speed2Input, direction2CheckBox);
}

function resetAnimation() {
	let image1 = document.querySelector("#image1");
	let image2 = document.querySelector("#image2");

	image1.style.animationName = "none";
	image2.style.animationName = "none";

	requestAnimationFrame(() => {
		setTimeout(() => {
			image1.style.animationName = ""
		}, 0);
	});
	requestAnimationFrame(() => {
		setTimeout(() => {
			image2.style.animationName = ""
		}, 0);
	});
}
