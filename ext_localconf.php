<?php /** @noinspection PhpUndefinedVariableInspection */

defined('TYPO3_MODE') || die('Access denied.');

call_user_func(
    function ($extKey) {
        $GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['jslogger'] =
            \ChristianEssl\JsLogger\Log\JsLogger::class . '::log';
    },
    $_EXTKEY
);