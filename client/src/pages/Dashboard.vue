<template>
  <div id='wrapper'>

    <custom-navbar />

    <div class='container main-content'>

      <nav v-if='searched_term' class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <h2 class="title is-2">Search for: {{ searched_term }}</h2>
          </div>
        </div>
      </nav>

      <nav class='level'>
        <div v-if='searched_term' class='level-item has-text-centered'>
          <div>
            <a class='button is-large is-primary is-outlined' href='/dashboard'>
              <b-icon icon='angle-left' pack='fas' size='is-small'></b-icon>
              <span>Back</span>
            </a>
          </div>
        </div>
        <div v-else class='level-item has-text-centered'>
          <div>
            <a class='button is-large is-primary is-outlined' @click='show_add_scribble = true'>
              <b-icon icon='plus' pack='fas' size='is-small'></b-icon>
              <span>New Scribble</span>
            </a>
          </div>
        </div>
      </nav>

      <nav class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <form @submit.prevent='performSearch'>
              <b-field>
                <b-input icon='search' icon-pack='fas' placeholder='Search...'
                         type='search' v-model='search_term'></b-input>
                <p class='control'>
                  <button class='button is-primary' type='submit'>Search</button>
                </p>
              </b-field>
            </form>
          </div>
        </div>
      </nav>

      <scribble-list :scribbles='scribbles' :is_search='!!searched_term' />

    </div>

    <b-modal :active.sync='show_add_scribble' @onCancel='show_add_scribble = false' has-modal-card>
      <add-scribble-modal />
    </b-modal>

  </div>
</template>

<script>
import api from '@/lib/api';
import cookies from '@/lib/cookies';
import AddScribbleModal from '@/components/AddScribbleModal.vue';
import ScribbleList from '@/components/ScribbleList.vue';

export default {
  name: 'dashboard',
  components: {
    AddScribbleModal,
    ScribbleList,
  },
  data() {
    return {
      scribbles: null,
      search_term: '',
      searched_term: this.$route.query.q,
      show_add_scribble: false,
    };
  },
  mounted() {
    if (this.$route.query.q) {
      this.search_term = this.$route.query.q;
      api.decodeToken(cookies.getToken(), (_success, { content }) => {
        api.searchScribbles(
          { term: this.$route.query.q, owner_id: content.id },
          (success, response) => {
            if (success) {
              this.scribbles = response.content;
            } else {
              this.scribbles = [];
            }
          },
        );
      });
    } else {
      api.decodeToken(cookies.getToken(), (_success, { content }) => {
        api.getScribblesOwnerID(content.id, (success, response) => {
          if (success) {
            this.scribbles = response.content;
          } else {
            this.scribbles = [];
          }
        });
      });
    }
  },
  methods: {
    performSearch() {
      if (this.search_term) {
        window.location.href = `/dashboard?q=${this.search_term}`;
      }
    },
  },
};
</script>
