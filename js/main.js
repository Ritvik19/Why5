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
                HTMLcontent +=
                    '<div class="contents w3-padding w3-margin">' +
                    '<h1>' + titles[i] + '</h1>' +
                    '<h5>' + writers[i] + '</h5>' +
                    '<p>' + poems[i] + '</p>' +
                    '</div>';
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
            HTMLcontent =
                '<div class="contents w3-padding w3-margin">' +
                '<h1>' + titles[q] + '</h1>' +
                '<h5>' + writers[q] + '</h5>' +
                '<p>' + poems[q] + '</p>' +
                '</div>';
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