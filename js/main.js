BASE_URL = "https://word-of-rhymes.surge.sh/"

function listFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchbox');
    filter = input.value.toUpperCase();
    ul = document.getElementById("poemlist");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function loadIndex() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObj = JSON.parse(this.responseText);
            var i = 0;
            titles = dataObj["Title"];
            writers = dataObj["Writer"];
            HTMLcontent = "";
            while (typeof titles[i] !== "undefined") {
                HTMLcontent +=
                    '<li class="collection-item"><a href="/?q=' + i + '">' + titles[i] + '-' + writers[i] + '</a></li>';
                i++;
            }
            document.getElementById("poemlist").innerHTML += HTMLcontent;
        }
    };
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
}

function generateContent(t, w, p, i) {
    return '<div class="contents w3-padding w3-margin w3-display-container">' +
        '<h1>' + t + '</h1> <hr>' +
        '<h5>' + w + '</h5>' +
        '<p>' + p + '</p>' +
        '<div class="share-links w3-margin w3-display-bottomright">' +
        '<a target="_blank" data-action="share/whatsapp/share" href="whatsapp://send?text=' + BASE_URL + '?q=' + i + '">' +
        '<ion-icon name="logo-whatsapp"></ion-icon>' +
        '</a>' +
        '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' + BASE_URL + '?q=' + i + '">' +
        '<ion-icon name="logo-facebook"></ion-icon>' +
        '</a>' +
        '<a target="_blank" href="https://twitter.com/share?url=' + BASE_URL + '?q=' + i + '">' +
        '<ion-icon name="logo-twitter"></ion-icon>' +
        '</a>' +
        '<a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=' + BASE_URL + '?q=' + i + '">' +
        '<ion-icon name="logo-linkedin"></ion-icon>' +
        '</a>' +
        '<a target="_blank" href="http://www.reddit.com/submit?url=' + BASE_URL + '?q=' + i + '">' +
        '<ion-icon name="logo-reddit"></ion-icon>' +
        '</a>' +
        '</div>' +
        '</div>';
}

function loadBlogs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObj = JSON.parse(this.responseText);
            var i = 0;
            titles = dataObj["Title"];
            writers = dataObj["Writer"];
            poems = dataObj["Poem"];
            HTMLcontent = "";
            while (typeof titles[i] !== "undefined") {
                HTMLcontent += generateContent(titles[i], writers[i], poems[i], i)
                i++;
            }
            document.getElementsByClassName("contents-container")[0].innerHTML += HTMLcontent;
        }
    };
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
}

function loadPoem(q) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObj = JSON.parse(this.responseText);
            titles = dataObj["Title"];
            writers = dataObj["Writer"];
            poems = dataObj["Poem"];
            HTMLcontent = generateContent(titles[q], writers[q], poems[q], q)
            document.getElementsByClassName("contents-container")[0].innerHTML = HTMLcontent;
        }
    };
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
}

loadIndex()
var params = new URLSearchParams(location.search);
var q = params.get('q')
if (q == null) {
    loadBlogs()
} else {
    loadPoem(q)
}