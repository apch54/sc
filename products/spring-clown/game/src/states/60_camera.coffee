# fc on 2017-02-03


class Phacker.Game.My_camera

    constructor: (@gm) ->
        @_fle_          = 'Camera'

        @offset     = if gameOptions.fullscreen then 60 else 100   # left offset for camera
        @offset0    = if gameOptions.fullscreen then 60 else 100
        @speed      = 2.5     # cam speed on left
        @to         = 0     # camera destination
        @initial    = 0
        @dxi        = 0     # intermediate cam location

    #.----------.----------
    #move camera on left at speed @speed
    #.----------.----------
    move:(spt)->
        if (@gm.camera.x - spt.x + @offset) < -3 then @gm.camera.x += 3 # for time reseting : not all at once
        else @gm.camera.x  = spt.x - @offset

    move_to2:() -> # no more used
        if  @gm.camera.x  < @to
            @dxi += @speed
            @gm.camera.x  = @dxi


    #.----------.----------
    # init camera for live
    #.----------.----------
    setTo:(to)-> # no more used
        @to = to - @offset
        @initial = @gm.camera.x
        @dxi = @gm.camera.x

