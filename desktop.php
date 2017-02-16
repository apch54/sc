<?php
    require_once 'lib/checkRequirement.php';
    require_once 'config.php';
    require_once 'lib/checkRequirementConfig.php';
    require_once 'lib/isMobile.php';

    define("ROOT_GAME", "products/".PRODUCT."/game/");
    define("ROOT_DESIGN", "products/".PRODUCT."/design/");
    define("ROOT_AUDIO", "products/".PRODUCT."/audio/");

    foreach($_GET as $pkey => $pval) :

        $type = gettype($gameOptions[$pkey]);

        switch($type) {
            case "integer":
                $gameOptions[$pkey] = intval($pval);
            break;
            case "boolean":
                if($pval == 'true') :
                    $gameOptions[$pkey] = true;
                else :
                    $gameOptions[$pkey] = false;
                endif;
            break;
            case "double":
                $gameOptions[$pkey] = floatval($pval);
            break;
            case "string":
                $gameOptions[$pkey] = strval($pval);
            break;
        }


    endforeach;
    $gameOptions['fullscreen'] = false;
?>

<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Socle DEV</title>

    <script type="text/javascript" src="assets/libs/foundation/js/vendor/jquery.js"></script>
    <script src="assets/js/backgroundHack.js"></script>
    <style type="text/css">body { margin: 0; }</style>
  </head>
  <body>
    <script type="text/javascript">
      var gameOptions = <?php print json_encode($gameOptions); ?>;
    </script>

    <div id="page">

      <div class="row" id='game-container'>
          <img src="products/<?php print PRODUCT ?>/design/desktop/desktop_states/desktop_loading/desktop_loading_hack.gif" onClick="onClickBackgroundHack()" class="backgroundGame" />
      </div>

    </div>


    <script type="text/javascript">
      var tutoTexts = {
        first: "Game Tuto 1",
        second: "Game Tuto 2",
        third: "Game Tuto 3"
      }
    </script>

    <?php if(trim(file_get_contents(dirname(__FILE__).'/products/'.PRODUCT.'/game/BOX2D')) == 'true') : ?>
      <script type="text/javascript" src="assets/libs/phaser/phaser-230-box2d.js"></script>
    <?php elseif(trim(file_get_contents(dirname(__FILE__).'/products/'.PRODUCT.'/game/BOX2D')) == 'false') : ?>
      <script type="text/javascript" src="assets/libs/phaser/phaser.min.js"></script>
    <?php endif; ?>

    <script>
      var root_game = "<?php print ROOT_GAME; ?>";
      var root_design = "<?php print ROOT_DESIGN; ?>";
      var root_audio = "<?php print ROOT_AUDIO; ?>";
    </script>

    <script type="text/javascript" src="assets/libs/pGame/pGame.js"></script>
    <script type="text/javascript" src="assets/libs/phacker/build/phacker.js"></script>
    <script type="text/javascript" src="<?php print ROOT_GAME ?>build/game.js"></script>
    <script type="text/javascript" src="assets/js/PhackerLauncher.js.php?type=desktop"></script>

  </body>
</html>
