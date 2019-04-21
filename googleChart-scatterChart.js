var data, day, MAX = 31, zoomed = false;
var options = {
    title: 'Day vs StatusCode',
    hAxis: {title: 'Day', viewWindow: {min:0, max: MAX}},
    vAxis: {title: 'StatusCode', viewWindow: {min:100, max: 500}},
    legend: 'none',
    pointSize: 5,
    dataOpacity: 0.4,
};

$(document).on ("click", "#Run", function () {
    localStorage.setItem('startTime', new Date().getTime());
    google.load('visualization', '1', {'packages':['corechart']});
    google.setOnLoadCallback(getJSON);
    document.getElementById('buttonChange').disabled = true;
 });

function getJSON(){
    $.ajax({
        url: "mounth1-dec-2015.json",
        dataType: "JSON"
    }).done(function(objects) {
        data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('number', 'StatusCode');
        
        for(var i = 0; i < objects.length; i++){
            day = (new Date((objects[i].Date)));
            data.addRow([day.getDate(), parseInt(objects[i].StatusCode)]);
        }
        drawChart();
    });
}

function drawChart() {
    var chart = new google.visualization.ScatterChart(document.getElementById('Diagram'));
    google.visualization.events.addListener(chart, 'ready',
    function() {
        document.getElementById('buttonChange').disabled = false;
    });
    chart.draw(data, options);  
    localStorage.setItem('stopTime', new Date().getTime());
    localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
    console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms"); 
}

$(document).on ("click", "#buttonChange", function () {
    //localStorage.setItem('startTime', new Date().getTime());
    options.hAxis.viewWindow.min = document.getElementById('xlimStart').value;
    options.hAxis.viewWindow.max = document.getElementById('xlimEnd').value;
        
    drawChart();   
    /* localStorage.setItem('stopTime', new Date().getTime());
    localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
    console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms");  */
});