<?php
/**
 * Basic tests for the Go API.
 *
 * @group api
 */
class GoApiCest
{
    public function apiResponds(AcceptanceTester $I)
    {
        $I->amOnUrl('http://localhost:8080/');
        $I->seeResponseCodeIs(200);
    }
}
