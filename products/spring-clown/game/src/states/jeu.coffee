
# ready to fly : fc : 2017-02-01
#                _
#               {_}
#               /*\
#              /_*_\
#             {(-o')}
#          C==([^*^])==D
#              [ * ]
#             /  Y  \
#            _\__|__/_
#           (___/ \___)

class @YourGame extends Phacker.GameState

    update: ->
        @_fle_ = 'Update'
        super() #Required

        # .----------.----------
        resp =  @spriteO.collide @cols
        if resp is 'win' then @win()
        else if resp is 'loose'
            @spriteO.spt.destroy()
            @effectO.play(@spriteO)
            @lostLife()

        if @spriteO.check_height() is 'loose'
            @spriteO.spt.destroy()
            @effectO.play(@spriteO)
            @lostLife()

        # .----------.----------
        #@mouseO.check_down()
        @spriteO.jump()
        @camO.move @spriteO.spt
        @socleO.move_with_cam @game.camera.x

        @mouseO.when_down @spriteO.spt
        #@columnsO.dist_birds @spriteO


    resetPlayer: ->
        @spriteO = new Phacker.Game.Sprite @game, @columnsO, @mouseO, @camO
        @effectO.stop() # destroy effect
        @bonus_sound.play()
        @spriteO.reset()

    create: ->
        super() #Required

        @game.physics.startSystem(Phaser.Physics.ARCADE)
        @game.world.setBounds(0, 0, 19200000, @game.height + 500)

        #.----------.----------
        #  classes
        #.----------.----------
        @socleO = new Phacker.Game.Socle @game
        @glob = @socleO.glob # global parameters

        @mouseO = new Phacker.Game.My_mouse @game, @socleO

        @camO = new Phacker.Game.My_camera @game

        @columnsO = new Phacker.Game.Columns @game, @socleO
        @cols = @columnsO.cols

        @effectO = new Phacker.Game.Effects @game

        @spriteO = new Phacker.Game.Sprite @game, @columnsO, @mouseO, @camO
        #@mouseO.bind_sprite(@spriteO)

        @bonus_sound = @game.add.audio('bonusSound')
        @bonus_sound.play()