"use strict";
(() => {
var exports = {};
exports.id = 8;
exports.ids = [8];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 2138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    const { access_token  } = req.body;
    try {
        // Change endpoint to fetch user's playlists instead of top artists
        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        // Map playlist items to our song format
        const songs = response.data.items.flatMap((playlist)=>{
            return {
                title: playlist.name,
                artist: playlist.owner.display_name,
                thumbnail: playlist.images[0]?.url || "",
                id: playlist.id
            };
        });
        res.status(200).json(songs);
    } catch (error) {
        console.error("Spotify API error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error fetching Spotify data"
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
var __webpack_exports__ = (__webpack_exec__(2138));
module.exports = __webpack_exports__;

})();