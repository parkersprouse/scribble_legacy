<template>
  <div id='wrapper'>

    <custom-navbar />

    <div v-if='!scribble' class='container main-content'>
      &nbsp;<b-loading :is-full-page='false' :active='true'></b-loading>
    </div>

    <div v-else-if='scribble === -1' class='container main-content has-text-centered'>
      Scribble not found
    </div>

    <div v-else class='container main-content'>
      <div class='content'>
        <h2 class='title is-2 is-spaced has-text-centered'>{{ scribble.title }}</h2>
        <div class='scribble-body'>{{ scribble.body }}</div>
        <div class='scribble-controls'>
          <button class='button is-primary' @click='show_edit_scribble = true'>
            <b-icon icon='edit' size='is-small' pack='far'></b-icon>
            <span>Edit</span>
          </button>
          <button class='button is-danger'>
            <b-icon icon='times-circle' size='is-small' pack='far'></b-icon>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <b-modal :active.sync='show_edit_scribble' @onCancel='show_edit_scribble = false'
             has-modal-card>
      <edit-scribble-modal :scribble='scribble' />
    </b-modal>
  </div>
</template>

<script>
import api from '@/lib/api';
import EditScribbleModal from '@/components/EditScribbleModal.vue';

export default {
  name: 'show-scribble-page',
  components: {
    EditScribbleModal,
  },
  data() {
    return {
      scribble: null,
      show_edit_scribble: false,
    };
  },
  mounted() {
    api.getScribblesID(this.$route.params.id, (success, response) => {
      if (success) {
        this.scribble = response.content;
      } else {
        this.scribble = -1;
      }
    });
  },
};
</script>
