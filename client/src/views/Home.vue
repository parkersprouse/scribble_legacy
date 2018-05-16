<template>
  <div>
    <section class='hero is-medium is-dark is-bold' style='margin-bottom: 1rem;'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>
            Scribble
          </h1>
          <h2 class='subtitle'>
            Need a notepad?
          </h2>
        </div>
      </div>
    </section>
    <div class='container'>
      <div class='content'>

        <article class='message is-dark is-medium'>
          <div class='message-body'>
            <div>
              <strong>Scribble</strong> is an online notepad and TODO list.
            </div>
          </div>
        </article>

        <div class='columns is-centered'>
          <div class='column'>
            <div class='three-quarters-width'>
              <h3>Login</h3>
              <login-form />
            </div>
          </div>
          <div class='column'>
            <div class='three-quarters-width'>
              <h3>Register</h3>
              <register-form />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'home',
  components: {
    LoginForm,
    RegisterForm,
  },
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .three-quarters-width {
    width: 75%;
    max-width: 75%;
    margin: auto;
  }
}
</style>
