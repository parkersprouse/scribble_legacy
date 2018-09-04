<template>
  <li>
    <a :class="['pagination-link', { 'is-current': current === page }]"
        @click='onChange(page)'>
        {{ page }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'page-link',
  props: {
    current: {
      type: Number,
    },
    onChange: {
      type: Function,
    },
    page: {
      type: Number,
    },
  },
};
</script>
