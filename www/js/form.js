// JavaScript file
var year, mon, day, hour, min;
var imagenumber = 1;
var applicationKey = "87013227784c0efa8a57de9169a06e041fb8ebb674682411dd4713c82fd301a2";
var clientKey = "bdddce7180688334da89518e0b556941061215f38e8f7dcfc1616453b6bf61ec";
const appId = 'pD3voLarW8vLV4q';

// SDKの初期化
var ncmb = new NCMB(applicationKey, clientKey);

//サブクラス生成
// var GameScore = ncmb.DataStore("GameScore");

//データ取得確認
var TestClass = ncmb.DataStore('TestClass');
var item = TestClass
  .fetchById("objectId")
  .then(item => {
    console.log('データあり');
  })
  .catch(e => {
    console.log('データなし');
  });

//位置情報を取得
function GPSButton() {
    geoget();
}

var ido, keido;

function geoget() {
    navigator.geolocation.getCurrentPosition(geoget2);
}

function geoget2(position) {
    alert('取得しました。');
    var geo = document.getElementById("gps");

    var geo_text = "緯度:" + position.coords.latitude + "\n";
    ido = position.coords.latitude;
    geo_text += "経度:" + position.coords.longitude + "\n";
    keido = position.coords.longitude;

    geo.textContent = geo_text;
}

//データストアへの保存
function SousinnButton() {

    var time = document.getElementById("time").value;
    var select = document.getElementById("select").value;
    var text = document.getElementById("text").value;



    //画像データ

    // 画像番号の取得
    var ImageClass = ncmb.DataStore("ImageClass");
    var imageClass = new ImageClass();
    var item = ImageClass
        .fetchById("Jh4OLchzUs15KdTE")
        .then(function (item) {
            //ファイルストアに画像を保存
            var fileData = document.getElementById("image").files[0];

            ncmb.File.upload(item.imagenumber, fileData)
                .then(function (res) {
                    // アップロード後処理
                    alert("データは" + item.imagenumber);
                    // mobile backend に保存
                    // 保存先クラスの生成
                    var MessageClass = ncmb.DataStore("MessageClass");
                    // クラスインスタンスの生成
                    var messageClass = new MessageClass();
                    // データを設定して保存する
                    messageClass.set("time", time)
                        .set("image", item.imagenumber)
                        .set("ido", ido)
                        .set("keido", keido)
                        .set("text", text)
                        .set("select", select)
                        .save();

                    alert("実行済み");
                    //画像番号の更新
                    imagenumber = item.imagenumber + 1;
                    item.set("imagenumber", imagenumber)
                        .update();
                })


        })

}
