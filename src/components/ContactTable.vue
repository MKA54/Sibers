<template>
  <table>
    <thead>
    <tr>
      <th>№</th>
      <th>Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Address</th>
      <th>Company</th>
      <th>Phone</th>
      <th>Website</th>
      <th>Edit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(contact, index) in $store.state.contacts" :key="contact.id">
      <template>
        <td v-text="index + 1"></td>
        <td v-text="contact.name"></td>
        <td v-text="contact.username"></td>
        <td v-text="contact.email"></td>
        <td v-text="contact.address.city + ', ' + contact.address.streetA"></td>
        <td v-text="contact.company.name"></td>
        <td v-text="contact.phone"></td>
        <td v-text="contact.website"></td>
        <td>
          <button class="btn btn-warning" type="button">Edit
          </button>
        </td>
      </template>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ContactTable',
  created () {
    this.$store.dispatch('loadDate')
  }
}
</script>

<style scoped>
</style>
