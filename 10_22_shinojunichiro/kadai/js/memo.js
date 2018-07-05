// 1. tabクリックイベント
$(".tab").on("click", "li", function() {
    index =$(".tab li").index(this);
    console.log(index);

   
    display(index);
});

// 1. 現在tab内容表示
function display(index){
    $('.tab li').removeClass('select');
    $('.tab li').eq(index).addClass('select');

    $(".memoarea li").css("dlisplay","none");
    

    $(".memoarea li ").eq(index).css("display","table-cell");
}


// 2. #add釦がclickされたイベント
$("#add").on("click",function(){

    let newindex = $(".tab li").length;
    console.log(newindex);

  
    $(".tab").append('<li>memo'+newindex+'</li>'); 


    $(".memoarea").append('<li><textarea cols="30" rows="10" id="memo'+newindex+'"></textarea></li>');  
 

    display(newindex);
});



// 3. save釦イベント
$("#save").on("click", function(){

    const memo  = [];
    for(let i = 0; i < $('.tab li').length; i++) {
        memo.push($('#memo'+i).val());
    }

    console.log(memo);

    const json_memo = JSON.stringify(memo);

    localStorage.setItem("memo",json_memo);
    alert("レポートが保存されました。");
});

// 3. local storageのロード
$(function(){
    const memo = JSON.parse(localStorage.getItem("memo"));

    if (memo==null){
        return;
    }
    console.log(memo);

    all_tabs = Object.keys(memo).length;  
    console.log(all_tabs);

     if(all_tabs > 1){
       appendTags(1,all_tabs);
    }    

    for(let i = 0 ; i < $('.tab li').length; i++) {
        $("#memo"+i).val(memo[i]);
    }
    display(0);
});



//4. clear釦実装は時間があれば。なければ自習
$("#clear").on("click", function(){
    localStorage.removeItem("memo");
    for(let i = 0; i < $("memoarea li").length; i++) {
        $('#memo'+i).val("");
    }
    alert("クリアされました。");
});
