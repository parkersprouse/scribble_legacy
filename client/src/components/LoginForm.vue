<template>
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
</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      console.log(`${this.email} : ${this.password}`);
    },
  },
};
</script>
