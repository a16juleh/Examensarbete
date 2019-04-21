var data;
$(document).on ("click", "#Run", function () {
    localStorage.setItem('startTime', new Date().getTime());
    //Load data in JSON format from JSON file into circle chart
    d3.json("mounth1-dec-2015.json").then(function(jsonData){ 
        render(jsonData);
        localStorage.setItem('stopTime', new Date().getTime());
        localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
        console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms");
        data = jsonData;
    });
});

function render(data){
        //Declaration of variables
        var svgWidth = 300, svgHeight = 500, radius = Math.min(svgWidth, svgHeight) / 2;
        var svg = d3.select('#Diagram').attr("Width", svgWidth).attr("Height", svgHeight);
        var group = svg.append("g").attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // Group data from the JSON
        var dataCount = d3.nest()
            .key(function(d) {   return d.StatusCode;})
            .rollup(function(v) { percent = v.length/data.length * 100;  return Math.round( percent * 10 ) / 10; })
            .entries(data);

        // Generate pie
        var pie = d3.pie()
            .value(function (d) {
                console.log(d.value); return d.value;
            });

        // Generate arcs
        var arc = d3.arc()
            .innerRadius(100)
            .outerRadius(radius);

        // Generate groups
        var arcs = group.selectAll("arc")
            .data(pie(dataCount))
            .enter()
            .append("g")
            .attr("class", "arc")

        // Color the arcs
        arcs.append("path")
            .attr("fill", function(d) {
                return color(d.data.key);
            })
            .attr("d", arc);

        // Generate text and the placing
        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 60);

        // Add text to the chart
        arcs.append("text")
            .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
       })  
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.value + "%"; })

        // Create legend
        var legend = svg.selectAll(".legend")
            .data(pie(dataCount))
            .enter().append("g")
            .attr("transform", function(d, i){
                return "translate(" + (svgWidth - 110) + "," + (i * 15 + 20) + ")";
        })
        .attr("class", "legend");   

        // Fill legend with same color as arcs
        legend.append("rect") 
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", function(d, i) {
                return color(d.data.key);
        });

        // Add the text
        legend.append("text") 
            .text(function(d){
                return d.data.key;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
};