/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @jsx React.DOM
 */


var React = require('react');

var TodoApp = require('./components/TodoApp.react');

React.renderComponent(
  <TodoApp />,
  document.getElementById('todoapp')
);



/**
 * The React Tab Doesn't Show Up?
   (https://github.com/facebook/react-devtools#the-react-tab-doesnt-show-up)

	The current version of React Developer Tools is not compatible with all build
	systems. It tries to load the React runtime by either detecting a global
	called React, or by calling require('React') or require('react') in the global
	scope. Your page needs to support this to be compatible with the Developer
	Tools.
*/
window.React = React;




/**
 * Mogger, for loggin
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
		target: require('./components/TodoItem.react').prototype
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
		filterRegex: /^(dispatch|toggleComplete)$/i,
		callback: function(info) {
			//return info.method + '("' + info.args[0].action.actionType + ' - '+ info.args[0].action.id +'")';
			var actionStringified = JSON.stringify(info.args[0], ' ', 2);
			return actionStringified + '\n';
		}
	},
	]

});

// start watching some targets
//-------------------------------------------------------
surrogateTargetsSource.forEach(function(surrogateTarget) {
	if(surrogateTarget.title.indexOf('react') !== -1){
		return false;
	}
	console.log('mogger::tracing:', surrogateTarget.title);
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
