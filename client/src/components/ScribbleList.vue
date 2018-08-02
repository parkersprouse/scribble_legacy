<template>
  <div v-if='!scribbles'>
  </div>

  <div v-else-if='scribbles.length === 0'>
    <span v-if='is_search'>No search results</span>
    <span v-else>You have no scribbles</span>
  </div>

  <div v-else class='columns is-multiline scribble-list'>
    <div v-for='scribble in scribbles' :key='scribble.id' class='column is-one-quarter'>
      <div class='card scribble-list-item-card'>
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
        <footer class='card-footer scribble-list-item-card-footer'>
          <a :href='`/scribbles/${scribble.id}`'
             class='card-footer-item scribble-list-item-footer-link'>View</a>
          <!-- <a :href='`/scribbles/${scribble.id}/edit`' class='card-footer-item'>Edit</a> -->
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scribble-list',
  props: ['is_search', 'scribbles'],
  methods: {
    goToScribble(id) {
      window.location.href = `/scribbles/${id}`;
    },
  },
};
</script>
