import Widget from "resource:///com/github/Aylur/ags/widget.js"
import App from 'resource:///com/github/Aylur/ags/app.js';
import AgsWindow from 'resource:///com/github/Aylur/ags/widgets/window.js'
import Gtk from 'gi://Gtk'

const PopupRevealer = (windowName, transition, child) => Widget.Box({
  css: 'padding: 1px;',
  children: [Widget.Revealer({
    transition,
    child,
    transition_duration: 350,
  })
    .hook(App, (revealer, name, visible) => {
        if (name === windowName)
          revealer.reveal_child = visible;
      }
    )
  ],
});

/** @param {import('types/widgets/window').WindowProps & {
 *      name: string
 *      child: import('types/widgets/box').default
 *      transition?: import('types/widgets/revealer').RevealerProps['transition']
 *  }} o
 */
export default ({name, child, ...rest}) =>
  Widget.Window({
    name,
    child: Widget.Box({
      children: [
        PopupRevealer(name, 'slide_left', child)
      ]
    }),
    popup: true,
    focusable: true,
    visible: false,
    ...rest,
  });

