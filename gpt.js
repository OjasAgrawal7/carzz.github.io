// // script.js
// document.querySelectorAll('.hover-container').forEach(container => {
//     let gifTimeout;

//     container.addEventListener('mouseenter', function() {
//         const gif = this.querySelector('.hover-gif');
//         const image = this.querySelector('.hover-image');
//         const gifSrc = this.getAttribute('data-gif');
//         const duration = parseInt(this.getAttribute('data-duration'), 10) || 3000;

//         // Clear any existing timeout
//         clearTimeout(gifTimeout);

//         // Temporarily hide the GIF before resetting the src
//         gif.style.display = 'none';
//         gif.style.visibility = 'hidden';

//         // Force reload the GIF by appending a query string to the src
//         setTimeout(() => {
//             gif.src = gifSrc + '?' + new Date().getTime();
//             gif.style.display = 'block';
//             gif.style.visibility = 'visible';
//             image.style.display = 'none';
//         }, 50); // Brief delay to ensure the GIF is hidden before src update

//         // Set timeout to switch back to the static image after the GIF duration
//         gifTimeout = setTimeout(() => {
//             gif.style.display = 'none';
//             gif.style.visibility = 'hidden';
//             image.style.display = 'block';
//         }, duration);
//     });

//     container.addEventListener('mouseleave', function() {
//         const gif = this.querySelector('.hover-gif');
//         const image = this.querySelector('.hover-image');

//         // Clear the timeout if the mouse leaves
//         clearTimeout(gifTimeout);

//         gif.style.display = 'none';
//         gif.style.visibility = 'hidden';
//         image.style.display = 'block';
//     });
// });
