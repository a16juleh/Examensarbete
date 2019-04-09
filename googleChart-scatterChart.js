var MAX = 31;
var options = {
    title: 'Day vs Bytes Transferred',
    hAxis: {title: 'Day', viewWindow: {min:0, max: MAX}},
    vAxis: {title: 'BytesTransferred', viewWindow: {min:100, max: 10000}},
    legend: 'none',
    pointSize: 5,
    dataOpacity: 0.4, 
};

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data, day;
    $.ajax({
    url: "test.json",
    dataType: "JSON"
    }).done(function(objects) {
        data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('number', 'BytesTransferred');

        for(var i = 0; i < objects.length; i++){
            day = (new Date((objects[i].Date)));
            data.addRow([day.getDate(), parseInt(objects[i].BytesTransferred)]);
        }

        var chart = new google.visualization.ScatterChart(document.getElementById('diagram'));        
        chart.draw(data, options);
    });  
}