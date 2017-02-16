<?php

function checkBanners() {

  $files = array('250x250.gif', '300x250.gif', '300x50.gif', '320x100.gif', '320x480.gif', '320x50.gif', '728x90.gif', '768x1024.gif', 'icone.png');

  $isAbsent = false;
  foreach( $files as $file ) :
    if( !file_exists(dirname(__FILE__).'/../banners/'.$file) ) {
      $isAbsent = true;
      break;
    }
  endforeach;

  if($isAbsent) {

    print '<div id="checkBanners">Des bannieres sont absentes, <a href="banners.php">check ici</a></div>';

  }

}
