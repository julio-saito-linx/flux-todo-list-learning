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
