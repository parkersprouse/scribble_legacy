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
            <label class='label'>Confirm Password</label>
            <p class='control has-icons-left'>
              <input class='input' type='password' placeholder='Confirm Password' v-model='confirm_password' />
              <b-icon icon='lock' size='is-small'></b-icon>
            </p>
          </div>
          <div class='field'>
            <div class='control has-text-centered'>
              <button class='button is-dark' :class="{ 'is-loading': submitting }"
                      type='submit'>Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'register-form',
  data() {
    return {
      confirm_password: '',
      email: '',
      error: null,
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
        password: this.password,
      }, (success, response) => {
        if (success) {
          
        }
        else {
          this.error = response.data.message;
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
