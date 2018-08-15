// // alertボタン
// const alertButton = function(){
//     alert("Hello Wrld");
// };

// //　名前を表示ボタン
// const alertName = function(){
//     const name_value = $("name").value;
//     alert(name_value);
// };       

// //名前は入力されていますか？ボタン
// const checkName = function(){
//     const name_value = $("name").value;
//     const name_value2 = name_value.trim();  // 空白を削除してくれる。文字列がある場合は前後の空白のみ削除し、文字と文字の間の空白は残るから「岡本　ゆうき」はそのまま！！！
//     if(name_value2 === ""){
//         alert("空です");
        
//     }else{
//         alert(`名前は${name_value2}です。`);
//   }
// }           

// //名前チェックボタン
// const fuck = function(){
//     const name_value = $("name").value;
//     const name_value2 = name_value.trim();
//     if(name_value2 === ""){
//         $("#nameError").show();
//         // name.style.color="pink"; /////上手くいかへん！！！！！
//     }else{
//         $("#nameError").fadeOut();
//     }
// }          
//     //** $(function(){  これ使うとHTMLを全部読み込んでから、このカッコ内のJSを使うことになる。でもHTMLの途中で、このカッコ内JSの関数を使うから、jqueryと一緒に先に読み込まなあかん。
//     // fuck();
//     // });


var nameCheck;
var telCheck;
var mailCheck;
var sexCheck;
var monthCheck;
var careerCheck

// onblurとる、



///////////////////////////////////登録ボタン//////////////////////////////////////
//名前確認
$("#name").on("blur",function(){   ///.get(0)つけるべき？？？
    const name_value = $("#name").get(0).value;
    const name_value2 = name_value.trim();
    if(name_value2 === ""){
        $("#nameError").show();
        return nameCheck = false;
    }else{
        $("#nameError").fadeOut();
        return nameCheck = true;
    }
});

//電話番号チェック　
$("#tel").on("blur",function(){
    var tel_value = $("#tel").get(0).value; 
    if( !tel_value.match(/^(\d{3}-\d{4}-\d{4}|\d{11})$/)){  //正規表現にスペースはアカン。
        //matchやと、正規表現の文字が含まれているかどうかしかチェックしない。正規表現の文字さえ含まれていたら文字数が大きくても問題ない。
        //  だから今回は１１文字以上でもエラー文が出てくれなかった。
        // matchやと、文字列が検索に引っかからないとnull値を返す。
        // ^()で先頭一致、()$で後方一致。  両方使うことで完全一致にできる！！！！！！！！！！！
        $("#telError").show();
        return telCheck = false;
    }else{
        $("#telError").fadeOut();
        return telCheck = true;
    }
});


// メールアドレスのチェック
$("#mail").on(blur,function(){
    const mail_value = $("#mail").get(0).value;
    if( !mail_value.match(new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/))){
        $("#mailError").show();
        return mailCheck = false;
    }else{
        $("#mailError").fadeOut();
        return mailCheck = true;
    }
});

//性別チェック
// 関数が定義されてへん
$(".class").on(blur,function(){
    if( ($("#man").get(0).checked == false) && ($("#woman").get(0).checked==false ) ){
        $("#sexError").show();
        return false;
    }else{
        $("#sexError").fadeOut();
        return true;
    }
});



/// 上手くいかへん！！！！！
(function(){
    var time = new Date();
    var endYear = time.getFullYear();
    for(var i =1900; i<=endYear; i++){
        $("#year").append($('<option>').text(i + '年').val(i));
    }
}());



// 閏年チェック
// １００年で割れる年は、閏年ちゃう。
// でも、400年で割れる年は、閏年。
// documentはHTML要素全体を指す。これを使えば、好きなHTML要素の情報を取得したり、新しくHTML要素を追加するような処理を簡単に実現できる。
// documentは「.プロパティ」「.メソッド」のように使う。　https://www.sejuku.net/blog/30970
// 「document.head」やとheadタグの要素を取得する。 「document.body」やとbodyタグの要素を取得する。
$(".birthday").on(blur,function(){
    var year_value = $("#year").get(0).value;
    var month_value = $("#month").get(0).value;
    year_value = parseInt(year_value);
    month_value = parseInt(month_value);
    
    // まずは日数を初期化
    /// でも、0番目も消してしまうから「-日-」も消える！！！！！
    var x = $("#day").get(0);
    if (x.hasChildNodes()) {
        while (x.childNodes.length > 0) {
            x.removeChild(x.firstChild)
        }
    }
    
    // .option「s」じゃないとアカン。select要素内の選択肢（option要素）のコレクションを指す。lengthで長さ測るには、リストと見なさなアカンから、コレクションじゃないとアカン。
    if(  ((year_value%4==0 && year_value%100!=0) || year_value%400==0) && month_value　== 2 ){                   //29
            for(var i=1; i<30; i++){
                $("#day").get(0).options[i] = new Option(i+"日", i); 
                //「new Option(text,value,defaultSelected,selected)」の順番で、optionタグを追加。
                // .option「s」じゃないとアカン。select要素内の選択肢（option要素）のコレクションを指す。[]でリスト番号指定しているから、コレクションじゃないとアカン。
            }
    }else if(month_value == 1||                                   //31
            month_value == 3 ||
            month_value == 5 ||
            month_value == 7 ||
            month_value == 8 ||
            month_value == 10||
            month_value == 12 ){  // 「month_value == (1||3||5||7||8||10||12)」はアカン！！！！！
        for(var i=1; i<32; i++){
            $("#day").get(0).options[i] = new Option(i+"日", i);
        }
    }else if(month_value == 2 ){                              //28
        for(var i=1; i<29; i++){
            $("#day").get(0).options[i] = new Option(i+"日", i);
        }
    }else{                                                    //30
        for(var i=1; i<31; i++){
            $("#day").get(0).options[i] = new Option(i+"日", i);
        }
    }
});



//学歴フィルター、ラジオボタン      これは、登録ボタンを押したときだけにエラーチェックしてくれる。
$(".career").on(blur,function(){
    var school_value = $("#school").get(0).value;
    if( ($("#junior").get(0).checked==false) && ($("#high-school").get(0).checked==false) && 
        ($("#university").get(0).checked==false) && ($("#no-career").get(0).checked==false ) ){
            $("#careerError").show();
            return false;
    }else if(($("#junior").get(0).checked==true ||
              $("#high-school").get(0).checked==true || 
              $("#university").get(0).checked==true) &&
              school_value==0 ){
                $("#careerError").show();
                return false;
    }else{
            $("#careerError").fadeOut();
            return true;
            
        }
});





//　エラー出た時のボックスの色かえられへん
//　入力内容にエラーなければモーダルウィンドウ



// 最終チェックのモーダルウィンドウ
function valueCheck() {
    
    //初期状態からいきなり登録した場合の対処
    nameCheck();
    mailCheck();
    sexCheck();
    careerCheck();
    
    // モーダルに表示するために、入力値を変数に代入しとく。
    var name = $("#name").get(0).value;
    var furigana = $("#furigana").get(0).value;
    var tel = $("#tel").get(0).value;
    var mail = $("#mail").get(0).value;
    var sex;
    if($("#man").get(0).checked == true) {
        sex = "男性";
    } else if($("woman").get(0).checked == true) {
        sex = "女性";
    }
    var year = $("#year").get(0).value;
    var month = $("#month").get(0).value;
    var day = $("#day").get(0).value;
    var school;
    if($("#no-career").get(0).checked == true) {
        school = "なし";
    } else {
        school = $("#school").get(0).value; // プルダウンで選択された学校名が、文字列データとして代入されている。
    }
    　　
    

　　// 入力値を代入したさっきの変数を使って、モーダルウィンドウに表示する
    $("#check_name").get(0).innerHTML = '名前<span style="color: #FF0000;">*</span>：' + name + "<br>";
    $("#check_furigana").get(0).innerHTML = "ふりがな：" + furigana + "<br>";
    $("#check_tel").get(0).innerHTML = "電話番号：" + tel + "<br>";
    $("#check_mail").get(0).innerHTML = 'メールアドレス<span style="color: #FF0000;">*</span>：' +mail+ "<br>";
    $("#check_sex").get(0).innerHTML = '性別<span style="color: #FF0000;">*</span>：' + sex + "<br>";
    $("#check_birthday").get(0).innerHTML = "生年月日：" + year + "年" + month + "月" + day + "日" + "<br>";
    $("#check_school").get(0).innerHTML = '最終学歴<span style="color: #FF0000;">*</span>：' + school + "<br>";

    $("#check_name").get(0).style.display = "inline";
    $("#check_furigana").get(0).style.display = "inline";
    $("#check_tel").get(0).style.display = "inline";
    $("#check_mail").get(0).style.display = "inline";
    $("#check_sex").get(0).style.display = "inline";
    $("#check_birthday").get(0).style.display = "inline";
    $("#check_school").get(0).style.display = "inline";

    // 必須項目じゃない入力フォームに、誤りのある入力値or未記入なら、モーダルウィンドウの最終確認画面には出さない。
    if(furigana == "") {
        $("#check_furigana").get(0).style.display = "none";
    }
    if(!tel.match(/^(\d{3}-\d{4}-\d{4}|\d{11})$/)) {
        $("#check_tel").get(0).style.display = "none";
    }
    if((year == "0") || (month == "0") || (day == "0") || (day == "" )) {   
        // dayはremoveChild()使ってるからvalueが「""」にもなる。
        $("#check_birthday").get(0).style.display = "none";
    }

    //すべての必須項目でエラーなしならモーダルウィンドウを表示
    if(nameCheck() && telCheck() && mailCheck() && sexCheck() && careerCheck() == true) {
        var baseLayer    = $('#modalBaseLayer').get(0); //モーダルウィンドウ
        var submit       = $('#submit').get(0); //はい
        var closeTrigger = $('#closeModal').get(0); //いいえ

        // モーダルを表示
        baseLayer.style.visibility = 'visible';

        // id=submitは、モーダルウィンドウの「はい」のボタン
        submit.addEventListener('click', function() {
            // このボタンを押した時（"click"した時）にモーダルを非表示にする。
            // 「addEventListener(イベントのタイプ,function(){},false)」で、クリックした時に起こる動作を作れる。
            baseLayer.style.visibility = 'hidden';
        }, false);             ////////// なんでfalseあんの？？？？？？？？？？？？？

        //いいえを押したとき
        closeTrigger.addEventListener('click', function(event) {
            // モーダルを非表示
            baseLayer.style.visibility = 'hidden';
        }, false);             ////////// なんでfalseあんの？？？？？？？？？？？？？
    }


    
}





//選択した最終学歴によって学校リストを変更
function schoolSelect(value) {

    arrayNum = $("#school").get(0).options.length;
    //セレクトボックスの初期化
    for(var i=1; i<arrayNum; i++) {
      $("#school").get(0).options[1] = null;
    }

    // ラジオボタンのvalueで条件分岐
    switch(parseInt(value, 10)) {      // parseInt()は第２引数で、進数を決める。この場合は10なので、10進数。
        case 0: //中学
            $.getJSON("school.json",{name:"chara"} , function(data) {  
                // {name:"chara"}       入力提出さえたデータは相手側のデータサーバーに送られる。データを検索しやすくする為のタグ付をしている！！！
                // $.getJSONで、データを読み込んだら、その後の処理を、「function」で決められる。
                var list = data.juniorhighschool;
                $.each(list, function(i) {       //////// なんでここで「i」を宣言できてんの？？？
                    // 「$.each」は「for」の書き換え。　　　「list」すべてのデータにfunctionを適応。
                    $("#school").get(0).options[i] = new Option(list[i], list[i]);
                });
            });
            break;

            //  オブジェクトを配列のように使うには、「Object.values(オブジェクトデータ)」か「for i in オブジェクトデータ」
        case 1: //高校
            $.getJSON("school.json", {name: "chara"}, function(data) {
                var list = data.highschool;
                var values = Object.values(list);       //  jsonのデータは配列ではなくオブジェクト！！！！！
                for(var i=1; i< values.length; i++ ) {
                    $("#school").get(0).options[i] = new Option(list[i], list[i]);
                }
            });
            //     $.each(list, function(i) {
            //         $.school.options[i] = new Option(list[i], list[i]);
            //     });
            // });

            break;

            //  オブジェクトを配列のように使うには、「Object.values(オブジェクトデータ)」か「for i in オブジェクトデータ」
        case 2: //大学
            $.getJSON("school.json", {name: "chara"}, function(data) {
                var list = data.university;
                for(var i in data.university){  //  「for in」もオブジェクトを配列のように使える。
                    $("#school").get(0).options[i] = new Option(list[i], list[i]);
                }
                
                // $.each(list, function(i) {       //  https://q-az.net/without-jquery-each/
                //     $.school.options[i] = new Option(list[i], list[i]);
                // });
            });
            break;
        
        
        case 3: //

        default: break;
    }
}
