<template>
  <div id='wrapper'>
    <custom-navbar />

    <div v-if='!scribble' class='container'>
    </div>

    <div v-else-if='scribble === -1' class='container has-text-centered'>
      Scribble not found
    </div>

    <div v-else class='container'>
      <div class='content'>
        <h2 class='title is-2 is-spaced has-text-centered'>{{ scribble.title }}</h2>
        <div class='scribble-body'>{{ scribble.body }}</div>
        <div class='scribble-controls'>
          <a class='button is-primary' :href='`/scribbles/${scribble.id}/edit`'>
            <b-icon icon='edit' size='is-small' pack='far'></b-icon>
            <span>Edit</span>
          </a>
          <button class='button is-danger'>
            <b-icon icon='times-circle' size='is-small' pack='far'></b-icon>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api';

export default {
  name: 'show-scribble-page',
  data() {
    return {
      scribble: null,
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

<style>
.scribble-body {
  white-space: pre-wrap;
  padding: 1.25rem;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  /* background-color: #f5f5f5; */
}

.scribble-controls {
  text-align: center;
  margin-top: 1rem;
}

@media screen and (min-width: 1024px) {
  .scribble-body {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
