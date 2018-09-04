<template>
  <div class='navbar-holder' :class="{ 'navbar-open': navbar_open }">
    <div class='hamburger-holder' :class="{ 'navbar-open': navbar_open }">
      <button class='hamburger hamburger--squeeze' :class="{ 'is-active': navbar_open }"
              type='button' @click='toggleNavbar'>
        <span class='hamburger-box'>
          <span class='hamburger-inner'></span>
        </span>
      </button>
    </div>

    <nav id='navbar'>
      <ul>
        <li>
          <a href='/'><b-icon icon='home' size='is-small'></b-icon> Dashboard</a>
        </li>
        <li>
          <a href='/logout'><b-icon icon='sign-out-alt' size='is-small'></b-icon> Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'custom-navbar',
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
