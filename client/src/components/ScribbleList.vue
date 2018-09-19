<template>
  <div v-if='!scribbles'>
  </div>

  <div v-else-if='scribbles.length === 0' class='notice'>
    <h4 v-if='is_search' class='subtitle is-4'>No search results</h4>
    <h4 v-else class='subtitle is-4'>You have no scribbles</h4>
  </div>

  <div v-else class='columns is-multiline scribble-list' style='margin-top: 0.75rem'>
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
        <footer class='card-footer scribble-list-item-card-footer'
                v-if='scribble.tags && scribble.tags.length > 0'>
          <b-taglist class='card-footer-item'>
            <b-tag type='is-dark' v-for='tag in scribble.tags' :key='tag'>
              <a href='#' @click.prevent='() => filterTag(tag)'>{{ tag }}</a>
            </b-tag>
          </b-taglist>
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
    filterTag(tag) {
      let url = `/dashboard?tag=${tag}`;
      if (this.$route.query.q) {
        url += `&q=${this.$route.query.q}`;
      }
      window.location.href = url;
    },
  },
};
</script>

<style scoped>
.notice {
  margin-top: 0.75rem;
  text-align: center;
}
</style>
