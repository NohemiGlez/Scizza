$(document).ready(function () {
    // Animación en links internos
    innerLink = $('a[href^="#"]');
    innerLink.on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(href).offset().top }, 'slow');
    });
    $('.file').hide();
    $('.open-input-file').click(function(){
        $('.file').show();
    });
    document.querySelector(".card-flip").classList.toggle("flip");
});