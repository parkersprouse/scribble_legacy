<template>
  <div v-if='!owner_id' class='modal-card'>
    <section class='modal-card-body'>
      Loading...
    </section>
  </div>

  <form v-else @submit.prevent='submit'>
    <div class='modal-card'>

      <header class='modal-card-head'>
        <p class='modal-card-title'>New Scribble</p>
      </header>

      <section class='modal-card-body'>

        <article v-if='error' class='message is-danger'>
          <div class='message-body'>
            <p>{{ error }}</p>
          </div>
        </article>

        <b-field label='Title'>
          <b-input placeholder='Title' type='text' v-model.trim='title'></b-input>
        </b-field>
        <b-field label='Content'>
          <b-input placeholder='Content' type='textarea' v-model='body'></b-input>
        </b-field>
      </section>

      <footer class='modal-card-foot'>
        <button class='button' type='button' @click='$parent.close()'>Close</button>
        <button class='button is-primary' :class='{ "is-loading": submitting }'>Create</button>
      </footer>

    </div>
  </form>
</template>

<script>
import api from '@/lib/api';
import cookies from '@/lib/cookies';

export default {
  name: 'add-scribble-modal',
  data() {
    return {
      body: '',
      error: null,
      owner_id: null,
      title: '',
      submitting: false,
    };
  },
  mounted() {
    api.decodeToken(cookies.getToken(), (success, response) => {
      this.owner_id = response.content.id;
    });
  },
  methods: {
    submit() {
      console.log('hello')
      this.error = null;
      this.submitting = true;
      api.addScribble({ title: this.title, body: this.body, owner_id: this.owner_id }, (success, response) => {
        if (success)
          window.location.reload();
        else {
          this.error = response.message;
          this.submitting = false;
        }
      });
    },
  },
};
</script>
