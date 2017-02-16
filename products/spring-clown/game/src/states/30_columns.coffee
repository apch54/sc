class Phacker.Game.Columns

    constructor: (@gm, @socleO) ->
        @_fle_          = 'Columns'

        @prms = # all parameters comes here
            x0  : if gameOptions.fullscreen then 60 else 100
            y0  : if gameOptions.fullscreen then 559 -  37 else 500 - 37
            x   : 60 #last col x
            h   : 8
            col :@socleO.glob.col
            nb: if gameOptions.fullscreen then 4 else 6

        @cols = [] #all cols come here"
        @last_col = { x:0, y:0 }
        @col_to_destroy = []

        for foo in [0..@prms.nb] then @make_one_col() # init col

    #.----------.----------
    #make one col
    # diff stands for difficulty : proportionnal to column width
    #.----------.----------

    make_one_col:() ->
        if  @cols.length is 0 then @prms.x = @prms.x0
        else
            @prms.x += @column_dx_dy().dx
            @prms.h = @column_dx_dy().h
            #console.log "- #{@_fle_} : ",@prms

        sended_p = { x0: @prms.x, y0 : @prms.y0, h: @prms.h } # parameters to send

        @cols.push new Phacker.Game.One_column @gm, @socleO, sended_p

    #.----------.----------
    # column  dx : Interval between two columns
    #.----------.----------

    column_dx_dy: () ->  # for difficulty

        if ge.score < 49
            min_dx =  0 ;      max_dx =  2
            min_h = 8;          max_h = 8
      
        else if ge.score < 120
            min_dx =  0 ;      max_dx =  2
            min_h = 7;          max_h = 9

        else
            min_dx =  1 ;      max_dx =  3
            min_h = 6;          max_h = 9

        ddx = @gm.rnd.integerInRange(min_dx, max_dx) #* @prms.col.body.w / 4
        ddh = @gm.rnd.integerInRange(min_h, max_h)
        #console.log "- #{@_fle_} : ", ddh
        return { dx: (3.5 + ddx) * @prms.col.body.w , h:ddh}

    #.----------.----------
    # destroy column < absc  < y
    #.----------.----------

    destroy_create: (x) ->
        while x  > @cols[0].col.getAt(0).x
            @col_to_destroy.push @cols[0]

            @cols.splice 0,1
            @make_one_col()

        while @col_to_destroy[0]? and @gm.camera.x > @col_to_destroy[0].col.getAt(0).x + 100
            #console.log "- #{@_fle_} : ",@gm.camera.x , @col_to_destroy[0].col.getAt(0).x + 100, @col_to_destroy

            @col_to_destroy[0].col.destroy()
            @col_to_destroy[0].bird.brd.destroy()
            @col_to_destroy.splice 0,1

    #.----------.----------
    # looks birds
    #.----------.----------
    dist_birds:(sptO) ->
        console.log @cols[0].bird.dist(sptO)





