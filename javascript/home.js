$('.carousel-item:first').addClass('active');

function initMap() {
    var dons = { lat: 36.279123, lng: -80.359686 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: dons });
    var marker = new google.maps.Marker({ position: dons, map: map });
}