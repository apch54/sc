# fc on 2017-02-01

class Phacker.Game.My_mouse

    constructor: (@gm, @socleO) ->
        @_fle_ = 'Mouse'
        @reset()
        #@set_event()
        @bg_set_mouse_event()
        @max = gameOptions.pMaxTime #1200 # 1000ms = 1sec max click duration

    #.----------.----------
    # mouse init & pointer follow mouse
    #.----------.----------
    bg_set_mouse_event: -> # not used
        @socleO.bg_input.events.onInputDown.add @on_mouse_down, @
        @socleO.bg_input.events.onInputUp.add @on_mouse_up, @


    set_event: ->

        @gm.input.onDown.add @on_mouse_down, @
        @gm.input.onUp.add @on_mouse_up, @

    on_mouse_down: ->
        @mouse.down = true
        @mouse.down_ms = new Date().getTime()
        @mouse.dt = 0

    on_mouse_up: ->
        @mouse.down = false
        @mouse.dt = new Date().getTime() - @mouse.down_ms
        if @mouse.dt > @mouse.pMaxTime then  @mouse.dt = @mouse.pMaxTime - 1
        @mouse.down_ms = 0
    #.----------.----------
    #  when the mouse is domn then  move spring
    #.----------.----------
    when_down: (spt) ->

        if  @mouse.down #and @mouse.down_ms > 0
            dt = new Date().getTime() - @mouse.down_ms

            frm = Math.floor( dt / @mouse.pMaxTime * 7 )
            if frm >= 7 then frm = 7
            spt.frame = frm

    #.----------.----------
    # reset mouse
    # &  compute duration between click/unclick
    #.----------.----------
    reset: ->

        @mouse =
            x: 0 # coordonates
            y: 0
            down : false
            down_ms: 0 # mouse down
            dt: 0 # interval time between click/unclick
            pMaxTime: gameOptions.pMaxTime  #1200 # max duration"
            min:  0


    # bind mouse with sprite
    bind_sprite:(spriteO) -> @spt = spriteO.spt
