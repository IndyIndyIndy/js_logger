(function () {

    var JSLogger = function () {
        var self = this;
        self.url = 'index.php?eID=jslogger';

        self.init = function () {
            self.initDevlog();
            self.initOnError();
        };

        self.initDevlog = function () {
            //@todo automatically get file, linenumber, colnumber
            console['devlog'] = function (message, file, lineNumber, colNumber) {
                var postData = self.preparePostData({
                    'message': message,
                    'file': self.getFileName(file),
                    'lineNumber': self.getLineNumber(lineNumber),
                    'colNumber': self.getColumnNumber(colNumber),
                    'url': document.location.href,
                    'userAgent': navigator.userAgent,
                    'user': '@todo'
                });
                self.sendLogToBackend(postData);
            };
        };

        self.initOnError = function () {
            window.onerror = function (message, file, lineNumber, colNumber) {
                console.devlog(message, file, lineNumber, colNumber);
                return false;
            };
        };

        self.sendLogToBackend = function (data) {
            var request = new XMLHttpRequest();
            request.open('POST', self.url);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(data);
        };

        self.getFileName = function(file) {
            var caller = self.getCaller();
            if (typeof file === 'undefined' && typeof caller === 'object') {
                file = caller.getFileName();
            }
            return file;
        };

        self.getLineNumber = function(lineNumber) {
            var caller = self.getCaller();
            if (typeof lineNumber === 'undefined' && typeof caller === 'object') {
                lineNumber = caller.getLineNumber();
            }
            return lineNumber;
        };

        self.getColumnNumber = function(colNumber) {
            var caller = self.getCaller();
            if (typeof colNumber === 'undefined' && typeof caller === 'object') {
                colNumber = caller.getColumnNumber();
            }
            return colNumber;
        };

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
