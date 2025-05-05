"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 6624:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/Header.js



function Header() {
    const { data: session  } = (0,react_.useSession)();
    const handleSignIn = (provider)=>{
        (0,react_.signIn)(provider);
    };
    const handleSignOut = ()=>{
        (0,react_.signOut)({
            callbackUrl: "/"
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: "glass-card m-4",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center py-6",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: "text-3xl font-bold gradient-text mb-4 md:mb-0",
                    children: "PlayListify"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex flex-wrap gap-3",
                    children: !session ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: ()=>handleSignIn("spotify"),
                                "data-provider": "spotify",
                                className: "btn-gradient text-white font-medium py-2.5 px-5 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-300",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "Login with Spotify"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: ()=>handleSignIn("google"),
                                "data-provider": "google",
                                className: "glass-card hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-300",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "Login with Google"
                                })
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center gap-4",
                        children: [
                            session.user?.image && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "glass-card p-1 rounded-full",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: session.user.image,
                                    alt: session.user.name || "User",
                                    className: "w-8 h-8 rounded-full"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "hidden md:inline-block glass-card px-4 py-1 rounded-full",
                                children: session.user?.name || "User"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: handleSignOut,
                                className: "glass-card hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105",
                                children: "Logout"
                            })
                        ]
                    })
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./components/SongList.js

function SongList({ songs , selectedSongs , toggleSongSelection  }) {
    if (!songs || songs.length === 0) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "glass-card p-12 text-center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "animate-float glass-card inline-block p-4 rounded-full mb-4",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        className: "w-8 h-8 text-purple-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                    className: "text-xl font-semibold gradient-text mb-4",
                    children: "No playlists found"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>window.location.reload(),
                    className: "btn-gradient px-6 py-2 rounded-full text-white hover:scale-105 transition-all duration-300",
                    children: "Refresh Playlists"
                })
            ]
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6",
        children: songs.map((song, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                onClick: ()=>toggleSongSelection(song),
                className: `group glass-card overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer ${selectedSongs.includes(song) ? "ring-2 ring-purple-400" : ""}`,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "relative aspect-square",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: song.thumbnail || "https://via.placeholder.com/300?text=No+Image",
                                alt: song.title,
                                className: "w-full h-full object-cover"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `absolute inset-0 flex items-center justify-center transition-all duration-300 ${selectedSongs.includes(song) ? "bg-purple-500/40 backdrop-blur-sm" : "bg-black/0 group-hover:bg-black/30"}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: `transform transition-all duration-300 ${selectedSongs.includes(song) ? "scale-100" : "scale-0 group-hover:scale-100"}`,
                                    children: selectedSongs.includes(song) ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "glass-card px-4 py-2 rounded-full text-white text-sm font-medium",
                                        children: "Selected"
                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "glass-card px-4 py-2 rounded-full text-white text-sm font-medium",
                                        children: "Select"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute top-2 left-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "glass-card px-2 py-1 text-xs font-medium text-white rounded-full",
                                    children: "Playlist"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "font-medium text-sm text-white truncate",
                                children: song.title
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-xs text-purple-300 truncate mt-1",
                                children: song.artist
                            })
                        ]
                    })
                ]
            }, index))
    });
};

;// CONCATENATED MODULE: ./components/ProgressBar.js

function ProgressBar() {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "fixed top-0 left-0 right-0 z-50",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "h-1 w-full overflow-hidden bg-white/10",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "animate-progress-indeterminate h-full w-1/3 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"
            })
        })
    });
};

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./pages/index.js








function Home() {
    const { data: session  } = (0,react_.useSession)();
    const { 0: songs , 1: setSongs  } = (0,external_react_.useState)([]);
    const { 0: selectedSongs , 1: setSelectedSongs  } = (0,external_react_.useState)([]);
    const { 0: playlistLink , 1: setPlaylistLink  } = (0,external_react_.useState)([]);
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(false);
    const { 0: error , 1: setError  } = (0,external_react_.useState)("");
    const { 0: currentStep , 1: setCurrentStep  } = (0,external_react_.useState)(1);
    (0,external_react_.useEffect)(()=>{
        if (session) {
            fetchSongs();
            setCurrentStep(2);
        } else {
            setCurrentStep(1);
        }
    }, [
        session
    ]);
    const fetchSongs = async ()=>{
        setLoading(true);
        setError("");
        try {
            const res = await external_axios_default().post("/api/spotify", {
                access_token: session.accessToken
            });
            setSongs(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch your Spotify playlists. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    const toggleSongSelection = (song)=>{
        setSelectedSongs((prev)=>{
            if (prev.includes(song)) {
                return prev.filter((s)=>s !== song);
            }
            return [
                ...prev,
                song
            ];
        });
    };
    const createPlaylist = async ()=>{
        if (selectedSongs.length === 0) {
            setError("Please select at least one playlist");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await external_axios_default().post("/api/youtube", {
                songs: selectedSongs
            });
            setPlaylistLink(res.data.playlistUrl);
            setCurrentStep(3);
        } catch (err) {
            console.error(err);
            setError("Failed to create YouTube playlist. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    const renderStepIndicator = ()=>{
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "max-w-3xl mx-auto mb-10 px-4",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: `flex flex-col items-center`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50" : "glass-card opacity-50"}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-lg font-semibold text-white",
                                    children: "1"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `mt-2 text-sm font-medium ${currentStep >= 1 ? "text-purple-300" : "text-gray-500"}`,
                                children: "Login"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `flex-1 h-1 mx-2 rounded ${currentStep >= 2 ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-800"}`
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: `flex flex-col items-center`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50" : "glass-card opacity-50"}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-lg font-semibold text-white",
                                    children: "2"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `mt-2 text-sm font-medium ${currentStep >= 2 ? "text-purple-300" : "text-gray-500"}`,
                                children: "Select"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `flex-1 h-1 mx-2 rounded ${currentStep >= 3 ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-800"}`
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: `flex flex-col items-center`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "glass-card bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/50" : "glass-card opacity-50"}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-lg font-semibold text-white",
                                    children: "3"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `mt-2 text-sm font-medium ${currentStep >= 3 ? "text-purple-300" : "text-gray-500"}`,
                                children: "Enjoy"
                            })
                        ]
                    })
                ]
            })
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "PlayListify - Convert Spotify to YouTube"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Convert your Spotify playlists to YouTube playlists"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
                        rel: "stylesheet"
                    })
                ]
            }),
            loading && /*#__PURE__*/ jsx_runtime_.jsx(ProgressBar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: "container mx-auto px-4 py-8 max-w-6xl relative",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none"
                    }),
                    renderStepIndicator(),
                    !session ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mt-8",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "glass-card overflow-hidden transform transition-all duration-500 hover:scale-[1.02]",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "p-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        className: "text-2xl font-bold mb-4 gradient-text",
                                        children: "Welcome to PlayListify"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-gray-300 mb-6",
                                        children: "Convert your favorite Spotify playlists to YouTube with just a few clicks."
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "flex justify-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: ()=>signIn("spotify"),
                                            className: "btn-gradient py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 hover:scale-105",
                                            children: "Get Started"
                                        })
                                    })
                                ]
                            })
                        })
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "glass-card p-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex items-center justify-between mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                        className: "text-2xl font-bold gradient-text mb-2",
                                                        children: "Step 2: Select Your Playlists"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "text-gray-300",
                                                        children: "Choose the playlists you want to convert to YouTube"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "glass-card px-4 py-2 rounded-full text-purple-300",
                                                children: [
                                                    selectedSongs.length,
                                                    " selected"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(SongList, {
                                        songs: songs,
                                        selectedSongs: selectedSongs,
                                        toggleSongSelection: toggleSongSelection
                                    })
                                ]
                            }),
                            error && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "glass-card p-4 mb-8 border border-red-500/20 flex items-center text-red-400",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                        className: "w-5 h-5 mr-2 flex-shrink-0",
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                            fillRule: "evenodd",
                                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                                            clipRule: "evenodd"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: error
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex justify-center",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    onClick: createPlaylist,
                                    disabled: selectedSongs.length === 0 || loading,
                                    className: `btn-gradient py-3 px-8 rounded-full inline-flex items-center group transition-all duration-300 ${selectedSongs.length === 0 || loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`,
                                    children: loading ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                className: "animate-spin -ml-1 mr-3 h-5 w-5",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                                                        className: "opacity-25",
                                                        cx: "12",
                                                        cy: "12",
                                                        r: "10",
                                                        stroke: "currentColor",
                                                        strokeWidth: "4"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        className: "opacity-75",
                                                        fill: "currentColor",
                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    })
                                                ]
                                            }),
                                            "Processing..."
                                        ]
                                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                className: "w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110",
                                                fill: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                    d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                                })
                                            }),
                                            "Create YouTube Playlist"
                                        ]
                                    })
                                })
                            }),
                            playlistLink && playlistLink.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "mt-8",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "glass-card overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "bg-gradient-to-r from-red-500 to-red-600 px-6 py-4",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                                    className: "text-xl font-bold flex items-center text-white",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                            className: "w-6 h-6 mr-2",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                                d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                                            })
                                                        }),
                                                        "Step 3: Your YouTube Playlist is Ready!"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "text-red-100 mt-1",
                                                    children: "Click on any link below to open the video on YouTube"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "p-6 divide-y divide-gray-800",
                                            children: playlistLink.map((song, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "py-4 flex items-center group hover:bg-white/5 rounded-lg px-4 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "glass-card text-red-400 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                                    d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "flex-grow",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                    className: "font-medium text-gray-200",
                                                                    children: song.title
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                    href: song.youtubeUrl,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "text-purple-400 hover:text-purple-300 text-sm flex items-center mt-1 group",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                                            className: "w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110",
                                                                            fill: "currentColor",
                                                                            viewBox: "0 0 20 20",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                                                    d: "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                                                                                }),
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                                                    d: "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                                                                                })
                                                                            ]
                                                                        }),
                                                                        "Open on YouTube"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, index))
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "p-6 bg-gradient-to-b from-transparent to-black/20",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                onClick: ()=>{
                                                    setCurrentStep(2);
                                                    setPlaylistLink([]);
                                                },
                                                className: "glass-card hover:bg-white/10 text-gray-300 font-medium py-2 px-6 rounded-full transition-all duration-300 hover:scale-105",
                                                children: "Convert More Playlists"
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("footer", {
                className: "glass-card m-4 mt-auto",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "container mx-auto px-4 max-w-6xl py-6",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col md:flex-row justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mb-4 md:mb-0",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                        className: "text-xl font-bold flex items-center gradient-text",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                className: "w-6 h-6 mr-2",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        d: "M9 12L15 8V16L9 12Z",
                                                        fill: "currentColor"
                                                    })
                                                ]
                                            }),
                                            "PlayListify"
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-gray-400 text-sm mt-2",
                                        children: "Convert Spotify playlists to YouTube with ease"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "text-center md:text-right",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "text-gray-400",
                                        children: [
                                            "\xa9 ",
                                            new Date().getFullYear(),
                                            " PlayListify. All rights reserved."
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-gray-500 text-sm mt-1",
                                        children: "Not affiliated with Spotify or YouTube."
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
};


/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,664], () => (__webpack_exec__(6624)));
module.exports = __webpack_exports__;

})();