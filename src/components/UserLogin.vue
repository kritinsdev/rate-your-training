<template>
  <div class="content">
    <div class="form">
    <form @submit.prevent="submitForm">
      <div class="formControl">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" name="username">
      </div>
      <div class="formControl">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" name="password">
      </div>
      <div class="formControl">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  emits: ['authenticated'], // declare the authenticated event
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      const formData = {
        username: this.username,
        password: this.password
      };
      axios.post('http://localhost:3000/login', formData)
        .then(response => {
          this.$emit('authenticated', true, response.data);
          this.$router.push({ name: 'UserPanel' });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>
.formControl {
  display: flex;
  flex-direction: column;
  width: 220px;
}

.formControl label {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 12px;
}

.formControl input {
  border:none;
  background-color:#f6f6f6;
  padding:8px 0 8px 8px ;
  border-radius: 5px;
}

.formControl:not(:last-child) {
  margin-bottom: 16px;
}

</style>
