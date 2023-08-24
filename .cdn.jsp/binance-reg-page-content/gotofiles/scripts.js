"use strict";
jQuery(document).ready(function($) {

    var cookieNotSaveInformationComment = "NotSaveInformationComment";
    var cookieShowStoryPost = "showStoryPost";
    var cookieSaveNameComment = "saveNameComment";
    var cookieSaveEmailComment = "saveEmailComment";
    var cookieShowChart = "showChart";
    var cookieShowIframeLogin = "showIframeLogin";
    var cookieMaximumDay = 1500;

    var checkComment;
    var nameComment = "";
    var emailComment = "";
    var secondDiv = new Date().getTime() / 1000;
    var divCurrent = 0;
    var isShowModal = 0;
    var isExitModal = 0;
    var divOld = divCurrent;
    var numItems = $('.td-trending-now-post').length;
    var divComment;
    var device;
    var pageNews = 1;
    var pageAnalysic = 1;
    var pageEducation = 1;
    var pageTip = 1;
    var isSetIframeLogin = 0;

    var contentCommentBox;
    if ($(".content-comment-block") !== undefined && $(".content-comment-block") != null) {
        contentCommentBox = $(".content-comment-block").html();
        $(".content-comment-block").remove();
    }

    $(window).on('resize', function() {
        var winWidth = $(window).width();
        if (winWidth < 768) {
            device = "xs";
        } else if (winWidth <= 991) {
            device = "col-sm";
        } else if (winWidth <= 1199) {
            device = "col-md";
        } else {
            device = "col-lg";
        }
        updateBannerAds();
        updateSizeModalImage();
    });




    function showModalImage(objImage) {
        var parentTag = objImage.parent().get(0).tagName;
        if (parentTag.toLowerCase() == "a") {
            var href = objImage.parent('a').attr('href');
            if (href.toLowerCase().indexOf(ajaxUrl) >= 0) {
                var target = objImage.parent('a').attr('target');
                if (jQuery.type(target) !== "undefined" && target.toLowerCase() == "_blank") {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
                return true;
            }
        }
        $('.imagepreview').attr('src', objImage.attr('src'));
        $('#imagemodal').modal('show');
        var winHeight = $(window).height();

        $(".modal-image .modal-content").css({
            "height": winHeight,
        });

        $(".imagepreview").css({
            "max-height": winHeight - 100,
            "height": "auto",
            "width": "auto",
        });
        setTimeout(
            function() {
                $(".modal-image .close-bt").css({
                    "width": $(".imagepreview").width(),
                });

            }, 200);
    }

    // setTimeout(
    //     function() {
    //         $(".iframe-login-footer .div-frame iframe").attr("src", $(".iframe-login-footer .div-frame iframe").attr("data-src"));
    //     }, 300);

    // $(".iframe-login-footer .div-frame iframe").on('load', function() {
    //     // alert($(".iframeLogin .div-frame iframe").width());
    //     if ($(".iframeLogin .div-frame iframe").width() == 0) {
    //         $(".login-fixed-bottom").css({
    //             "bottom": "0px",
    //         });
    //     } else {

    //     }
    // });

    $('.login-fixed-bottom a').on('click', function() {
        return true;
        // // alert($(".iframeLogin .div-frame iframe").width());
        // // return false;
        // if ($(".iframeLogin .div-frame iframe").width() == 0) {
        //     return true;
        // }
        // if ($(this).attr("ref") == 0) {
        //     if (isSetIframeLogin == 0) {
        //         isSetIframeLogin = 1;
        //         $(".iframe-login-footer .div-frame iframe").css({
        //             "width": "100%",
        //         });
        //     }
        //     $(this).attr("ref", 1);
        //     $(".login-fixed-bottom").css({
        //         "bottom": "-10px",
        //     });
        // } else {
        //     $(this).attr("ref", 0);
        //     $(".login-fixed-bottom").css({
        //         "bottom": "-460px",
        //     });
        // }
        // return false;
    });


    $('.liveFeedItemClick .bg-shadow-crypto').on('click', function() {
        goToByScroll(".list-detail-currency", 110);
        return false;
    });

    function showChartCandlestick() {
        $(".chart-currency #candlestick-chart iframe").each(function() {
            if ($(this).attr("data-src") !== null && $(this).attr("data-src") != "") {
                $(this).attr("src", $(this).attr("data-src"));
            }
        });
    }

    function showChartLine() {
        $(".chart-currency #line-chart iframe").each(function() {
            $(this).attr("src", $(this).attr("data-src"));
        });
    }
    $('.chart-currency .nav-tabs a').click(function() {
        if ($(this).attr("active") == 0) {
            var refObj = $(this).attr("ref");
            setTimeout(function() {
                if (refObj == 1) {
                    showChartCandlestick();
                    $(this).attr("active", 1);
                } else {
                    showChartLine();
                    $(this).attr("active", 1);
                }
            }, 300);
        }
        createCookie(cookieShowChart, $(this).attr("ref"), 365);
    })

    if (readCookie(cookieShowChart) === null || readCookie(cookieShowChart) == 1) {
        $('.chart-currency .nav-tabs a:first').tab('show');
        $('.chart-currency .nav-tabs a:first').attr("active", "1");
        showChartCandlestick();

    } else {
        $('.chart-currency .nav-tabs a:last').tab('show');
        $('.chart-currency .nav-tabs a:last').attr("active", "1");
        showChartLine();
    }

    $('.post-content .description img').on('click', function() {
        showModalImage($(this));
        return false;
    });

    $('.post-content .avatar img').on('click', function() {
        showModalImage($(this));
        return false;
    });

    $("#image img").on("click", function() {
        var src = $(this).attr("src");
        $(".modal-img").prop("src", src);
    })

    function hotNew(isLeft) {
        secondDiv = new Date().getTime() / 1000;
        if (isLeft == 0)
            $(".td-trending-now-post-" + divOld).addClass("td_animated_xlong td_fadeOutLeft");
        else
            $(".td-trending-now-post-" + divOld).addClass("td_animated_xlong td_fadeOutRight");
        $(".td-trending-now-post-" + divOld).css({
            "opacity": "0",
            "z-index": "0",
        });
        if (isLeft == 0)
            $(".td-trending-now-post-" + divCurrent).addClass("td_animated_xlong td_fadeInRight");
        else
            $(".td-trending-now-post-" + divCurrent).addClass("td_animated_xlong td_fadeInLeft");
        $(".td-trending-now-post-" + divCurrent).css({
            "opacity": "1",
            "z-index": "1"
        });
        // setTimeout(function () {
        $(".td-trending-now-post-" + divOld).removeClass("td_animated_xlong td_fadeOutLeft td_fadeInRight td_fadeOutRight td_fadeInLeft");
        // }, 200);
    }
    $(".lazyload").lazyload();

    jQuery(document).on("click", ".cb-comment", function(e) {
        var isCheck = $(this).is(":checked");
        $('.cb-comment').each(function(i) {
            $(this).prop("checked", isCheck);
        });
        if (isCheck) {
            eraseCookie(cookieNotSaveInformationComment);
            createCookie(cookieSaveNameComment, nameComment, cookieMaximumDay);
            createCookie(cookieSaveEmailComment, emailComment, cookieMaximumDay);
        } else {
            createCookie(cookieNotSaveInformationComment, 1, cookieMaximumDay);
            eraseCookie(cookieSaveNameComment);
            eraseCookie(cookieSaveEmailComment);
        }
    });

    setTimeout(
        function() {
            $(".post-content .description iframe").each(function() {
                if ($(this).attr("data-src") !== null && $(this).attr("data-src") != "") {
                    $(this).attr("src", $(this).attr("data-src"));
                }
                //$(this).find(".scrolling").width(width * imgLength * 1.2);
            });



        }, 5);

    // if ($(window).width() >= 768) {
    //     $(".iframeTrading .div-frame iframe").attr("src", $(".iframeTrading .div-frame iframe").attr("data-src"));
    //     $(".info-iframeTrading .iframeTrading .div-frame").css({
    //         "width": "600px",
    //         "height": "375px",
    //     });
    // }


    setTimeout(
        function() {
            $(".widget-html-trading").scrollLeft('600');
        }, 20);


    $(".iframeLogin .div-frame iframe").attr("src", $(".iframeLogin .div-frame iframe").attr("data-src"));
    $(".iframeLogin .div-frame iframe").on('load', function() {
        if ($(".iframeLogin .div-frame iframe").width() == 0) {
            $(".info-iframeLogin .iframeLogin").addClass("hide");
            $(".item_banner_hide").removeClass("hide");
        } else {
            $(".info-iframeLogin .iframeLogin").removeClass("hide");
        }
    });

    // setTimeout(
    //     function() {
    //         $(".liveFeedCrypto .liveFeed iframe").attr("src", $(".liveFeedCrypto .liveFeed iframe").attr("data-src"));
    //     }, 100);

    $(".widget-trading iframe").attr("src", $(".widget-trading iframe").attr("data-src"));
    $('.shareSocial').click(function(e) {
        popupCenter({ url: $(this).attr("ref"), title: 'translate', w: 850, h: 500 });
        return false;
    });
    const popupCenter = ({ url, title, w, h }) => {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open(url, title,
            `
                scrollbars=yes,
                width=${w / systemZoom}, 
                height=${h / systemZoom}, 
                top=${top}, 
                left=${left}
                `
        )

        if (window.focus)
            newWindow.focus();
    }

    function getAjaxData(isAlign, obj, divPage, isBegin) {
        if (divPage.hasClass("ajax-page-alpha")) {
            return;
        }
        var contentAJax = obj.find(".content-ajax");
        contentAJax.removeClass("td_animated_xlong td_fadeOutLeft td_fadeInRight td_fadeOutRight td_fadeInLeft");
        var page = obj.attr("page");
        if (isAlign == 0) {
            if (isBegin == 0)
                page = parseInt(obj.attr("page")) + 1;
            contentAJax.addClass("td_animated_xlong td_fadeOutLeft");
        } else {
            if (isBegin == 0)
                page = parseInt(obj.attr("page")) - 1;
            contentAJax.addClass("td_animated_xlong td_fadeOutRight");
        }
        obj.find(".loading-ajax").removeClass("hide");
        var data = {};
        data['language'] = language;
        data['page'] = page;
        data['number'] = obj.attr("number");
        data['action'] = obj.attr("action");
        if (obj.attr("action") == "item-grid") {
            obj.find(".nav-tab").find("li").each(function(i) {
                if ($(this).hasClass("active")) {
                    data['title'] = $(this).find("a").attr("alt").trim();
                }
            });
        } else {
            data['title'] = obj.attr("alt");
        }
        if (jQuery.type(obj.attr("nameMenu")) !== "undefined") {
            data['nameMenu'] = obj.attr("nameMenu");
        }
        if (jQuery.type(obj.attr("isHideTitle")) !== "undefined") {
            data['isHideTitle'] = obj.attr("isHideTitle");
        }
        if (jQuery.type(obj.attr("post-code")) !== "undefined") {
            data['post-code'] = obj.attr("post-code");
        }
        if (jQuery.type(obj.attr("type-related")) !== "undefined") {
            data['type-related'] = obj.attr("type-related");
        }
        if (jQuery.type(obj.attr("isMobile")) !== "undefined") {
            data['isMobile'] = obj.attr("isMobile");
        }
        if (jQuery.type(obj.attr("website_id")) !== "undefined") {
            data['website_id'] = obj.attr("website_id");
        }

        if (jQuery.type(obj.attr("isCategory")) !== "undefined") {
            data['isCategory'] = obj.attr("isCategory");
        }

        var nameAction = "getAjaxHome";
        if (jQuery.type(obj.attr("nameaction")) !== "undefined") {
            nameAction = obj.attr("nameaction");
        }
        $.ajax({
            url: ajaxUrl + "Api/" + nameAction,
            type: "post",
            data: data,
            dataType: 'json',
            success: function(response) {
                contentAJax.removeClass("td_animated_xlong td_fadeOutLeft td_fadeInRight td_fadeOutRight td_fadeInLeft");
                obj.find(".loading-ajax").addClass("hide");
                if (response.error == 0) {
                    contentAJax.html(response.html);
                    if (isAlign == 0) {
                        contentAJax.addClass("td_animated_xlong td_fadeInRight");
                    } else if (isAlign == 1) {
                        contentAJax.addClass("td_animated_xlong td_fadeInLeft");
                    }
                    if (isBegin == 0) {
                        if (page > response.pageCount)
                            page = response.pageCount;
                        obj.attr("page", page);
                    }
                    if (parseInt(page) == 1) {
                        divPage.closest('.next-page').find(".previous").addClass("ajax-page-alpha");
                    } else if (parseInt(page) > 1) {
                        divPage.closest('.next-page').find(".previous").removeClass("ajax-page-alpha");
                    }
                    //                    divPage.closest('.next-page').find(".previous").remove();
                    if (parseInt(page) >= response.pageCount) {
                        divPage.closest('.next-page').find(".next").addClass("ajax-page-alpha");
                    } else {
                        divPage.closest('.next-page').find(".next").removeClass("ajax-page-alpha");
                    }
                } else {
                    //  alert("Could not connect to the server!");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // alert("Could not connect to the server!");
            }
        });
        return false;
    }

    jQuery(document).on("click", ".tab-item", function(e) {
        e.preventDefault();
        var ul = $(this).closest('li').closest('ul');
        ul.find("li").each(function(i) {
            $(this).removeClass("active");
        });
        $(this).closest("li").addClass("active");
        var pageObj = $(this).closest(".items").find(".next-page .page-next-item");
        pageObj.removeClass("ajax-page-alpha");
        var div = $(this).closest(".items").find('.ajax-item');
        div.attr("page", 1);
        getAjaxData(0, div, pageObj, 1);
        return false;
    });

    $('.tabbar-tapped').click(function(e) {
        e.preventDefault();
        $('.tabbar-tapped').each(function(i) {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        $(".related-items .ajax-item").attr("type-related", $(this).attr("ref"));

        var pageObj = $(this).closest(".related-items").find(".next-page .page-next-item");
        pageObj.removeClass("ajax-page-alpha");
        var div = $(this).closest(".related-items").find('.ajax-item');
        div.attr("page", 1);
        getAjaxData(0, div, pageObj, 1);
        return false;
    });


    $('.page-next-item').click(function(e) {
        e.preventDefault();
        var div = $(this).closest('.items').find('.ajax-item');
        getAjaxData(0, div, $(this), 0);
        return false;
    });

    $('.page-previous-item').click(function(e) {
        e.preventDefault();
        var div = $(this).closest('.items').find('.ajax-item');
        getAjaxData(1, div, $(this), 0);
        return false;
    });

    $('.btn-reply').click(function(e) {
        e.preventDefault();
        if (divComment !== undefined && divComment != null) {
            if (divComment === $(this))
                return;
            if ($(this).attr("comment-code") == divComment.attr("comment-code"))
                return;
            divComment.closest('.info-cm').closest('.content-cm').find(".comment-box").remove();
        }
        divComment = $(this);
        divComment.closest('.info-cm').closest('.content-cm').append(contentCommentBox);
        divComment.closest('.info-cm').closest('.content-cm').find("#CommentCommentId").val($(this).attr("comment-id"));
        $([document.documentElement, document.body]).animate({
            scrollTop: divComment.offset().top - 60
        }, 'slow');
        grecaptcha.render('google-recaptcha-cm', {
            sitekey: keyCapcha,
            callback: function(response) {}
        });
        setTimeout(
            function() {
                setCookiedComment();
                //                    if (readCookie(cookieNotSaveInformationComment) === null) {
                //                        $('.cb-comment').each(function (i) {
                //                            $(this).prop("checked", true);
                //                        });
                //                    } else {
                //                        $('.cb-comment').each(function (i) {
                //                            $(this).prop("checked", false);
                //                        });
                //                    }
            }, 50);
    });

    jQuery(document).on("click", ".btn-send-comment", function(e) {
        if (checkValidate($(this).closest('.form-data-comment'))) {
            $(this).find(".fa").removeClass("hide");
            if (readCookie(cookieNotSaveInformationComment) === null) {
                createCookie(cookieSaveNameComment, nameComment, cookieMaximumDay);
                createCookie(cookieSaveEmailComment, emailComment, cookieMaximumDay);
            } else {
                eraseCookie(cookieSaveNameComment);
                eraseCookie(cookieSaveEmailComment);
            }
            return true;
            //  sendComment($(this).closest('.form-data-comment').serializeArray(), $(this));
        }
        return false;
    });

    function addErrorComment(obj) {
        obj.addClass("form-error");
        obj.closest('.div_input').find(".td-warning").removeClass("hide");
    }

    function removeErrorComment(obj) {
        obj.removeClass("form-error");
        obj.closest('.div_input').find(".td-warning").addClass("hide");
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function checkValidate(divFormCm) {
        removeErrorComment(divFormCm.find(".form-comment-name"));
        removeErrorComment(divFormCm.find(".form-comment-email"));
        removeErrorComment(divFormCm.find(".form-comment-comment"));
        removeErrorComment(divFormCm.find(".g-recaptcha-response"));
        var isError = true;
        if (divFormCm.find(".form-comment-name").val() === "") {
            addErrorComment(divFormCm.find(".form-comment-name"));
            isError = false;
        }
        if (divFormCm.find(".form-comment-email").val() === "" || !isEmail(divFormCm.find(".form-comment-email").val())) {
            addErrorComment(divFormCm.find(".form-comment-email"));
            isError = false;
        }
        if (divFormCm.find(".form-comment-comment").val() === "") {
            addErrorComment(divFormCm.find(".form-comment-comment"));
            isError = false;
        }
        if (divFormCm.find(".g-recaptcha-response").val() === "") {
            addErrorComment(divFormCm.find(".g-recaptcha-response"));
            isError = false;
        }
        nameComment = divFormCm.find(".form-comment-name").val();
        emailComment = divFormCm.find(".form-comment-email").val();
        return isError;
    }

    function sendComment(data, objBT) {
        $.ajax({
            url: ajaxUrl + "Comments/add",
            type: "post",
            data: data,
            dataType: 'json',
            success: function(response) {
                objBT.find(".fa").addClass("hide");
                if (response.error == 0) {
                    if (readCookie(cookieNotSaveInformationComment) === null) {
                        createCookie(cookieSaveNameComment, nameComment, cookieMaximumDay);
                        createCookie(cookieSaveEmailComment, emailComment, cookieMaximumDay);
                    } else {
                        eraseCookie(cookieSaveNameComment);
                        eraseCookie(cookieSaveEmailComment);
                    }
                    $(location).attr('href', response.url);
                    window.location.hash = response.hashUrl;
                    location.reload();
                    return true;
                    // $(location).attr('href', response.url);
                } else {
                    //alert("Could not connect to the server!");
                    return false;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                objBT.find(".fa").AddClass("hide");
                // alert("Could not connect to the server!");
                return false;
            }
        });

    }


    // sendMail($(this).closest('#formSendMaiFooter').serializeArray());

    jQuery(document).on("click", ".btn-reply-comment", function(e) {
        e.preventDefault();
        if (divComment !== undefined) {
            divComment.closest('.info-cm').closest('.content-cm').find(".comment-box").remove();
        }
        divComment = null;
    });

    // This is a functions that scrolls to #{blah}link
    function goToByScroll(obj, number) {
        $('html,body').animate({
            scrollTop: $(obj).offset().top - number
        }, 'fast');
    }



    $('.close-stori').click(function(e) {
        createCookie(cookieShowStoryPost, 1, 90);
        hideModalStori();
        isExitModal = 1;
    });

    $("a").click(function(e) {
        if ($(this).attr("rel") == "nofollow") {
            e.preventDefault();
            return false;
        }
    });

    $(".liveFeedCrypto").removeClass("hide");
    $(".crypto").removeClass("hide");
    //$(".hot-trending").removeClass("hide");
    $(".hot-trending .bt-hotnews").removeClass("hide");
    $(".hot-trending .next-page-trending").removeClass("hide");
    $(".dropdown-sort").removeClass("hide");
    $(".right-index .text-center").removeClass("inline-block");
    $(".sidebar-right  .text-center").removeClass("inline-block");
    $(".area-rating").removeClass("hide");
    $(".off-canvas").removeClass("hide");
    if (isDetail == 1 && isShowModal == 0 && readCookie(cookieShowStoryPost) === null) {
        $('#modal-footer-item').modal({
            show: 'false',
        });
        $(".modal-post .modal-dialog").css({
            "right": "-320px",

        });
        $("#modal-footer-item").on('shown.bs.modal', function() {
            setTimeout(
                function() {
                    $("#modal-footer-item").css({
                        "position": "initial",
                    });
                }, 500);
        });
    }
    var ratingPostCode = "";

    function updateCount() {
        var countPostCode = 'count_' + post_code;
        if (readCookie(countPostCode) === null) {
            var data = {};
            data['post_code'] = post_code;
            $.ajax({
                url: ajaxUrl + "Api/updateCount",
                type: "post",
                data: data,
                dataType: 'json',
                success: function(response) {
                    if (response.error == 0) {
                        createCookie(countPostCode, cookieMaximumDay);
                        $(".text-count").html("" + response.data.count);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //            console.log(textStatus, errorThrown);
                }
            });
        }
    }

    function getWidgetTrading() {
        var data = {};
        data['language'] = language;
        $.ajax({
            url: ajaxUrl + "Api/getWidgetTrading",
            type: "post",
            data: data,
            async: true,
            dataType: 'json',
            success: function(response) {
                if (response.error == 0) {
                    $(".content-widget-trading").html(response.html);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
    if (isIndex == 1) {
        if ($(window).width() >= 768) {
            getWidgetTrading();
        }
    }

    function updateRating() {
        ratingPostCode = 'rating_' + post_code;
        if (readCookie(ratingPostCode) === null) {
            $('.kv-fa').rating({
                theme: 'krajee-fa',
                //                filledStar: '<i class="fa fa-star"></i>',
                //                emptyStar: '<i class="fa fa-star-o"></i>',
                filledStar: '&#x2605;',
                emptyStar: '&#x2606;',
            });
        } else {
            $('.kv-fa').rating({
                theme: 'krajee-fa',
                //                filledStar: '<i class="fa fa-star"></i>',
                //                emptyStar: '<i class="fa fa-star-o"></i>',
                filledStar: '&#x2605;',
                emptyStar: '&#x2606;',
                disabled: 'false'
            });
        }
        $('.kv-fa-disabled').rating({
            theme: 'krajee-fa',
            //            filledStar: '<i class="fa fa-star"></i>',
            //            emptyStar: '<i class="fa fa-star-o"></i>',
            filledStar: '&#x2605;',
            emptyStar: '&#x2606;',
            disabled: 'false'
        });
    }

    $('.kv-fa').on(
        'change',
        function() {
            // $(this).val();
            if (readCookie(ratingPostCode) === null) {
                ratingChange($(this).val());
            }
            //You have already scored for this album.
        });

    function ratingChange(value) {
        if (value > 0) {
            var data = {};
            data['post_code'] = post_code;
            data['rating'] = value;
            $.ajax({
                url: ajaxUrl + "Api/updateRating",
                type: "post",
                data: data,
                dataType: 'json',
                success: function(response) {
                    if (response.error == 0) {
                        createCookie(ratingPostCode, value, cookieMaximumDay);
                        $(".text-rating-status").removeClass("hide");
                        $(".text-rating").html(response.data.rating);
                        $(".kv-fa").rating("update", response.data.rating);
                        $(".kv-fa-disabled").rating("update", response.data.rating);
                        $(".star-rating").addClass("hide");
                        $(".star-hide").removeClass("hide");
                        setTimeout(function() {
                            $(".text-rating-status").addClass("hide");
                        }, 2000);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //            console.log(textStatus, errorThrown);
                }
            });
        }
    }

    function scrollToDiv() {
        var hash = window.location.hash;
        if (hash.trim().length > 0) {
            goToByScroll(hash.trim(), 150);
            //            $([document.documentElement, document.body]).animate({
            //                scrollTop: $(hash).offset().top
            //            }, 'slow');
        }
    }

    function setCookiedComment() {
        if (readCookie(cookieSaveNameComment) !== null) { //  nameComment = readCookie(cookieSaveNameComment);
            $('.name-comment').each(function(i) {
                $(this).val(readCookie(cookieSaveNameComment));
            });
        }
        if (readCookie(cookieSaveEmailComment) !== null) { // emailComment = readCookie(cookieSaveEmailComment);
            $('.email-comment').each(function(i) {
                $(this).val(readCookie(cookieSaveEmailComment));
            });
        }


        if (readCookie(cookieNotSaveInformationComment) === null) {
            $('.cb-comment').each(function(i) {
                $(this).prop("checked", true);
            });
        } else {
            $('.cb-comment').each(function(i) {
                $(this).prop("checked", false);
            });
        }
    }

    (function($) {
        $.fn.TableOfContents = function(options) {
            var settings = $.extend({
                duration: "1000",
                title: contentString + " <span class='toc_toggle'>[<a href='#'>hide</a>]</span>",
                headings: "h1, h2, h3, h4"
            }, options);
            return this.each(function() {
                var article = $(this);
                article.prepend('<div class="table-of-contents"><h3 id="toc-title" class="toc">' + settings.title + '</h3><ul></ul></div>');
                var list = article.find('div.table-of-contents:first > ul:first');
                var isCheck = 0;
                article.find(settings.headings).each(function() {

                    if ($(this).attr('id') === 'toc-title') {
                        return null;
                    }
                    $(this).removeAttr('id');

                    var heading = $(this);
                    heading.find(".su-button-center").remove();
                    var tag = heading[0].tagName.toLowerCase();
                    var title = $.trim(heading.text());
                    var id = heading.attr('id');

                    if (typeof id === "undefined") {
                        id = Math.random().toString(36).substring(7);
                        heading.attr('id', id);
                    }
                    isCheck++;
                    if (title.trim().length > 0)
                        list.append('<li class="' + tag + '"><a href="#' + id + '" title="' + title + '">' + title + '</a></li>');
                });
                if (isCheck < 2) {
                    $(".table-of-contents").remove();
                }
                list.on('click', function(event) {
                    var target = $(event.target);
                    if (target.is('a')) {
                        event.preventDefault();
                        jQuery('html, body').animate({
                            scrollTop: $(target.attr('href')).offset().top - 100
                        }, settings.duration);
                        return false;
                    }
                });
            });
        };
    }(jQuery));
    if (isDetail == 1 && post_code > 0) {
        updateCount();
        updateRating();
        setCookiedComment();
        jQuery('.post-item-single-container .description').TableOfContents();
        $(window).on('load', function() {
            scrollToDiv();
        });
    }



    setTimeout(function() {
        $(document).off('focusin.modal');
    }, 100);

    function showModalItem() {
        $('#modal-footer-item').modal({
            show: 'false',
            backdrop: 'static',
            keyboard: false
        });
        $(document).off('focusin.modal');
        //$(document).off('focusin.modal');
    }

    function hideModalStori() {
        $(".modal-post .modal-dialog").css({
            "right": "-320px",
            "display": "block",

        });
        $(".modal-post .modal-dialog").removeClass("modal");
        //  $('#modal-footer-item').modal('hide');
        isShowModal = 0;
    }


    //    $('.modal-image .modal-dialog img').click(function (e) {
    //        return false;
    //    });

    $('.modal-image .modal-dialog').click(function(e) {
        $('#imagemodal').modal('toggle');
    });

    $('.modal-image a').click(function(e) {
        $('#imagemodal').modal('toggle');
        return false;
    });

    function updateBannerAds() {
        var w = $(".right-item-slide").width();
        $(".banner-broker-small").css({
            "width": w,
        });
        $(".banner-broker-small a").css({
            "width": w,
        });
        if (w < 250) {
            $(".banner-broker-small span").css({
                "font-size": "12px",
            });
        } else {
            $(".banner-broker-small span").css({
                "font-size": "15px",
            });
        }
    }

    function updateSizeModalImage() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var scroll = $(window).scrollTop();
        $(".modal-image .modal-content").css({
            "height": winHeight,
        });
        $(".imagepreview").css({
            "max-height": winHeight - 100,
            "height": "auto",
            "width": "auto",
            // "max-width": winWidth - 50
        });
        setTimeout(
            function() {
                $(".modal-image .close-bt").css({
                    "width": $(".imagepreview").width(),
                });
            }, 200);

    }

    updateBannerAds();
    updateSizeModalImage();
    $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();
        var winWidth = $(window).width();

        if (scroll > 400 && winWidth > 578) {
            if (isDetail == 1 && isShowModal == 0 && readCookie(cookieShowStoryPost) === null) { // if (isShowModal == 0 && isExitModal == 0) {
                if(language == "ar" || language == "ur" || language == "fa")
                  return; 
                setTimeout(
                    function() {
                        $(".modal-post .modal-dialog").css({
                            "right": "0",
                            "display": "block",
                        });
                        showModalItem();
                    }, 200);

                isShowModal = 1;
            }
        } else {
            if (isShowModal == 1) {
                hideModalStori();
            }
        }

    });




    function nextPage() {
        secondDiv = new Date().getTime() / 1000;
        divOld = divCurrent;
        divCurrent++;
        if (divCurrent >= numItems) {
            // return;
            divCurrent = 0;
        }
        hotNew(0);
    }

    function previousPage() {
        secondDiv = new Date().getTime() / 1000;
        divOld = divCurrent;
        divCurrent--;
        if (divCurrent < 0) {
            divCurrent = numItems - 1;
        }
        hotNew(1);
    }
    //time call jquery
    if ($('.td-trending-now-post').length) {
        $(".td-trending-now-post-" + divCurrent).addClass("td_animated_xlong td_fadeInRight");
        $(".td-trending-now-post-" + divCurrent).css({
            "opacity": "1",
            "z-index": "1",
        });
        var interval = setInterval(function() {
            var second = new Date().getTime() / 1000;
            if (second - secondDiv > 3) {
                nextPage();
            }
        }, 500);
    }

    $('.next-page-small .next').click(function(e) {
        e.preventDefault();
        nextPage();
    });

    if (readCookie('menu_content') === null) {
        showMenuContent();
    } else {
        hideMenuContent();
    }

    //     $("#content").toc({content: ".description", headings: "h1,h2,h3,h4,h5"});

    function showMenuContent() {
        $(".table-of-contents ul").removeClass("hide");
        $('#toc-title .toc_toggle a').html(hideString);
    }

    function hideMenuContent() {
        $(".table-of-contents ul").addClass("hide");
        $('#toc-title .toc_toggle a').html(showString);
    }

    jQuery(document).on("click", ".toc_toggle", function(event) {
        event.preventDefault();
        if ($(".table-of-contents").find('.hide').length) {
            showMenuContent();
            eraseCookie("menu_content");
        } else {
            hideMenuContent();
            createCookie("menu_content", "1", 1);
        }
    });

    $('.next-page-small .previous').click(function(e) {
        e.preventDefault();
        previousPage();
    });
});
"use strict";


"use strict";
jQuery(document).ready(function($) {
    /* Header Search Actions */
    $(".sh-nav-search").on('click', function(e) {
        $(".sh-header-search-side").css('width', 'auto').css('height', 'auto').css('opacity', '1');
        var num = $(".sh-header-search-side-input").val();
        $(".sh-header-search-side-input").focus().val('').val(num);
        //$(".sh-header-search-side-input").focus();
        return false;
    });
    $(".sh-header-search-side").on('click', function(e) {
        //            var search_class = $(e.target).attr('class');
        //            if (search_class != 'sh-header-search-side-input' && search_class != 'sh-header-search-side-close' && search_class != 'ti-search') {
        //                $(".sh-header-search-side").css('opacity', '0');
        //                setTimeout(function () {
        //                    $(".sh-header-search-side").css('width', '0px').css('height', '0px');
        //                }, 300);
        //            }
        closeSearch();
        return false;
    });

    $(".sh-header-search-side-input").on('click', function(e) {
        return false;
    });



    function closeSearch() {
        $(".sh-header-search-side").css('opacity', '0');
        setTimeout(function() {
            $(".sh-header-search-side").css('width', '0px').css('height', '0px');
            $(".sh-header-search-side-input").blur();
        }, 300);
    }

    $('.sh-header-search').on('click', function() {
        if ($(this).find('.svg-search').length) {
            $('.sh-header-search-form').submit();
        } else {
            return false;
        }
    });

    $(document).on('submit', '.sh-header-search-form', function() {
        if ($(this).find("input").val().trim().length == 0) {
            closeSearch();
            return false;
        }
        var keySearch = convertToSlug($(this).find("input").val() + "-" + searchText);
        window.location.href = ajaxUrlLanguage + keySearch;
        return false;
    });

    $(document).on('submit', '.sh-header-search-form-text', function() {
        if ($(this).find("input").val().trim().length == 0) {
            return false;
        }
        var keySearch = convertToSlug($(this).find("input").val() + "-" + searchText);
        window.location.href = ajaxUrlLanguage + keySearch;
        return false;
    });

    function convertToSlug(e) {
        return e.replace(/\s/g, '-');
        // return e.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }


    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $("#header-search").fadeOut("fast");
        }
    });

    /* Header Navigation */

    function gillion_navigation() {
        $("ul.sh-nav").superfish({
            delay: 100,
            hoverClass: 'sh-hover',
            //            animation: {
            //                opacity: "show",
            //                height: 'show'
            //            },
            animationOut: {
                opacity: "hide",
                height: 'hide'
            },
            easing: gillion.header_animation_dropdown,
            speed: 500,
            //            speedOut: 0,
            cssArrows: false,
            pathLevels: 2,
            onBeforeShow: function onBeforeShow() {
                if ($(this).hasClass('mega-menu-dynamic-elements')) {
                    var self_mega = $(this);
                    $(this).find('.sh-ratio-content[data-lazy-background]').each(function() {
                        $(this).css('background-image', 'url("' + $(this).attr('data-lazy-background') + '")');
                    });
                    $(this).find('.sh-ratio-content[data-lazy-background]').imagesLoaded({
                        background: true
                    }, function() {
                        self_mega.find('.header-dynamic-categories-loader').hide();
                    });
                } else if ($(this).hasClass('sh-read-later-list')) {
                    $(this).find('.sh-read-later-thumbnail[data-lazy-background]').each(function() {
                        $(this).css('background-image', 'url("' + $(this).attr('data-lazy-background') + '")');
                    });
                }
            }
        });

        //        $("ul.sh-nav li a").click(function () {
        //            alert(1);
        //            window.location = $(this).attr('href');
        //            return false;
        //        });
    }
    gillion_navigation();

});

jQuery(document).ready(function($) {
    /** variable initial **/
    var adminbar = $('#wpadminbar');
    var nav = $('.navbar-general');
    var BackToTop = $('.sh-back-to-top'); // equalHeights alternative


    function mobile_lang() {
        $(".popover-lang").popover({
            html: true,
            offset: 10,
            trigger: 'manual',
            content: function content() {
                var content = $(this).attr("data-popover-content");
                return $(content).children(".popover-body").html();
            },
            title: function title() {
                var title = $(this).attr("data-popover-content");
                return $(title).children(".popover-heading").html();
            },
            placement: 'auto',
            delay: {
                show: 50,
                hide: 400
            }
        }).on("mouseenter", function() {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function() {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function() {
            var _this = this;
            setTimeout(function() {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                }
            }, 300);
        });
    } // rtl


    function bootstrap() {
        var url; // dropdown menu on hover

        $('.dropdown-toggle').click(function(e) {
            if ($(document).width() > 768) {
                e.preventDefault();
                url = $(this).attr('href');
                if (url !== '#') {
                    window.location.href = url;
                }
            } else {
                e.preventDefault();
                url = $(this).attr('href');
                if (url !== '#') {
                    window.location.href = url;
                }
            }
        }); // bootstrap tooltips

        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
        }); // off-canvas

        $('.off-canvas-toggle').on('click', function(event) {
            event.preventDefault();
            $('body').toggleClass('off-canvas-active');
        });
        $(document).on('mouseup touchend', function(event) {
            var offCanvas = $('.off-canvas');
            if (!offCanvas.is(event.target) && offCanvas.has(event.target).length === 0) {
                $('body').removeClass('off-canvas-active');
            }
        });
        $(".sidebar-close-btn").trigger("offcanvas.close");
    }

    mobile_lang();
    bootstrap();
    var widthSticky = 767;
    var heightTopSticky = nav.height() + 15;

    $('.sidebar-sticky').stickySidebar({
        containerSelector: '.content-sticky',
        topSpacing: heightTopSticky,
        minWidth: widthSticky // ResizeSensor.js require

    });

    $(".right-index").stickySidebar({
        containerSelector: '.content-item',
        topSpacing: 60,
        minWidth: widthSticky, // ResizeSensor.js require
        //        bottomSpacing:120

        //        footerThreshold: 40,
    });



    var top_height = adminbar.height();
    $('.admin-bar .navbar.navbar-fixed-top').attr('style', 'margin-top:' + top_height + 'px'); /** Backack To Top  */
    if (BackToTop.length) {
        var scrollTrigger = 100,
            // px
            backToTop = function backToTop() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    BackToTop.addClass('active');
                } else {
                    BackToTop.removeClass('active');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        BackToTop.on('click', function(e) {
            e.preventDefault();
            $(this).blur();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    }
});