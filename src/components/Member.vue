<template>
  <div class="member">
    <table>
      <caption>{{ teamName }}</caption>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Age</th>
      </tr>
      <tr v-for="(item, index) in teamMember" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.age }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      teamName: 'FrontEndFamily',
      teamMember: [
        {
          name: 'Clare',
          gender: 'Male',
          age: 22
        },
        {
          name: 'Danny',
          gender: 'Male',
          age: 36
        },
        {
          name: 'ella',
          gender: 'Female',
          age: 26
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  font-weight: normal;
  width: 100%;
}
th {
  color: #42b983;
}
td {
  color: #2c3e50;
}
</style>
