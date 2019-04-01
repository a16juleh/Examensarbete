$(document).on ("click", "#Run", function () {
    google.load('visualization', '1', {'packages':['corechart']});
    localStorage.setItem('startTime', new Date().getTime());
    //console.log("startTime: " + localStorage.getItem('startTime'));
    google.setOnLoadCallback(drawChart);
});

function drawChart() {
    var objectArray = [],  counts = [], chart, object, data;
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
            data.addRow([key, counts[key]]);
        }

        chart = new google.visualization.PieChart(document.getElementById('diagram'));
        chart.draw(data);
        localStorage.setItem('stopTime', new Date().getTime());
        //console.log("stopTime: " + localStorage.getItem('stopTime'));
        localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
        console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms");    
    });
}