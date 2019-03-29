google.load('visualization', '1', {'packages':['corechart']});
function drawChart() {
    var objectArray = [],  counts = [], chart, object, data;
    $.ajax({
    url: "test.json",
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
    });
}
google.setOnLoadCallback(drawChart);