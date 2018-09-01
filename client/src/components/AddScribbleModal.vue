<template>
  <div v-if='!owner_id' class='modal-card'>
    <section class='modal-card-body'>
      &nbsp;<b-loading :is-full-page='false' :active='true'></b-loading>
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
            <p>
              <b-icon icon='exclamation-circle' size='is-small'></b-icon> {{ error }}
            </p>
          </div>
        </article>
        <div class='field'>
          <label class='label'>Title</label>
          <div class='control'>
            <input class='input' type='text' placeholder='Title' v-model.trim='title' />
          </div>
        </div>
        <div class='field'>
          <label class='label'>Tags</label>
            <b-taginput
              v-model='tags'
              :data='all_tags'
              autocomplete
              :allow-new='true'
              icon='tag'
              type='is-info'
              placeholder='Add a tag'>
            </b-taginput>
        </div>
        <div class='field'>
          <label class='label'>Content <span class='required-label'>*</span></label>
          <div class='control'>
            <textarea class='textarea' placeholder='Content' v-model='body'></textarea>
          </div>
        </div>
      </section>

      <footer class='modal-card-foot add-scribble-modal-footer'>
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
      tags: [],
      all_tags: [],
      title: '',
      submitting: false,
    };
  },
  mounted() {
    api.decodeToken(cookies.getToken(), (id_succ, id_res) => {
      this.owner_id = id_res.content.id;
      api.getScribblesTags(this.owner_id, (tag_succ, tag_res) => {
        this.all_tags = tag_res.content;
      });
    });
  },
  methods: {
    submit() {
      this.error = null;
      this.submitting = true;
      const data = {
        body: this.body,
        owner_id: this.owner_id,
        tags: this.tags,
        title: this.title,
      };
      api.addScribble(data, (success, response) => {
        if (success) {
          window.location.href = `/scribbles/${response.content.id}`;
        } else {
          this.error = response.message;
          this.submitting = false;
        }
      });
    },
  },
};
</script>
