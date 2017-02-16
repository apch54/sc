class Phacker.WinState extends Phacker.BaseState
  textColor: '#ffffff' 

  isSubid: ->
    #You've got your REWARDS
    isSubid = false
    if location.search != ""
      s = location.search.replace '?', ''
      s = s.split '&'

      s.forEach (param) ->
        isSubid = true if param.split('=')[0] == 'subid'

    isSubid
  create: ->

    winStateSound = @game.add.audio 'winStateSound'
    winStateSound.play()


    duration = Math.round( (ge.generalTimer._now-ge.generalTimer._started)/1000 );

    @game.input.touch.preventDefault = false

    if @isSubid()
        if !ge.heart
            ge.heart = []

        callback gameOptions.winCallback, ge.score, ge.nb_replay, ge.heart.length, duration, gameOptions.pointToLevel1, true

    ge.resultTitle = @game.add.text(0, 0, 'Score : ',
      font: 'normal 17pt Helvetica'
      fill: '#585858')
    ge.resultTitle.x = 200
    ge.resultTitle.y = 200


    background = @game.add.image 0, 0, "win_bg"
    area = @game.add.image 0, 0, "win_area"
    logo = @game.add.image 0, 0, "win_logo"
    character = @game.add.image 0, 0, "win_character"

    replayButton = @game.add.button(0, 0, 'continue_button', (->
      if gameOptions.pub_ads_game
        console.log "AFG"
        afg()

      ge.nb_replay++;

      @game.state.start 'jeu'
    ), 0, 1, 0)

    closeButton = @game.add.button(0, 0, 'close_btn', (->
        window.location = gameOptions.closeRedirectWin
    ), 0, 1, 0)


    area.x = @game.width*0.5 - area.width*0.5
    area.y = @game.height*0.5 - area.height*0.5

    replayButton.x = @game.width*0.5 - replayButton.width*0.5
    replayButton.y = @game.height - replayButton.height - 22

    logo.x = @game.width*0.5 - logo.width*0.5
    logo.y = area.y*0.5 - logo.height*0.5

    character.x = @game.width*0.5 - character.width*0.5
    character.y = area.y + area.height - character.height - 50

    closeButton.x = area.x + area.width - (closeButton.width*0.5)
    closeButton.y = area.y - closeButton.height*0.5

    finalScoreTitle = @game.add.text 0, 0, "Score :\n" + ge.score ,
        font: 'normal 36pt Helvetica'
        fill: @textColor
        align: 'center'
    finalScoreTitle.x = @game.width*0.5 - finalScoreTitle.width*0.5
    finalScoreTitle.y = area.y + (character.y - area.y)*0.5 - finalScoreTitle.height*0.5

    super()
