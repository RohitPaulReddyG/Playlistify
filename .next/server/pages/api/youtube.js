"use strict";
(() => {
var exports = {};
exports.id = 56;
exports.ids = [56];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 7947:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "next-auth/react"
const react_namespaceObject = require("next-auth/react");
;// CONCATENATED MODULE: ./pages/api/youtube.js


async function handler(req, res) {
    const { songs  } = req.body;
    // For now, we'll just search for videos without creating a playlist
    // since we need to implement Google OAuth for playlist creation
    const youtubePlaylist = [];
    try {
        for (let song of songs){
            const search = `${song.title} ${song.artist} official music video`;
            const youtubeRes = await external_axios_default().get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: search,
                    key: process.env.YOUTUBE_API_KEY,
                    maxResults: 1,
                    type: "video"
                }
            });
            const videoId = youtubeRes.data.items[0]?.id?.videoId;
            if (videoId) {
                youtubePlaylist.push({
                    title: song.title,
                    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
                });
            }
        }
        // Note: To create actual YouTube playlists, we need to implement Google OAuth
        res.status(200).json({
            playlistUrl: youtubePlaylist,
            message: "To create YouTube playlists, please implement Google OAuth in your application."
        });
    } catch (error) {
        console.error("YouTube API error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error searching YouTube videos"
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7947));
module.exports = __webpack_exports__;

})();