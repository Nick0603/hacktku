$(document).ready(function () {
    console.log("finish");
    let socket = io.connect();
    let room_id = $("#room_id").data('room_id'); 
    let pair_user_id = $("#pair_user_id").data('pair_user_id');
    let user_id = $.cookie("user_id");
    $.cookie("room_id", room_id);
    $.cookie("pair_user_id", pair_user_id);
    $(".bigger_btn").click(function () {
        console.log(room_id);
    });

    $(".smaller_btn").click(function () {
        console.log(pair_user_id);
    })
    console.log("user_id:", user_id);
    if (pair_user_id){
        console.log('pair_user_id:',pair_user_id);
        socket.emit('pair_success', { room_id: room_id, pair_user_id: pair_user_id });
    }
});