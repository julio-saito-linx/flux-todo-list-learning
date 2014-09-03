/**
 * Mogger, the automatic logger
 */
var Mogger = require('mogger');


/**
 * all source that we want to trace
 */
var surrogateTargetsSource = [
	// DO NOT try to trace the react views
	//        will freeze your machine
	{
		title: 'TodoItem.react',
		target: require('./components/TodoItem.react')
	},
	{
		title: 'TodoActions',
		target: require('./actions/TodoActions')
	},
	{
		title: 'TodoConstants',
		target: require('./constants/TodoConstants')
	},
	{
		title: 'AppDispatcher',
		target: require('./dispatcher/AppDispatcher').prototype
	},
	{
		title: 'Dispatcher',
		target: require('./dispatcher/Dispatcher').prototype
	},
	{
		title: 'TodoStore',
		target: require('./stores/TodoStore')
	}
];

var tracer = new Mogger.Tracer({
	//-------------------------------------------------------
	// enable / disable
	//-------------------------------------------------------
	enabled: true,

	//-------------------------------------------------------
	// prints a pause when no logs are printed for some time
	//-------------------------------------------------------
	showPause: true,

	//-------------------------------------------------------
	// where is our sources objects?
	// in our surrogateTargetsSource
	//-------------------------------------------------------
	surrogateTargets: surrogateTargetsSource,

	//-------------------------------------------------------
	// global config
	//-------------------------------------------------------
	before: {
		//css: 'color: blue',
		size: 15
	},
	targetConfig: {
		//css: 'color: red',
		//size: 40
	},
	showArguments: true,

	//-------------------------------------------------------
	// interceptors
	//-------------------------------------------------------
	interceptors: [
	{
		filterRegex: /^(\$Dispatcher_invokeCallback|create|emit|destroy)$/i,
		callback: function(info) {
			return info.method + '("' + info.args[0] + '")';
		}
	},
	{
		filterRegex: /^(dispatch|toggleComplete|updateText)$/i,
		callback: function(info) {
			//return info.method + '("' + info.args[0].action.actionType + ' - '+ info.args[0].action.id +'")';
			var actionStringified = JSON.stringify(info.args[0], ' ', 2);
			return info.method + ':' + actionStringified + '\n';
		}
	},
	]

});

// start watching some targets
//-------------------------------------------------------
var messages = [];
surrogateTargetsSource.forEach(function(surrogateTarget) {
	if(surrogateTarget.title.indexOf('react') !== -1){
		return false;
	}
	tracer.traceObj({
		before: {	message: surrogateTarget.title, randomColor: true },
		target: surrogateTarget.title, targetConfig: {	randomColor: true }
	});
});


tracer.traceObj({
	before: {	message: 'TodoItem.react', randomColor: true },
	target: 'TodoItem.react', targetConfig: { randomColor: true },
	pointcut: /render/
});












var logger = tracer.logger;
var showTitle = function() {
	makeRainbow();
	logger.log({
		message: 'Flux',
		css: 'font-weight: bold; font-size: 32px; color: #666'
	});
	makeRainbow();

};
var makeRainbow = function() {
	// rainbow
	var fontSize = 'font-size: 8px';
	logger.log(
		[
			{	message: '#',	css: 'color: #f80c12;' + fontSize },
			{	message: '#',	css: 'color: #ee1100;' + fontSize },
			{	message: '#',	css: 'color: #ff3311;' + fontSize },
			{	message: '#',	css: 'color: #ff4422;' + fontSize },
			{	message: '#',	css: 'color: #ff6644;' + fontSize },
			{	message: '#',	css: 'color: #ff9933;' + fontSize },
			{	message: '#',	css: 'color: #feae2d;' + fontSize },
			{	message: '#',	css: 'color: #ccbb33;' + fontSize },
			{	message: '#',	css: 'color: #d0c310;' + fontSize },
			{	message: '#',	css: 'color: #aacc22;' + fontSize },
			{	message: '#',	css: 'color: #69d025;' + fontSize },
			{	message: '#',	css: 'color: #22ccaa;' + fontSize },
			{	message: '#',	css: 'color: #12bdb9;' + fontSize },
			{	message: '#',	css: 'color: #11aabb;' + fontSize },
			{	message: '#',	css: 'color: #4444dd;' + fontSize },
			{	message: '#',	css: 'color: #3311bb;' + fontSize },
			{	message: '#',	css: 'color: #3b0cbd;' + fontSize },
		]
	);
};

showTitle();

logger.log({ message: '\nlog powered with:', css: 'color: #888'});
logger.log('https://github.com/saitodisse/mogger');
logger.log({ message: '------------------------------------\n', css: 'color: #888'});

