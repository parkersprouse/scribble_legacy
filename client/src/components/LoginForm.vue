<template>
  <div>
    <div v-if='error' class='message is-danger'>
      <div class='message-body'>
        <p>{{ error }}</p>
      </div>
    </div>

    <div class='card'>
      <div class='card-content'>

        <form @submit.prevent='onSubmit'>
          <div class='field'>
            <label class='label'>E-mail</label>
            <p class='control has-icons-left'>
              <input class='input' type='email' placeholder='E-mail' v-model='email' />
              <b-icon icon='account' size='is-small'></b-icon>
            </p>
          </div>
          <div class='field'>
            <label class='label'>Password</label>
            <p class='control has-icons-left'>
              <input class='input' type='password' placeholder='Password' v-model='password' />
              <b-icon icon='lock' size='is-small'></b-icon>
            </p>
          </div>
          <div class='field'>
            <div class='control has-text-centered'>
              <button class='button is-dark' type='submit'>Login</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api';

export default {
  name: 'login-form',
  data() {
    return {
      email: '',
      error: 'Please fill out all required fields',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      api.login({
        email: this.email,
        password: this.password,
      }, (success, response) => {
        console.log(success + response);
      });
    },
  },
};
</script>

<style scoped>
  .message {
    margin-bottom: 1rem;
  }
</style>
