$(document).ready(function () {

    let socket = io.connect();
    let room_id = $("#room_id").data('room_id');
    let user_id = $.cookie("user_id");
    let adjust_size = $.cookie("adjust_size") || 0;
    let adjust_top = $.cookie("adjust_top") || 0;
    let animation_cat_id;
    let animation_index = 0;
    let animation_max =146;
    let animation_frame_index_arr = [0,27,60,89,116]
    $(".bigger_btn").click(function () {
        adjust_size += 0.01
        $.cookie('adjust_size', adjust_size);
        adjustSize(adjust_size);
    });
    $(".smaller_btn").click(function () {
        adjust_size -= 0.01;
        $.cookie('adjust_size', adjust_size);
        adjustSize(adjust_size);
    })
    $(".up_btn").click(function () {
        adjust_top -= 0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    });
    $(".down_btn").click(function () {
        adjust_top += 0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    })

    // let origin_img = {
    //     width: $('.description-img').css('width').split('px')[0],
    //     height: $('.description-img').css('height').split('px')[0],
    //     top: $('.description-img').css('top').split('px')[0]
    // }
    // let start_game = {
    //     width: $('.start-game-btn').css('width').split('px')[0],
    //     height: $('.start-game-btn').css('height').split('px')[0],
    //     top: $('.start-game-btn').css('top').split('px')[0]
    // }
    // adjustSize(0);
    // adjustTop(adjust_top || 0);
    // function adjustSize(size) {
    //     $(".description-img").css('width', (1 + size) * origin_img.width + 'px');
    //     $(".description-img").css('height', (1 + size) * origin_img.height + 'px');
    //     $(".start-game-btn").css('width', (1 + size) * start_game.width + 'px');
    //     $(".start-game-btn").css('height', (1 + size) * start_game.height + 'px');
    // }

    // function adjustTop(top) {
    //     $(".description-img").css('top', (1 + top) * origin_img.top + 'px');
    //     $(".start-game-btn").css('top', (1 + top) * start_game.top + 'px');
    // }

    function paddingLeft(str, lenght) {
        if (str.length >= lenght)
            return str;
        else
            return paddingLeft("0" + str,lenght);
    }
    $('.start-game-btn').click(function () {
        socket.emit('start-game1', { room_id: room_id });
        $('.description-img').hide();
        $('.start-game-btn').hide();
        $('.game-description2-left').removeAttr('hidden');
        $('.game-description2-right').removeAttr('hidden');
        $('.start-game-btn2').removeAttr('hidden');
        // animation_cat_id = setInterval(function () {
        //     animation_index++;
        //     if (animation_index > animation_max) {
        //         animation_index = 0;
        //     }
        //     let index_str = paddingLeft(animation_index + '', 5);
        //     let url = window.location.origin + `/animation/333_${index_str}`;
        //     $('.game-description2-left').attr("src", url);
        // }, 100);

        animation_cat_id = setInterval(function () {
            animation_index++;
            if (animation_index == animation_frame_index_arr.length) {
                animation_index = 0;
            }
            let index_str = paddingLeft(animation_frame_index_arr[animation_index] + '', 5);
            let url = window.location.origin + `/animation/333_${index_str}`;
            $('.game-description2-left').attr("src", url);
        },800);
        
    });
    socket.on('start-game1', function (data) {
        $('.description-img').hide();
        $('.start-game-btn').hide();
        $('.game-description2-left').removeAttr('hidden');
        $('.game-description2-right').removeAttr('hidden');
        $('.start-game-btn2').removeAttr('hidden');
        // animation_cat_id = setInterval(function () {
        //     animation_index++;
        //     if (animation_index > animation_max) {
        //         animation_index = 0;
        //     }
        //     let index_str = paddingLeft(animation_index + '', 5);
        //     let url = window.location.origin + `/animation/333_${index_str}`;
        //     $('.game-description2-left').attr("src", url);
        // }, 100);

        animation_cat_id = setInterval(function () {
            animation_index++;
            if (animation_index == animation_frame_index_arr.length) {
                animation_index = 0;
            }
            let index_str = paddingLeft(animation_frame_index_arr[animation_index] + '', 5);
            let url = window.location.origin + `/animation/333_${index_str}`;
            $('.game-description2-left').attr("src", url);
        }, 800);
    });

    $('.start-game-btn2').click(function () {
        console.log("test");
        clearInterval(animation_cat_id);
        socket.emit('start-game2', { room_id: room_id });
        $('.game-description2-left').hide();
        $('.game-description2-right').hide();
        $('.start-game-btn2').hide();
        
        $('.game-title').removeAttr('hidden');
        $('.game-bg').removeAttr('hidden');
        $('.game-img').removeAttr('hidden');
        $('.game-optionA').removeAttr('hidden');
        $('.game-optionB').removeAttr('hidden');
        $('.game-optionC').removeAttr('hidden');
        $('.game-optionD').removeAttr('hidden');
    });
    socket.on('start-game2', function (data) {
        $('.game-description2-left').hide();
        $('.game-description2-right').hide();
        $('.start-game-btn2').hide();

        $('.game-title').removeAttr('hidden');
        $('.game-bg').removeAttr('hidden');
        $('.game-img').removeAttr('hidden');
        $('.game-optionA').removeAttr('hidden');
        $('.game-optionB').removeAttr('hidden');
        $('.game-optionC').removeAttr('hidden');
        $('.game-optionD').removeAttr('hidden');
    });
});

