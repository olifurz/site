let volume = 0;
const sounds = {
    sidebarSelect: new Audio("/assets/sounds/button-sidebar-select.mp3"),
    sidebarHover: new Audio("/assets/sounds/button-sidebar-hover.mp3"),
    buttonSelect: new Audio("/assets/sounds/button-select.mp3"),
    buttonHover: new Audio("/assets/sounds/button-hover.mp3"),
    dropdownOpen: new Audio("/assets/sounds/dropdown-open.mp3"),
    dropdownClose: new Audio("/assets/sounds/dropdown-close.mp3")
};

addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => { volume = 0.5; }, 200)
    initButtons();
});


//////// Button ////////
function initButtons() {
    const transition = document.getElementById('transition');
    document.querySelectorAll(".button, button").forEach(button => {
        if (button.classList.contains("nav-button")) {
            button.addEventListener('click', () => { playOneShot(sounds.sidebarSelect) });
            button.addEventListener('mouseenter', () => { playOneShot(sounds.sidebarHover) });
        } else {
            button.addEventListener('click', () => { playOneShot(sounds.buttonSelect) });
            button.addEventListener('mouseenter', () => { playOneShot(sounds.buttonHover) });
        }

        button.addEventListener("mousedown", createRipple);
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (button.classList.contains("nav-button"))
            {
                transition.classList.remove('transitionOut');
                transition.classList.add('transitionIn');
                setTimeout(() => {
                    window.location.href = button.href;
                }, 150);
            }
        });
    });
    document.querySelectorAll("details").forEach(details => {
        details.addEventListener('toggle', (event) => {
            if (details.open) {
                playOneShot(sounds.dropdownOpen);
            }
            else {
                playOneShot(sounds.dropdownClose);
            }
        });
    })
}
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;

    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
}

function playOneShot(sound) {
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play();
}