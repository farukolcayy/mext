(function ($) {

  "use strict";

  $(window).on('load', function () {

    // Sticky Nav
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 200) {
        $('.scrolling-navbar').addClass('top-nav-collapse');
      } else {
        $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    });

    /* ==========================================================================
       countdown timer
       ========================================================================== */
    jQuery('#clock').countdown('2021/05/05 14:00', function (event) {
      var $this = jQuery(this).html(event.strftime(''
        + '<div class="time-entry days"><span>%-D</span> GÜN</div> '
        + '<div class="time-entry hours"><span>%H</span> SAAT</div> '
        + '<div class="time-entry minutes"><span>%M</span> DAKİKA</div> '
        + '<div class="time-entry seconds"><span>%S</span> SANİYE</div> '));
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'liner',
      allowParentLinks: true,
      duplicate: true,
      label: '',
    });

    /* WOW Scroll Spy
  ========================================================*/
    var wow = new WOW({
      //disabled for mobile
      mobile: false
    });
    wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    $('.lightbox').nivoLightbox({
      effect: 'fadeScale',
      keyboardNav: true,
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* Back Top Link active
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

  });

}(jQuery));

$(document).ready(function () {

  var rate1 = 0;
  var rate2 = 0;
  var rate3 = 0;
  var rate4 = 0;

  var miniRate1 = 0;
  var miniRate2 = 0;
  var miniRate3 = 0;

  var instructorRating = "";
  var programSubjectRating = "";
  var programDate = new Date();
  var streamEmail = "edip.gencler@gmail.com";


  $.getJSON("il-bolge.json", function (sonuc) {
    $.each(sonuc, function (index, value) {
      var row = "";
      row += '<option value="' + value.il + '">' + value.il + '</option>';
      $("#userCity").append(row);
    })
  });

  $("#userCity").on("change", function () {
    var il = $(this).val();
    $("#userDistrict").attr("disabled", false).html("<option value=''>Yaşadığınız ilçe..</option><option value='MERKEZ'>Merkez</option>");
    $.getJSON("il-ilce.json", function (sonuc) {
      $.each(sonuc, function (index, value) {
        var row = "";
        if (value.il == il) {
          row += '<option value="' + value.ilce + '">' + value.ilce + '</option>';
          $("#userDistrict").append(row);
        }
      });
    });
  });


  function isNumericInputPhone(event) {
    var key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    );
  };

  function isModifierKey(event) {
    var key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
      (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      (
        // Allow Ctrl/Command + A,C,V,X,Z
        (event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
      )
  };

  function enforceFormat(event) {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInputPhone(event) && !isModifierKey(event)) {
      event.preventDefault();
    }
  };

  function formatToPhone(event) {
    if (isModifierKey(event)) {
      return;
    }
    var target = event.target;
    var input = event.target.value.replace(/\D/g, '').substring(0, 10);
    var zip = input.substring(0, 3);
    var middle = input.substring(3, 6);
    var last = input.substring(6, 10);
    if (zip.charAt(0) === "0") {
      target.value = ``;
    } else if (!(zip.charAt(0) === "(" || zip.charAt(0) === "5")) {
      target.value = ``;
    } else if (input.length > 6) {
      target.value = `(${zip}) ${middle} - ${last}`;
    } else if (input.length > 3) {
      target.value = `(${zip}) ${middle}`;
    } else if (input.length > 0) {
      target.value = `(${zip}`;
    }
  };

  $(document).on("keydown", "#tel", function (e) {
    enforceFormat(e);
  });

  $(document).on("keyup", "#tel", function (e) {
    formatToPhone(e);
  });

  function MailKontrol(email) {
    var kontrol = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return kontrol.test(email);
  };

  var initialSrc = "assets/img/logo-white.png";
  var scrollSrc = "assets/img/logo.png";

  $(window).scroll(function () {
    var value = $(this).scrollTop();
    if (value > 115) {
      $(".logo-scroll").attr("src", scrollSrc);
    }
    else {
      $(".logo-scroll").attr("src", initialSrc);
    }
  });

  $.ajax({
    type: 'POST',
    dataType: "json",
    url: 'getStreamInfo.php',
    async: true,
    data: { liveId: 1 }
  })
    .done(function (data) {
      if (data.result != '') {

        $("#live-stream").html(data.result.liveLink);
        instructorRating = data.result.instructorName;
        programSubjectRating = data.result.programSubject;

        if (data.result.timerShow === '0') {
          $("#countSection").css("display", "none");
        }

      } else {
        console.log(data);
        return false;
      }
    })
    .fail(function (e) {
      console.log(e);
      return false;
    });

  $('#question-form').submit(function (e) {
    var values = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: 'insertQuestion.php',
      async: true,
      data: values
    })
      .done(function (data) {
        if ($.trim(data) === "Sorunuz İletildi") {
          swal({
            title: 'Sorunuz İletildi',
            icon: 'success'
          });
        } else {
          swal({
            title: data,
            icon: 'warning'
          });
        }
      })
      .fail(function () {
        swal("Başarılı", "Sorunuz iletildi", "success");
      });
    return false;
  });

  $('input[type=radio][name=star1]').change(function () {
    rate1 = $(this).val();
  });

  $('input[type=radio][name=star2]').change(function () {
    rate2 = $(this).val();
  });

  $('input[type=radio][name=star3]').change(function () {
    rate3 = $(this).val();
  });

  $('input[type=radio][name=star4]').change(function () {
    rate4 = $(this).val();
  });

  $('input[type=radio][name=radio1]').change(function () {
    miniRate1 = $(this).val();
  });

  $('input[type=radio][name=radio2]').change(function () {
    miniRate2 = $(this).val();
  });

  $('input[type=radio][name=radio3]').change(function () {
    miniRate3 = $(this).val();
  });

  $('#buttonRating').click(function (e) {

    e.preventDefault();

    $("#buttonRating").attr("disabled", true);
    var ratingComment = $.trim($("#ratingComment").val());

    if (rate1 > 0 && rate1 < 6 && rate2 > 0 && rate2 < 6 && rate3 > 0 && rate3 < 6 && rate4 > 0 && rate4 < 6) {
      $.ajax({
        type: 'POST',
        url: 'insertRating.php',
        async: true,
        data: { liveName: programSubjectRating, emailAddress: streamEmail, programSubjectRating: programSubjectRating, instructorRating: instructorRating, ratingScore: (rate1 + "-" + rate2 + "-" + rate3 + "-" + rate4), ratingComment: ratingComment }
      })
        .done(function (data) {
          swal({
            title: data,
            icon: 'success'
          });

          localStorage.setItem("ratingGlobalBilgiDate", new Date());
          localStorage.setItem("isRatingGlobalBilgi", "1");
          $.modal.close();

        })
        .fail(function () {
          swal({
            title: "Geri Bildiriminiz İletildi",
            icon: 'success'
          });
          $("#buttonRating").attr("disabled", false);
        });

    } else {
      swal({
        title: "Değerlendirme eksik!",
        icon: 'warning'
      });
      $("#buttonRating").attr("disabled", false);
      return false;
    }
    return false;
  });


  $('#buttonRating2').click(function (e) {

    e.preventDefault();
    $("#buttonRating2").attr("disabled", true);

    if (miniRate1 > 0 && miniRate1 < 3 && miniRate2 > 0 && miniRate2 < 3 && miniRate3 > 0 && miniRate3 < 3) {
      $.ajax({
        type: 'POST',
        url: 'insertRating2.php',
        async: true,
        data: { liveName: programSubjectRating, emailAddress: streamEmail, programSubjectRating: programSubjectRating, instructorRating: instructorRating, ratingScore: (miniRate1 + "-" + miniRate2 + "-" + miniRate3) }
      })
        .done(function (data) {
          swal({
            title: data,
            icon: 'success'
          });

          localStorage.setItem("ratingGlobalBilgiDate2", new Date());
          localStorage.setItem("isRatingGlobalBilgi2", "1");
          $.modal.close();

        })
        .fail(function () {
          swal({
            title: "Geri Bildiriminiz İletildi",
            icon: 'success'
          });
          $("#buttonRating2").attr("disabled", false);
        });

    } else {
      swal({
        title: "Değerlendirme eksik!",
        icon: 'warning'
      });
      $("#buttonRating2").attr("disabled", false);
      return false;
    }
    return false;
  });


  $('#applyForm').submit(function (e) {

    $('#preloader').fadeIn(200);

    var values = $(this).serialize();

    var _name = $("#name").val();
    var _surname = $("#surname").val();
    var _province = $("#userCity").val();
    var _district = $("#userDistrict").val();
    var _phoneNumber = $("#tel").val();
    var _emailAddress = $("#email").val();
    var _educationStatus = "";
    var _lastSchool = "";
    var _lastDepartment = "";
    var _lastGraduated = "";
    var _school = "";
    var _department = "";
    var _class = "";
    var _graduated = "";

    let eduVal = $("#educationType option:selected").text();

    switch (eduVal) {
      case "Lise Öğrencisi":
        _educationStatus=eduVal;
        _school = $("#HighSchoolName").val();
        _department = $("#HighSchoolTypeId option:selected").text();
        _class = $("#ClassId option:selected").text();
        break;

      case "Lise Mezunu":
        _educationStatus=eduVal;
        _school = $("#HighSchoolName").val();
        _department = $("#HighSchoolTypeId option:selected").text();
        _graduated = $("#GraduateYear").val();
        break;

      case "Önlisans Öğrencisi":
        _educationStatus=eduVal;
        _lastSchool = $("#LastSchool").val();;
        _lastDepartment = $("#lastDepartmentId").val();
        _lastGraduated = $("#lastGraduateYear").val();
        _school = $("#UniversityId").val();
        _department = $("#DepartmentId").val();
        _class = $("#ClassId option:selected").text();
        break;

      case "Önlisans Mezunu":
        _educationStatus=eduVal;
        _school = $("#UniversityId").val();
        _department = $("#DepartmentId").val();
        _graduated = $("#GraduateYear").val();
        break;

      case "Üniversite Öğrencisi":
        _educationStatus=eduVal;
        _lastSchool = $("#LastSchool").val();;
        _lastDepartment = $("#lastDepartmentId").val();
        _lastGraduated = $("#lastGraduateYear").val();
        _school = $("#UniversityId").val();
        _department = $("#DepartmentId").val();
        _class = $("#ClassId option:selected").text();
        break;

      case "Üniversite Mezunu":
        _educationStatus=eduVal;
        _school = $("#UniversityId").val();
        _department = $("#DepartmentId").val();
        _graduated = $("#GraduateYear").val();
        break;

      case "Lisansüstü Öğrencisi":
        _educationStatus=eduVal;
        _lastSchool = $("#UniversityIdUpper").val();;
        _lastDepartment = $("#lastDepartmentId").val();
        _lastGraduated = $("#lastGraduateYear").val();
        _school = $("#MasterId").val();
        _department = $("#MasterDepartment").val();
        _class = $("#ClassId option:selected").text();
        break;

      case "Lisansüstü Mezunu":
        _educationStatus=eduVal;
        _school = $("#MasterId").val();
        _department = $("#MasterDepartment").val();
        _graduated = $("#MasterGraduate").val();
        break;

      default:
        break;
    }

    values += "&name=" + encodeURIComponent(_name);
    values += "&surname=" + encodeURIComponent(_surname);
    values += "&province=" + encodeURIComponent(_province);
    values += "&district=" + encodeURIComponent(_district);
    values += "&phoneNumber=" + encodeURIComponent(_phoneNumber);
    values += "&emailAddress=" + encodeURIComponent(_emailAddress);
    values += "&educationStatus=" + encodeURIComponent(_educationStatus);
    values += "&LastSchool=" + encodeURIComponent(_lastSchool);
    values += "&lastDepartment=" + encodeURIComponent(_lastDepartment);
    values += "&lastGraduated=" + encodeURIComponent(_lastGraduated);
    values += "&school=" + encodeURIComponent(_school);
    values += "&department=" + encodeURIComponent(_department);
    values += "&class=" + encodeURIComponent(_class);
    values += "&graduated=" + encodeURIComponent(_graduated);

    $.ajax({
      type: "POST",
      url: "post.php",
      data: values,
      dataType: "json",
    })
      .done(function (data) { // if getting done then call.

        if (data.status === "ok") {
          $('#preloader').fadeOut();
          swal({
            title: 'Başvurunuz kaydedildi!',
            icon: 'success'
          }).then(function () {
            location.reload();
          });
        } else {
          $('#preloader').fadeOut();
          swal({
            title: data.result,
            icon: 'warning'
          });
          console.log(data);
        }
      })
      .fail(function (e) { // if fail then getting message
        console.log(e);
        $('#preloader').fadeOut();
        swal("Hata", "Bağlantı hatası! Lütfen tekrar deneyin.", "error");
      });
    return false;

  });

  // setInterval(function () {

  //   var isRating = localStorage.getItem("isRatingGlobalBilgi");
  //   var isRating2 = localStorage.getItem("isRatingGlobalBilgi2");

  //   $.ajax({
  //     type: 'POST',
  //     dataType: "json",
  //     async: true,
  //     url: 'getStreamInfo.php',
  //     data: { liveId: 1 }
  //   })
  //     .done(function (data) {
  //       if (data.result != '') {
  //         if (data.result.timerShow === '0') {
  //           $("#countSection").css("display", "none");
  //         } else {
  //           $("#countSection").css("display", "block");
  //         }

  //         if (data.result.popupShort === '1') {
  //           if (isRating2 != "1") {

  //             var _conn = $.modal.isActive();
  //             console.log(_conn);
  //             if (_conn === false) {
  //               $('#ex10').modal({
  //                 fadeDuration: 1000,
  //                 fadeDelay: 0.50,
  //                 closeText: 'Kapat',
  //                 escapeClose: false,
  //                 clickClose: false,
  //                 showClose: false
  //               });
  //             }
  //           }
  //         }

  //         if (data.result.popupLong === '1') {
  //           if (isRating != "1") {
  //             var _conn = $.modal.isActive();
  //             console.log(_conn);
  //             if (_conn === false) {
  //               $('#ex9').modal({
  //                 fadeDuration: 1000,
  //                 fadeDelay: 0.50,
  //                 closeText: 'Kapat',
  //                 escapeClose: false,
  //                 clickClose: false,
  //                 showClose: false
  //               });
  //             }
  //           }
  //         }

  //       } else {
  //         console.log(data);
  //         return false;
  //       }
  //     })
  //     .fail(function (e) {
  //       console.log(e);
  //       return false;
  //     });

  // }, 20000);

  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  $(document).on("change", "#educationType", function (e) {
    let val = $('#educationType').val();

    $('#LastSchool').removeAttr('required');

    if (val != "") {
      $(".template-other").fadeIn(1000);
    } else {
      $(".template-other").fadeOut(300);
    }
    if (val === "1" || val === "4") {
      $(".template-selected-highschool").fadeIn(1000);
      $('#HighSchoolName,#HighSchoolTypeId').attr('required', 'required');
    }
    else {
      $(".template-selected-highschool").fadeOut(300);
      $('#HighSchoolName,#HighSchoolTypeId').removeAttr('required');
    }
    if (val === "2" || val === "3" || val === "5" || val === "6") {
      $(".template-selected-university").fadeIn(1000);
      $('#UniversityId,#DepartmentId').attr('required', 'required');
    }
    else {
      $(".template-selected-university").fadeOut(300);
      $('#UniversityId,#DepartmentId').removeAttr('required');
    }
    if (val === "4" || val === "6" || val === "3") {
      $(".showGraduate").fadeIn(1000);
      $('#GraduateYear').attr('required', 'required');
    }
    else {
      $(".showGraduate").fadeOut(300);
      $('#GraduateYear').removeAttr('required');
    }
    if (val === "7" || val === "8") {
      $(".template-selected-master").fadeIn(1000);
      $('#MasterId,#MasterDepartment').attr('required', 'required');
      // $(".master-empty").removeClass("hidden");
    }
    else {
      $(".template-selected-master").fadeOut(300);
      $('#MasterId,#MasterDepartment').removeAttr('required');
      // $(".master-empty").addClass("hidden");
    }
    if (val === "8") {
      $(".showMasterGraduate").fadeIn(1000);
      $('#MasterGraduate').attr('required', 'required');
    }
    else {
      $(".showMasterGraduate").fadeOut(300);
      $('#MasterGraduate').removeAttr('required');
    }
    if (val === "1" || val === "5" || val === "2" || val === "7") {

      if (val !== "1") {
        $(".template-last-education").fadeIn(1000);
        $('#ClassId,#LastSchool,#lastDepartmentId,#lastGraduateYear').attr('required', 'required');
        $('#LastSchool').attr('required', 'required');
      } else {
        $(".template-last-education").fadeOut(300);
        $('#ClassId,#LastSchool,#lastDepartmentId,#lastGraduateYear').removeAttr('required');
        $('#LastSchool').removeAttr('required');
      }

      if (val === "7") {
        $("#UniversityIdUpper").fadeIn(200);
        $("#LastSchool").fadeOut(200);
        $('#UniversityIdUpper').attr('required', 'required');
        $('#LastSchool').removeAttr('required');
      } else {
        $("#LastSchool").fadeIn(200);
        $("#UniversityIdUpper").fadeOut(200);
        $('#UniversityIdUpper').removeAttr('required');
      }
      
      $("#ClassId option[value='5']").show();
      $("#ClassId option[value='6']").show();
      $(".showClasses").fadeIn(1000);
      $('#ClassId').attr('required', 'required');
      $("#ClassId option[value='3']").show();
      $("#ClassId option[value='4']").show();
      if (val === "5") {
        $("#ClassId option[value='3']").hide();
        $("#ClassId option[value='4']").hide();
      }
    }
    else {
      $(".template-last-education").fadeOut(300);
      $(".showClasses").fadeOut(300);
      $('#ClassId,#LastSchool,#lastDepartmentId,#lastGraduateYear').removeAttr('required');
    }
    if (val === "2" || val === "5") {
      $("#school-text-info").html("En son mezun olduğunuz okul");
    } else {
      $("#school-text-info").html("En son mezun olduğunuz üniversite");
    }

  });

});
