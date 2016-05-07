module.exports = {
    "env": {
        "node": true,
        "amd": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "_": true,
        "app": true,
        "Backbone": true
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ]
    }
};