Chart.defaults.global.hover.mode = 'nearest';

var dt = 200;
var steps = 1000;
var omega=0.1
var pageInterval;

var t;
var chart;
var dataset = {label: 'Sin(x)',
	       borderColor: 'red',
	       showLine: true,
	       data: []};
var dataset2 = {label: '2*Cos(x)',
		borderColor: 'green',
		showLine: true,
		data: []}
var count=0;
var t0 = getCurrentTime();

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

function getCurrentTime(){
    return new Date().getTime() /1000;
}

function getElapsedTime(){
    return getCurrentTime() - t0;
}

function plotFunc(xval){
    return Math.sin(2*Math.PI*omega*xval);
}

function plotFunc2(xval){
    return 2*Math.cos(2*Math.PI*omega*xval);
}

function initializeData(){
    var i;
    for (i = 1; i <= steps; i++){
	xval = (i-steps)*dt/1000;
	dataset.data.push({x:xval,y:plotFunc(xval)});
	dataset2.data.push({x:xval,y:plotFunc2(xval)});
    }
}

function makePlot(){

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

function initializePlot() {
    initializeData();
    makePlot();
    updateTime();
}

function updatePlot() {
    count+=1;
    updateTime();

    xval = getElapsedTime();
    dataset.data.push({x:xval,y:plotFunc(xval)});
    dataset2.data.push({x:xval,y:plotFunc2(xval)});

    dataset.data.shift();
    dataset2.data.shift();
    
    chart.update(0);
}

function updateTime() {
    var d = new Date();
    t = d.toLocaleTimeString();
    document.getElementById("clock").innerHTML = t;
    document.getElementById("elapsed").innerHTML = getElapsedTime();
    document.getElementById("count").innerHTML = count;
}

initializePlot();
pageInterval = setInterval(updatePlot, dt);
