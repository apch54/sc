class Phacker.LoaderState
  loaderColor: 0x666666
  OneTwoThreeColor: 'white'
  nextState: 'intro'

  specificAssets: ->

  preload: ->

    @game.load.enableParallel = false

    @game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    @game.input.touch.preventDefault = false

    # Correk
    #
    # General

    if gameOptions.fullscreen == true
      type = "mobile"
    else
      type = "desktop"

    #Loader
    @game.load.spritesheet 'loadinghack', root_design+type+'/'+type+'_states/'+type+'_loading/'+type+'_loading_sprite.jpg', @game.width, @game.height

    #Intro
    @game.load.image 'intro_bg', root_design+type+'/'+type+'_states/'+type+'_intro/intro_bg.jpg'
    @game.load.image 'intro_logo', root_design+type+'/'+type+'_states/'+type+'_intro/intro_logo.png'
    @game.load.image 'intro_area', root_design+type+'/'+type+'_states/'+type+'_intro/intro_area.png'
    @game.load.image 'intro_vig', root_design+type+'/'+type+'_states/'+type+'_intro/intro_vig.jpg'
    @game.load.spritesheet 'startButton', root_design+type+'/'+type+'_states/'+type+'_intro/start_btn.png', 200, 58

    #Game Over
    @game.load.image 'gameover_bg', root_design+type+'/'+type+'_states/'+type+'_gameover/gameover_bg.jpg'
    @game.load.image 'gameover_area', root_design+type+'/'+type+'_states/'+type+'_gameover/gameover_area.png'
    @game.load.image 'gameover_logo', root_design+type+'/'+type+'_states/'+type+'_gameover/gameover_txt.png'
    @game.load.image 'gameover_character', root_design+type+'/'+type+'_states/'+type+'_gameover/gameover_character.png'
    @game.load.spritesheet 'retry_button', root_design+type+'/'+type+'_states/'+type+'_gameover/retry_btn.png', 200, 58

    #General
    @game.load.image 'close_btn', root_design+type+'/'+type+'_states/close_btn.png'
    @game.load.image 'view_full', root_design+type+'/'+type+'_states/view_full.png'

    #Win
    @game.load.image 'win_bg', root_design+type+'/'+type+'_states/'+type+'_win/win_bg.jpg'
    @game.load.image 'win_area', root_design+type+'/'+type+'_states/'+type+'_win/win_area.png'
    @game.load.image 'win_logo', root_design+type+'/'+type+'_states/'+type+'_win/win_txt.png'
    @game.load.image 'win_character', root_design+type+'/'+type+'_states/'+type+'_win/win_reward_txt.png'
    @game.load.spritesheet 'continue_button', root_design+type+'/'+type+'_states/'+type+'_win/continue_btn.png', 200, 58

    #Gameplay
    @game.load.image 'status_bar', root_design+type+'/'+type+'_gameplay/statusbar_bg.png'
    @game.load.image 'scoreicon', root_design+type+'/'+type+'_gameplay/score_icon.png'
    @game.load.image 'chronos', root_design+type+'/'+type+'_gameplay/timer.png'
    @game.load.image 'statusbarpump', root_design+type+'/'+type+'_gameplay/level_icon.png'
    @game.load.image 'heart', root_design+type+'/'+type+'_gameplay/remaining_life.png'
    @game.load.image 'dead', root_design+type+'/'+type+'_gameplay/used_life.png'

    @specificAssets()

    loaderFiles = @game.add.graphics()
    loaderFiles.beginFill(0x00c6ff, 0)
    loaderFiles.drawRect(@game.width/2 - (@game.width*0.75)/2, @game.height*0.5, @game.width*0.75, 30)
    loaderFilesProgress = @game.add.graphics()
    loaderFilesProgress.beginFill(0x00c6ff, 1)
    loaderFilesProgress.drawRect(@game.width/2 - (@game.width*0.75)/2, @game.height*0.5, 0, 30)

    signalFile = @game.load.onFileComplete.add ( (eta, key) ->
      if key == "loadinghack"
        background = @game.add.sprite 0, 0, 'loadinghack'
        background.animations.add 'play', [0,1,2,3], 5, true
        background.play 'play'

        style =
            font: 'Arial'
            fill: @OneTwoThreeColor
            align: 'center'
            fontSize: "16px"

        txt1 = @game.add.text 0, 0, tutoTexts.first, style
        txt1.x = @game.width*0.5 - txt1.width*0.5
        txt1.y = 315

        txt2 = @game.add.text 0, 0, tutoTexts.second, style
        txt2.x = @game.width*0.5 - txt2.width*0.5
        txt2.y = 340

        txt3 = @game.add.text 0, 0, tutoTexts.third, style
        txt3.x = @game.width*0.5 - txt3.width*0.5
        txt3.y = 365

      if key == "view_full"
        if gameOptions.fullscreen == false and detectmob()
            fullscreen = @game.add.button 0, 0, 'view_full', ->
                onClickBackgroundHack()
            ,@ ,0 ,0 ,0

            fullscreen.x = @game.width - fullscreen.width - 50
            fullscreen.y = 50

      #Si la page est chargee
      if eta == 100
        loaderFiles.destroy()
        loaderFilesProgress.destroy()
        signalFile.detach()

        @game.state.start @nextState
      else
        loaderFilesProgress.destroy()
        loaderFilesProgress = @game.add.graphics()
        loaderFilesProgress.beginFill(@loaderColor, 1)
        
        if gameOptions.fullscreen == false
          loaderFilesProgress.drawRect(100, 400, loaderFiles.graphicsData[0].shape.width * eta / 100, 30)
        else
          loaderFilesProgress.drawRect(50, 450, loaderFiles.graphicsData[0].shape.width * eta / 100, 20)

    ).bind @
