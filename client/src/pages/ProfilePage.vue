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
      <div class='profile-box half-width mobile-fullwidth' id='change-info-form'>
        <form @submit.prevent='updateInfo'>
          <!-- Editing Name -->
          <div class='columns is-mobile'>
            <div class='column is-one-quarter has-text-right has-text-weight-bold'>
              Name
            </div>
            <div class='column'>
              <div class='field'>
                <div class='control is-expanded'>
                  <input v-model.trim='name' class='input'
                         placeholder='Name' type='text' />
                </div>
              </div>
            </div>
          </div>
          <!-- Editing E-mail -->
          <div class='columns is-mobile'>
            <div class='column is-one-quarter has-text-right has-text-weight-bold'>
              E-mail
            </div>
            <div class='column'>
              <div class='field'>
                <div class='control is-expanded'>
                  <input v-model.trim='email' class='input'
                         placeholder='E-mail' type='email' />
                </div>
              </div>
            </div>
          </div>
          <!-- Submit Info -->
          <div class='has-text-centered'>
            <button class='button is-primary' :class="{ 'is-loading': submitting_info }"
                    type='submit'>
              Update Info
            </button>
          </div>
        </form>
      </div>

      <div class='profile-box half-width mobile-fullwidth' id='change-password-form'>
        <form @submit.prevent='updatePassword'>
          <!-- Current Password -->
          <div class='columns is-mobile'>
            <div class='column is-one-quarter has-text-right has-text-weight-bold'>
              Current Password
            </div>
            <div class='column'>
              <div class='field'>
                <div class='control is-expanded has-icons-left'>
                  <b-icon icon='lock' size='is-small' class='is-left'></b-icon>
                  <input v-model.trim='password_current' class='input'
                         placeholder='Current Password' type='password' />
                </div>
              </div>
            </div>
          </div>
          <!-- New Password -->
          <div class='columns is-mobile'>
            <div class='column is-one-quarter has-text-right has-text-weight-bold'>
              New Password
            </div>
            <div class='column'>
              <div class='field'>
                <div class='control is-expanded has-icons-left'>
                  <b-icon icon='lock' size='is-small' class='is-left'></b-icon>
                  <input v-model.trim='password_new' class='input'
                         placeholder='New Password' type='password' />
                </div>
              </div>
            </div>
          </div>
          <!-- New Password Confirm -->
          <div class='columns is-mobile'>
            <div class='column is-one-quarter has-text-right has-text-weight-bold'>
              Confirm New Password
            </div>
            <div class='column'>
              <div class='field'>
                <div class='control is-expanded has-icons-left'>
                  <b-icon icon='lock' size='is-small' class='is-left'></b-icon>
                  <input v-model.trim='password_new_confirm' class='input'
                         placeholder='Confirm New Password' type='password' />
                </div>
              </div>
            </div>
          </div>
          <!-- Submit New Password -->
          <div class='has-text-centered'>
            <button class='button is-primary' :class="{ 'is-loading': submitting_password }"
                    type='submit'>
              Update Password
            </button>
          </div>
        </form>
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
      error: false,
      email: '',
      name: '',
      password_current: '',
      password_new: '',
      password_new_confirm: '',
      submitting_info: false,
      submitting_password: false,
      user: null,
    };
  },
  mounted() {
    api.decodeToken(cookies.getToken(), (id_success, id_response) => {
      if (id_success) {
        api.getUserID(id_response.content.id, (user_success, user_response) => {
          if (user_success) {
            this.user = user_response.content;
            this.email = user_response.content.email;
            this.name = user_response.content.name;
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
    updateInfo() {
      this.submitting_info = true;
      const info = { id: this.user.id, email: this.email, name: this.name };
      api.updateUser(info, (success, response) => {
        if (success) {
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
        this.submitting_info = false;
      });
    },
    updatePassword() {
      this.submitting_password = true;
      const info = {
        id: this.user.id,
        password_current: this.password_current,
        password_new: this.password_new,
        password_new_confirm: this.password_new_confirm,
      };
      api.updateUserPassword(info, (success, response) => {
        if (success) {
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
        this.submitting_password = false;
      });
    },
  },
};
</script>

<style>

#change-password-form {
  margin-top: 1rem;
}

</style>
