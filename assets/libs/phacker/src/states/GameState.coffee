pointToLevel = (x) ->
    if x == 1
        return gameOptions.pointToLevel1

    return pointToLevel(x-1) + ( pointToLevel(x-1) * gameOptions.percentToNextLevel );

class Phacker.GameState extends Phacker.BaseState
    statusBarTextColor: 'white'
    timerColor: 0x666666
    timerBgColor: 0xffffff

    create: ->
        super()

        @game.input.touch.preventDefault = true

        if gameOptions.pub_ads_game
            @game.paused = true

        ge.generalTimer = @game.time.create()
        ge.generalTimer.add gameOptions.duration * 1000, ( ->
            if ge.level >= gameOptions.winningLevel and gameOptions.timingTemps == true and ge.generalTimer.duration == 0 and ge.nowinagain == true
                ge.nowinagain = false
                @game.state.start 'win'
            else
                @game.state.start 'gameOver'
        ).bind @

        ge.generalTimer.start()

        @statusBar = @game.add.image(0, 0, 'status_bar')
        @statusBar.fixedToCamera = true

        # else
        @timerBase = @game.add.graphics(0, 0)
        @timerBase.beginFill @timerBgColor, 1
        @timerBase.drawRect 0, 0, @statusBar.width*0.25, 10
        @timerBase.graphicsData[0].shape.x = @statusBar.width*0.5 - @timerBase.graphicsData[0].shape.width*0.5
        @timerBase.graphicsData[0].shape.y = @statusBar.height*0.5 - @timerBase.graphicsData[0].shape.height*0.5
        @timerBase.fixedToCamera = true

        @remainingTime = @game.add.graphics(0, 0)
        @remainingTime.beginFill @timerColor, 1
        @remainingTime = @remainingTime.drawRect(0, 0, 0, @timerBase.graphicsData[0].shape.height)
        @remainingTime.graphicsData[0].shape.x = @timerBase.graphicsData[0].shape.x
        @remainingTime.graphicsData[0].shape.y = @timerBase.graphicsData[0].shape.y
        @remainingTime.fixedToCamera = true

        @chronos = @game.add.image(0, 0, 'chronos')
        @chronos.x = @timerBase.graphicsData[0].shape.x - @chronos.width - 5
        @chronos.y = @statusBar.height*0.5 - @chronos.height*0.5
        @chronos.fixedToCamera = true

        @scoreIcon = @game.add.image(0, 0, 'scoreicon')
        @scoreIcon.x = @statusBar.x + 20
        @scoreIcon.y = @statusBar.height*0.5 - @scoreIcon.height*0.5
        @scoreIcon.fixedToCamera = true

        @scoreText = @game.add.text(0, 0, ge.score,
            font: 'bold 18pt Lobster'
            fill: @statusBarTextColor)
        @scoreText.x = @scoreIcon.x + @scoreIcon.width + 10
        @scoreText.y = @statusBar.height*0.5 - @scoreText.height*0.5
        @scoreText.fixedToCamera = true


        @levelText = @game.add.text(0, 0, ge.level,
            font: 'bold 18pt Lobster'
            fill: @statusBarTextColor)
        @levelText.x = @statusBar.x + @statusBar.width - @levelText.width - 20
        @levelText.y = @statusBar.height*0.5 - @levelText.height*0.5
        @levelText.fixedToCamera = true

        @levelIcon = @game.add.image(0, 0, 'statusbarpump')
        @levelIcon.x = @levelText.x - @levelIcon.width - 10
        @levelIcon.y = @statusBar.height*0.5 - @levelIcon.height*0.5
        @levelIcon.fixedToCamera = true

        if gameOptions.fullscreen
            @timerBase.graphicsData[0].shape.y = 10
            @remainingTime.graphicsData[0].shape.y = 10

        @deadlifeInit()
        @lifeInit()
    update: ->
        @remainingTime.graphicsData[0].shape.width = ge.generalTimer.duration * @statusBar.width / 4 / (gameOptions.duration * 1000)

        if ge.level >= gameOptions.winningLevel and gameOptions.timingTemps == false and ge.nowinagain == true
            ge.nowinagain = false
            @game.state.start 'win'

        if ge.level == 0

            if ge.score >= gameOptions.pointToLevel1
                ge.level++

                @levelText.setText ge.level
        else
            if ge.score >= pointToLevel(ge.level+1)
                ge.level++
                @levelText.setText ge.level
    win: ->
        winSound = @game.add.audio 'winSound'
        winSound.play()

        ge.score += gameOptions.pointEarned
        @scoreText.setText(ge.score)
        @scoreText.x = @scoreIcon.x + @scoreIcon.width + 10
        @scoreText.y = @statusBar.height*0.5 - @scoreText.height*0.5
    winBonus: ->
        bonusSound = @game.add.audio 'bonusSound'
        bonusSound.play()
        
        ge.score += gameOptions.pointBonus
        @scoreText.setText(ge.score)
        @scoreText.x = @scoreIcon.x + @scoreIcon.width + 10
        @scoreText.y = @statusBar.height*0.5 - @scoreText.height*0.5
    lost: ->
        lostSound = @game.add.audio 'lostSound'
        lostSound.play()

        ge.score = Math.max(0, ge.score - gameOptions.pointLost)
        @scoreText.setText(ge.score)
        @scoreText.x = @scoreIcon.x + @scoreIcon.width + 10
        @scoreText.y = @statusBar.height*0.5 - @scoreText.height*0.5
    lostLife: ->
        lastElement = ge.heart[ge.heart.length - 1]
        lastElement.destroy()
        ge.heart.pop()
        @lost()
        if ge.heart.length == 0
            @game.time.events.add Phaser.Timer.SECOND * 2, @endGame, this
        else
            @game.time.events.add Phaser.Timer.SECOND * 2, @resetPlayer, this

        return
    endGame: ->
        @game.state.start 'gameOver'
    lifeInit: ->
        `var heartImg`
        ge.heart = []
        i = 0
        while i < gameOptions.life
            if gameOptions.fullscreen == false
                if ge.heart.length == 0
                    heartImg = @game.add.image(0, @statusBar.y+15 , 'heart')
                    heartImg.x = @timerBase.graphicsData[0].shape.x + @timerBase.graphicsData[0].shape.width + 20
                    heartImg.y = @statusBar.height*0.5 - heartImg.height*0.5
                else
                    lastElement = ge.heart[ge.heart.length - 1]
                    heartImg = @game.add.image(0, 0, 'heart')
                    heartImg.x = lastElement.x + lastElement.width + 5
                    heartImg.y = lastElement.y

                    lastElement.fixedToCamera = true


                heartImg.fixedToCamera = true
                ge.heart.push heartImg
                i++

            else

                if ge.heart.length == 0
                    heartImg = @game.add.image(0, 28 , 'heart')
                    heartImg.scale.setTo(0.7,0.7)
                    heartImg.x = 140
                    # heartImg.scale.setTo(0.5,0.5);
                else
                    lastElement = ge.heart[ge.heart.length - 1]
                    heartImg = @game.add.image(lastElement.x + lastElement.width + 2, 28, 'heart')
                    lastElement.fixedToCamera = true
                heartImg.fixedToCamera = true
                heartImg.scale.setTo(0.7,0.7);
                ge.heart.push heartImg
                i++
        return
    deadlifeInit: ->
        `var heartImg1`
        ge.deadheart = []
        i = 0
        if gameOptions.fullscreen == false
            while i < gameOptions.life
                if ge.deadheart.length == 0
                    heartImg1 = @game.add.image(0, 0, 'dead')
                    heartImg1.x = @timerBase.graphicsData[0].shape.x + @timerBase.graphicsData[0].shape.width + 20
                    heartImg1.y = @statusBar.height*0.5 - heartImg1.height*0.5
                else
                    lastElement = ge.deadheart[ge.deadheart.length - 1]
                    heartImg1 = @game.add.image(0, 0, 'dead')
                    heartImg1.x = lastElement.x + lastElement.width + 5
                    heartImg1.y = lastElement.y
                    lastElement.fixedToCamera = true
                heartImg1.fixedToCamera = true
                ge.deadheart.push heartImg1
                i++
        else

            while i < gameOptions.life
                if ge.deadheart.length == 0
                    heartImg1 = @game.add.image(0, 28, 'dead')
                    heartImg1.scale.setTo(0.7,0.7)
                    heartImg1.x = 140
                    # heartImg.scale.setTo(0.5,0.5);
                else
                    lastElement = ge.deadheart[ge.deadheart.length - 1]
                    heartImg1 = @game.add.image(lastElement.x + lastElement.width + 2, 28 , 'dead')
                    heartImg1.scale.setTo(0.7,0.7);
                    lastElement.fixedToCamera = true
                heartImg1.fixedToCamera = true
                ge.deadheart.push heartImg1
                i++

        return

