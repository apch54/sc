<?php
require_once dirname(__FILE__).'/../../config.php';
$type = $_GET['type'];
$reSpriteSheet = '/(.+)SPR([0-9]+).(png|jpg)/';
$reImage = '/(.+).(png|jpg)/';
$pathToGameAssets = 'products/'.PRODUCT.'/design/'.$type.'/'.$type.'_gameplay/game_objects/';
$fullPathToGameAssets = dirname(__FILE__)."/../../".$pathToGameAssets;
$colors = json_decode(file_get_contents(dirname(__FILE__).'/../../products/'.PRODUCT.'/design/colors.json'));

function getDirContents($dir, $filter = '', &$results = array()) {
    $files = scandir($dir);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);

        if(!is_dir($path)) {
            if(empty($filter) || preg_match($filter, $path)) $results[] = $path;
        } elseif($value != "." && $value != "..") {
            getDirContents($path, $filter, $results);
        }
    }

    return $results;
}

function getRelativePath($relativePath){
    $relativePath = str_replace('\\', '/', $relativePath);
    $here = $_SERVER["DOCUMENT_ROOT"];
    
    $str = str_replace($here, '', $relativePath);
    
    $str = str_replace('\\', '/', $str);
    return $str;
}

?>
(function() {
    var game;

    game = new Phacker.Game();

    game.setGameState(YourGame);

    game.setSpecificAssets(function() {
        <?php
            foreach(getDirContents($fullPathToGameAssets, $reImage) as $file) :
                $fullFile = $file;
                $file = basename($file);
                if(preg_match($reImage, $file, $imgMatches)) :
                    if(preg_match($reSpriteSheet, $file, $sprMatches)) :
                        $sprName = $sprMatches[1];
                        $nbFrames = $sprMatches[2];
                        $size = getimagesize($fullFile);
                        $sprWidth = $size[0];
                        $sprHeight = $size[1];
                        print "this.game.load.spritesheet('".$sprName."', '".getRelativePath($fullFile)."', ".round($sprWidth/$nbFrames).", ".$sprHeight.");\n";
                    else :
                        print "this.game.load.image('".$imgMatches[1]."', '".getRelativePath($fullFile)."');\n";
                    endif;
                endif;
            endforeach;
        ?>
        this.game.load.audio('winSound', root_audio + 'win.mp3');
        this.game.load.audio('lostSound', root_audio + 'lost.mp3');
        this.game.load.audio('bonusSound', root_audio + 'bonus.mp3');
        this.game.load.audio('gameOverStateSound', root_audio + 'gameOverState.mp3');
        this.game.load.audio('winStateSound', root_audio + 'winState.mp3');
    });

    game.setTextColorGameOverState('<?php print $colors->text_color_gameover ?>');
    game.setTextColorWinState('<?php print $colors->text_color_win ?>');
    game.setTextColorStatus('<?php print $colors->text_color_statusbar ?>');
    game.setOneTwoThreeColor(0x<?php print str_replace('#', '', $colors->text_color_onetwothree) ?>);
    game.setLoaderColor(0x<?php print str_replace('#', '', $colors->color_loader) ?>);
    game.setTimerColor(0x<?php print str_replace('#', '', $colors->color_timer) ?>);
    game.setTimerBgColor(0x<?php print str_replace('#', '', $colors->color_timer_bg) ?>);

    this.pauseGame = function() {
        return game.game.paused = true;
    };

    this.replayGame = function() {
        return game.game.paused = false;
    };

    this.GCSRelaunch = function() {
        return game.GCSRelaunch();
    };

    this.GCSNotElig = function() {
        return game.GCSNotElig();
    };

    game.run();

}).call(this);
