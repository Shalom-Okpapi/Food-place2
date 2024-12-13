// JavaScript for smooth scrolling and automatic vertical scrolling within categories

document.addEventListener('DOMContentLoaded', () => {
    // Horizontal scrolling for menu categories
    const menuSlider = document.querySelector('.menu-slider');
    menuSlider.addEventListener('wheel', (e) => {
        e.preventDefault();
        menuSlider.scrollBy({
            left: e.deltaY < 0 ? -200 : 200,
            behavior: 'smooth',
        });
    });

    // Vertical scrolling within each category
    const menuCategories = document.querySelectorAll('.menu-category .menu-items');
    menuCategories.forEach((category) => {
        category.addEventListener('wheel', (e) => {
            e.preventDefault();
            category.scrollBy({
                top: e.deltaY < 0 ? -100 : 100,
                behavior: 'smooth',
            });
        });

        // Automatic scrolling logic
        let scrollDirection = 1; // 1 for down, -1 for up
        setInterval(() => {
            const maxScroll = category.scrollHeight - category.clientHeight;
            const currentScroll = category.scrollTop;

            if (currentScroll >= maxScroll) {
                scrollDirection = -1;
            } else if (currentScroll <= 0) {
                scrollDirection = 1;
            }

            category.scrollBy({
                top: 50 * scrollDirection,
                behavior: 'smooth',
            });
        }, 2000); // Adjust the interval (2000ms) as needed
    });

    // Optional: Highlight active category on scroll
    const categories = document.querySelectorAll('.menu-category');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-category');
                } else {
                    entry.target.classList.remove('active-category');
                }
            });
        },
        { threshold: 0.5, root: menuSlider }
    );

    categories.forEach((category) => {
        observer.observe(category);
    });
});
