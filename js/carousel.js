function moveCarousel(direction) {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;

    const card = carousel.querySelector('.projects-card-wrapper');
    if (!card) return;

    const step = card.offsetWidth + 30; 

    carousel.scrollBy({
        left: direction * step,
        behavior: 'smooth' 
    });
}