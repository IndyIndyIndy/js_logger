<?php /** @noinspection PhpUndefinedVariableInspection */

/***************************************************************
 * Extension Manager/Repository config file for ext: "js_logger"
 ***************************************************************/

$EM_CONF[$_EXTKEY] = [
    'title' => 'Boilerplate Extension',
    'description' => 'JSLogger for TYPO3. Log errors and exceptions users are encountering in the frontend to the TYPO3 backend.',
    'category' => 'misc',
    'author' => 'Christian Eßl',
    'author_email' => 'indy.essl@gmail.com',
    'state' => 'alpha',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '0.1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.0-9.5.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
