document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1.2,
        lerp: 0.018
    });

    // 2. Custom Cursor with Scale Effect
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .svc-card, .proj-img').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(6)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });

    // 3. Dynamic Background Color Control
    scroll.on('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                const color = section.getAttribute('data-color');
                document.body.className = color;
            }
        });
    });

    // 4. Smooth Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Custom Loader Effect
    window.onload = () => {
        setTimeout(() => {
            document.querySelector('.loader-overlay').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.loader-overlay').style.display = 'none';
            }, 1000);
        }, 2000);
    };
});


// Footer Live Clock Logic
function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const now = new Date();
        const options = { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        timeDisplay.innerHTML = now.toLocaleTimeString('en-GB', options);
    }
}
setInterval(updateTime, 1000);
updateTime();

// Magnetic Button Effect (High-Level UI)
const magBtn = document.querySelector('.magnetic-btn');
if(magBtn) {
    magBtn.addEventListener('mousemove', (e) => {
        const rect = magBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        magBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    magBtn.addEventListener('mouseleave', () => {
        magBtn.style.transform = `translate(0px, 0px)`;
    });
}

// Footer Cursor Color Change Logic
const footerElement = document.querySelector('.mega-footer'); 
const cursorDot = document.querySelector('.cursor');

if (footerElement && cursorDot) {
    // Jab mouse footer ke dark area mein dakhil ho
    footerElement.addEventListener('mouseenter', () => {
        cursorDot.style.backgroundColor = "#353434"; 
        // cursorDot.style.mixBlendMode = "normal";    
    });

    // Jab mouse footer se wapas upar jaye
    footerElement.addEventListener('mouseleave', () => {
        cursorDot.style.backgroundColor = "var(--light)"; 
        cursorDot.style.mixBlendMode = "difference";     
    });
}
function toggleMenu() {
    const nav = document.getElementById("navlinks");
    nav.classList.toggle("active");
    
    // Body scroll lock (Optional: Taake menu ke peeche scroll na ho)
    if(nav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}