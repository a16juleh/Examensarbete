var data, svg, x, y, xAxis;
$(document).on ("click", "#Run", function () {
    localStorage.setItem('startTime', new Date().getTime());
    console.log("StartTid: " + localStorage.getItem('startTime'));

    //Load data in JSON format from JSON file into circle chart
    d3.json("mounth1-dec-2015.json").then(function(jsonData){ 
        render(jsonData);
        localStorage.setItem('stopTime', new Date().getTime());
        console.log("stopTime: " + localStorage.getItem('stopTime'));
        localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
        console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms");  
        data = jsonData;
    });
});

function render(data){
    // set the dimensions and margins of the graph
    var margin =  {"left": 40, "right": 30, "top": 30, "bottom": 30}, width = 400, height = 400,
    color = d3.scaleOrdinal(d3.schemeCategory10),
    cValue = function(d) {return d.StatusCode;},
    xValue = function(d) {return d.Date;},
    yValue = function(d) {return d.StatusCode;};

    // add the tooltip
    var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    data.forEach(function(d) {
        day = new Date(d.Date);
        day = day.getDate();
        d.Date = day;
    });

    svg = d3.select("#Diagram")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    x = d3.scaleLinear()
        .domain([1, 31])
        .range([ 0, width ]);
    xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    y = d3.scaleLinear()
        .domain([100, 500])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Date); } )
        .attr("cy", function (d) { return y(d.StatusCode); } )
        .attr("r", 5)
        .style("fill", function(d) { return color(cValue(d));}) 
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(d.Date + "<br/> (" + xValue(d) 
                + ", " + yValue(d) + ")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

function updateChart() {
    var xlimStart = document.getElementById("xlimStart").value;
    var xlimEnd = document.getElementById("xlimEnd").value;

    // Update X axis
    x.domain([xlimStart,xlimEnd])
    xAxis.transition().call(d3.axisBottom(x))

    // Update chart
    svg.selectAll("circle")                              
    .data(data)
    .transition()
    .attr("cx", function (d) { return x(d.Date); } )
    .attr("cy", function (d) { return y(d.StatusCode); } )

    /* localStorage.setItem('stopTime', new Date().getTime());
    //console.log("stopTime: " + localStorage.getItem('stopTime'));
    localStorage.setItem('renderingTime', (localStorage.getItem('stopTime') - localStorage.getItem('startTime')));
    console.log("Total rendering time: " + localStorage.getItem('renderingTime') + "ms"); */
        
}

$(document).on("click", "#buttonChange", function () {
    //localStorage.setItem('startTime', new Date().getTime());
    updateChart();
});