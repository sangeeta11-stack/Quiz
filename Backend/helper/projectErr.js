class ProjectErr extends Error {
    constructor(message) {
        super(message);
        this._status = 500;
        this._data = {};
    }

    // Getter for statusCode
    get statusCode() {
        return this._status;
    }

    // Setter for statusCode
    set statusCode(code) {
        if (typeof code === 'number') {
            this._status = code;
        }
    }

    // Getter for data
    get data() {
        return this._data;
    }

    // Setter for data
    set data(errorData) {
        if (typeof errorData === 'object') {
            this._data = errorData;
        }
    }
}

module.exports = ProjectErr;
