<template>
  <form @submit.prevent='submit'>
    <div class='modal-card'>

      <header class='modal-card-head'>
        <p class='modal-card-title'>Edit Scribble</p>
      </header>

      <section class='modal-card-body' style='overflow: visible;'>
        <article v-if='error' class='message is-danger'>
          <div class='message-body'>
            <p>
              <b-icon icon='exclamation-circle' size='is-small'></b-icon> {{ error }}
            </p>
          </div>
        </article>
        <article v-if='success' class='message is-success'>
          <div class='message-body'>
            <p>
              <b-icon icon='check-circle' size='is-small' pack='far'></b-icon>&nbsp;
              Scribble successfully updated
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
          <label class='label'>Content <span class='required-label'>*</span></label>
          <div class='control'>
            <div v-if='show_parsed_body' v-html='parsed' class='content markdown-display'></div>
            <textarea v-else class='textarea' placeholder='Content' v-model='body' rows='8'>
            </textarea>
          </div>
          <div class='help has-text-centered'>
            <a href='https://daringfireball.net/projects/markdown/' target='_blank'>Markdown</a>
            enabled - <a @click='toggleEditor'>{{ show_parsed_body ? 'Edit' : 'View' }}</a>
          </div>
        </div>
        <div class='field'>
          <label class='label'>Tags</label>
          <b-taginput
            :allow-new='true'
            autocomplete
            :data='all_tags'
            icon='tag'
            placeholder='Add a tag'
            type='is-dark'
            v-model='tags'>
          </b-taginput>
        </div>
      </section>

      <footer class='modal-card-foot add-scribble-modal-footer'>
        <button class='button' type='button' @click='$parent.close()'>Close</button>
        <button class='button is-primary' :class="{ 'is-loading': submitting }">Update</button>
      </footer>

    </div>
  </form>
</template>

<script>
import api from '@/lib/api';
import cookies from '@/lib/cookies';
import constants from '@/lib/constants';

export default {
  name: 'edit-scribble-modal',
  props: ['scribble'],
  data() {
    return {
      all_tags: [],
      body: '',
      error: null,
      show_parsed_body: false,
      submitting: false,
      success: false,
      tags: [],
      title: '',
    };
  },
  mounted() {
    this.title = this.$props.scribble.title;
    this.body = this.$props.scribble.body;
    // we want a copy of the array so that the scribble itself isn't getting
    // updated as it is edited
    this.tags = this.$props.scribble.tags.slice(0);

    api.decodeToken(cookies.getToken(), (id_success, id_response) => {
      api.getScribblesTags(id_response.content.id, (tag_success, tag_response) => {
        this.all_tags = tag_response.content;
      });
    });
  },
  methods: {
    submit() {
      this.error = null;
      this.submitting = true;
      this.success = false;
      const data = {
        body: this.body,
        id: this.$props.scribble.id,
        tags: this.tags,
        title: this.title,
      };
      api.updateScribble(data, (success, response) => {
        if (success) {
          this.success = true;
          this.$emit('update:scribble', response.content);
        } else {
          this.error = response.message;
        }
        this.submitting = false;
      });
    },
    toggleEditor() {
      this.show_parsed_body = !this.show_parsed_body;
    },
  },
  computed: {
    parsed() {
      return constants.markdown.render(this.body);
    },
  },
};
</script>
