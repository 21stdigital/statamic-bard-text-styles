import TextStyle from "./TextStyle";
import TextStyleButton from "./TextStyleButton";

Statamic.booting(() => {
  const customStyles = Statamic.$config.get('bard-custom-styles') || null;
  window.bardCustomStyles = customStyles

  Statamic.$bard.extend(({ node }) => node(new TextStyle));
  Statamic.$bard.buttons((buttons) => {
    const indexOfBold = _.findIndex(buttons, { command: "bold" });
    buttons.splice(indexOfBold, 0, {
      name: "Custom Text Style",
      text: "Text Style",
      command: "textstyle",
      html: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paragraph" class="svg-inline--fa fa-paragraph" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 63.1C448 81.67 433.7 96 416 96H384v352c0 17.67-14.33 32-31.1 32S320 465.7 320 448V96h-32v352c0 17.67-14.33 32-31.1 32S224 465.7 224 448v-96H198.9c-83.57 0-158.2-61.11-166.1-144.3C23.66 112.3 98.44 32 191.1 32h224C433.7 32 448 46.33 448 63.1z"></path></svg>',
      component: TextStyleButton,
      condition: config => 'textstyle' ? config.buttons.includes('textstyle') : true,
    });
  });
})