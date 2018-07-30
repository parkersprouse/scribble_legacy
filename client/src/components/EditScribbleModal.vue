<template>
  <form @submit.prevent='submit'>
    <div class='modal-card'>

      <header class='modal-card-head'>
        <p class='modal-card-title'>Edit Scribble</p>
      </header>

      <section class='modal-card-body'>
        <article v-if='error' class='message is-danger'>
          <div class='message-body'>
            <p>
              <b-icon icon='exclamation-circle' size='is-small' pack='fas'></b-icon> {{ error }}
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
            <textarea class="textarea" placeholder='Content' v-model='body'></textarea>
          </div>
        </div>
      </section>

      <footer class='modal-card-foot add-scribble-modal-footer'>
        <button class='button' type='button' @click='$parent.close()'>Close</button>
        <button class='button is-primary' :class='{ "is-loading": submitting }'>Update</button>
      </footer>

    </div>
  </form>
</template>

<script>
import api from '@/lib/api';

export default {
  name: 'edit-scribble-modal',
  props: ['scribble'],
  data() {
    return {
      body: '',
      error: null,
      title: '',
      submitting: false,
      success: false,
    };
  },
  mounted() {
    this.title = this.$props.scribble.title;
    this.body = this.$props.scribble.body;
  },
  methods: {
    submit() {
      this.error = null;
      this.submitting = true;
      this.success = false;
      const data = { body: this.body, id: this.$props.scribble.id, title: this.title };
      api.updateScribble(data, (success, response) => {
        if (success) {
          this.submitting = false;
          this.success = true;
        } else {
          this.error = response.message;
          this.submitting = false;
        }
      });
    },
  },
};
</script>
