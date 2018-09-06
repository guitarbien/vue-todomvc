<template>
    <div id="app" class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <todo-input @add-todo="addTodo"></todo-input>
        </header>
        <section class="main" v-show="todos.length" v-cloak>
            <input class="toggle-all" type="checkbox" data-com.agilebits.onepassword.user-edited="yes">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li class="todo" :class="{ completed: todo.completed }" v-for="(todo, index) in loopFilterTodos" :key="index">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.completed" />
                        <label>{{ todo.title }}</label>
                        <button class="destroy" @click="removeTodo(index)"></button>
                    </div>
                </li>
            </ul>
        </section>
        <footer class="footer" style="display: block;">
            <span class="todo-count"><strong v-if="AllTodosCount > 0">{{ ActiveTodosCount }}</strong> {{ howManyTodo }} left</span>
            <ul class="filters">
                <li>
                    <a href="#/" @click="changeSelect('all')" :class="{ selected: isSelected('all') }">All</a>
                </li>
                <li>
                    <a href="#/active" @click="changeSelect('active')" :class="{ selected: isSelected('active') }">Active</a>
                </li>
                <li>
                    <a href="#/completed" @click="changeSelect('completed')" :class="{ selected: isSelected('completed') }">Completed</a>
                </li>
            </ul>
            <button v-if="CompletedTodosCount > 0" @click="removeCompletedTodos" class="clear-completed" style="display: block;">Clear completed</button>
        </footer>
    </div>
</template>
<style src="todomvc-app-css/index.css"></style>
<script>
  import TodoInput from './components/TodoInput';

  export default {
    components: { TodoInput },
    data() {
      return {
        todos: [],
        visibilityFlag: 'all'
      };
    },
    methods: {
      addTodo(todo) {
        this.todos.push({
          title: todo,
          completed: false
        });
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      removeCompletedTodos() {
        this.todos = this.todos.filter((item) => {
          return item.completed !== true
        });
      },
      changeSelect(input) {
        this.visibilityFlag = input;
      },
      isSelected(flag) {
        return this.visibilityFlag === flag;
      }
    },
    computed: {
      ActiveTodos() {
        return this.todos.filter((item) => item.completed === false);
      },
      /**
       * @return {number}
       */
      ActiveTodosCount() {
        return this.ActiveTodos.length;
      },
      CompletedTodos() {
        return this.todos.filter((item) => item.completed === true);
      },
      /**
       * @return {number}
       */
      CompletedTodosCount() {
        return this.CompletedTodos.length;
      },
      AllTodos() {
        return this.todos;
      },
      /**
       * @return {number}
       */
      AllTodosCount() {
        return this.AllTodos.length;
      },
      howManyTodo() {
        return this.ActiveTodosCount === 1 ? 'item' : 'items';
      },
      loopFilterTodos() {
        if (this.visibilityFlag === 'all') {
          return this.AllTodos;
        }
        if (this.visibilityFlag === 'completed') {
          return this.CompletedTodos;
        }
        if (this.visibilityFlag === 'active') {
          return this.ActiveTodos;
        }
      }
    }
  };
</script>
