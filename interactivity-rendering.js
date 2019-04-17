// ==UserScript==
// @name         Measure initial rendering time
// @namespace    http://tampermonkey.net/
// @version      0.1
// $require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    var chance = new Chance(1);
    var runs = 100, xlimStart, xlimEnd, temp;
    var timeArr = [], valuesArr = [], Arr = [];

    $('#Run').trigger("click");

    setTimeout(function() {
        (function loop (i) {
            xlimStart = chance.integer({ min: 1, max: 15 });
            xlimEnd = chance.integer({ min: 16, max: 31 });
            $('#xlimStart').val(xlimStart);
            $('#xlimEnd').val(xlimEnd);
            setTimeout(function () {
                $('#buttonChange').trigger("click");
                if (--i) {
                    loop(i);
                }
            }, 10000);
            timeArr.push(localStorage.getItem('renderingTime'));
            Arr = [xlimStart,xlimEnd];
            valuesArr[timeArr.length -1] = Arr;
            console.log("xlimStart " + xlimStart);
            console.log("xlimEnd " + xlimEnd);
            if(timeArr.length == runs){
                download(timeArr, valuesArr);
            }
        })(runs);
    }, 15000);

})();

function download(timeArr, valuesArr) {
        $("html").append('<a download="data.txt" id="downloadLink" style="display: none;">Download</a>');
        var link, data, text = "", textFile = null,
            makeTextFile = function(){
                for(var i = 0; i < timeArr.length; i++){
                    text += timeArr[i] + "\n";
                }

                for(var i = 0; i < valuesArr.length; i++){
                    text += valuesArr[i] + "\n";
                }

                data = new Blob([text], {type: 'text/plain'});
                textFile = window.URL.createObjectURL(data);
                return textFile;
            };

        link = document.getElementById('downloadLink');
        link.href = makeTextFile('data');
        link.click();
}