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
            var cases = ["test", "dislike", "grab", "snooze", "refresh", "mute", "unmute"], msg;
            if (cases.indexOf(data.split(" ")[0]) > -1){
                ttp.recognition.abort();
                setTimeout(function() {
                    ttp.recognition.start();
                }, 750);
            }
            switch(data.split(" ")[0]) {
                case "test":
                    ttp.speak("Hello!");
                    msg = "No longer ready.";
                    break;
                case "like":
                    $("#woot").click();
                    ttp.speak("Wooted this track for you.");
                    msg = "Wooted";
                    break;
                case "dislike":
                    $("#meh").click();
                    ttp.speak("Mehed this track for you.");
                    msg = "Meh'd";
                    break;
                case "grab":
                    $(".icon-grab").click();
                    $($(".grab").children(".menu").children().children("li").children(".icon.icon-check-purple")).mousedown(); ttp.speak("Grabbed this track for you.");
                    msg = "Grabbed";
                    break;
                case "turn":
                    $(".snooze").click();
                    ttp.speak("Snoozed this track for you.");
                    msg = "Snoozed";
                    break;
                case "refresh":
                    $(".refresh").click();
                    ttp.speak("Refreshed this track for you.");
                    msg = "Refreshed";
                    break;
                case "mute":
                    API.setVolume(0);
                    ttp.speak("Muted this track for you.");
                    msg = "Muted";
                    break;
                case "unmute":
                    API.setVolume(100);
                    ttp.speak("Unmuted this track for you.");
                    msg = "Unmuted";
                    break;
            } if (cases.indexOf(data.split(" ")[0]) > -1){
                ttp.recognition.abort();
                if (msg !== null){
                    if(debug) console.log("[DEBUG] "+msg);
                }
                ttp.tmp.ready = false;
                if(debug) console.log("[DEBUG] No longer ready.");
            }
        } else {

        }
    }
}

ttp.__init();
/*
* @Author: xBytez
* @Date:   2015-05-30 14:48:53
* @Last Modified by:   xBytez
* @Last Modified time: 2015-05-31 01:32:55
*/