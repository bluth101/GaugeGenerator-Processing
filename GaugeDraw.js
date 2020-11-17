var DEG_TO_RAD = 0.017453292519943295769236907684886;

var GAUGE_SIZE = 300;
var GAUGE_EXTRA_LENGTH = 25*DEG_TO_RAD; // In Radians, will add to both sides
var HAND_DIST_FROM_OUTSIDE = 50.0;
var GAUGE_NAME = "";
var GAUGE_MAX_VALUE = 100;

var INTERVAL_THICK = 20; // Every 20%, make a thick hand
var INTERVAL_THIN = 5; // Every 5%, make a thin hand
var WEIGHT_THICK = 3;
var WEIGHT_THIN = 2.5;

// _centre_pos = Centre position of the gauge
// _angle = % along the line to draw
function draw_hand(_centre_pos, _angle, _thickness) {
  var hand_offset = 25.0; // How far from the inner line
  
  // Make the line shorter if its a thin hand
  if( _thickness == WEIGHT_THIN ) {
    hand_offset = hand_offset / 2;
  }
  
  var radius = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE+hand_offset)/2;
  var radius2 = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE-hand_offset)/2;
  
  var angle = (_angle / 100.0) * (PI+(GAUGE_EXTRA_LENGTH*2));
  angle += PI - GAUGE_EXTRA_LENGTH; // Add half a circle so it displays correctly!
  
  var tox = _centre_pos + radius * cos(angle);
  var toy = _centre_pos + radius * sin(angle);

  var fromx = _centre_pos + radius2 * cos(angle);
  var fromy = _centre_pos + radius2 * sin(angle);
  
  stroke("#c10c30");
  strokeWeight(_thickness);
  line(fromx, fromy, tox, toy);
  
  // Check if we need to draw text
  if( _thickness == WEIGHT_THICK ) {
    var extra_dist = 20.0;
    radius = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE-hand_offset-extra_dist)/2;
    tox = _centre_pos + radius * cos(angle);
    toy = _centre_pos + radius * sin(angle);
    
    var perc = round( (_angle / 100.0) * GAUGE_MAX_VALUE );
    
    if( _angle <= 25 ) {
      textAlign(LEFT, CENTER);
    }
    else if( _angle <= 75 ) {
      textAlign(CENTER, TOP);
    }
    else {
      textAlign(RIGHT, CENTER);
    }
    stroke("#000000")
    fill("#ffffff")
    textSize(24);
    text(perc, tox, toy);
  }
}

function setup() {
  // Set size of window
  createCanvas(600, 400);
  
  // To remove border
  //noStroke();
  
  // Draw back of gauge
  var create_at = GAUGE_SIZE/2 +20;
  
  fill("#323232");
  ellipse(create_at, create_at, GAUGE_SIZE, GAUGE_SIZE);
  
  // Draw gauge text
  stroke("#000000")
  fill("#ffffff")
  textSize(24);
  textAlign(CENTER);
  fill(0);
  text(GAUGE_NAME, create_at, create_at + GAUGE_SIZE/3);
  
  // Hands
  for( var i = 0; i <= 100; i++ ) {
    // Check for thick first, then thin
    if( i % INTERVAL_THICK == 0 )
      draw_hand(create_at, i, WEIGHT_THICK);
    else if( i % INTERVAL_THIN == 0 )
      draw_hand(create_at, i, WEIGHT_THIN);
  }
  
  // Inside Line
  noFill();
  stroke("#c10c30");
  strokeWeight(3);
  arc(create_at, create_at, GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE, GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE, PI-GAUGE_EXTRA_LENGTH, TWO_PI+GAUGE_EXTRA_LENGTH);

  // Centre point
  fill("#333");
  ellipse(create_at, create_at, GAUGE_SIZE/10, GAUGE_SIZE/10);
};
