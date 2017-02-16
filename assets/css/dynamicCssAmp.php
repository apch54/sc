body {
    background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/desktop_index/desktop_bg.jpg');
}

.text-block {
  background-image: -moz-linear-gradient( -90deg,<?php print $colors->text_block_gradiant_start ?> 0%,<?php print $colors->text_block_gradiant_end ?> 100%);
  background-image: -webkit-linear-gradient( -90deg,<?php print $colors->text_block_gradiant_start ?> 0%,<?php print $colors->text_block_gradiant_end ?> 100%);
  background-image: -ms-linear-gradient( -90deg,<?php print $colors->text_block_gradiant_start ?> 0%,<?php print $colors->text_block_gradiant_end ?> 100%);
}

.text-block, .text-block h1.title, .text-block a, .autopromo .header .titleSection h1, .autopromo .content .textSection {
  color: <?php print $colors->text_block_color; ?>;
}

/*ads*/
.ads {
  color: <?php print $colors->ads ?>;
}

.autopromo .content .actionSection .playnow {
    background-color:<?php print $colors->autopromo_playnow ?>;
}

/*playnowbutton*/
.playnow_btn {
  border-color: <?php print $colors->play_btn_border_color; ?>;
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn.png'), -moz-linear-gradient( -90deg, <?php print $colors->play_btn_gradiant_start; ?> 0%,<?php print $colors->play_btn_gradiant_end; ?> 100%);
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn.png'), -webkit-linear-gradient( -90deg, <?php print $colors->play_btn_gradiant_start; ?> 0%,<?php print $colors->play_btn_gradiant_end; ?> 100%);
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn.png'), -ms-linear-gradient( -90deg, <?php print $colors->play_btn_gradiant_start; ?> 0%, <?php print $colors->play_btn_gradiant_end; ?> 100%);

  background-position: center;
  background-repeat: no-repeat;

  border: 4px solid <?php print $colors->play_btn_border_color; ?>;
}

.playnow_btn:hover {
  border: 4px solid <?php print $colors->play_click_btn_border_color; ?>;
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn_over.png'), -moz-linear-gradient( -90deg, <?php print $colors->play_click_btn_gradiant_start; ?> 0%,<?php print $colors->play_click_btn_gradiant_end; ?> 100%);
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn_over.png'), -webkit-linear-gradient( -90deg, <?php print $colors->play_click_btn_gradiant_start; ?> 0%,<?php print $colors->play_click_btn_gradiant_end; ?> 100%);
  background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/play_btn_over.png'), -ms-linear-gradient( -90deg, <?php print $colors->play_click_btn_gradiant_start; ?> 0%, <?php print $colors->play_click_btn_gradiant_end; ?> 100%);
  background-position: center;
  background-repeat: no-repeat;
}

a.button.expand.item-menu {
  border-radius: 10px;
  border-color: <?php print $colors->menuitem_border_color; ?>;
  color: <?php print $colors->menuitem_text_color; ?>;
  background-image: -moz-linear-gradient( -90deg, <?php print $colors->menuitem_gradiant_start; ?> 0%, <?php print $colors->menuitem_gradiant_end; ?> 100%);
  background-image: -webkit-linear-gradient( -90deg, <?php print $colors->menuitem_gradiant_start; ?> 0%, <?php print $colors->menuitem_gradiant_end; ?> 100%);
  background-image: -ms-linear-gradient( -90deg, <?php print $colors->menuitem_gradiant_start; ?> 0%, <?php print $colors->menuitem_gradiant_end; ?> 100%);
  border-width: 2px;
  margin-top: 30px;

}

a.button.expand.item-menu:hover {
  border-radius: 10px;
  border-color: <?php print $colors->menuitem_click_border_color; ?>;
  color: <?php print $colors->menuitem_click_text_color; ?>;
  background-image: -moz-linear-gradient( -90deg, <?php print $colors->menuitem_click_gradiant_start; ?> 0%, <?php print $colors->menuitem_click_gradiant_end; ?> 100%);
  background-image: -webkit-linear-gradient( -90deg, <?php print $colors->menuitem_click_gradiant_start; ?> 0%, <?php print $colors->menuitem_click_gradiant_end; ?> 100%);
  background-image: -ms-linear-gradient( -90deg, <?php print $colors->menuitem_click_gradiant_start; ?> 0%, <?php print $colors->menuitem_click_gradiant_end; ?> 100%);
  border-width: 2px;
  margin-top: 30px;

}

.iphone-slider input,input {
  background-image:-webkit-gradient(linear,left top,left bottom,
      color-stop(0,<?php print $colors->sliderfs_gradiant_start ?>),color-stop(1,<?php print $colors->sliderfs_gradiant_end ?>)   );
  }
.iphone-slider input::-webkit-slider-thumb,input::-webkit-slider-thumb {
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASJJREFUeNpi7OnpYaAC0AXiF0D8mhzNTAzUASBHnAdim4F0BAhIA/EBIC4aSEeAADMQ9wLxRiDmHyhHwIAfNHqMiXZEcXExGJMCiNCjCMTHgDiTkFmM////p4rXe3t78Rm0DIjTgfgLNkkWoGZQij7MQFsQBY2aICC+Rq80gQ2oA/EZIE4YSEeAACcQzwfimVD2gDgCBtKgiVZlIB0BAgbQbBwykI5A5I4BtPsaNLfcHKiQWADEJiAHDERIfAfiLKgjBiQ67kCD/zK2NAFqjMyi0AJQVnPCI78GiBNxFttQF6ZToVjG5ohfoLoOiKcMVO54BA3+swPVntgKxIbEOIAWjvgLxJVA7APE7waisHoKxBFAfGSgSszL0MLnBTmaAQIMAKg/OsrT7JG8AAAAAElFTkSuQmCC'),-webkit-gradient(linear,left top,left bottom,
    color-stop(0,<?php print $colors->sliderfs_gradiant_start ?>),
    color-stop(0.49,<?php print $colors->sliderfs_gradiant_start ?>),
    color-stop(0.51,<?php print $colors->sliderfs_gradiant_end ?>),
    color-stop(1,<?php print $colors->sliderfs_gradiant_end ?>)   );
    background-repeat:no-repeat;background-position:50%;
}

@media screen and (max-width: 640px) {
    body {
        background-image: url('products/<?php echo PRODUCT ?>/design/mockup_devices/mobile_index/mobile_bg.jpg');
    }
}