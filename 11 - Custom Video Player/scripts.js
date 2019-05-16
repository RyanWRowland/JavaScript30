/* Get Elements */
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build Functions */
function togglePlay() {
  // if video is fullscreen, prevent toggle from interfering with native scripts
  if (document.fullscreen) return;
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '▮▮';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// use Fullscreen Api to go fullscreen
// problem: uses native HTML5 video player in fullscreen
function fullscreenHandler() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } 
  else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } 
  else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } 
  else if (video.msRequestFullscreen) { 
    video.msRequestFullscreen();
  }
}

/* Add Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('loadeddata', handleProgress);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', fullscreenHandler);