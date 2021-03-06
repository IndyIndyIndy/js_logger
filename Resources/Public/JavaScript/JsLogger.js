(function () {

    var JSLogger = function () {
        var self = this;
        self.url = 'index.php?eID=jslogger';

        self.init = function () {
            self.initDevlog();
            self.initOnError();
        };

        /**
         * Initialize the console.devlog function for debugging
         */
        self.initDevlog = function () {
            console['devlog'] = function (message, stacktrace) {
                if (typeof stacktrace === 'undefined') {
                    StackTrace.get().then(function(stackframes) {
                        console.devlog(message, self.stringifyStack(stackframes));
                    }).catch(self.onStacktraceCatch);
                } else {
                    var postData = self.preparePostData({
                        'message': message,
                        'stacktrace': stacktrace,
                        'url': document.location.href,
                        'userAgent': navigator.userAgent,
                    });
                    self.sendLogToBackend(postData);
                }
            };
        };

        /**
         * Join stack into a human readable string
         *
         * @param {string} stackframes
         * @returns {string}
         */
        self.stringifyStack = function (stackframes) {
            return stackframes.map(function(sf) {
                return sf.toString();
            }).join('\n');
        };

        /**
         * Tell window.onerror to log js errors to the backend
         */
        self.initOnError = function () {
            window.onerror = function (message, file, lineNumber, colNumber, errorObject) {
                StackTrace.fromError(errorObject).then(function(stackframes) {
                    console.devlog(message, self.stringifyStack(stackframes));
                }).catch(self.onStacktraceCatch);
                return false;
            };
        };

        /**
         * Called on errors inside stacktrace.jss
         *
         * @param error
         */
        self.onStacktraceCatch = function(error) {
            console.log(error.message);
        };

        /**
         * Send the error log to the eID ajax request handler
         *
         * @param data
         */
        self.sendLogToBackend = function (data) {
            var request = new XMLHttpRequest();
            request.open('POST', self.url);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(data);
        };

        /**
         * Prepare the post data for the ajax request
         *
         * @param parameters
         * @returns {string}
         */
        self.preparePostData = function (parameters) {
            var sendData = '';
            for (var name in parameters) {
                if (sendData.length > 0) {
                    sendData += '&';
                }
                if (parameters.hasOwnProperty(name)) {
                    sendData += name + '=' + encodeURIComponent(parameters[name]);
                }
            }
            return sendData;
        };

        /**
         * Get the calling function (that called console.devlog)
         *
         * @returns {*}
         */
        self.getCaller = function () {
            try {
                var error = new Error();
                Error.prepareStackTrace = function (error, stack) {
                    return stack;
                };

                var currentFile = error.stack.shift().getFileName();

                while (error.stack.length) {
                    var caller = error.stack.shift();

                    if (currentFile !== caller.getFileName()) {
                        return caller;
                    }
                }
            } catch (error) {
            }

            return undefined;
        }

    };

    var jSLogger = new JSLogger();
    jSLogger.init();

}());