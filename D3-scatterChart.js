$(document).on ("click", "#Run", function () {
    d3.json("mounth1-dec-2015.json").then(function(data){ 
        // set the dimensions and margins of the graph
        var margin =  {"left": 40, "right": 30, "top": 30, "bottom": 30}, width = 400, height = 400; 
        var cValue = function(d) { return d.StatusCode;},
        color = d3.scaleOrdinal(d3.schemeCategory10);
        var xValue = function(d) { return d.Date;};
        var yValue = function(d) { return d.StatusCode;};

        // add the tooltip
        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

        data.forEach(function(d) {
            day = new Date(d.Date);
            day = day.getDate();
            d.Date = day;
        });

        var svg = d3.select("#Diagram")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        
        // Add X axis
        var x = d3.scaleLinear()
            .domain([1, 31])
            .range([ 0, width ]);
        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        // Add Y axis
        var y = d3.scaleLinear()
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

        function updatePlot() {
            xlimStart = document.getElementById("xlimStart").value;
            xlimEnd = document.getElementById("xlimEnd").value;
        
            // Update X axis
            x.domain([xlimStart,xlimEnd])
            xAxis.transition().duration(1000).call(d3.axisBottom(x))
        
            // Update chart
            svg.selectAll("circle")                              
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) { return x(d.Date); } )
            .attr("cy", function (d) { return y(d.StatusCode); } )
        }
        // Add event listener to button
        d3.select("#buttonChange").on("click", updatePlot )
        }); 
});