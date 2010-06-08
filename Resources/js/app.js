$(function() {
    window.app = {
        isTitanium: false,
        isWeb: false,
        isMobile: false,
        isFirstCar: true,
        view: null,
        height: null,
        width: null,
        currentSlide: 0,
        images: {
            joeAndTheDude: "img/joe-and-the-dude.jpg",
            hp: "img/hp.jpg",
            cars: ["img/image-micro-machine-black-car.png", "img/image-micro-machine-flame-car.png"]
        },
        data: null,
        setView: function() {
            app.view = app.isTitanium ? Titanium.UI.getCurrentWindow() : window;
        },
        specialSlide: function(id) {
            switch (id) {
            
            	case "slide-one":

				if(!('.whoops').length) return;
				
                var $images = $('#' + id).find('img');
                var maxImages = $images.length;
                var i = 0;

                var imageInterval = setInterval(function() {
                    $images.eq(i).fadeIn('slow');
                    i++;
                    if (i > maxImages) clearInterval(imageInterval);
                },
                2500);
                break;	
            	

            case "slide-two":
                setTimeout(function() {
                    $('.slide img:first').fadeOut('slow',
                    function() {
                        this.src = app.images.joeAndTheDude;
                        $(this).fadeIn('slow');
                    })
                },
                3000)
                break;

            case "slide-seven":
                setTimeout(function() {
                    $('#' + id).find('h3').show();
                },
                3000)
                break;

            case "slide-thirteen":

                var $images = $('#' + id).find('img');
                var maxImages = $images.length;

                var imageInterval = setInterval(function() {
                    $images.eq(maxImages--).fadeIn('slow');
                    if (maxImages < 0) clearInterval(imageInterval);
                },
                2500);
                break;

            case "slide-fifteen":

                setTimeout(function() {
                    $('#' + id).find('h2').slideDown();
                },
                3000)

                break;

            case "slide-seventeen":

                setTimeout(function() {
                    $('#' + id).find('.container-frame').slideDown();
                },
                2000)

                break;

            case "slide-eighteen":

                setTimeout(function() {
                    $('#' + id).find('.container-frame').slideDown();
                },
                2000)

                break;

            case "slide-nineteen":

                setTimeout(function() {
                    $('.slide img:first').fadeOut(250,
                    function() {
                        this.src = app.images.hp;
                        $(this).fadeIn(250);
                    })
                },
                3000)
                break;

            case "slide-twentyfive":
                app.yql();
                break;

            case "slide-twentysix":
                setTimeout(function() {
                    $('#' + id).find('h1').fadeIn(250);
                },
                3000)

                setTimeout(function() {
                    $('#' + id).find('h1').after('<h2>http://subprint.com/u/2m</h2>');
                },
                10000);

                break;

            default:
                break;
            }
        },
        egg: function(callback, code) {
            if (code == undefined) code = "38,38,40,40,37,39,37,39";
            var kkeys = [];
            $(window).keydown(function(e) {
                kkeys.push(e.keyCode);
                if (kkeys.toString().indexOf(code) >= 0) {
                    callback(e);
                    kkeys = [];
                }
            },
            true);

        },
        yql: function() {
            $('#go-yql').hide();
            $('#loading').show();
            document.getElementById('results').innerHTML = '';
            var yql = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fcrockfordfacts.com%2F%3Ffoo%3D' + Math.floor(Math.random() * 111) + '%22&format=json'

            $.getJSON(yql,
            function(data) {
                facts(data);
            });

            function facts(o) {
                var output = o.query.results.body.div.div.h2;
                document.getElementById('results').innerHTML = output;
                $('#loading').hide();
                $('#go-yql').show();

            }
        },
        rotateCars: function() {

            var cars = setInterval(function() {
                $('.car').fadeOut('slow',
                function() {
                    if (app.isFirstCar)
                    {
                        this.src = app.images.cars[1];
                        app.isFirstCar = false;
                    }
                    else
                    {
                        this.src = app.images.cars[0];
                        app.isFirstCar = true;
                    }
                    $(this).fadeIn('slow');
                })
            },
            60000 * 5);
            // so you can immediately tell it's for 5 mins.
        },
        exit: function() {

            $('*').animate({
                opacity: 0
            },
            1000,
            function() {
                if (app.isTitanium) Titanium.App.exit();
                if (app.isWeb) window.close();
            });
        },
        determineAgent: function() {
            if (window.Titanium) {
                app.isTitanium = true;
                return;
            }
            // TODO:  REMOVE IPHONE -- USED FOR DEBUGGING IN SAFARI
            if (navigator.userAgent.match(/iPad|iphone/i)) {
                app.isIpad = true;
                return;
            }
            else if (navigator.userAgent.match(/android|iphone/i)) {
                app.isMobile = true;
                return;
            }
            else {
                app.isWeb = true;
            }
        },
        prevSlide: function() {
            // Get current slide val
            if (!app.currentSlide) return;
            // Decrement it.
            app.currentSlide--;
            // Show new current slide
            $('.slide').fadeOut(250,
            function() {
                $(this).remove();
                // mad expensive, but it's a prototype!
                var currentSlide = app.data.slides[app.currentSlide];
                var data = {
                    slide: currentSlide
                };
                $('.container-slides').prepend('<div id="' + currentSlide.id + '" class="' + currentSlide.classes + '">' + currentSlide.html + '</div>');

                app.specialSlide(currentSlide.id)

            })
        },
        nextSlide: function() {
            if (app.currentSlide === (app.data.slides.length - 1)) return;
            // Increment it.
            app.currentSlide++;
            // Show new current slide
            $('.slide').fadeOut(250,
            function() {
                $(this).remove();
                // mad expensive, but it's a prototype!
                var currentSlide = app.data.slides[app.currentSlide];
                var data = {
                    slide: currentSlide
                };
                $('.container-slides').prepend('<div id="' + currentSlide.id + '" class="' + currentSlide.classes + '">' + currentSlide.html + '</div>');

                app.specialSlide(currentSlide.id);
            });
        },
        gotoSlide: function(slideNum) {
            app.currentSlide = slideNum;
            // Show new current slide
            $('.slide').fadeOut(250,
            function() {
                $(this).remove();
                // mad expensive, but it's a prototype!
                var currentSlide = app.data.slides[app.currentSlide];
                var data = {
                    slide: currentSlide
                };
                $('.container-slides').prepend('<div id="' + currentSlide.id + '" class="' + currentSlide.classes + '">' + currentSlide.html + '</div>');

                app.specialSlide(currentSlide.id);
            });
        },
        init: function() {
            app.determineAgent();
            app.setView();
            $(document).trigger('resizeView');
        },
        initializeSlides: function(options) {
            var currentSlide = app.data.slides[0];

            var data = {
                slide: currentSlide
            }

            function fini() {
                $('#header > h1').animate({
                    color: '#fafafa',
                    marginTop: 0,
                    fontSize: 6 + 'em'
                },
                1250,
                function() {
                    $('.container-slides').animate({
                        backgroundColor: '#ffffff',
                        opacity: 1
                    },
                    1250,
                    function() {
			            app.rotateCars();
                    });
                });
            }

            $('.container-slides').animate({/* ha, nothing here -> it's a prototype!*/},
            10,
            function() {


                var top = 0;
                var middle = 127;
                var bottom = 127;
                var middleDirection = false;
                var cycled = false;

                var sizes = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3];
                var size = 0;

                var i = 0;

                function reverse()
                {
                    middleDirection = middleDirection ? true: false;
                }
                var colorCycle = setInterval(function()
                {
                    (function()
                    {

                        var verl = function() {
                            return Math.floor(Math.random() * 15);
                        };

                        $('#header h1').css({
                            color: "rgb(" + top + "," + middle + "," + bottom + ")",
                            //fontSize: (verl() < 3) ? (verl() +1) +'em' : (verl()) +'em'
                            //fontSize: (sizes[i] === sizes.length) ? i = -1 : sizes[++i] +'em'
                            fontSize: (size += .06) + 'em',
                            //backgroundColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
                        });

                        if (!top)
                        {
                            cycled = true;
                        }
                        if (cycled)
                        {
                            // go back
                            top++;
                            bottom--;
                        }
                        else
                        {
                            top--;
                            bottom++;
                        }
                        if (!middle || (middle === 255)) reverse();

                        middleDirection ? middle++:middle--;

                        if (!bottom && cycled)
                        {
                            fini();

                            clearInterval(colorCycle);
                        }
                    })()

                },
                1)

                $('.container-slides').prepend('<div id="' + currentSlide.id + '" class="' + currentSlide.classes + '">' + currentSlide.html + '</div>');
                $('.car').fadeIn();
                app.specialSlide("slide-one");

            })
        },
        openFile: function(filenames) {
            var fileSelected = filenames[0];
            // Eval here to convert to JSON object.
            app.data = eval("(" + read_file(fileSelected) + ")");
            app.loadDataStoreCb();
        },
        loadDataStoreCb: function() {
            $('#nav').fadeOut('fast',
            function() {
                app.initializeSlides();
            });
        }
    };

    $('#goto').find('ul').find('li').live('click',
    function() {
        var index = $('#goto').find('ul').find('li').index(this);
        app.gotoSlide(index);
    });

    // For YQL Demo
    $('#go-yql').live('click',
    function() {
        app.yql();
        $(this).blur();
        return false;
    });

    $('#load-presentation').bind('click',
    function() {

        if (app.isTitanium) {
            var options = {
                multiple: false,
                title: "Select file to open...",
                types: ['json', 'js'],
                typesDescription: "JSON File",
                path: Titanium.Filesystem.getUserDirectory()
            }

            Titanium.UI.openFileChooserDialog(app.openFile, options);
        }
        else {
            /* web version */
            var url = '	model/data.json?' + new Date();
            $.getJSON(url,
            function(json) {
                app.data = json;
                app.loadDataStoreCb();
            });
        }

    });

    $(document).bind({
        goFullScreen: function() {
            if (app.isTitanium) app.view.setFullscreen(!app.view.isFullscreen());
        },
        resizeView: function() {
            app.height = (window.outerHeight - (window.outerHeight - window.innerHeight) + window.pageYOffset) + "px";
            app.width = window.outerWidth - (window.outerWidth - window.innerWidth) + window.pageXOffset + "px";
        },
        keydown: function(e) {
            switch (e.keyCode || e.charCode) {
            case 37:
                // left arrow
                app.prevSlide();
                break;
            case 39:
                // right arrow
                app.nextSlide();
                break;
            case 50:
                // 2
                showNotes();
                break;
            case 51:
                // 3
                app.transitions.switch3D();
                break;
            case 32:
                // toggle full screen
                $(document).trigger('goFullScreen');
                $(document).trigger('resizeView');
                break;
            case 27:
                app.exit();
                break;
            case 113:
                // q for quit
                app.exit();
                break;
            }
        }
    });

    $(window).bind({
        resize:
        function() {
            $(document).trigger('resizeView');
        },
        scroll: function() {
            $(document).trigger('resizeView');
        }
    });

    app.egg(function() {

        if ($('#goto').length) {
            $('#goto').show();
            return;
        }

        var max = app.data.slides.length;

        var list = "<ul>";
        for (i = 0; i < max; i++) {
            list += "<li>Slide: <span class='red'> " + (i + 1) + "</span></li>";
        }
        list += "</ul>"

        $(document.body).prepend("<div id='goto' class='egg'>" + list + "</div>").find('#goto').fadeIn(250);

    },
    "71,79");

    app.egg(function() {
        $('.egg').fadeOut(250);
    },
    "66,89,69");


    // Resig's color plugin
    // We override the animation for all of these color styles
    $.each(['backgroundColor', 'color'],
    function(i, attr) {
        $.fx.step[attr] = function(fx) {
            if (fx.state == 0) {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
            }

            fx.elem.style[attr] = "rgb(" + [
            Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
            Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
            Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
            ].join(",") + ")";
        }
    });

    // Color Conversion functions from highlightFade
    // By Blair Mitchelmore
    // http://jquery.offput.ca/highlightFade/
    // Parse strings looking for color tuples [255,255,255]
    function getRGB(color) {
        var result;

        // Check if we're already dealing with an array of colors
        if (color && color.constructor == Array && color.length == 3)
        return color;

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
        return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

        // Look for rgb(num%,num%,num%)
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
        return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];

        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
        return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];

        // Look for #fff
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
        return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];

        // Otherwise, we're most likely dealing with a named color
        return colors[jQuery.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;

        do {
            color = jQuery.curCSS(elem, attr);

            // Keep going until we find an element that has color, or we hit the body
            if (color != '' && color != 'transparent' || jQuery.nodeName(elem, "body"))
            break;

            attr = "backgroundColor";
        }
        while (elem = elem.parentNode);

        return getRGB(color);
    }

    ;


    // Credit @rem
    $.fn.pause = function(n) {
        return this.queue(function() {
            var el = this;
            setTimeout(function() {
                return $(el).dequeue();
            },
            n);
        });
    };


    // Chromeless dragging in desktop app
    (function() {
        var dragging = false;
        document.onmousemove = function() {
            if (!dragging || !app.isTitanium)
            return;

            Titanium.UI.currentWindow.setX(Titanium.UI.currentWindow.getX() + event.clientX - xstart);
            Titanium.UI.currentWindow.setY(Titanium.UI.currentWindow.getY() + event.clientY - ystart);

        }

        document.onmousedown = function() {
            if (app.isTitanium) {
                dragging = true;
                xstart = event.clientX;
                ystart = event.clientY;
            }
        }

        document.onmouseup = function() {
            dragging = false;
        }
    })();

    app.init();

});
