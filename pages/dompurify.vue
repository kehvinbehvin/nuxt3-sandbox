<template>
  <div v-dompurify-html="rawHtml"></div>
  <div>Hello world</div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const rawHtml = ref('<TABLE><tr><td>HELLO</tr></TABL>');
    console.log(rawHtml)
    return {
      rawHtml
    }
  }
  /*
  * Some examples to try out
  * DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
  * DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
  * DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
  * DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
  * DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
  *
  * */
}
</script>

