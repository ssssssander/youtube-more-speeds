// ==UserScript==
// @version      1.4.2
// @name         YouTube More Speeds
// @description  Adds buttons under a YouTube video with more playback speeds.


// @name:pl Więcej Prędkości YouTube
// @description:pl Dodaje przyciski pod wideo YouTube z większą prędkością odtwarzania.


// @namespace https://github.com/ssssssander
// @icon https://www.youtube.com/s/desktop/3748dff5/img/favicon_48.png
// @author ssssssander
// @homepage https://github.com/ssssssander/youtube-more-speeds
// @supportURL https://github.com/ssssssander/youtube-more-speeds/issues
// @match *://*.youtube.com/*
// @require https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// @license MIT
// ==/UserScript==

// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// https://stackoverflow.com/questions/19238791/how-to-use-waitforkeyelements-to-display-information-after-select-images

(function() {
    'use strict';

    let funcDone = false;
    // hidden in new layout  const infoElemSelector = 'div#info.style-scope.ytd-video-primary-info-renderer';
    const infoElemSelector = 'div#top-row.style-scope.ytd-watch-metadata';
    const colors = ['#072525', '#287F54', '#E97451', '#C22544']; // https://www.schemecolor.com/wedding-in-india.php
    if (!funcDone) window.addEventListener('yt-navigate-start', addSpeeds);

    if (document.body && !funcDone) {
        waitForKeyElements(infoElemSelector, addSpeeds); // eslint-disable-line no-undef
    }

    function addSpeeds() {
        if (funcDone) return;

        let bgColor = colors[0];
        let moreSpeedsDiv = document.createElement('div');
        moreSpeedsDiv.id = 'more-speeds';

        for (let i = 0.25; i < 8; i += .25) {
            if (i >= 1) { bgColor = colors[1]; }
            if (i > 2) { bgColor = colors[2]; }
            // if (i > 1) { i += .75; }
            if (i > 3) { i += 1.75; bgColor = colors[3]; }

            let btn = document.createElement('button');
            btn.style.backgroundColor = bgColor;
            btn.style.marginRight = '4px';
            btn.style.border = '1px solid #D3D3D3';
            btn.style.borderRadius = '2px';
            btn.style.color = '#ffffff';
            btn.style.cursor = 'pointer';
            btn.textContent = '×' + (i.toString().substr(0, 1) == '0' ? i.toString().substr(1): i.toString());
            btn.addEventListener('click', () => { document.getElementsByTagName('video')[0].playbackRate = i } );
            moreSpeedsDiv.appendChild(btn);
        }

        let infoElem = document.querySelector(infoElemSelector);
        infoElem.parentElement.insertBefore(moreSpeedsDiv, infoElem);

        funcDone = true;
    }
})();
