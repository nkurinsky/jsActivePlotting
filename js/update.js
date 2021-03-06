Chart.defaults.global.hover.mode = 'nearest';

var dt = 200;
var steps = 100;
var extraSteps=10;
var range = steps*dt/1000;
var omega=0.1
var pageInterval;

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
                labelString: 'Elapsed Time (s)',
		min:Math.floor(-range),
		max:0
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
    for (i = 1; i <= steps+extraSteps; i++){
	xval = (i-steps-extraSteps)*dt/1000;
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

    chart.options.scales.xAxes[0].ticks.min = Math.floor(xval - range);
    chart.options.scales.xAxes[0].ticks.max = Math.ceil(xval);
    
    chart.update(0);
}

function updateTime() {
    var d = new Date();
    t = d.toLocaleTimeString();
    document.getElementById("clock").innerHTML = t;
    document.getElementById("elapsed").innerHTML = getElapsedTime().toPrecision(3);
    document.getElementById("count").innerHTML = count;
    document.getElementById("range").innerHTML = (range).toPrecision(2);
    document.getElementById("interval").innerHTML = dt;
}

initializePlot();
pageInterval = setInterval(updatePlot, dt);
