<template>
  <div v-if='!scribbles'>
  </div>

  <div v-else-if='scribbles.length === 0'>
    You have no scribbles
  </div>

  <div v-else class='columns is-multiline scribble-list'>
    <div v-for='scribble in scribbles' :key='scribble.id' class='column is-one-quarter'>
      <div class='card'>
        <header class='card-header' @click='() => goToScribble(scribble.id)'>
          <div class='card-header-title' :title='scribble.title'>
            {{ scribble.title }}
          </div>
        </header>
        <div class='card-content' @click='() => goToScribble(scribble.id)'>
          <div class='content'>
            {{ scribble.body }}
          </div>
        </div>
        <footer class='card-footer'>
          <a :href='`/scribbles/${scribble.id}`' class='card-footer-item'>View</a>
          <a :href='`/scribbles/${scribble.id}/edit`' class='card-footer-item'>Edit</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api';
import cookies from '@/lib/cookies';

export default {
  name: 'scribble-list',
  data() {
    return {
      scribbles: null,
    };
  },
  mounted() {
    api.decodeToken(cookies.getToken(), (_success, { content }) => {
      api.getScribblesOwnerID(content.id, (success, response) => {
        if (success) {
          this.scribbles = response.content;
        } else {
          this.scribbles = [];
        }
      });
    });
  },
  methods: {
    goToScribble(id) {
      window.location.href = `/scribbles/${id}`;
    },
  },
};
</script>
