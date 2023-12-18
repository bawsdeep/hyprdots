import {Button, Icon, Box, Label, Entry, Scrollable} from 'resource:///com/github/Aylur/ags/widget.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import ChatGPT from './AIService.js';
import icons from '../icons/index.js'
import RoundedCorner from '../roundedCorner/index.js';
import Keys from '../../keys.js';
import {QSState} from '../sidepanel/quicksettings.js'
import App from 'resource:///com/github/Aylur/ags/app.js'
import Gtk from 'gi://Gtk'
// @ts-ignore
import WebKit2 from 'gi://WebKit2?version=4.1';
// @ts-ignore
import Gdk from 'gi://Gdk';
import {readFile} from 'resource:///com/github/Aylur/ags/utils.js'

import {Marked} from '../../node_modules/marked/lib/marked.esm.js'
// @ts-ignore
import {markedHighlight} from '../../node_modules/marked-highlight/src/index.js';
//highlightjs requires some modifications to work with gjs, mainly just how it's exported
import hljs from '../highlight.js/lib/index.js'

const parser = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, {language}).value;
    }
  })
);
const renderer = {
  code(code, language, escaped) {
    language ||= 'plaintext';
    const encoded = encodeURIComponent(code)
    return `
        <div class="code">
            <div class="code-header"><span data-language="${language}">${language}</span><button onClick="copyCode(this, '${encoded}')">Copy</button></div>
            <pre><code>${code}</code></pre>
        </div>`
  }
};

parser.use({renderer});

const WebView = Widget.subclass(WebKit2.WebView);

const styleString = readFile(`${App.configDir}/highlight.css`)
const stylesheet = new WebKit2.UserStyleSheet(
  styleString, 0, 0, null, null)

const MessageContent = (msg, scrollable) => {
  const view = WebView({hexpand: true})
    .hook(msg, (view) => {
      const content = `<script>
            function copyCode(button, encodedCode) {
              const decodedCode = decodeURIComponent(encodedCode);
              const tempElement = document.createElement('pre');
              tempElement.innerHTML = decodedCode;
              navigator.clipboard.writeText(tempElement.innerText);
              button.innerText = 'Copied';
              setTimeout(() => button.innerText = 'Copy', 2000);
            }</script>` + parser.parse(msg.content);
      view.load_html(content, 'file://')
    }, 'notify::content')
    .on('load-changed', (view, event) => {
      if (event === 3) {
        view.evaluate_javascript('document.body.scrollHeight', -1, null, null, null, (view, result) => {
          const height = view.evaluate_javascript_finish(result)?.to_int32() || -1
          view.get_parent().css = `min-height: ${height}px;`
          const adjustment = scrollable.get_vadjustment();
          adjustment.set_value(adjustment.get_upper() - adjustment.get_page_size());
        })
      }
    })
    // HACK: evil way to disable context menu
    .on('context-menu', (view, menu, event, result) => {
      menu.remove_all()
    })
  view.get_settings().set_javascript_can_access_clipboard(true);
  view.get_settings().set_enable_write_console_messages_to_stdout(true);
  view.get_user_content_manager().add_style_sheet(stylesheet)
  view.set_background_color(new Gdk.RGBA())
  return Box({
    css: 'padding: 1px',
    children: [view]
  });
};


const Message = (msg, scrollable) => Box({
  class_name: `ai-message ${msg.role}`,
  vertical: true,
  children: [
    Label({
      label: Keys[msg.role] || msg.role,
      xalign: 0,
      class_name: `ai-role ${msg.role}`,
      hexpand: true,
      wrap: true,
      selectable: true,
    }),
    MessageContent(msg, scrollable),
  ]
})

export default () => {
  const box = Box({
      class_name: 'ai-container',
      vertical: true,
      children: [
        Scrollable({
          class_name: 'ai-message-list',
          hscroll: 'never',
          vscroll: 'automatic',
          vexpand: true,
          setup: self => {
            const viewport = self.child;
            //prevent jump to the top of clicked element
            // @ts-ignore
            viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined));
          },
          child: Box({vertical: true})
            .hook(ChatGPT, (box, idx) => {
              const msg = ChatGPT.messages[idx];
              if (!msg) return;
              const msgWidget = Message(msg, box.get_parent())
              box.add(msgWidget)
            }, 'newMsg')
            .hook(ChatGPT, box => {
              box.children = []
            }, 'clear')
        }),
        Box({
          spacing: 5,
          children: [
            Entry({
              on_accept: (entry) => {
                if (!entry || !entry.text || entry.text.length == 0) return;
                ChatGPT.send(entry.text);
                entry.text = '';
              },
              hexpand: true,
            })
              .hook(QSState, (entry) => {
                if (QSState.value === 'chatgpt')
                  entry.grab_focus()
              })
              .hook(App, (entry, window, visible) => {
                if (window === 'sideright' && visible && QSState.value === 'chatgpt')
                  entry.grab_focus()
              }),
            Button({
              class_name: 'ai-send-button',
              on_clicked: (btn) => {
                // @ts-ignore
                const entry = btn.get_parent().children[0];
                ChatGPT.send(entry.text);
                entry.text = ''
              },
              child: Icon(icons.ui.send),
            }),
          ]
        }),
      ],
    }
  )
  return box;
}
