// ==UserScript==
// @name         YouTube More Speeds
// @namespace    https://github.com/ssssssander
// @version      1.0
// @icon https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// @description  Adds buttons under a YouTube video with more playback speeds.
// @author       ssssssander
// @homepage https://github.com/ssssssander/youtube-more-speeds
// @downloadURL https://raw.githubusercontent.com/ssssssander/youtube-more-speeds/main/youtube-more-speeds.user.js
// @supportURL https://github.com/ssssssander/youtube-more-speeds/issues
// @match        *://*.youtube.com/*
// @require      https://gist.githubusercontent.com/mjblay/18d34d861e981b7785e407c3b443b99b/raw/debc0e6d4d537ac228d1d71f44b1162979a5278c/waitForKeyElements.js
// ==/UserScript==

// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// https://stackoverflow.com/questions/19238791/how-to-use-waitforkeyelements-to-display-information-after-select-images

(function() {
    'use strict';

    const titleElemSelector = '.title.style-scope.ytd-video-primary-info-renderer';
    const colors = ['#072525', '#287F54', '#C22544']; // https://www.schemecolor.com/wedding-in-india.php
    window.addEventListener('yt-navigate-start', addSpeeds);

    if (document.body) {
        waitForKeyElements(titleElemSelector, addSpeeds); // eslint-disable-line no-undef
    }
    else {
        document.addEventListener('DOMContentLoaded', addSpeeds);
    }

    function addSpeeds(titleElem) {
        let bgColor = colors[0];
        let div = document.createElement('div');

        for (let i = 0.25; i < 16; i += .25) {
            if (i >= 1) { bgColor = colors[1]; }
            if (i > 1) { i += .75; }
            if (i > 4) { i ++; bgColor = colors[2]; }

            let btn = document.createElement('button');
            btn.style.marginRight = '4px';
            btn.style.border = '1px solid lightgrey';
            btn.style.borderRadius = '2px';
            btn.style.color = 'white';
            btn.style.backgroundColor = bgColor;
            btn.style.cursor = 'pointer';
            btn.textContent = '×' + (i.toString().substr(0, 1) == '0' ? i.toString().substr(1): i.toString());
            btn.addEventListener('click', () => { document.getElementsByTagName('video')[0].playbackRate = i } );
            div.appendChild(btn)
        }

        titleElem.appendChild(div);
    }
})();
