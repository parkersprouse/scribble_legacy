<template>
  <div>

    <div v-if='error' class='message is-danger'>
      <div class='message-body'>
        <p><b-icon icon='exclamation-circle' size='is-small' pack='fas'></b-icon> {{ error }}</p>
      </div>
    </div>

    <div class='card'>
      <div class='card-content'>
        <form @submit.prevent='onSubmit'>
          <div class='field'>
            <label class='label'>Name</label>
            <p class='control has-icons-left'>
              <input class='input' type='text' placeholder='Name' v-model='name' />
              <b-icon icon='user' size='is-small' pack='far' class='is-left'></b-icon>
            </p>
          </div>
          <div class='field'>
            <label class='label'>E-mail <span class='required-label'>*</span></label>
            <p class='control has-icons-left'>
              <input class='input' type='email' placeholder='E-mail' v-model='email' />
              <b-icon icon='envelope' size='is-small' pack='far' class='is-left'></b-icon>
            </p>
          </div>
          <div class='field'>
            <label class='label'>Password <span class='required-label'>*</span></label>
            <p class='control has-icons-left'>
              <b-input type='password' v-model='password' placeholder='Password'
                       password-reveal>
              </b-input>
              <b-icon icon='lock' size='is-small' pack='fas' class='is-left'></b-icon>
            </p>
          </div>
          <div class='field'>
            <label class='label'>Confirm Password <span class='required-label'>*</span></label>
            <p class='control has-icons-left'>
              <b-input type='password' v-model='confirm_password' placeholder='Confirm Password'
                       password-reveal>
              </b-input>
              <b-icon icon='lock' size='is-small' pack='fas' class='is-left'></b-icon>
            </p>
          </div>
          <div class='field'>
            <div class='control has-text-centered'>
              <button class='button is-dark' :class="{ 'is-loading': submitting }" type='submit'>
                <b-icon icon='user-plus' size='is-small' pack='fas'></b-icon>
                <span>Register</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../lib/api';
import cookies from '../lib/cookies';

export default {
  name: 'register-form',
  data() {
    return {
      confirm_password: '',
      email: '',
      error: null,
      name: '',
      password: '',
      submitting: false,
    };
  },
  methods: {
    onSubmit() {
      this.resetErrors();
      this.submitting = true;
      api.register({
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name,
        password: this.password,
      }, (success, response) => {
        if (success) {
          cookies.setToken(response.content.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: false });
          window.location.href = '/dashboard';
        } else {
          this.error = response.message;
          this.submitting = false;
        }
      });
    },
    resetErrors() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 1rem;
}
</style>
