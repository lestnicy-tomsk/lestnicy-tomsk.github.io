$(function () {

    (function initGrids() {
        var itemTemplate = $('script#grid-item-template').text();
        var $gridContainer = $('.grid-container');
        var videos = [];
        var images = [];
        $gridContainer.append('<div class="grid-sizer"></div>');

        $('.grid').each(function () {

            var $grid = $(this);
            var n = $grid.data('items');
            var path = $grid.data('path');
            var title = $grid.data('title');
            var exclude = ($grid.data('exclude') || '').split(',');
            var video = ($grid.data('video') || '').split(',');

            $grid.remove();
            for (var i = 0; i < n; i++) {
                if (exclude.indexOf(i.toString()) >= 0) {
                    continue;
                }
                var item = itemTemplate;
                item = item.replace(/\{index\}/g, i < 10 ? '0' + i.toString() : i.toString());
                item = item.replace(/\{path\}/g, path);
                item = item.replace(/\{title\}/g, title);
                if (video.indexOf(i.toString()) >= 0) {
                    item = item.replace(/href="(.*)\.jpg"/, 'href="$1.mp4" data-preload="$1.jpg"');
                    item = item.replace(/\{mimeType\}/g, 'video/mp4');
                    item = item.replace(/\{class\}/g, 'video');
                    videos.push(item);
                } else {
                    item = item.replace(/\{mimeType\}/g, 'image/jpeg');
                    item = item.replace(/\{class\}/g, 'image');
                    images.push(item);
                }
            }
        });

        videos.forEach(item => $gridContainer.append(item));
        images.forEach(item => $gridContainer.append(item));

        $gridContainer.masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: false
        });
        // layout Masonry after each image loads
        $gridContainer.imagesLoaded().progress(function () {
            $gridContainer.masonry('layout');
            $gridContainer.find('.grid-item img').each(function () {
                if (this.complete && this.naturalHeight > 0) {
                    $(this).closest('.grid-item').addClass('loaded');
                }
            });
        });
        $(window).resize(function () {
            $gridContainer.masonry('layout');
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
            if (!location.hash) {
                $('.blueimp-gallery').each(function () {
                    const gallery = $(this).data('gallery');
                    if (gallery) {
                        gallery.close();
                    }
                });
            }
        });

        $('.blueimp-gallery')
            .on('open', function () {
                location.hash = this.id;
            })
            .on('close', function () {
                location.hash = "";
            });
    }());

    (function initGallery() {
        function isTouchDevice() {
            return ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0);
        }

        if (!isTouchDevice()) {
            $('.blueimp-gallery').addClass('blueimp-gallery-controls');
        }
    }());
});
