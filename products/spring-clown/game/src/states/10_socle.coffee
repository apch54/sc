
#-------------------------------------------------!
#            ####                  ####           !
#            ####=ooO=========Ooo= ####           !
#            ####  \\  (o o)  //   ####           !
#               --------(_)--------               !
#              --. ..- ...  .. ...   −− .         !
#-------------------------------------------------!
#                socle: 2017/01/16                !
#                      apch                       !
#-------------------------------------------------!


class Phacker.Game.Socle

    constructor: (@gm) ->
        @_fle_          = 'Socle'

        @glob = # global parameter"
            bg : # background
                x0  : 0
                y0  : 48 # background
                w   : if gameOptions.fullscreen  then 375 else 768
                h   : if gameOptions.fullscreen  then 559 - 48 else 500 - 48

            deco_2  : { y0  : if gameOptions.fullscreen then 559 - 360 else 500 - 360  }
            deco_1  : { y0  : if gameOptions.fullscreen then 559 - 360 + 42 else 500 - 360 + 42  }

            sea  :
                y01  : if gameOptions.fullscreen  then 559 - 34 else 500 - 34  # sea level 1,
                y02  : if gameOptions.fullscreen  then 559 - 41 else 500 - 41
                y03  : if gameOptions.fullscreen  then 559 - 51 else 500 - 51
                l3   : 15, v3: .15

            col  : #column parameters
                body : {w: 34,h: 25} # column parameters
                top  : {w: 34,h: 36}
            cloud :
                vx: 0.15
                dx: 0
                lx: 50

        @draw_bg()
        #@draw_last_sea()

    #.----------.----------
    # build socle
    #.----------.----------

    draw_bg :  ->
        @bg     = @gm.add.sprite @glob.bg.x0, @glob.bg.y0, 'bg_gameplay'  # 768x500
        @bg.fixedToCamera = true

        @bg_input  = @gm.add.sprite @glob.bg.x0, @glob.bg.y0, 'bg_gameplay'  # 768x500
        @bg_input.fixedToCamera = true
        @bg_input.alpha = 0
        @bg_input.inputEnabled = on
        @bg_input.bringToTop()

        @deco_2 = @gm.add.sprite 0, @glob.deco_2.y0, 'deco_2'  # 768x356
        @deco_2.fixedToCamera = true

        #clouds -----
        @cloud  = @gm.add.sprite -@glob.cloud.lx , @glob.bg.y0, 'cloud'  # 768x170
        #@cloud.fixedToCamera = true
        @cloud_tween = @gm.add.tween (@cloud)
        @cloud_tween.to( {  y:[ @glob.bg.y0 + 25 ,@glob.bg.y0 ] }, 8333, Phaser.Easing.Linear.None, true, 0, -1 )

        # deco -----
        @deco_1 = @gm.add.sprite 0, @glob.deco_1.y0, 'deco_1'  # 768x314
        @deco_1.fixedToCamera = true

        #seas -----

        @sea3   = @gm.add.sprite 0, @glob.sea.y03, 'sea3'  # 768x61
        #@sea3.fixedToCamera = true
        @sea3_tween = @gm.add.tween (@sea3)
        @sea3_tween.to( {  y:[@glob.sea.y03 - 10, @glob.sea.y03] }, 3000, Phaser.Easing.Linear.None, true, 0, -1 )

        @sea2   = @gm.add.sprite 0, @glob.sea.y02 , 'sea2'  # 768x44
        #@sea2.fixedToCamera = true
        @sea2_tween = @gm.add.tween (@sea2)
        @sea2_tween.to( {  y:[@glob.sea.y02 - 10, @glob.sea.y02] }, 2300, Phaser.Easing.Linear.None, true, 0, -1 )

        @sea1   = @gm.add.sprite 0, @glob.sea.y01 , 'sea1'  # 768x39
        #@sea1.fixedToCamera = true
        @sea1_tween = @gm.add.tween (@sea1)
        @sea1_tween.to( {  y:[@glob.sea.y01 + 5, @glob.sea.y01] }, 1600, Phaser.Easing.Linear.None, true, 0, -1 )


    #.----------.----------
    # handle last sea to get column inside sea
    # used for drawing a column
    #  & destroy to have column beside sea
    #.----------.----------

   # draw_last_sea : -> # not used
       # @sea1   = @gm.add.sprite 0, @glob.sea.y01 , 'sea1'  # 768x39
        #@sea1.fixedToCamera = true
        #@sea1_tween = @gm.add.tween (@sea1)
        #@sea1_tween.to( {  y:[@glob.sea.y01 + 5, @glob.sea.y01] }, 1600, Phaser.Easing.Linear.None, true, 0, -1 )


    destroy_last_sea : -> @sea1.destroy()

    #.----------.----------
    # fit sea.x with cam
    #.----------.----------
    move_with_cam:(camx)->

        @glob.cloud.dx += @glob.cloud.vx
        if  @glob.cloud.dx > @glob.cloud.lx then  @glob.cloud.vx *= -1
        else if @glob.cloud.dx < 0  then @glob.cloud.vx *= -1

        @sea3.x = camx
        @sea2.x = camx
        if @sea1? then @sea1.x = camx

        @cloud.x = camx + @glob.cloud.dx - @glob.cloud.lx

