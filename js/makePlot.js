//Chart.defaults.global.hover.mode = 'nearest';

var dt = 100000;
var steps;
var range = steps*dt/1000;
var omega=4.4e-5;

var t;
var chart;
var dataset = {label: 'Sin(x)',
	       borderColor: 'red',
	       showLine: true,
	       pointRadius: 0,
	       data: []};
var dataset2 = {label: '2*Cos(x)',
		borderColor: 'green',
		showLine: true,
		pointRadius: 0,
		data: []}
var count=0;

var options = {
    elements: {
        line: {
            tension: 0.0,
	    fill:false
        }
    },
    scales: {
        xAxes: [{
	    scaleLabel: {
                display: true,
                labelString: 'Elapsed Time (s)'
            }
        }],
	yAxes: [{
	    scaleLabel: {
		display: true,
		labelString: "Value",
	    }
	}]
    }
};

function getStartTime(){
    var x = document.getElementById("startTime").value
    return new Date(x).getTime() /1000;
}

function getEndTime(){
    var x = document.getElementById("endTime").value
    return new Date(x).getTime() /1000;
}

function getElapsedTime(){
    return getEndTime() - getStartTime();
}

function plotFunc(xval){
    return Math.sin(2*Math.PI*omega*xval);
}

function plotFunc2(xval){
    return 2*Math.cos(2*Math.PI*omega*xval);
}

function updateData(){

    range = getElapsedTime();
    steps = range/(dt/1000);

    dataset.data = []
    dataset2.data = []
    
    var i;
    for (i = 0; i <= steps; i++){
	xval = (i)*dt/1000;
	dataset.data.push({x:xval,y:plotFunc(xval)});
	dataset2.data.push({x:xval,y:plotFunc2(xval)});
    }
}

function makePlot(){

    if(chart){
	chart.destroy();
    }
    
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'scatter',
	
	// The data for our dataset
	data: {datasets: [dataset,dataset2]},	
	// Configuration options go here
	options: options
    });
}

function updatePlot() {
    count+=1;
    updateData();
    makePlot()

    chart.options.scales.xAxes[0].ticks.min = 0;
    chart.options.scales.xAxes[0].ticks.max = range;
    
    chart.update(0);

    document.getElementById("count").innerHTML = count;
    document.getElementById("range").innerHTML = (range).toPrecision(3);
}

updatePlot();
