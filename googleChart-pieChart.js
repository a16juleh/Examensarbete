var chart;
$(document).on ("click", "#Run", function () {
    localStorage.setItem('startTime', new Date().getTime());

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
});

function drawChart() {
    var objectArray = [],  counts = [], object, data;
    $.ajax({
    url: "mounth1-dec-2015.json",
    dataType: "JSON"
    }).done(function(objects) {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'StatusCode');
        data.addColumn('number', 'Amount');
        
        for(var i = 0; i < objects.length; i++){
            object = [objects[i].StatusCode];
            objectArray.push(object);
        }

        objectArray.forEach(function(x) { 
            counts[x] = (counts[x] || 0)+1; 
        });

        for(var key in counts){
            console.log(counts[key]);
            data.addRow([key, counts[key]]);
        }

        var options = {
            pieHole: 0.4,
        };

        if(chart != undefined || chart != null ){
            chart.clearChart();
        }

        chart = new google.visualization.PieChart(document.getElementById('Diagram'));
        chart.draw(data, options);
        localStorage.setItem('stopTime', new Date().getTime());
        //console.log("stopTime: " + localStorage.getItem('stopTime'));
        localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
        console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms");   
    });
}
 
