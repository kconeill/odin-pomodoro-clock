/* global $ */

$(document).ready(function(){

  var sessionLength = 25;
  var breakLength = 5;
  var clockStatus = "idle";
  var clockCount = 2;
  var countdown;
  var endTime;
  var endTimeBreak;
  var t;

  // displaying number of sessions/breaks/title
  
  document.getElementById("test-pom").innerHTML = sessionLength;
  document.getElementById("test-break").innerHTML = breakLength;
  document.getElementById("activity").innerHTML = "Session";
  document.getElementById("timer-min").innerHTML = sessionLength;
  document.getElementById("timer-sec").innerHTML = "00";
  
  // increase length of session
  
  $("#inc-pom").on("click", function(){
    if (clockStatus === "idle") {
      sessionLength += 1;
      document.getElementById("test-pom").innerHTML = sessionLength;
      document.getElementById("timer-min").innerHTML = sessionLength;  
    }
  });
  
  // decrease length of session
  
  $("#dec-pom").on("click", function(){
    if (clockStatus === "idle") {
      if (sessionLength > 1) { 
        sessionLength -= 1;
        document.getElementById("test-pom").innerHTML = sessionLength;
        document.getElementById("timer-min").innerHTML = sessionLength;
      } else {
        alert("Number cannot be decreased further");
      }  
    }
  });
  
  // increase length of break
  
  $("#inc-break").on("click", function(){
    if (clockStatus === "idle") {
      document.getElementById("test-break").innerHTML = breakLength += 1;  
    }
  });
  
  // decrease length of break
  
  $("#dec-break").on("click", function(){
    if (clockStatus === "idle"){
      if (breakLength > 1) { 
        document.getElementById("test-break").innerHTML = breakLength -= 1;
      } else {
        alert("Number cannot be decreased further");
      }  
    }
  });

  // Set the end time at start
  
    var setTime = function(){
      var now = new Date();
      var msec = now.getTime();
      
      if (clockCount % 2 === 0 ) {
        return endTime = msec + (sessionLength*60*1000);
      } else {
        return endTimeBreak = msec + (breakLength*60*1000);
      }
    };
    
  // Set the end time if resumed from pause
    
    var resume = function(){
      var now = new Date();
      var msec = now.getTime();
      
      if (clockCount % 2 === 0 ) {
        return endTime = msec + (countdown*1000);
      } else {
        return endTimeBreak = msec + (countdown*1000);
      }
    };
    
    // Clock countdown
    
    var timer = function(){
      var nowTimer = new Date();
      var msecTimer = nowTimer.getTime();
      
      if (clockCount % 2 === 0 ) {
        document.getElementById("activity").innerHTML = "Session";
        countdown = Math.floor((endTime - msecTimer)/1000);
      } else {
        document.getElementById("activity").innerHTML = "Break";
        countdown = Math.floor((endTimeBreak - msecTimer)/1000);
      }

      var minute = Math.floor(countdown/60);
      document.getElementById("timer-min").innerHTML = minute;
      
      var second = Math.ceil(countdown % 60);
      if (second < 10) {second = "0" + second}
      document.getElementById("timer-sec").innerHTML = second;
      
      if  (countdown <= 10) {
        $("#test-clock").removeClass("green yellow white").addClass("red");
      } else if (countdown < 30) {
        $("#test-clock").removeClass("green red white").addClass("yellow");
      } else if (countdown >= 30) {
        $("#test-clock").removeClass("yellow red white").addClass("green");
      } 
      
      if (countdown < 0) { 
        clockCount++;
        setTime();
      }
    };
  
  // Start clock
  
  $("#start").on("click", function(){
    if (clockStatus !== "running") {
    
      if (clockStatus === "paused") {
        resume();
      } else {
        setTime();
      }
      
      t = setInterval(timer, 300);
      clockStatus = "running";
    }
  });

  // Stop (and go back to entered session lenths)

  $("#stop").on("click", function(){
    clearInterval(t);
    clockStatus = "idle";
    var minute = sessionLength;
    var second = "00";
    document.getElementById("timer-min").innerHTML = minute;
    document.getElementById("timer-sec").innerHTML = second;
    document.getElementById("activity").innerHTML = "Session";
    $("#test-clock").removeClass("green yellow red").addClass("white");
    if (clockCount % 2 !== 0) { clockCount++ }
  });
    
  // Reset (and go back to original session/break lengths)
    
  $("#reset").on("click", function(){
    clearInterval(t);
    clockStatus = "idle";
    var sessionLength = 25;
    var breakLength = 5;
    var minute = sessionLength;
    var second = "00";
    document.getElementById("activity").innerHTML = "Session";
    document.getElementById("test-pom").innerHTML = sessionLength;
    document.getElementById("test-break").innerHTML = breakLength;
    document.getElementById("timer-min").innerHTML = minute;
    document.getElementById("timer-sec").innerHTML = second;
    $("#test-clock").removeClass("green yellow red").addClass("white");
  });
    
  // Pause  
  
  $("#pause").on("click", function(){
    if (clockStatus === "running") {
      clockStatus = "paused";
      clearInterval(t);
    }
  });

});