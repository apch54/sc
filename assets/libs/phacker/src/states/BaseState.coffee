class Phacker.BaseState
  create: ->
    if gameOptions.fullscreen == false and detectmob()
        fullscreen = @game.add.button 0, 0, 'view_full', ->
            onClickBackgroundHack()
        ,@ ,0 ,0 ,0

        fullscreen.x = @game.width - fullscreen.width - 50
        fullscreen.y = 50
        fullscreen.fixedToCamera = true
