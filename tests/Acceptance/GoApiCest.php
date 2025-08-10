<?php

namespace Tests\Acceptance;

use Tests\Support\AcceptanceTester;

class GoApiCest
{
    public function apiHealthCheck(AcceptanceTester $I)
    {
        $apiBase = getenv('GO_API_BASE') ?: 'http://localhost:8080';
        $I->amOnUrl($apiBase . '/health');
        $I->seeResponseCodeIs(200);
    }
}
