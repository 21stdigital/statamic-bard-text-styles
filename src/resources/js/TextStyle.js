const { toggleBlockType } = Statamic.$bard.tiptap.commands;

export default class TextStyle {
  name() {
    return 'textstyle'
  }
  schema() {
    return {
      attrs: {
        class: {
          default: null,
        },
        style: {
          default: null,
        }
      },
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [{
        tag: 'p',
        getAttrs: dom => ({
          class: dom.getAttribute('class'),
          style: dom.getAttribute('style'),
        }),
      }],
      toDOM: node => ['p', node.attrs, 0],
    }
  }
  commands({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.textstyle, attrs);
  }
  pasteRules() {
    return [];
  }
  plugins() {
    return [];
  }
}