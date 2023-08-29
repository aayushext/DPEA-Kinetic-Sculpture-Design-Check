const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const inputImage1 = document.getElementById('inputImage1');
const inputImage2 = document.getElementById('inputImage2');
const speed1Input = document.getElementById('speed1');
const direction1Select = document.getElementById('direction1');
const speed2Input = document.getElementById('speed2');
const direction2Select = document.getElementById('direction2');
const pauseRotationButton = document.getElementById('pauseRotation');

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
	updateImageRotation(image1, speed1Input, direction1Select);
});

direction1Select.addEventListener('change', () => {
	updateImageRotation(image1, speed1Input, direction1Select);
});

speed2Input.addEventListener('input', () => {
	updateImageRotation(image2, speed2Input, direction2Select);
});

direction2Select.addEventListener('change', () => {
	updateImageRotation(image2, speed2Input, direction2Select);
});

pauseRotationButton.addEventListener('click', () => {
	isPaused = !isPaused;
	if (isPaused) {
		pauseRotationButton.textContent = 'Resume Rotation';
		pauseRotation();
	} else {
		pauseRotationButton.textContent = 'Pause Rotation';
		resumeRotation();
	}
});

function updateImageRotation(image, speedInput, directionSelect) {
	const speed = parseFloat(speedInput.value);
	const direction = directionSelect.value === 'normal' ? 'normal' : 'reverse';
	image.style.setProperty('--rotation-speed', `${speed}s`);
	image.style.setProperty('--rotation-direction', direction);
}

function pauseRotation() {
	initialSpeed1 = parseFloat(speed1Input.value);
	initialSpeed2 = parseFloat(speed2Input.value);
	speed1Input.value = '0';
	speed2Input.value = '0';
}

function resumeRotation() {
	speed1Input.value = initialSpeed1;
	speed2Input.value = initialSpeed2;
	updateImageRotation(image1, speed1Input, direction1Select);
	updateImageRotation(image2, speed2Input, direction2Select);
}
