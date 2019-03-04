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
- File name
- Line Number
- Column Number
- Url
- User Agent

@todo: handle source maps (for minified js)

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