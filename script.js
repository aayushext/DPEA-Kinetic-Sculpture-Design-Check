const imageContainer = document.getElementById('imageContainer');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const inputImage1 = document.getElementById('inputImage1');
const inputImage2 = document.getElementById('inputImage2');
const inputImage2Text = document.getElementById('inputImage2Text');
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

const colorInput = document.getElementById('color');
const bgColor = document.getElementById('bgColor');
const animColor = document.getElementById('animColor');
const animColorButton = document.getElementById('animColorButton');

const root = document.querySelector(':root');
const variables = getComputedStyle(root);

let isPaused = false;
let bgAnimPaused = true;
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

colorInput.addEventListener('change', (event) => {
	if (event.target.value === "animColor") {
		animColor.style.display = "inline-block";
		animColorButton.style.display = "inline-block";
		bgColor.style.display = "none";

		imageContainer.style.transitionDuration = "0.75s";
	} else {
		animColor.style.display = "none";
		animColorButton.style.display = "none";
		bgColor.style.display = "inline-block";
		bgAnimPaused = true;

		imageContainer.style.transitionDuration = "0s";
		imageContainer.style.backgroundColor = bgColor.value;
		animColorButton.textContent = "Resume Anim";
	}
});

animColorButton.addEventListener('click', () => {
	if (bgAnimPaused === true) {
		bgAnimPaused = false;
		const colors = animColor.value.split(',').map(color => color.trim());
		animateBackgroundColor(colors);
		animColorButton.textContent = "Stop Anim";
	} else {
		bgAnimPaused = true;
		imageContainer.style.backgroundColor = bgColor.value;
		animColorButton.textContent = "Resume Anim";
	}
});

bgColor.addEventListener('input', () => {
	imageContainer.style.backgroundColor = bgColor.value;
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
		image2.src = null;
		inputImage2Text.style.display = "none";
		inputImage2.style.display = "inline-block";
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

function animateBackgroundColor(colors) {
	let currentIndex = 0;

	function changeColor() {
		if (colors.length > 0 && bgAnimPaused !== true) {
			imageContainer.style.backgroundColor = colors[currentIndex];
			currentIndex = (currentIndex + 1) % colors.length;
			setTimeout(changeColor, 1000); // Change color every 1 second
		}
	}

	changeColor();
}

setInterval(function() {
	if (sameDesignCheckBox.checked) {
		inputImage2.style.display = "none";
		inputImage2Text.style.display = "inline-block";
		image2.src = image1.src
		if (flipDesignCheckBox.checked) {
			image2.style.scale = "-1 1";
		}
	}
}, 400);