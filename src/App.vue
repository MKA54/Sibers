<template>
  <v-app>
    <ContactTable/>
  </v-app>
</template>

<script>
import ContactTable from './components/ContactTable'

export default {
  name: 'App',
  components: {
    ContactTable
  }
}
</script>
