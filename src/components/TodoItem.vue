<template>
  <div class="todo-list">
    <input
      v-model="newTodoText"
      placeholder="Add a todo"
      @keyup.enter="addNewTodo"
    >
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="index"
      >
        {{ todo }}
        <button @click="todos.splice(index, 1)">
          X
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newTodoText: '',
      todos: ['Buy a ticket', 'Drink water', 'Go to sleep at PM11'],
    };
  },
  methods: {
    addNewTodo() {
      const me = this;
      me.todos.push(me.newTodoText);
      me.newTodoText = '';
    },
  },
};
</script>

<style>
</style>
