$(document).ready(function() {
    $('input[name="phone"]').mask('(000) 000 0000');

});

// /*email validation*/

// function validateEmail(sEmail) {
//     var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//     if (filter.test(sEmail)) {
//         return true;
//     } else {
//         return false;
//     }

// } /*end function*/

// $('#email').keyup(function() {

//     var sEmail = $('#email').val();

//     if ($.trim(sEmail).length == 0) {

//         $('.check-e').removeClass('valid').removeClass('fa-check').addClass('invalid').addClass('fa-close');

//     }
//     if (validateEmail(sEmail)) {
//         $('.check-e').removeClass('invalid').removeClass('fa-close').addClass('valid').addClass('fa-check');


//     } else {
//         $('.check-e').removeClass('valid').removeClass('fa-check').addClass('invalid').addClass('fa-close');

//     }

