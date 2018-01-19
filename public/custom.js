function getPage(index) {
    var $page = $('div#start-content');
    $page.fadeOut(function () {
        $.getJSON('/page/' + index, function (response) {
            $page.html(response.description).fadeIn();
        });
    });
}
