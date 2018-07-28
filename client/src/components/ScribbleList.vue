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

<style>
.scribble-list .card-header .card-header-title,
.scribble-list .card-content .content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.scribble-list .card-header,
.scribble-list .card-content {
  cursor: pointer;
}

.scribble-list .card-header {
  background-color: rgba(248, 248, 248, .9);
}

@media screen and (min-width: 769px) {
  .scribble-list .card {
    height: 100%;
  }

  .scribble-list .card-content {
    height: 50%;
  }

  .scribble-list .card-header,
  .scribble-list .card-footer {
    height: 25%;
  }
}
</style>
