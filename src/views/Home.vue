<template>
  <div class="home">
    Hello world
  </div>
</template>

<script>
import createSocket from '../serve/socket';
import pdfjs from 'pdfjs-dist';
import getPdf from '../serve/api';

export default {
    name: 'home',
    components: {},
    created() {
        getPdf();
    },
};
</script>
