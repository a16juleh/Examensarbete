var MAX = 31;
var zoomed = false;
var options = {
    title: 'Day vs Bytes Transferred',
    hAxis: {title: 'Day', viewWindow: {min:0, max: MAX}},
    vAxis: {title: 'BytesTransferred', viewWindow: {min:100, max: 10000}},
    legend: 'none',
    pointSize: 5,
    dataOpacity: 0.4,
    trendlines: {
        0: {
          type: 'exponential',
          visibleInLegend: true,
        }
      }  
};

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    document.getElementById('Zoom').disabled = true;
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
        google.visualization.events.addListener(chart, 'ready',
        function() {
            document.getElementById('Zoom').disabled = false;
        });
        
        chart.draw(data, options);

        document.getElementById('Zoom').onclick = function() {
            if (zoomed == false) {
                options.hAxis.viewWindow.min = 30;
                options.hAxis.viewWindow.max = 31;
                zoomed == true;
            } else {
                options.hAxis.viewWindow.min = 0;
                options.hAxis.viewWindow.max = MAX;
            }
            zoomed = !zoomed;
            drawChart();
        };
    });  
}