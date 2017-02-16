<?php

$errors = array();

if(!file_exists('config.php')) {
	$errors[] = 'Le fichier config.php est oligatoire';
}

if(count($errors) > 0) :
	print '<ul>';
	foreach ($errors as $error) {
		print '<li>' . $error . '</li>';
	}
	print '</ul>';
	die;
endif;
