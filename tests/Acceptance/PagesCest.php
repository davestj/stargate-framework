<?php

namespace Tests\Acceptance;

use Tests\Support\AcceptanceTester;

class PagesCest
{
    public function allPagesRespondSuccessfully(AcceptanceTester $I)
    {
        $pages = [
            '/',
            '/index.php',
            '/downloads.php',
            '/reactor_control.php',
            '/analytics.php',
            '/interactive_visualization.php',
            '/executive_summary_generator.php',
            '/presentation_builder.php',
            '/wormhole_travel_dashboard.php',
            '/3d_interactive_model.php',
            '/technical_docs.php',
            '/test_setup.php',
            '/metrics_feasability_dashboard.php'
        ];

        foreach ($pages as $page) {
            $I->amOnPage($page);
            $I->seeResponseCodeIs(200);
        }
    }
}
