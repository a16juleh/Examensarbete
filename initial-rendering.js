// ==UserScript==
// @name         Measure initial rendering time
// @namespace    http://tampermonkey.net/
// @version      0.1
// $require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    var timeArr = localStorage.getItem('timeArr');
    var counter = localStorage.getItem('counter');

    if(counter == null || counter == "" || counter=="NaN"){
        counter = 0;
        localStorage.setItem('counter' , counter);
    }

    if(counter < 10){
        $('#Run').trigger("click");

        if(timeArr == "" || timeArr == null){
            timeArr = [];
        }else {
            timeArr = JSON.parse(timeArr);
        }

        timeArr.push(localStorage.getItem('renderingTime'));
        localStorage.setItem('timeArr' , JSON.stringify(timeArr));
        localStorage.setItem('counter' , ++counter);
        location.reload();

    }else{
        $("html").append('<a download="data.txt" id="downloadLink" style="display: none;">Download</a>');
        var link, data, text = "", textFile = null,
            makeTextFile = function(){
                timeArr = JSON.parse(localStorage.getItem("timeArr"));

                for(var i = 0; i < timeArr.length; i++){
                    text += timeArr[i] + "\n";
                }

                data = new Blob([text], {type: 'text/plain'});
                textFile = window.URL.createObjectURL(data);
                return textFile;
            };

        link = document.getElementById('downloadLink');
        link.href = makeTextFile('data');
        localStorage.clear();
        link.click();
    };
})();