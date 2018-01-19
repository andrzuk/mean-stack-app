const notFound = `

    <div class="py-4 text-center">
        <div class="py-4">
            <h1>Strona nie znaleziona.</h1>
            <br>
            <h4>Sprawdź, czy indeks strony jest poprawny.</h4>
        </div>
        <div class="py-4">
            <button class="btn btn-danger font-awesome" onclick="getPage('index')"><i class="fa fa-times-circle" aria-hidden="true"></i> Zamknij</button>
        </div>
    </div>

`;

function getSubPage(index) {
    
    var $page = $('div#start-content');
    
    $page.fadeOut(function () {
        $.getJSON('/page/' + index, function (response, msg) {
            if (response.msg == 'success') {
                $page.html(response.description);
            }
            else {
                $page.html(notFound);
            }
            $page.fadeIn();
        });
    });
    
    setTimeout(function() {
        if (!$page.is(':visible')) {
            $page.html(notFound).fadeIn();
        }
    }, 2000);
}

function getPage(index) {
    
    var $page = $('div#start-content');
    
    $page.fadeOut(function () {
        $.getJSON('/page/' + index).then(function(response) {
            console.log(response);
            $page.html(response.description).fadeIn();
        });
    });
    
    setTimeout(function() {
        if (!$page.is(':visible')) {
            $page.html(notFound).fadeIn();
        }
    }, 2000);
}
