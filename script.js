document.addEventListener("DOMContentLoaded", function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const header = document.querySelector("header");

    if (menuToggle && header) {
        menuToggle.addEventListener("click", function() {
            header.classList.toggle("menu-open");
        });
    }

    // Contact form functionality
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (form && formStatus) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');

    if (lightbox && lightboxImg && close) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                lightbox.style.display = 'block';
                lightboxImg.src = this.getAttribute('data-full');
            });
        });

        close.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    const fields = ['first name', 'last name', 'email', 'subject', 'message'];

    // Simple form validation
    for (let field of fields) {
        if (document.getElementById(field).value.trim() === '') {
            showFormStatus('Please fill in all fields.', 'red');
            return;
        }
    }

    const email = document.getElementById('email').value.trim();
    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'red');
        return;
    }

    // If validation passes, submit the form data
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/artworldcolleen@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showFormStatus('Message sent successfully!', 'green');
            form.reset();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).catch(error => {
        showFormStatus('There was a problem sending your message. Please try again later.', 'red');
        console.error('Error:', error);
    });
}

function showFormStatus(message, color) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.style.color = color;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}