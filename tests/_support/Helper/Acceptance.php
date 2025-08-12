<?php
namespace Helper;

use Codeception\Module;

class Acceptance extends Module
{
    public function dontSeePhpErrors()
    {
        $logFile = '/var/log/nginx/error.log';
        if (file_exists($logFile)) {
            $log = file_get_contents($logFile);
            if (preg_match('/PHP (Warning|Notice)/', $log)) {
                $this->fail('PHP warnings or notices found in server log: ' . $log);
            }
        }
    }
}
