//マップボックスのアクセストークン
mapboxgl.accessToken = 'pk.eyJ1IjoidGF0c3VmdW1pIiwiYSI6ImNsYTVibDdjbzBrbTczd21sZmVoaWtncGwifQ.rN3WCG5L6OB8Z6uuRQZalg';

navigator.geolocation.getCurrentPosition(function (position) { // 現在地取得
    var mapido = position.coords.longitude;
    var mapkeido = position.coords.latitude;
    mapview(mapido, mapkeido);
});

function mapview(mapido, mapkeido) {
    var map = new mapboxgl.Map({
        container: 'map', //マップのレンタリング
        style: 'mapbox://styles/mapbox/streets-v11', //マップのスタイル
        center: [mapido, mapkeido], //マップの初期の中心
        zoom: 15 //初期のズームレベル
    });
}


