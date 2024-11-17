document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.row');
    const zigzag = document.querySelector('.zigzag');

    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            const bgColor = window.getComputedStyle(row).backgroundColor;
            zigzag.style.backgroundColor = bgColor;
        });
	row.backgroundColor = "black";
    });
});