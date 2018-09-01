<template>
  <div id='wrapper'>

    <custom-navbar />

    <div v-if='!scribbles'></div>

    <div v-else class='container main-content'>

      <nav v-if='searched_term' class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <h2 class="title is-2">Search for: {{ searched_term }}</h2>
          </div>
        </div>
      </nav>

      <nav v-if='tag_filter' class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <b-tag type='is-info' size='is-medium'
                   closable @close="removeTagFilter">
              {{ tag_filter }}
            </b-tag>
          </div>
        </div>
      </nav>

      <nav class='level'>
        <div class='level-item has-text-centered'>
          <div class='mobile-fullwidth'>
            <form @submit.prevent='performSearch'>
              <b-field>
                <b-input icon='search' placeholder='Search...'
                         type='search' v-model='search_term'
                         class='mobile-fullwidth-input-addon'></b-input>
                <p class='control'>
                  <button class='button is-primary' type='submit'>Search</button>
                </p>
              </b-field>
            </form>
          </div>
        </div>
      </nav>

      <nav class='level'>
        <div v-if='searched_term || tag_filter' class='level-item has-text-centered'>
          <div class='mobile-fullwidth'>
            <a class='button is-large is-primary is-outlined mobile-fullwidth' href='/dashboard'>
              <b-icon icon='angle-left' size='is-small'></b-icon>
              <span>Back</span>
            </a>
          </div>
        </div>
        <div v-else class='level-item has-text-centered'>
          <div class='mobile-fullwidth'>
            <a class='button is-large is-primary is-outlined mobile-fullwidth'
               @click='show_add_scribble = true'>
              <b-icon icon='plus' size='is-small'></b-icon>
              <span>New Scribble</span>
            </a>
          </div>
        </div>
      </nav>

      <custom-paginator v-if='scribbles.length > 0' :current='page' :itemsPerPage='per'
                        :onChange='clickPaginatorLink' :total='total'>
      </custom-paginator>

      <scribble-list :scribbles='scribbles' :is_search='!!searched_term' />

      <custom-paginator v-if='scribbles.length > 0' :current='page' :itemsPerPage='per'
                        :onChange='clickPaginatorLink' :total='total'>
      </custom-paginator>

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
      page: Number(this.$route.query.page) || 1,
      per: Number(this.$route.query.per) || 12,
      scribbles: null,
      search_term: '',
      searched_term: this.$route.query.q,
      tag_filter: this.$route.query.tag,
      show_add_scribble: false,
      total: null,
    };
  },
  mounted() {
    const body = { page: this.page, per: this.per };

    if (this.searched_term) {
      this.search_term = this.searched_term;
      body.term = this.searched_term;
    }
    if (this.tag_filter) {
      body.tag = this.tag_filter;
    }

    api.decodeToken(cookies.getToken(), (_success, { content }) => {
      api.filterScribbles({ ...body, owner_id: content.id }, (success, response) => {
        if (success) {
          this.scribbles = response.content.scribbles;
          this.total = response.content.total;
        } else {
          this.scribbles = [];
          this.total = 0;
        }
      });
    });
  },
  methods: {
    clickPaginatorLink(page) {
      let url = `/dashboard?page=${page}&per=${this.per}`;
      if (this.searched_term) {
        url += `&q=${this.searched_term}`;
      }
      if (this.tag_filter) {
        url += `&tag=${this.tag_filter}`;
      }
      window.location.href = url;
    },
    performSearch() {
      if (this.search_term) {
        let url = `/dashboard?q=${this.search_term}`;
        if (this.tag_filter) {
          url += `&tag=${this.tag_filter}`;
        }
        window.location.href = url;
      }
    },
    removeTagFilter() {
      let url = '/dashboard';
      if (this.searched_term) {
        url += `?q=${this.searched_term}`;
      }
      window.location.href = url;
    }
  },
};
</script>
