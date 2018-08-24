<template>
  <div id="pagination">
    <nav class="pagination is-centered">
      <a class="pagination-previous"
        :disabled="!(current > 1)"
        @click="current > 1 ? onChange(current - 1) : null">
        &larr; Previous
      </a>
      <a class="pagination-next"
        :disabled="!(size > 1 && current < size)"
        @click="size > 1 && current < size ? onChange(current + 1) : null">
        Next &rarr;
      </a>
      <ul class="pagination-list">
        <component v-for="(element, i) in elements"
                  :key='i'
                  :is="element.type"
                  :page="element.page"
                  :current="current"
                  :onChange="onChange"/>
      </ul>
    </nav>
  </div>
</template>

<script>
/* eslint-disable */

/*
 * VueJS 2 and Bulma CSS pagination from
 * https://github.com/roseware/vue-bulma-pagination
 *
 * Slightly tweaked for my personal usage.
 */
import PageLink from './PageLink.vue';
import EllipseBreak from './EllipseBreak.vue';

export default {
  name: 'paginator',
  components: {
    EllipseBreak,
    PageLink,
  },
  props: {
    current: {
      type: Number,
    },
    total: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 1,
    },
    onChange: {
      type: Function,
    },
  },
  data() {
    return {
      elements: [],
      size: 0,
    };
  },
  mounted() {
    this.paginate();
  },
  methods: {
    add(s, f) {
      for (let i = s; i < f; i++) {
        this.elements.push({ type: 'page-link', page: i });
      }
    },
    first() {
      // Add first page with separator
      this.elements.push(
        { type: 'page-link', page: 1 },
        { type: 'ellipse-break' },
      );
    },
    last() {
      // Add last page with separator
      this.elements.push(
        { type: 'ellipse-break' },
        { type: 'page-link', page: this.size },
      );
    },
    paginate() {
      this.elements = [];
      this.size = Math.ceil(this.total / this.itemsPerPage);

      if (this.size < this.step * 2 + 6) {
        // Case without any ellipse breaks
        this.add(1, this.size + 1);
      } else if (this.current < this.step * 2 + 2) {
        // Case with ellipse breaks at end
        this.add(1, this.step * 2 + 3);
        this.last();
      } else if (this.current > this.size - this.step * 3) {
        // Case with ellipse breaks at beginning
        this.first();
        this.add(this.size - this.step * 2 - 1, this.size + 1);
      } else {
        // Case with ellipse breaks at beginning and end
        this.first();
        this.add(this.current - this.step, this.current + this.step + 1);
        this.last();
      }
    },
  },
};
</script>
