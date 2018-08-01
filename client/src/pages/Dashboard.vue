<template>
  <div id='wrapper'>

    <custom-navbar />

    <div class='container main-content'>

      <nav class='level'>
        <div class='level-item has-text-centered'>
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

      <scribble-list />

    </div>

    <b-modal :active.sync='show_add_scribble' @onCancel='show_add_scribble = false' has-modal-card>
      <add-scribble-modal />
    </b-modal>

  </div>
</template>

<script>
import api from '@/lib/api';
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
      search_term: '',
      show_add_scribble: false,
    };
  },
  methods: {
    performSearch() {
      if (this.search_term) {
        api.searchScribbles(this.search_term, (s, r) => {
          console.log(s);
          console.log(r.content);
        });
      }
    }
  }
};
</script>
