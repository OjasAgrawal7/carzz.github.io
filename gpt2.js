// // script.js
// let gifTimeout;

// document.querySelector('.hover-container2').addEventListener('mouseenter', function() {
//     const gif = this.querySelector('.hover-gif2');
//     const image = this.querySelector('.hover-image2');

//     // Clear any existing timeout
//     clearTimeout(gifTimeout);

//     // Force reload the GIF by adding a random query string to the src
//     gif.src = 'videoplayback (online-video-cutter.com) (1).gif?' + new Date().getTime();
//     gif.style.display = 'block';
//     image.style.display = 'none';

//     // Assume GIF duration is 3 seconds
//     gifTimeout = setTimeout(() => {
//         gif.style.display = 'none';
//         image.style.display = 'block';
//     }, 3000); // 3000ms = 3 seconds
// });

// document.querySelector('.hover-container2').addEventListener('mouseleave', function() {
//     const gif = this.querySelector('.hover-gif2');
//     const image = this.querySelector('.hover-image2');

//     // Clear the timeout if the mouse leaves
//     clearTimeout(gifTimeout);

//     gif.style.display = 'none';
//     image.style.display = 'block';
// });
