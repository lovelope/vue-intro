<template>
  <div class="todo-list">
    <input
      v-model="newTodoText"
      @keyup.enter="addNewTodo"
      placeholder="Add a todo"
    >
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="index"
      >
        {{ todo }}
        <button @click="todos.splice(index, 1)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'todoItem',
  data () {
    return {
      newTodoText: '',
      todos: [
        'Buy a ticket',
        'Drink water',
        'Go to sleep at PM11'
      ]
    }
  },
  props: ['title'],
  methods: {
    addNewTodo: function () {
      let me = this
      me.todos.push(me.newTodoText)
      me.newTodoText = ''
    }
  }
}
</script>

<style>

</style>
