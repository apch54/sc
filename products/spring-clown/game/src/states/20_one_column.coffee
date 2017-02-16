
class Phacker.Game.One_column

    constructor: (@gm, @socleO, @prms) ->
        # prm = {x0, h} initial x and hight: h
        @_fle_          = 'One column'

        #Column parameters
        @prms.body    = @socleO.glob.col.body #{w:34, h: 25} #body size
        @prms.top     = @socleO.glob.col.top #{w: 34, h:36 }
        @prms.y       = @prms.y0 # column top

        @col = @gm.add.physicsGroup()
        @col.enableBody = true

        @make_col(@prms.h , @prms.x0)
        @make_bird()
        #console.log "- #{@_fle_} : ", @f_alt()

    #.----------.----------
    #make the column
    #.----------.----------

    make_col:(h, x0)-> # number of bodies
        # choose color
        if @gm.rnd.integerInRange(0, 1) is 0
            bdy = 'platform1_body'
            top = 'platform1_top'
        else
            bdy = 'platform2_body'
            top = 'platform2_top'

        #h must be > 2
        scl = @col.create x0, @prms.y0, bdy
        scl.anchor.x = .5

        for foo in [0.. h-2] #draw column center part
            @prms.y -= @prms.body.h
            elm =  @col.create x0, @prms.y, bdy # create one element of the column
            elm.anchor.x = .5
            elm.body.immovable = true
            elm.alt = @f_alt()

        @prms.y -= @prms.top.h # draw hat comomn
        @hat = @col.create x0, @prms.y,top
        @hat.anchor.x = .5
        @hat.body.immovable = true
        @hat.alt = @f_alt()

        @socleO.sea1.bringToTop() #draw_last_sea() # overlap sea over columns
        @socleO.bg_input.bringToTop() # bg with alpha = 0

    #.----------.----------
    # make bird
    #.----------.----------
    make_bird: ->
        send_prm ={x0: @prms.x0, y0: @f_alt()}#parameters for birds"
        @bird = new Phacker.Game.Bird @gm, send_prm

    #.----------.----------
    # destroy column
    #.----------.----------
    destroy : ->
        @col.destroy()
        @bird.destroy()

    #.----------.----------
    # compute column height
    #.----------.----------
    f_alt : ->  @prms.y0 - 25 * @prms.h - 11







