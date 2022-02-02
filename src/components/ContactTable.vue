<template>
  <v-card>
    <v-card-title>
      Contact Book
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="contacts"
      group-by="name[0]"
      class="elevation-1"
      show-group-by
      :search="search"
    >
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="nameRules"
              label="Edit"
              single-line
              :counter="35"
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.username="props">
        <v-edit-dialog
          :return-value.sync="props.item.username"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.username }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update User Name
            </div>
            <v-text-field
              v-model="props.item.username"
              :rules="nameRules"
              :counter="35"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.email="props">
        <v-edit-dialog
          :return-value.sync="props.item.email"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.email }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update Email
            </div>
            <v-text-field
              v-model="props.item.email"
              :rules="emailRules"
              label="Edit"
              single-line
              :counter="35"
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.address.city="props">
        <v-edit-dialog
          :return-value.sync="props.item.address.city"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.address.city }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update Address
            </div>
            <v-text-field
              v-model="props.item.address.city"
              :rules="nameRules"
              :counter="35"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.company.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.company.name"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.company.name }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update Company
            </div>
            <v-text-field
              v-model="props.item.company.name"
              :rules="nameRules"
              :counter="35"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.phone="props">
        <v-edit-dialog
          :return-value.sync="props.item.phone"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.phone }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update Phone
            </div>
            <v-text-field
              v-model="props.item.phone"
              :rules="phoneRules"
              :counter="21"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.website="props">
        <v-edit-dialog
          :return-value.sync="props.item.website"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.website }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update Website
            </div>
            <v-text-field
              v-model="props.item.website"
              :rules="nameRules"
              :counter="35"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactTable',
  data () {
    return {
      search: '',
      snack: false,
      snackColor: '',
      snackText: '',
      phoneRules: [
        v => !!v || 'Enter phone',
        v => /^[\d|()][\d\\() -\\x]{4,21}\d$/.test(v) || 'Phone must be valid'
      ],
      nameRules: [
        v => !!v || 'Enter text',
        v => v.length <= 35 || 'Text must be less than 35 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^[\w][\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i.test(v) || 'E-mail must be valid'
      ],
      pagination: {},
      contacts: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'User Name',
          value: 'username'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Address (city)',
          value: 'address.city'
        },
        {
          text: 'Company Name',
          value: 'company.name'
        },
        {
          text: 'Phone',
          value: 'phone'
        },
        {
          text: 'Website',
          value: 'website'
        }
      ]
    }
  },
  methods: {
    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    }
  },
  created () {
    axios.get('https://demo.sibers.com/users')
      .then(response => {
        this.contacts = response.data
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
</style>
