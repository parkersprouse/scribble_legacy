<template>
  <div id='wrapper'>

    <custom-navbar />

    <div class='container'>

      <nav class='level'>
        <div class='level-item has-text-centered'>
          <div>
            <a class='button is-large is-primary is-outlined' @click='show_add_scribble = true'>
              <b-icon icon='plus-outline'></b-icon>
              <span>New Scribble</span>
            </a>
          </div>
        </div>
      </nav>

      <scribble-list />

    </div>

    <custom-footer />

    <b-modal :active.sync='show_add_scribble' @onCancel='show_add_scribble = false' has-modal-card>
      <add-scribble-modal />
    </b-modal>

  </div>
</template>

<script>
import AddScribbleModal from '@/components/AddScribbleModal.vue';
import ScribbleList from '@/components/ScribbleList.vue';

export default {
  name: 'dashboard',
  components: {
    AddScribbleModal,
    ScribbleList,
  },
  data() {
    return {
      show_add_scribble: false,
    };
  },
};
</script>
