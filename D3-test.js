//Data in JSON format
var data = [{"status": 200, "IP-address" : "10.128.2.1", "URL" : "http://www.example.com/login/"},
            {"status": 200, "IP-address" : "10.131.2.1", "URL" : "http://www.example.com/login/"},
            {"status": 200, "IP-address" : "10.131.2.1", "URL" : "http://www.example.com/home/"},
            {"status": 404, "IP-address" : "10.129.2.1", "URL" : "http://www.example.com/test/"},
            {"status": 404, "IP-address" : "10.129.2.1", "URL" : "http://www.example.com/test/"}];

//Declaration of variables
var svgWidth = 300, svgHeight = 500, radius = Math.min(svgWidth, svgHeight) / 2;

var svg = d3.select('svg').attr("Width", svgWidth).attr("Height", svgHeight);
var group = svg.append("g").attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

// Group data from the JSON
var dataCount = d3.nest()
    .key(function(d) { return d.status; })
    .rollup(function(v) { return v.length; })
    .entries(data);

// Generate pie
var pie = d3.pie()
                .value(function (d) {
                return d.value;
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

// Color the arc
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
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
    .text(function(d) { return "Status: " + d.data.key + "\n" + d.data.value + "st"; });
 
    
