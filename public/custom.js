const notFound = `

    <div class="py-4 text-center">
        <div class="py-4">
            <h1 style="color: #c00;">Strona nie znaleziona.</h1>
            <br>
            <h5 style="color: #090;">Sprawdź, czy indeks strony jest poprawny.</h5>
        </div>
        <div class="py-4">
            <button class="btn btn-danger font-awesome" onclick="getPage('index')"><i class="fa fa-times-circle" aria-hidden="true"></i> Zamknij</button>
        </div>
    </div>

`;

const loadIcon = `

    <div id="load-icon">
        <img src="loader.gif" id="page-loader" alt="MEAN Stack Loader">
    </div>

`;

function getPage(index) {
    
    var loadResult = false;
    var $page = $('div#start-content');
    
    $page.fadeOut(function () {
        $page.html(loadIcon).show();
        $.getJSON('/page/' + index).then(function(response) {
            $page.html(response.description).fadeIn();
            loadResult = true;
        });
    });
    
    setTimeout(function() {
        if (!loadResult) {
            $page.hide().html(notFound).fadeIn();
        }
    }, 1000);
}