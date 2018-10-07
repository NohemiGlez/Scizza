$(document).ready(function () {
    // Animación en links internos
    innerLink = $('a[href^="#"]');
    innerLink.on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(href).offset().top }, 'slow');
    });
});