<template>
  <ClientOnly>
    <vue-dropzone
        id="file"
        ref="file"
        :options="dropzoneOptions"
        :include-styling="false"
        destroy-dropzone
        style="display: none;"
        @vdropzone-file-added="fileAdded($event)"
        @vdropzone-complete="fileComplete($event)"
    />
  </ClientOnly>
  <div>Hello world</div>
</template>
<script>
import vueDropzone from 'dropzone-vue3'

let uuid = 0;

export default {
  components: {
    vueDropzone,
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  data () {
    return {
      dropzoneOptions: {
        autoProcessQueue: false,
        autoQueue: false,

        url: 'https://httpbin.org/post',
        paramName: 'data',

        maxFilesize: 2, // MB
        acceptedFiles: 'image/jpeg,image/png',
        maxFiles: 1,

        uploadMultiple: false,
        thumbnailWidth: 100, // px
        thumbnailHeight: 100,

        // Let the upload button trigger the file selection.
        // clickable: `.file-upload-${this.uuid} .photo-upload__upload-button`,
      }
    }
  },
  methods: {
    async fileAdded(file) {
      console.log(file)
    },
    fileComplete(file) {
      console.log('fileComplete, file:', file);
    }
  }
}
</script>