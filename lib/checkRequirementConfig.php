<?php

$errors = array();

if( !isset($gameOptions) or !is_array($gameOptions) ) :
	$errors[] = 'La variable gameOptions doit etre definie, et de type array.';
endif;

$gameOptionsFields = array('duration', 'pointEarned', 'pointLost', 'pointToLevel1', 'winningLevel', 'timingTemps', 'percentToNextLevel', 'life', 'pointBonus');

foreach($gameOptionsFields as $ga) :
	if( !isset($gameOptions[$ga])) :
		$errors[] = 'La variable $gameOptions["'.$ga.'"] n\'est pas definie.';
	endif;
endforeach;

if( !defined("PRODUCT") ) :
	$errors[] = 'La constante PRODUCT doit etre definie';
endif;


if(count($errors) > 0) :
	print '<ul>';
	foreach ($errors as $error) {
		print '<li>' . $error . '</li>';
	}
	print '</ul>';
	die;
endif;
