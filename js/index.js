$(function () {

    (function initGrids() {
        var template = $('script#grid-item-template').text();

        $('.grid').each(function () {

            var $grid = $(this);
            var n = $grid.data('items');
            var path = $grid.data('path');
            var exclude = ($grid.data('exclude') || '').split(',');

            $grid.append('<div class="grid-sizer"></div>');
            for (var i = 0; i < n; i++) {
                if (exclude.indexOf(i.toString()) >= 0) {
                    continue;
                }
                var item = template;
                item = item.replace(/\{index\}/g, i < 10 ? '0' + i.toString() : i.toString());
                item = item.replace(/\{path\}/g, path);
                $grid.append(item);
            }

            $grid.masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                resize: false
            });
            // layout Masonry after each image loads
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
                $grid.find('.grid-item img').each(function () {
                    if (this.complete && this.naturalHeight > 0) {
                        $(this).closest('.grid-item').addClass('loaded');
                    }
                });
            });
            $(window).resize(function () {
                $grid.masonry('layout');
            });
        });
    }());

    (function FixedContacts() {
        function checkFixedContacts() {
            $('body').toggleClass('fixed-contacts', $(window).scrollTop() > 315);
        }

        $(window).scroll(function () {
            checkFixedContacts();
        });
        checkFixedContacts();
    }());

    (function BackNavigation() {
        window.addEventListener('hashchange', function () {
            if (location.hash !== '#gallery') {
                $('#blueimp-gallery').data('gallery').close();
            }
        });

        $('#blueimp-gallery')
            .on('open', function () {
                location.hash = "#gallery";
            })
            .on('close', function () {
                location.hash = "";
            });
    }());
});
