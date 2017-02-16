<?php

//Name of product used by the socle
define('PRODUCT', 'spring-clown');

$gameOptions = array(
	'duration' => 60,
	'pointEarned' => 10,
    'pointLost' => 5,
	'pointToLevel1' => 200,
    'winningLevel' =>1,
    'timingTemps'=> false,
    'percentToNextLevel' => 1.5,
    'life' => 3,
    'pointBonus' => 5,

    //Here You can add new specific parameters

    // the power of the clown string which gives vertical velocity on long click
    // .2 : too low,   .5 : too hight
    // maximum authorized 0.7  => jump 9 blocks
    // 0.45  => jump 3 blocks
    'spring_power' =>   .45,  
    // max time clicking at pMaxTime sprite is at the lowest frame
    'pMaxTime' => 700, // in ms
    //dx jumping constant in pixels
    'pMaxDx' => 375 //pxls

);

//REGIEREPLACE
