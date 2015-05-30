    //    ████████╗ █████╗ ██╗     ██╗  ██╗  ████████╗ ██████╗       ██████╗ ██╗     ██╗   ██╗ ██████╗
    //    ╚══██╔══╝██╔══██╗██║     ██║ ██╔╝  ╚══██╔══╝██╔═══██╗      ██╔══██╗██║     ██║   ██║██╔════╝
    //       ██║   ███████║██║     █████╔╝█████╗██║   ██║   ██║█████╗██████╔╝██║     ██║   ██║██║  ███╗
    //       ██║   ██╔══██║██║     ██╔═██╗╚════╝██║   ██║   ██║╚════╝██╔═══╝ ██║     ██║   ██║██║   ██║
    //       ██║   ██║  ██║███████╗██║  ██╗     ██║   ╚██████╔╝      ██║     ███████╗╚██████╔╝╚██████╔╝
    //       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝     ╚═╝    ╚═════╝       ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝

    delete(ttp);
    var ttp = {
        settings: {
            debug: true,
            enabled: false
        },
        tmp: {
            ready: false
        },
        recognition: new webkitSpeechRecognition(),
        tts: new SpeechSynthesisUtterance(),
        speak: function(txt) { ttp.tts.text = txt; speechSynthesis.speak(ttp.tts) },
        __init: function() {
            /*==========  Turn off old settings  ==========*/
            $("#speechToggle").off();
            $("#speechToggle").remove();

            /*==========  TTS  ==========*/
            this.tts.lang = 'en';

            /*==========  Recognition  ==========*/

            this.recognition.continuous = true;
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = true;

            /*==========  Initalized speech APIs  ==========*/
            this.speak("");
            ttp.speak("Ready.");

            /*==========  Start the events  ==========*/
            ttp.__startEvents(); if(debug) console.log("[DEBUG] Started.")
        },
        __startEvents: function() {
            $('#now-playing-bar').append('<div id="speechToggle" style="position:relative; top:38px; right: 22px; height: 10px; width: 10px; background-color: white; border-radius: 25px; opacity: .4; z-index: 10" onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.4"></div>');
            if(ttp.settings.enabled) { $('#speechToggle').css('background-color', 'lime'); ttp.recognition.start(); } else { $('#speechToggle').css('background-color', 'white'); ttp.recognition.abort(); }
            $('#speechToggle').on('click', function() {
                ttp.settings.enabled = !ttp.settings.enabled;
                if(ttp.settings.enabled) { $('#speechToggle').css('background-color', 'lime'); ttp.recognition.start(); } else { $('#speechToggle').css('background-color', 'white'); ttp.recognition.abort(); }
            });
            this.recognition.onresult = function(data) {
                for (var i = data.resultIndex; i < data.results.length; i++) {
                if(!data.results[i].isFinal) ttp.__onSpeech(data.results[i][0].transcript);            }
            }
        },
        __onSpeech: function(data) {
            data = data.toLowerCase();
            if(data.charAt(0) === " ") data = data.slice(1);
            if(this.settings.debug) console.log("[DEBUG-SPEECH]", data);
            if(ttp.tmp.ready === false && /(hi|yo|hey|sup|hot|heart|hyde|high|how|a)\ (plug|plus|pug|park|punk)|iplug/i.test(data)) {
                ttp.tmp.ready = true;
                if(debug) console.log("[DEBUG] Ready");
                ttp.recognition.abort();
                ttp.speak("Yes?");
                setTimeout(function() { ttp.recognition.start(); }, 750);
                setTimeout(function() { ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready.") }, 12500);
            }
            else if(ttp.tmp.ready === true) {
                switch(data.split(" ")[0]) {
                    case "test": ttp.speak("Hello!"); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "like": $("#woot").click(); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Wooted this track for you."); if(debug) console.log("[DEBUG] Wooted"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "dislike": $("#meh").click(); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Mehed this track for you."); if(debug) console.log("[DEBUG] Meh'd"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "grab": $(".icon-grab").click(); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); $($(".grab").children(".menu").children().children("li").children(".icon.icon-check-purple")).mousedown(); ttp.speak("Grabbed this track for you."); if(debug) console.log("[DEBUG] Grabbed"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "snooze": $(".snooze").click(); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Snoozed this track for you."); if(debug) console.log("[DEBUG] Snoozed"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "refresh": $(".refresh").click(); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Refreshed this track for you."); if(debug) console.log("[DEBUG] Refreshed"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "mute": API.setVolume(0); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Muted this track for you."); if(debug) console.log("[DEBUG] Muted"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                    case "unmute": API.setVolume(100); ttp.recognition.abort(); setTimeout(function() { ttp.recognition.start(); }, 750); ttp.speak("Unmuted this track for you."); if(debug) console.log("[DEBUG] Unmuted"); ttp.tmp.ready = false; if(debug) console.log("[DEBUG] No longer ready."); break;
                }
            }
            else { }
        }
    }

    ttp.__init();

    /*
    * @Author: xBytez
    * @Date:   2015-05-30 14:48:53
    * @Last Modified by:   xBytez
    * @Last Modified time: 2015-05-30 21:24:03
    */