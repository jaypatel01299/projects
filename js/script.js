document.addEventListener('DOMContentLoaded', function () {

    let cursor = document.querySelector('.cursor');
    let mouseX = 0;
    let mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            gsap.set(cursor, {
                left: mouseX,
                top: mouseY,
                ease: "power2.out"
            });
        }
    });

    const rotationTimeline = gsap.timeline({ repeat: -1 });
    rotationTimeline.to('.circle', { rotation: 360, duration: 20, ease: "linear" });

    window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        updateCursorVisibility();
    });

    window.addEventListener("scroll", function () {
        updateCursorVisibility();
    });

    const cursorScaleElements = document.querySelectorAll('.cursorScale');

    cursorScaleElements.forEach(link => {
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
            cursor.classList.remove('grow-small');
        });

        link.addEventListener('mousemove', () => {
            cursor.classList.add('grow');
            if (link.classList.contains('small')) {
                cursor.classList.remove('grow');
                cursor.classList.add('grow-small');
            }
        });
    });

    const heading = gsap.timeline({ repeat: -1 });
    heading.to('.main_h1', { y: -20, duration: 2, yoyo: true, repeat: -1, ease: "linear" });

    function updateCursorVisibility() {
        const windowHeight = window.innerHeight;

        // Conditionally update cursor visibility based on mouse position and scroll position
        if (mouseY <= windowHeight) {
            cursor.style.opacity = '1';
        } else {
            cursor.style.opacity = '0';
        }
    }


    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle("dark-mode");
        const darkModeToggle = document.querySelector('.dark-mode-toggle button');
        const darkModeIcon = darkModeToggle.querySelector('img');
        const isDarkMode = body.classList.contains("dark-mode");
        darkModeIcon.src = isDarkMode ? "images/light.svg" : "images/bulb.svg";
        localStorage.setItem("darkMode", isDarkMode);
    }

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
        toggleDarkMode();
    }
    
    document.querySelector('.dark-mode-toggle button').addEventListener('click', toggleDarkMode);
});
