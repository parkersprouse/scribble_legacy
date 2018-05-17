<template>
  <div>
    <section class='hero is-medium is-dark is-bold' style='margin-bottom: 1rem;'>
      <div class='hero-body'>
        <div class='container has-text-centered'>
          <h1 class='title' style='font-size: 3rem;'>
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
            <p>
              <strong>Scribble</strong> is an online notepad and to-do list.
            </p>
            <p>
              Take quick notes to remember for later, whip up a quick to-do list
              to check later, or whatever you may need.
            </p>
          </div>
        </article>

        <article class='message is-medium'>
          <div class='message-body'>
            <div class='columns is-centered'>
              <div class='column is-separated'>
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
        </article>

      </div>
    </div>

    <full-footer />

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
