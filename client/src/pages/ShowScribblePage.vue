<template>
  <div id='wrapper'>

    <custom-navbar />

    <div v-if='!scribble' class='container main-content'>
      &nbsp;<b-loading :is-full-page='false' :active='true'></b-loading>
    </div>

    <div v-else-if='scribble === -1' class='container main-content'>
      <div class='content has-text-centered'>
        <i class='fa fa-times-circle fa-5x'></i>
        <h2 class='title is-2' style='margin-top: 1rem;'>Scribble Not Found</h2>
        <div class='mobile-fullwidth'>
          <a class='button is-large is-primary is-outlined mobile-fullwidth' href='/dashboard'>
            <b-icon icon='angle-left' size='is-small'></b-icon>
            <span>Back</span>
          </a>
        </div>
      </div>
    </div>

    <div v-else class='container main-content'>
      <div class='content'>
        <h2 class='title is-2 is-spaced has-text-centered'>{{ scribble.title }}</h2>
        <div class='subtitle is-6 has-text-centered is-spaced'>
          <time :datetime='scribble.created_at'>{{ date }}</time>
        </div>
        <div class='scribble-body'>{{ scribble.body }}</div>
        <div class='scribble-tags' v-if='scribble.tags && scribble.tags.length > 0'>
          <b-taglist>
            <b-tag type='is-info' v-for='tag in scribble.tags' :key='tag'>
              <a :href='`/dashboard?tag=${tag}`'>
                {{ tag }}
              </a>
            </b-tag>
          </b-taglist>
        </div>
        <div class='scribble-controls'>
          <button class='button is-primary' @click='show_edit_scribble = true'
                  style='margin-right: 0.25rem;'>
            <b-icon icon='edit' size='is-small' pack='far'></b-icon>
            <span>Edit</span>
          </button>
          <button class='button is-danger' @click='showDeleteModal'>
            <b-icon icon='trash-alt' size='is-small' pack='far'></b-icon>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <b-modal :active.sync='show_edit_scribble' @onCancel='show_edit_scribble = false'
             has-modal-card>
      <edit-scribble-modal :scribble.sync='scribble' />
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment';

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
  methods: {
    doDelete() {
      api.deleteScribble(this.scribble.id, (success) => {
        if (success) {
          window.location.href = '/dashboard';
        }
      });
    },
    showDeleteModal() {
      this.$dialog.confirm({
        title: 'Delete Scribble',
        message: 'Are you sure you want to delete this scribble?',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        iconPack: 'fa',
        onConfirm: this.doDelete,
      });
    },
  },
  computed: {
    date() {
      return moment(this.scribble.created_at).format('MM/DD/YYYY h:mma');
    },
  },
};
</script>
