<template>
  <div id='wrapper'>
    <section class='hero is-medium is-dark is-bold' style='margin-bottom: 1rem;'>
      <nav class='navbar is-transparent'>
        <div class='navbar-brand'>
          <div class='navbar-burger burger' :class="{ 'is-active': navbar_open }"
               data-target='top-navbar' @click='toggleNavbar'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id='top-navbar' class='navbar-menu' :class="{ 'is-active': navbar_open }">
          <div class='navbar-end'>
            <a class='navbar-item' href='#login'>
              Login
            </a>
            <a class='navbar-item' href='#register'>
              Register
            </a>
          </div>
        </div>
      </nav>
      <div class='hero-body' style='padding-top: 5rem'>
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
              to check later, etc.
            </p>
          </div>
        </article>

        <article class='message is-medium'>
          <div class='message-body'>
            <div class='columns is-centered'>
              <div class='column is-separated'>
                <div class='three-quarters-width'>
                  <h3 id='login'>Login</h3>
                  <login-form :next="$route.query.n" />
                </div>
              </div>
              <div class='column'>
                <div class='three-quarters-width'>
                  <h3 id='register'>Register</h3>
                  <register-form />
                </div>
              </div>
            </div>
          </div>
        </article>

      </div>
    </div>

    <custom-footer />

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
  data() {
    return {
      navbar_open: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.navbar_open = !this.navbar_open;
    },
  },
};
</script>
