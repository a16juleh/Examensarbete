// ==UserScript==
// @name         interactivity rendering time
// @namespace    http://tampermonkey.net/
// @version      1
// @require      https://chancejs.com/chance.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        http://localhost/exjobb/googleChart-diagram.html
// @grant        none
// ==/UserScript==

var chance = new Chance(1);
var runs = 100, changes = 20, xlimStart, xlimEnd, temp;
var timeArr = [], valuesArr = [], Arr = [];
var times = localStorage.getItem('times');

function change_diagram() {
    xlimStart = chance.integer({ min: 1, max: 15 });
    xlimEnd = chance.integer({ min: 16, max: 31 });
    $('#xlimStart').val(xlimStart);
    $('#xlimEnd').val(xlimEnd);
    $('#buttonChange').trigger("click");

    setTimeout(function() {
      	timeArr.push(localStorage.getItem('renderingTime'));
        
        if(times == "" || times == null){
            times = [];
        }else {
          	times = eval(times);	
        }
      
      	if(times.length == runs){
            download(); 
        }else if(timeArr.length == changes){
          	times.push(timeArr);
          	localStorage.setItem("times", JSON.stringify(times));
            location.reload();
        }else {
            change_diagram();
        }
    }, 1000);
}

function download() {
        $("html").append('<a download="data.txt" id="downloadLink" style="display: none;">Download</a>');
        var link, data, text = "", textFile = null, 
            times = JSON.parse(localStorage.getItem("times")),
            makeTextFile = function(){
                for(var i = 0; i < times.length; i++){
                    text += times[i] + "\n";
                }

                data = new Blob([text], {type: 'text/plain'});
                textFile = window.URL.createObjectURL(data);
                return textFile;
            };

        link = document.getElementById('downloadLink');
        link.href = makeTextFile('data');
  			localStorage.clear();
        link.click();
}

(function() {
    $('#Run').trigger("click");

    setTimeout(function() {change_diagram();}, 2000);

})();