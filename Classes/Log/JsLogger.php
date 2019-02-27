<?php

namespace ChristianEssl\JsLogger\Log;

/***
 *
 * This file is part of the "JsLogger" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2019 Christian Eßl <indy.essl@gmail.com>, https://christianessl.at
 *
 ***/

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerAwareTrait;
use TYPO3\CMS\Core\Http\Response;

/**
 * JsLogger
 */
class JsLogger implements \Psr\Log\LoggerAwareInterface
{

    use LoggerAwareTrait;

    /**
     * Log the data from the ajax request to the PSR Logger
     *
     * @param ServerRequestInterface $request
     *
     * @return ResponseInterface
     */
    public function log(ServerRequestInterface $request): ResponseInterface
    {
        $message = $this->getRequestParameter($request, 'message');
        $file = $this->getRequestParameter($request, 'file');
        $lineNumber = $this->getRequestParameter($request, 'lineNumber');
        $colNumber = $this->getRequestParameter($request, 'colNumber');
        $url = $this->getRequestParameter($request, 'url');
        $userAgent = $this->getRequestParameter($request, 'userAgent');

        $this->logger->error($message, [
            'message' => $message,
            'file' => $file,
            'lineNumber' => $lineNumber,
            'colNumber' => $colNumber,
            'url' => $url,
            'userAgent' => $userAgent,
        ]);

        return new Response('');
    }

    /**
     * Parse the request parameters
     *
     * @param ServerRequestInterface $request
     * @param string $name
     *
     * @return string|null
     */
    private function getRequestParameter(ServerRequestInterface $request, string $name): ?string
    {
        $body = $request->getParsedBody();
        if (isset($body[$name]) && $body[$name] !== 'undefined') {
            return htmlspecialchars($body[$name]);
        }
        return null;
    }

}