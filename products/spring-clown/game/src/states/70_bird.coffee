#fc 2017-02-05

#
#.-"""""""-.
#         .'       __  \_
#        /        /  \/  \
#       |         \_0/\_0/______
#       |:.          .'       oo`\
#       |:.         /             \
#       |' ;        |             |
#       |:..   .     \_______     |
#       |::.|'     ,  \,_____\   /
#       |:::.; ' | .  '|      )_/
#       |::; | | ; ; | |
#      /::::.|-| |_|-|, \
#     /'-=-'`  '-'   '--'\
#    /                    \
#

class Phacker.Game.Bird

    constructor: (@gm, params , @spriteO) ->
        @_fle_   = 'Bird'
        @prms =
            bg : # background
                w   : if gameOptions.fullscreen  then 375 else 768
                h   : if gameOptions.fullscreen  then 559 - 48 else 500 - 48

            x0: params.x0 #location
            y0: params.y0
        @make_bird()
        @make_escape() # that's a tween for escaping bird
        #@make_fly() # that's a tween for escaping bird

    #.----------.----------
    # draw the bird
    #.----------.----------

    make_bird: ->

        @brd = @gm.add.sprite @prms.x0 + 14, @prms.y0, 'bird' ,3 #16x16
        @brd.anchor.setTo(0.5, 1) # anchor in the middle of bottomn
        @brd.animations.add 'walk', [0, 1, 3, 0, 1], 5, true
        @brd.animations.add 'walk2', [0, 1, 0, 3, 2, 3 ,0 ], 5, true
        @brd.animations.add 'fly', [3, 2], 8, true

        n = @gm.rnd.integerInRange(0, 3)
        #n = 1
        switch n
            when 0 then @brd.animations.play 'walk'
            when 1 then @brd.animations.play 'walk2'
            when 2,3 then @brd.visible = false

            when  2 #fly : no more used
                @brd.animations.play 'fly'
                @brd.y -= 50
                @brd.x += 50
                @make_fly() # that's a tween for escaping bird
                @fly.start()

    #.----------.----------
    # dist from  sprite
    #.----------.----------

    check_bird: (spt) ->

        if @brd.x - spt.x < 60
            #@brd.visible = false
           # if @fly? then @fly.stop()
            #@brd.scale.x = 1
            @brd.animations.stop()
            @brd.animations.play 'fly'
            @escape.start()

    #.----------.----------
    # make tween  : bird escape if sprite too near
    # tween is @brd
    #.----------.----------

    make_escape: ->

        h = @gm.rnd.integerInRange(48, @prms.bg.h - 10 )
        @escape = @gm.add.tween (@brd)
        @escape.to(
            { x: [@brd.x + 100,@brd.x + 1000  ], y: [@brd.y + 30, h ] }
            3500, Phaser.Easing.Quadratic.Out
        )

    #.----------.----------
    # make tween  : bird fly
    # tween is @fly
    #.----------.----------

    make_fly: -> #no more used

        @brd.scale.x = -1
        y1 = @gm.rnd.integerInRange(@brd.y - 20 , @brd.y + 60 )
        x1 = @brd.x
        @fly = @gm.add.tween (@brd)
        @fly.to(
            { x: x1 - 500,  y: y1 }
            15000, Phaser.Easing.Linear.None
        )
        @fly.onComplete.add( @brd_destroy, this)

    #.----------.----------
    # destoy bird
    #.----------.----------

    brd_destroy: -> @brd.destroy()