<html>
    <head>

        <style>
            body {
                padding: 0;
                margin: 0;
            }
            .params {
                margin: 0;
                padding: 0;
                width: 80%;
                position: fixed;
                bottom: 0;
                background-color: #4CAF50;
                padding: 20px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                border-radius: 0 10px 0 0;
            }

            .param {
                display: flex;
                flex: 1;
                flex-direction: column;
                align-items: center;
                padding: 10px;
            }

            .submit {
                display: flex;
                flex: 1;
                align-items: center;
            }

            .submit input {
                font-size: 1.3em;
            }

            .param label {
                display: flex;
                flex: 1;
                font-family: arial;
                font-size: 0.8em;
                margin-bottom: 5px;
            }

            .param input {
                display: flex;
                width: 50px;
                flex: 1;
                text-align: center;
            }
            .spritesTitle {
                background-color: green;
                margin:0;
                padding:0;
                text-align: center;
                color: white;
                font-weight: normal;
                font-size: Arial;
                font-size: 1em;
                padding-top: 5px;
            }
            .sprites {
                text-align: center;
                background-color: green;
            }
            .sprites .fancybox img {
                margin: 5px;
                border: 1px solid red;
            }

        </style>


        <!-- Add jQuery library -->
        <script type="text/javascript" src="assets/libs/fancyBox/lib/jquery-1.10.2.min.js"></script>

        <!-- Add mousewheel plugin (this is optional) -->
        <script type="text/javascript" src="assets/libs/fancyBox/lib/jquery.mousewheel.pack.js?v=3.1.3"></script>

        <!-- Add fancyBox main JS and CSS files -->
        <script type="text/javascript" src="assets/libs/fancyBox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
        <link rel="stylesheet" type="text/css" href="assets/libs/fancyBox/source/jquery.fancybox.css?v=2.1.5" media="screen" />

        <!-- Add Button helper (this is optional) -->
        <link rel="stylesheet" type="text/css" href="assets/libs/fancyBox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
        <script type="text/javascript" src="assets/libs/fancyBox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>

        <!-- Add Thumbnail helper (this is optional) -->
        <link rel="stylesheet" type="text/css" href="assets/libs/fancyBox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
        <script type="text/javascript" src="assets/libs/fancyBox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

        <!-- Add Media helper (this is optional) -->
        <script type="text/javascript" src="assets/libs/fancyBox/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

    </head>
    <body>
        <?php

            $paramsGET = "?";
            foreach($_POST as $key => $val) :
                $paramsGET .= '&'.$key.'='.$val;
            endforeach;




            require_once dirname(__FILE__).'/config.php';
            $reSpriteSheet = '/(.+)SPR([0-9]+).(png|jpg)/';
            $reImage = '/(.+).(png|jpg)/';
            $pathToGameAssets = 'products/'.PRODUCT.'/design/desktop/desktop_gameplay/game_objects/';
            $fullPathToGameAssets = dirname(__FILE__)."/".$pathToGameAssets;
            $colors = json_decode(file_get_contents(dirname(__FILE__).'/products/'.PRODUCT.'/design/colors.json'));

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

        <h3 class="spritesTitle">Listing of Assets Available (click to informations)</h3>
        <div class="sprites">
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
                            print '<a href="'.getRelativePath($fullFile).'" class="fancybox" rel="gallery" title="'.$sprName.' ('.round($sprWidth/$nbFrames).'x'.$sprHeight.'px) '.$nbFrames.' frames"><img src="'.getRelativePath($fullFile).'" height="30px" /></a>';
                        else :
                            $size = getimagesize($fullFile);
                            $imgWidth = $size[0];
                            $imgHeight = $size[1];
                            print '<a href="'.getRelativePath($fullFile).'" class="fancybox" rel="gallery" title="'.$imgMatches[1].' ('.round($imgWidth).'x'.$imgHeight.'px)"><img src="'.getRelativePath($fullFile).'" height="30px" /></a>';
                        endif;
                    endif;
            ?>

            <?php endforeach; ?>
        </div>
        <script>
            $(document).ready(function() {
                $('.fancybox').fancybox();
            });
        </script>

        <div style="margin: auto; display: inline-block; display: flex; flex-direction: row;">
            <div style="display: flex; flex-direction: column; flex:1; align-items:center;">
                <iframe src="desktop.php<?php print $paramsGET; ?>" width="768" height="500" style="border: 1px solid black;"></iframe>
                <h2>Desktop Mode</h2>
            </div>
            <div style="display: flex; flex-direction: column; flex:1; align-items:center;">
                <iframe src="fullscreen.php<?php print $paramsGET; ?>" width="336" height="500" style="border: 1px solid black; display: flex; flex-direction: column; flex: 1"></iframe>
                <h2>Full Screen Mode</h2>
            </div>
        </div>

        <form method="post" class="params">
            <?php foreach($gameOptions as $option => $value): ?>
                <div class="param">
                    <label><?php print $option; ?></label>

                    <?php
                        if(isset($_POST[$option])):
                            $val = $_POST[$option];
                        else:
                            $val = $value;
                            if(gettype($val) == 'boolean') :
                                if($val == true):
                                    $val = 'true';
                                else :
                                    $val = 'false';
                                endif;
                            endif;
                        endif;
                    ?>

                    <input type='text' name='<?php print $option; ?>' value='<?php print $val; ?>'>
                </div>
            <?php endforeach; ?>
            <div class="submit">
                <input type='submit' value='Edit Parametters'>
            </div>
        </form>
    </body>
</html> 
