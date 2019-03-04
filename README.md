# TYPO3 Extension "js_logger"
JSLogger for TYPO3. Log errors and exceptions users are encountering in the frontend to the TYPO3 backend.

[![Latest Stable Version](https://poser.pugx.org/christianessl/js_logger/v/stable)](https://packagist.org/packages/christianessl/js_logger)
[![Total Downloads](https://poser.pugx.org/christianessl/js_logger/downloads)](https://packagist.org/packages/christianessl/js_logger)
[![Latest Unstable Version](https://poser.pugx.org/christianessl/js_logger/v/unstable)](https://packagist.org/packages/christianessl/js_logger)
[![License](https://poser.pugx.org/christianessl/js_logger/license)](https://packagist.org/packages/christianessl/js_logger)

## What does it do?

This extension simply logs any javascript errors encountered in your frontend via ajax to the TYPO3 backend. 
It does this by using the PSR\Log\LoggerInterface, so error logs are automatically sent to the Logger that is 
configured in your TYPO3 instance. (like FileWriter or SysLogWriter) 

Logged info:
- Error message
- Stack trace (file name, function, line number, column number, ...)
- Url
- User Agent

This extension uses [stacktrace.js](https://github.com/stacktracejs/stacktrace.js) for creating readable stacktraces and
parsing source maps. This means, that if you use minified js in production and have source maps configured, your logged 
error stacktrace will automatically show the correct line and column numbers from the unminified file, briefly worded: 
**readable error output**.  

You can find out more about source maps and how to use them in your javascript here:
[How_to u se_a_source_map](https://developer.mozilla.org/de/docs/Tools/Debugger/How_to/Use_a_source_map)

## Requirements

Currently supports 9.5 LTS

## 1. Installation

### Installation with composer

`composer require christianessl/js_logger`. 

### Installation with TER

Open the TYPO3 Extension Manager, search for `js_logger` and install the extension.

## 2. Configuration

Go to the Template module and include the Static TypoScript Template `JS Logger`.

## 3. Usage

Any error encountered in the frontend js should now be automatically be logged to the backend via ajax.
Alternatively you can now use *console.devlog()* in JavaScript to log messages.