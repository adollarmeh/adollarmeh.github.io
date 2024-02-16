function createCloudsAndSymbols() {
    const cloudsContainer = document.getElementById('clouds');
    const symbolsContainer = document.getElementById('symbols');

    function createGifElement(src, className, container) {
        const gif = document.createElement('img');
        gif.src = src;
        gif.className = className;
        const size = Math.random() * (180 - 80) + 80;
        gif.style.width = `${className === 'cloud' ? size : size / 2}px`;
        gif.style.animationDuration = `${Math.random() * (60 - 20) + 20}s`;
        gif.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        gif.style.animationName = Math.random() > 0.5 ? 'driftRight' : 'driftLeft';
        container.appendChild(gif);
    }

    function getRandomCloudGif() {
        const cloudGifs = ['cloud.gif', 'cloud2.gif'];
        return cloudGifs[Math.floor(Math.random() * cloudGifs.length)];
    }

    // Corrected loop to mix both types of clouds
    for (let i = 0; i < 20; i++) { // Adjusted number of clouds to 20 for demonstration
        const cloudGif = getRandomCloudGif(); // Randomly selects between cloud.gif and cloud2.gif
        createGifElement(cloudGif, 'cloud', cloudsContainer);
    }
    
    // Create symbols
    for (let i = 0; i < 10; i++) { // Keeps original functionality for symbols
        createGifElement('coin.gif', 'symbol', symbolsContainer);
    }
}

document.addEventListener('mousemove', function(event) {
    if (typeof lastX === 'undefined' || typeof lastY === 'undefined') {
        lastX = event.clientX;
        lastY = event.clientY;
        return;
    }

    const diffX = event.clientX - lastX;
    const diffY = event.clientY - lastY;
    const bodyElement = document.querySelector('body');

    if (Math.abs(diffX) > Math.abs(diffY)) {
        bodyElement.style.cursor = `url(${diffX > 0 ? 'collector.png' : 'collector.png'}), auto`;
        follower.src = diffX > 0 ? 'collector3.gif' : 'collector1.gif';
    } else {
        bodyElement.style.cursor = `url(${diffY > 0 ? 'collector.png' : 'collector.png'}), auto`;
        follower.src = diffY > 0 ? 'collector4.gif' : 'collector2.gif';
    }

    follower.style.display = 'block';
    const halfWidth = 64; // Half the width of the follower GIF
    const halfHeight = 64; // Half the height of the follower GIF
    follower.style.left = `${event.pageX - halfWidth}px`;
    follower.style.top = `${event.pageY - halfHeight}px`;

    lastX = event.clientX;
    lastY = event.clientY;
});

document.addEventListener('mouseleave', function() {
    document.querySelector('body').style.cursor = 'auto';
    follower.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('visitorCounter');
    let visitors = 1000; // Starting number

    setInterval(function() {
        visitors++;
        counterElement.innerText = `Visitors: ${visitors}`;
    }, 1000); // Update the counter every 1000 milliseconds (1 second)
});

// Modal functionality
var modal = document.getElementById("paymentOptions");
var btn = document.getElementById("donateButton");

btn.onclick = function() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

createCloudsAndSymbols();
