<template>
  <div id='wrapper'>
    <custom-navbar />

    <div v-if='!scribble' class='container'>
      Loading...
    </div>

    <div v-else-if='scribble === -1' class='container'>
      Scribble not found
    </div>

    <div v-else class='container'>
      <div class='content'>
        <h2 class='title is-2 is-spaced has-text-centered'>{{ scribble.title }}</h2>
        <blockquote>{{ scribble.body }}</blockquote>
      </div>
    </div>

    <custom-footer />
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
      if (success)
        this.scribble = response.content;
      else
        this.scribble = -1;
    });
  }
};
</script>
