<template>
  <div class="inline-block relative">
    <button
      ref="button"
      class="bard-toolbar-button"
      :class="{
        active: showTextStyleMenu,
      }"
      v-html="button.html"
      v-tooltip="button.text"
      @click="showTextStyleMenu = !showTextStyleMenu"
    />

    <div class="bard-textstyle-toolbar" :class="{ hidden: !showTextStyleMenu }" v-closable="{exclude: ['button'], handler: 'hideTextStyleMenu'}">
      <div class="flex flex-col">
        <template v-for="(style, index) in availableStyles" >
          <div @click="setTextStyle(style)" :key="index" class="bard-textstyle-item cursor-pointer py-2 px-1 border-b" v-if="index !='current'">
            {{ style.title }}
          </div>
        </template>
      </div>
    </div>

  </div>
</template>
<script>
// This variable will hold the reference to
// document's click handler
let handleOutsideClick

// Custom vue directive to enable close-on-outside-click for the textstyle menu.
Vue.directive('closable', {
  bind (el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName]
          // See if this excluded element
          // is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind () {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})

export default {
  mixins: [ BardToolbarButton ],
  data() {
    return {
      showTextStyleMenu: false,
      availableStyles: null,
      getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor),
    };
  },
  methods: {
    setTextStyle(style) {
      this.editor.commands.textstyle(style)
      this.showTextStyleMenu = false
    },
    hideTextStyleMenu() {
      this.showTextStyleMenu = false
    }
  },
  mounted() {
      this.availableStyles = window.bardCustomStyles ? window.bardCustomStyles : null
  },
  created() {
  }
};
</script>
<style>
  .bard-textstyle-toolbar {
    --bg-opacity: 1;
    background-color: #fff;
    background-color: rgba(255, 255, 255, var(--bg-opacity));
    border-radius: 3px;
    position: absolute;
    line-height: 1;
    box-shadow: 0 0 0 1px rgb(49 49 93 / 5%), 0 2px 5px 0 rgb(49 49 93 / 8%), 0 1px 3px 0 rgb(49 49 93 / 15%);
    margin-top: 8px;
    z-index: 100;
    width: 300px;
    top: 100%;
  }
  .bard-textstyle-item:hover {
    background-color: rgb(245, 248, 252);
  }
</style>