$(window).scroll(function() {
  scrollNavbar($(window).scrollTop());
});

$(window).ready(function() {
$('#form-contato').submit(function (e){
  e.preventDefault();
  sendContact();
});
});

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
// On-page links
if (
  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
  &&
  location.hostname == this.hostname
) {
  // Figure out element to scroll to
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  // Does a scroll target exist?
  if (target.length) {
    // Only prevent default if animation is actually gonna happen
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000, function() {
      // Callback after animation
      // Must change focus!
      var $target = $(target);
      $target.focus();
      if ($target.is(":focus")) { // Checking if the target was focused
        return false;
      } else {
        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
      };
    });
  }
}
});

function scrollNavbar(scroll) {
if (scroll > 0) {
      $(".navbar").addClass("scroll");
  }
  else {
      $(".navbar").removeClass("scroll");
  }
}

function sendContact(){
var formMessages = $('#form-messages');

var dados = $('#form-contato').serialize();

$.ajax({
    type: 'POST',
    url: 'contact.php',
    data: dados,
    success : function(text) {
        if (text == "success"){
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success')
            $(formMessages).text('Sua mensagem foi enviada com sucesso');

            $('#nome').val('');
            $('#email').val('');
            $('#assunto').val('');
            $('#mensagem').val('');
        } else {
          $(formMessages).removeClass('success');
          $(formMessages).addClass('error')
          $(formMessages).text('Ocorreu um erro. Tente novamente mais tarde.');
        }
    },
    error: function() {
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error')
      $(formMessages).text('Ocorreu um erro. Tente novamente mais tarde.');
    }
});

}