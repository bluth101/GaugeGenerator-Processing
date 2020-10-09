int GAUGE_SIZE = 300;
float GAUGE_EXTRA_LENGTH = 25*DEG_TO_RAD; // In Radians, will add to both sides
float HAND_DIST_FROM_OUTSIDE = 50.0f;
String GAUGE_NAME = "RPM x100";
int GAUGE_MAX_VALUE = 40;

int INTERVAL_THICK = 20; // Every 20%, make a thick hand
int INTERVAL_THIN = 5; // Every 5%, make a thin hand
float WEIGHT_THICK = 2.1;
float WEIGHT_THIN = 2.0;

// _centre_pos = Centre position of the gauge
// _angle = % along the line to draw
void draw_hand(float _centre_pos, float _angle, float _thickness) {
  float hand_offset = 25.0f; // How far from the inner line
  
  // Make the line shorter if its a thin hand
  if( _thickness == WEIGHT_THIN ) {
    hand_offset = hand_offset / 2;
  }
  
  float radius = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE+hand_offset)/2;
  float radius2 = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE-hand_offset)/2;
  
  float angle = (_angle / 100.0) * (PI+(GAUGE_EXTRA_LENGTH*2));
  angle += PI - GAUGE_EXTRA_LENGTH; // Add half a circle so it displays correctly!
  
  float tox = _centre_pos + radius * cos(angle);
  float toy = _centre_pos + radius * sin(angle);
  
  float fromx = _centre_pos + radius2 * cos(angle);
  float fromy = _centre_pos + radius2 * sin(angle);
  
  strokeWeight(_thickness);
  line(fromx, fromy, tox, toy);
  
  // Check if we need to draw text
  if( _thickness == WEIGHT_THICK ) {
    float extra_dist = 20.0;
    radius = (GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE-hand_offset-extra_dist)/2;
    tox = _centre_pos + radius * cos(angle);
    toy = _centre_pos + radius * sin(angle);
    
    int perc = round( (_angle / 100.0) * GAUGE_MAX_VALUE );
    
    if( _angle <= 25 ) {
      textAlign(LEFT, CENTER);
    }
    else if( _angle <= 75 ) {
      textAlign(CENTER, TOP);
    }
    else {
      textAlign(RIGHT, CENTER);
    }
    textSize(19);
    text(perc, tox, toy);
  }
}

void setup() {
  // Set size of window
  size(600, 400);
  
  // To remove border
  //noStroke();
  
  // Draw back of gauge
  float create_at = GAUGE_SIZE/2 +20;
  
  fill(255);
  ellipse(create_at, create_at, GAUGE_SIZE, GAUGE_SIZE);
  
  // Draw gauge text
  textSize(24);
  textAlign(CENTER);
  fill(0);
  text(GAUGE_NAME, create_at, create_at + GAUGE_SIZE/3);
  
  // Hands
  for( int i = 0; i <= 100; i++ ) {
    // Check for thick first, then thin
    if( i % INTERVAL_THICK == 0 )
      draw_hand(create_at, i, WEIGHT_THICK);
    else if( i % INTERVAL_THIN == 0 )
      draw_hand(create_at, i, WEIGHT_THIN);
  }
  
  // Inside Line
  noFill();
  strokeWeight(1);
  arc(create_at, create_at, GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE, GAUGE_SIZE-HAND_DIST_FROM_OUTSIDE, PI-GAUGE_EXTRA_LENGTH, TWO_PI+GAUGE_EXTRA_LENGTH);

  // Centre point
  fill(#dddddd);
  ellipse(create_at, create_at, GAUGE_SIZE/10, GAUGE_SIZE/10);
};
