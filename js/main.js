BASE_URL = "https://why5.surge.sh/"

function listFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchbox');
    filter = input.value.toUpperCase();
    ul = document.getElementById("postlist");
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
            hash = dataObj["Hash"];
            HTMLcontent = "";
            while (typeof titles[i] !== "undefined") {
                HTMLcontent +=
                    '<li class="collection-item"><a href="/?q=' + hash[i] + '">' + titles[i] + '</a></li>';
                i++;
            }
            document.getElementById("postlist").innerHTML += HTMLcontent;
        }
    };
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
}

function generateContent(t, a, i) {
    return '<div class="contents w3-padding w3-margin w3-display-container">' +
        '<h1>' + t + '</h1> <hr>' +
        '<p class="w3-padding">' + a + '</p>' +
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
            articles = dataObj["Article"];
            hash = dataObj['Hash'];
            HTMLcontent = "";
            while (typeof titles[i] !== "undefined") {
                HTMLcontent += generateContent(titles[i], articles[i], hash[i])
                i++;
            }
            document.getElementsByClassName("contents-container")[0].innerHTML += HTMLcontent;
        }
    };
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
}

function loadPost(q) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObj = JSON.parse(this.responseText);
            titles = dataObj["Title"];
            articles = dataObj["Article"];
            hash = dataObj['Hash'];
            i = 0;
            while (typeof titles[i] !== "undefined") {
                if (hash[i] == q) {
                    break
                }
                i++;
            }
            HTMLcontent = generateContent(titles[i], articles[i], hash[i])
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
    loadPost(q)
}