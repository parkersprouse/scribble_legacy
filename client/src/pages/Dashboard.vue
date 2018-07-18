<template>
  <div id='wrapper'>

    <custom-navbar />

    <div class='container'>

      <nav class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <a class='button is-large is-primary is-outlined'>
              <b-icon icon='plus-outline'></b-icon>
              <span>New Scribble</span>
            </a>
          </div>
        </div>
      </nav>

      <!--
      <div class='columns is-multiline has-text-centered'>
        <div class='column is-one-quarter'>
          <code>is-one-quarter</code>
        </div>
      </div>
      -->

    </div>

    <custom-footer />

  </div>
</template>

<script>
export default {
  name: 'dashboard',
};
</script>
