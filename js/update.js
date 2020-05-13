Chart.defaults.global.hover.mode = 'nearest';


var dt = 500;
var steps = 30;
var omega=0.1

var myVar = setInterval(updatePlot, dt);

var t;
var chart;
var dataset = {label: 'Sin(x)',
	       borderColor: 'rgb(255, 99, 132)',
	       data: []};
var labels = [];
var count=0;
var t0 = getCurrentTime();

var options = {
    elements: {
        line: {
            tension: 0.0,
	    fill:false
        },
	scales: {
        xAxes: [{
            ticks: {
                fixedStepSize: 1.0,
            }
        }]
    }
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

function initializeData(){
    var i;
    for (i = 1; i <= steps; i++){
	xval = (i-steps)*dt/1000;
	labels.push(xval);
	dataset.data.push(plotFunc(xval));
    }
}

function makePlot(){

    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',
	
	// The data for our dataset
	data: {
            labels: labels,
            datasets: [dataset]
	},	
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
    labels.push(xval);
    dataset.data.push(plotFunc(xval));

    labels.shift();
    dataset.data.shift();
    
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
