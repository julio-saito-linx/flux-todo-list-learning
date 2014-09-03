# Flux TodoMVC (pt-BR)

#### Tutoriais oficiais estão aqui:
- https://github.com/facebook/react/blob/master/docs/docs/flux-todo-list.md
- https://github.com/facebook/flux/blob/master/examples/flux-todomvc/README.md

## Minhas anotações

###Dispatcher
- AppDispatcher "herda" do Dispatcher
- É o formato da mensagem
- É opcional, porém recomendado que se crie "Dispatchers" customizados

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

###Stores
- Aqui é onde ficam os dados numa variável privada interna, protegida
- Herda do EventListener
- Tipo um AmpersandState, tipo um Model (TODO: tentar colocar um aqui!!)

### Controller-View: TodoApp.react.js
- É um componente react
- fica acima da hierarquia
- responsável por "perceber" as mudanças no store