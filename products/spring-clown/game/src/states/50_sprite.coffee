# fc on 2017-02-02


class Phacker.Game.Sprite
    # @spt stand for sprite
    # @cols stands for @columns

    constructor: (@gm, @columnsO, @mouseO, @camO ) ->
        @_fle_ ='Sprite'
        #
        #.----------.----------
        @has_collided = true
        @jumping = false
        #@vy = gameOptions.spring_power # ratio vx per 1/60 sec for jumping
        @hit_resp = ''
        @too_low = false
        @is_reseting = true

        #.----------.----------
        # jmp parameters
        @jmp_p =
            # ratio vx per 1/60 sec for jumping
            vy : gameOptions.spring_power * 700 / gameOptions.pMaxTime
            vx : gameOptions.pMaxDx * .75
            g  : 530 # gravity
            dy : 4 #

        @check_jump_p() #verify jump parameter
        #.----------.----------


        @spt = @gm.add.sprite @columnsO.prms.x0, 200, 'character_sprite' ,3 #35x60
        @gm.physics.arcade.enable @spt
        @spt.body.bounce.set 0
        @spt.body.gravity.y = @jmp_p.g

        @spt.body.setSize(11,60,12,0)# w, h, offset x, offset y
        @spt.anchor.setTo(0.5, 1) # anchor in the middle of bottomn

        @anim_down = @spt.animations.add 'down', [0,  2,  4,  6, 7, 6,  4,  2,  0], 20, false
        @anim_down.onComplete.add(
            ->   @spt.frame = 0
            @
        )
        @anim_jump = @spt.animations.add 'jump', [ 7, 6, 5, 4, 3, 2, 1, 0], 20, false
        @anim_jump.onComplete.add(
            ->   @spt.frame = 0
            @
        )
        @spt.frame = 0
        #@spt.body.velocity.x = 0

    #.----------.----------
    # test collision colums & sprite
    #.----------.----------
    collide :(cols) ->

        for col in cols[0..3]
            if  @gm.physics.arcade.collide(
                @spt, col.col
                -> return true #if -3 < @spt.y - col.col.y < 3 # it has_collided

                (spt, col ) -> @when_collide spt, col , @jmp_p.dy #callback when hit
                @
            ) then return @hit_resp #it has_collided cam
        #console.log "- #{@_fle_} : ",@columnsO.cols[0].col.getAt(0).x
        return 'nothing' #sprite has not collided

    #.----------.----------
    # collide callback
    #.----------.----------
    #sprite & column, dy is the variation y when sprite touching the column
    when_collide:(spt, col, dy)->

        if @is_reseting then spt.animations.play 'down'
        @is_reseting = false

        if not @has_collided # only once

            spt.body.velocity.x = 0 # stop sprite 
            @has_collided = true # only once collision
            @jumping = false # no jump in jump

            @columnsO.last_col = {x: col.x, y:col.y} #; console.log "- #{@_fle_} : ",@columnsO.last_col
            @columnsO.destroy_create @columnsO.last_col.x # destry & create col if collide

            #collide only on top only
            #.log "- #{@_fle_} : ", spt.y - col.y, gameOptions.spring_power,@jump_p
            if  -dy  <  (spt.y - col.y)  <  dy
                spt.animations.play 'down'
                @hit_resp = 'win'
            else
                @hit_resp = 'loose'
                #console.log "- #{@_fle_} : ",spt.frame

        else @hit_resp = 'nothing'

    #.----------.----------
    # test if mouse up to jump the sprite
    #.----------.----------

    jump:->

        if not @mouseO.mouse.down and @mouseO.mouse.dt > 0 and not @jumping and not @is_reseting
            if not @spt.body? then return
            #console.log "- #{@_fle_} : ",@mouseO.mouse
            @spt.animations.play 'down'
            @jumping = true # no jump in jump
            @has_collided = false

            @spt.body.velocity.y = -@mouseO.mouse.dt * @jmp_p.vy #-@mouseO.mouse.dt * @vy
            @spt.body.velocity.x =  @jmp_p.vx #gameOptions.pMaxDx * .75  # @mouseO.mouse.dt * @vy

        @mouseO.mouse.dt = 0

    #.----------.----------
    #  reset after loose
    #.----------.----------

    reset: ->
        @is_reseting = true
        @jumping = false
        @has_collided = true
        @too_low = false
        @mouseO.reset()
        @spt.frame = 0
        @spt.x = @columnsO.cols[0].col.getAt(0).x #last_col.x
        @spt.body.velocity.y = 0
        @spt.body.velocity.x = 0
        @spt.y = 150

    #.----------.----------
    #  check hight prite
    #.----------.----------

    check_height: ->
        max = if gameOptions.fullscreen  then 559 - 100 else 500 - 100
        if @spt.y > max # or @spt.y < 48
            if not @too_low
                @too_low = true
                @columnsO.destroy_create {x: @spt.x, y: @spt.y }# destry & create col if collide
                return 'loose'

        # birds fly away
        @columnsO.cols[0].bird.check_bird(@spt) # check birds have to go away only 3
        @columnsO.cols[1].bird.check_bird(@spt)
        @columnsO.cols[2].bird.check_bird(@spt)

        return 'nothing'
    #.----------.----------
    #  check jump parameters
    #.----------.----------

    check_jump_p: ->
        if  gameOptions.spring_power >= 0.7
            @jmp_p.vy = 0.7 * 700 / gameOptions.pMaxTime
            @jmp_p.dy = 7 # number of pixel variation authorized

        else if  gameOptions.spring_power > 0.6
            @jump_p.dy = 7