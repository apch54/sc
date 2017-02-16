class Phacker.StartState extends Phacker.BaseState

  OneTwoThreeColor: 'white'

  create: ->

    ge.nb_replay = 0
    ge.score = 0
    ge.level = 0
    ge.nowinagain = true

    @game.input.touch.preventDefault = false

    background = @game.add.image 0, 0, 'intro_bg'
    logo = @game.add.image 0, 0, 'intro_logo'
    area = @game.add.image 0, 0, 'intro_area'
    vignette = @game.add.sprite 0, 0, 'intro_vig'

    area.x = @game.width*0.5 - area.width*0.5
    area.y = @game.height*0.5 - area.height*0.5

    logo.x = @game.width*0.5 - logo.width*0.5
    logo.y = area.y*0.5 - logo.height*0.5

    vignette.x = @game.width*0.5 - vignette.width*0.5
    vignette.y = area.y + 22

    #Placement du boutton start
    startButton = @game.add.button 0, 0, 'startButton', -> 
        if detectmob()
            onClickBackgroundHack()

        if gameOptions.pub_ads_game
            console.log "AFG"
            afg()

        @game.state.start 'jeu'
    ,@ ,1 ,0 ,1

    startButton.x = @game.width*0.5 - startButton.width*0.5
    startButton.y = @game.height - startButton.height - 22

    startButton.onInputOver.add ( ->
        @game.canvas.style.cursor = "pointer";
    ).bind @

    startButton.onInputOut.add ( ->
        @game.canvas.style.cursor = "default"
    ).bind @


    style =
        font: 'Arial'
        fill: @OneTwoThreeColor
        align: 'center'
        fontSize: "16px"

    txt1 = @game.add.text 0, 0, tutoTexts.first, style
    txt1.x = @game.width*0.5 - txt1.width*0.5
    txt1.y = vignette.y + vignette.height + 10

    txt2 = @game.add.text 0, 0, tutoTexts.second, style
    txt2.x = @game.width*0.5 - txt2.width*0.5
    txt2.y = txt1.y + txt1.height + 5

    txt3 = @game.add.text 0, 0, tutoTexts.third, style
    txt3.x = @game.width*0.5 - txt3.width*0.5
    txt3.y = txt2.y + txt2.height + 5

    super()
