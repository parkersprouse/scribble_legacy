<template>
  <div id='wrapper'>
    <custom-navbar />
    <div class='container main-content'>
      <div class='content has-text-centered'>
        <i class='fa fa-times-circle fa-5x'></i>
        <h2 class='title is-2' style='margin-top: 1rem;'>Page Not Found</h2>
        <p>The page you were looking for doesn't seem to exist.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found-page',
};
</script>
