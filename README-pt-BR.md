# Flux TodoMVC (pt-BR)

#### Tutoriais oficiais estão aqui:
- https://github.com/facebook/react/blob/master/docs/docs/flux-todo-list.md
- https://github.com/facebook/flux/blob/master/examples/flux-todomvc/README.md

## Minhas anotações

###Dispatcher
AppDispatcher "herda" do Dispatcher

```js
 /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
```
