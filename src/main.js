
/*globals define*/
define('main', function(require, exports, module) {
    "use strict";

    // Dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ScrollView = require('famous/views/Scrollview');
    var GenericSync = require('famous/inputs/GenericSync');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');

    // Create the context
    var mainContext = Engine.createContext();

    // Scrollview and surfaces
    var scrollview = new ScrollView({
      direction: 0,
      paginated: true
    });
    var surfaces = [];
    scrollview.sequenceFrom(surfaces);

    // touch + mouse sync
    GenericSync.register({
            'mouse' : MouseSync,
            'touch' : TouchSync
    });
    var genericSync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
    );
  
    function setContent() {
      for (var i = 0, temp; i < 50; i++) {
        temp = new Surface({
          content: 'Surface: ' + surfaces.length,
          size: [180, 100],
          properties: {
            backgroundColor: 'hsl(' + (i * 360 / 10) + ', 100%, 50%)',
            lineHeight: '100px',
            textAlign: 'center'
          }
        });
        temp.pipe(genericSync);
        surfaces.push(temp);
      }
    }
  
    // pipe touch+mouse events
    genericSync.pipe(scrollview);
    
    // events listening
    genericSync.on('end', function(data){
      console.log(data);
    });

    // Initial content
    setContent();

    mainContext.add(scrollview);
});