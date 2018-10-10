<template>
  <div id='wrapper'>

    <custom-navbar />

    <div v-if='!user' class='container main-content'>
      &nbsp;<b-loading :is-full-page='false' :active='true'></b-loading>
    </div>

    <div v-else-if='error' class='container main-content has-text-centered'>
      There was a problem getting your profile information
    </div>

    <div v-else class='container main-content'>
      <div class='profile-box half-width mobile-fullwidth'>

        <div class='columns is-mobile'>
          <div class='column is-one-quarter has-text-right has-text-weight-bold'>
            Name
          </div>
          <div class='column'>
            <!-- Editing Name -->
            <div v-if='editing_name' class='field has-addons'>
              <div class='control is-expanded'>
                <input v-model.trim='new_name' class='input'
                       placeholder='Name' type='text' />
              </div>
              <div class='control'>
                <button class='button is-primary' @click='saveName'>
                  Save
                </button>
              </div>
            </div>
            <!-- Viewing Name -->
            <div v-else @click='editing_name = true' class='clickable'>
              <b-tooltip label='Click to edit' type='is-dark' animated>
                <span>{{ user.name }}</span>
              </b-tooltip>
            </div>
          </div>
        </div>

        <div class='columns is-mobile'>
          <div class='column is-one-quarter has-text-right has-text-weight-bold'>
            E-mail
          </div>
          <div class='column'>
            <!-- Editing E-mail -->
            <div v-if='editing_email' class='field has-addons'>
              <div class='control is-expanded'>
                <input v-model.trim='new_email' class='input'
                       placeholder='E-mail' type='email' />
              </div>
              <div class='control'>
                <button class='button is-primary' @click='saveEmail'>
                  Save
                </button>
              </div>
            </div>
            <!-- Viewing E-mail -->
            <div v-else @click='editing_email = true' class='clickable'>
              <b-tooltip label='Click to edit' type='is-dark' animated>
                <span>{{ user.email }}</span>
              </b-tooltip>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import api from '@/lib/api';
import cookies from '@/lib/cookies';

export default {
  name: 'profile-page',
  data() {
    return {
      editing_email: false,
      editing_name: false,
      error: false,
      new_email: '',
      new_name: '',
      user: null,
    };
  },
  mounted() {
    api.decodeToken(cookies.getToken(), (id_success, id_response) => {
      if (id_success) {
        api.getUserID(id_response.content.id, (user_success, user_response) => {
          if (user_success) {
            this.user = user_response.content;
            this.new_email = user_response.content.email;
            this.new_name = user_response.content.name;
          } else {
            this.error = true;
            this.user = -1;
          }
        });
      } else {
        this.error = true;
        this.user = -1;
      }
    });
  },
  methods: {
    saveName() {
      api.updateUser({ id: this.user.id, name: this.new_name }, (success, response) => {
        if (success) {
          this.editing_name = false;
          this.user = response.content.user;
          cookies.setToken(response.content.token);
          this.$toast.open({
            message: 'Successfully updated',
            type: 'is-success',
          });
        } else {
          this.$toast.open({
            message: response.message || 'Something went wrong while updating',
            type: 'is-danger',
          });
        }
      });
    },
    saveEmail() {
      api.updateUser({ id: this.user.id, email: this.new_email }, (success, response) => {
        if (success) {
          this.editing_email = false;
          this.user = response.content.user;
          cookies.setToken(response.content.token);
          this.$toast.open({
            message: 'Successfully updated',
            type: 'is-success',
          });
        } else {
          this.$toast.open({
            message: response.message || 'Something went wrong while updating',
            type: 'is-danger',
          });
        }
      });
    },
  },
};
</script>
