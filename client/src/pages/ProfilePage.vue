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
      <div class='card half-width mobile-fullwidth'>
        <div class='card-content'>
          <div class='content'>
            <!-- Name Field -->
            <div class='field is-horizontal'>
              <div class='field-label is-normal'>
                <label class='label'>Name</label>
              </div>
              <div :class="{ 'field-body': editing_name,
                             'field-label is-normal': !editing_name }">
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
                <div v-else class='field'>
                  <div class='control'>
                    <span @click='editing_name = true'>{{ user.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- E-mail Field -->
            <div class='field is-horizontal'>
              <div class='field-label is-normal'>
                <label class='label'>E-mail</label>
              </div>
              <div :class="{ 'field-body': editing_email,
                             'field-label is-normal': !editing_email }">
                <!-- Editing E-mail -->
                <div class='field has-addons' v-if='editing_email'>
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
                <div class='field' v-else>
                  <div class='control'>
                    <span @click='editing_email = true'>{{ user.email }}</span>
                  </div>
                </div>
              </div>
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
      this.editing_name = false;
    },
    saveEmail() {
      this.editing_email = false;
    },
  },
};
</script>
