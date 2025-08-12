<?php
class PagesCest
{
    public function _before()
    {
        @file_put_contents('/var/log/nginx/error.log', '');
    }

    public function allPagesReturn200(AcceptanceTester $I)
    {
        $pages = ['/', '/downloads.php', '/reactor_control.php'];
        foreach ($pages as $page) {
            $I->amOnPage($page);
            $I->seeResponseCodeIs(200);
            $I->dontSeePhpErrors();
        }
    }

    public function reactorApiEndpointWorks(AcceptanceTester $I)
    {
        $I->amOnPage('/reactor_control.php');
        $I->seeResponseCodeIs(200);
        $I->see('Reactor');
        $I->dontSeePhpErrors();
    }
}
