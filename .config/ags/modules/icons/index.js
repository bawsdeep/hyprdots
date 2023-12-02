import App from 'resource:///com/github/Aylur/ags/app.js'

export default {
    settings: 'org.gnome.Settings-symbolic',
    tick: 'object-select-symbolic',
    audio: {
        mic: {
            muted: 'microphone-disabled-symbolic',
            unmuted: 'microphone-sensitivity-high-symbolic',
        },
        volume: {
            muted: 'audio-volume-muted-symbolic',
            low: 'audio-volume-low-symbolic',
            medium: 'audio-volume-medium-symbolic',
            high: 'audio-volume-high-symbolic',
            overamplified: 'audio-volume-overamplified-symbolic',
        },
        type: {
            headset: 'audio-headphones-symbolic',
            speaker: 'audio-speakers-symbolic',
            card: 'audio-card-symbolic',
        },
        mixer: 'tool-symbolic',
    },
    apps: {
        apps: 'view-app-grid-symbolic',
        search: 'folder-saved-search-symbolic',
    },
    bluetooth: {
        enabled: 'bluetooth-active-symbolic',
        disabled: 'bluetooth-disabled-symbolic',
    },
    brightness: {
        indicator: 'display-brightness-symbolic',
        keyboard: 'keyboard-brightness-symbolic',
        screen: ['󰛩', '󱩎', '󱩏', '󱩐', '󱩑', '󱩒', '󱩓', '󱩔', '󱩕', '󱩖', '󰛨'],
    },
    powermenu: {
        sleep: 'weather-clear-night-symbolic',
        reboot: 'system-reboot-symbolic',
        logout: 'system-log-out-symbolic',
        shutdown: 'system-shutdown-symbolic',
        lock: 'system-lock-screen-symbolic',
        close: 'window-close-symbolic'
    },
    recorder: {
        recording: 'media-record-symbolic',
    },
    notifications: {
        noisy: 'preferences-system-notifications-symbolic',
        silent: 'notifications-disabled-symbolic',
        critical: 'messagebox_critical-symbolic',
        chat: 'notification-symbolic',
        close: 'window-close-symbolic'
    },
    header: {
        refresh: 'view-refresh-symbolic',
        settings: 'settings-symbolic',
        power: 'system-shutdown-symbolic',
    },
    trash: {
        full: 'user-trash-full-symbolic',
        empty: 'user-trash-symbolic',
    },
    mpris: {
        fallback: 'audio-x-generic-symbolic',
        shuffle: {
            enabled: 'media-playlist-shuffle-symbolic',
            disabled: 'media-playlist-no-shuffle-symbolic',
        },
        loop: {
            none: 'media-playlist-no-repeat-symbolic',
            track: 'media-playlist-repeat-song-symbolic',
            playlist: 'media-playlist-repeat-symbolic',
        },
        playing: 'media-playback-pause-symbolic',
        paused: 'media-playback-start-symbolic',
        stopped: 'media-playback-stop-symbolic',
        prev: 'media-skip-backward-symbolic',
        next: 'media-skip-forward-symbolic',
    },
    ai: `${App.configDir}/modules/icons/chatgpt.svg`,
    ui: {
        send: 'mail-send-symbolic',
        arrow: {
            right: 'pan-end-symbolic',
            left: 'pan-start-symbolic',
            down: 'pan-down-symbolic',
            up: 'pan-up-symbolic',
        },
    },
    fontIcons: {
      weather: {
        day: {
          '113': '\ue430', //"Sunny",
          '116': '\uf172', //"PartlyCloudy",
          '119': '\uf172', //"Cloudy",
          '122': '\ue2bd', //"VeryCloudy",
          '143': '\ue818', //"Fog",
          '176': '\uf176', //"LightShowers",
          '179': '\uf60b', //"LightSleetShowers",
          '182': '\uf60b', //"LightSleet",
          '185': '\uf60b', //"LightSleet",
          '200': '\uebdb', //"ThunderyShowers",
          '227': '\ue2cd', //"LightSnow",
          '230': '\uf61c', //"HeavySnow",
          '248': '\ue818', //"Fog",
          '260': '\ue818', //"Fog",
          '263': '\uf176', //"LightShowers",
          '266': '\uf176', //"LightRain",
          '281': '\uf60b', //"LightSleet",
          '284': '\uf60b', //"LightSleet",
          '293': '\uf176', //"LightRain",
          '296': '\uf176', //"LightRain",
          '299': '\uf176', //"HeavyShowers",
          '302': '\uf61f', //"HeavyRain",
          '305': '\uf176', //"HeavyShowers",
          '308': '\uf61f', //"HeavyRain",
          '311': '\uf60b', //"LightSleet",
          '314': '\uf60b', //"LightSleet",
          '317': '\uf60b', //"LightSleet",
          '320': '\ue2cd', //"LightSnow",
          '323': '\ue2cd', //"LightSnowShowers",
          '326': '\ue2cd', //"LightSnowShowers",
          '329': '\ueb3b', //"HeavySnow",
          '332': '\ueb3b', //"HeavySnow",
          '335': '\ueb3b', //"HeavySnowShowers",
          '338': '\ueb3b', //"HeavySnow",
          '350': '\uf60b', //"LightSleet",
          '353': '\uf176', //"LightShowers",
          '356': '\uf176', //"HeavyShowers",
          '359': '\uf61f', //"HeavyRain",
          '362': '\uf60b', //"LightSleetShowers",
          '365': '\uf60b', //"LightSleetShowers",
          '368': '\ue2cd', //"LightSnowShowers",
          '371': '\ue2cd', //"HeavySnowShowers",
          '374': '\uf60b', //"LightSleetShowers",
          '377': '\uf60b', //"LightSleet",
          '386': '\uebdb', //"ThunderyShowers",
          '389': '\uebdb', //"ThunderyHeavyRain",
          '392': '\uebdb', //"ThunderySnowShowers",
          '395': '\uf61c', //"HeavySnowShowers",
        },
        night: {
          '113': '\uf159', // Night
          '116': '\uea46', // Partly cloudy, night
          '119': '\uea46', // Partly cloudy, night
        }
      }
    }
};




