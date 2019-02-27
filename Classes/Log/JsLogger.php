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
use TYPO3\CMS\Core\Http\Response;

/**
 * JsLogger
 */
class JsLogger
{
    /**
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
        $user = $this->getRequestParameter($request, 'user');

        var_dump($message);
        var_dump($file);
        var_dump($lineNumber);
        var_dump($colNumber);
        var_dump($url);
        var_dump($userAgent);
        var_dump($user);

        return new Response('');
    }

    /**
     * @param ServerRequestInterface $request
     * @param string $name
     *
     * @return string|null
     */
    private function getRequestParameter(ServerRequestInterface $request, string $name): ?string
    {
        $body = $request->getParsedBody();
        if (isset($body[$name]) && $body[$name] !== 'undefined') {
            return $body[$name];
        }
        return null;
    }

}