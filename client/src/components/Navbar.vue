<template>
  <div class='navbar-holder'>
    <nav class='navbar is-white'>
      <div class='container'>
        <div class='navbar-brand'>
          <div class='navbar-burger burger' :class="{ 'is-active': navbar_open }"
               data-target='main-navbar' @click='toggleNavbar'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id='main-navbar' class='navbar-menu' :class="{ 'is-active': navbar_open }">
          <div class='navbar-start'>
            <a class='navbar-item' href='/dashboard'>
              Home
            </a>
          </div>

          <div class='navbar-end'>
            <div class='navbar-item has-dropdown is-hoverable'>
              <a class='navbar-link' href='/profile'>
                Profile
              </a>
              <div class='navbar-dropdown'>
                <a class='navbar-item' href='/profile/edit'>
                  Settings
                </a>
                <a class='navbar-item' href='/logout'>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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

<style scoped>
.navbar {
  border: 2px solid #f5f5f5;
}

.navbar-holder {
  margin-bottom: 2rem;
}
</style>
