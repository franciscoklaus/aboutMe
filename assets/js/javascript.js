// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});


// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.674, lng: -73.945},
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}

/*-------------------------SEND MESSAGE WITH TELEGRAM ----------------------------*/
// Função para enviar a mensagem para o canal do Telegram
async function enviarMensagemTelegram(mensagem) {
  const token = '6354404027:AAEGBj2dyrXv1FgPmcxheqUOgxbf9fvOXSk'; // Substitua pelo seu token do bot do Telegram
 const chatId = '643571007'; // Substitua pelo ID do canal


 try {
   const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       chat_id: chatId,
       text: mensagem
     })
   });

   if (response.ok) {
     document.getElementById("message").innerHTML += "Sucesso no envio da mensagem!";
     setTimeout(function(){
      if ($('#message').length > 0) {
        $('#message').remove();
      }
    }, 3000)
     limparFormulario();
     $('html, body').animate({
      scrollTop: $(".header").offset().top
  }, 2000);
    } else {
     console.error('Erro ao enviar mensagem para o Telegram:', response.status);
   }
 } catch (error) {
   console.error('Erro ao enviar mensagem para o Telegram:', error);
 }
}

// Função para limpar os campos do formulário
function limparFormulario() {
 document.getElementById('nome').value = '';
 document.getElementById('email').value = '';
 document.getElementById('mensagem').value = '';

}

// Função para lidar com o envio do formulário
function enviarFormulario(event) {
 event.preventDefault(); // Impede o comportamento padrão de envio do formulário

 // Obtém os valores do formulário
 const nome = document.getElementById('nome').value;
 const email = document.getElementById('email').value;
 const mensagem = document.getElementById('mensagem').value;

 // Monta a mensagem a ser enviada
 const mensagemTelegram = `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`;

 // Envia a mensagem para o Telegram
 enviarMensagemTelegram(mensagemTelegram);
}

// Adiciona um listener de evento para o envio do formulário
document.getElementById('formulario').addEventListener('submit', enviarFormulario);

