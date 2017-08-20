'use strict';

  var sizes = {
    CLOUDWIDTH: 420,
    CLOUDHEIGHT: 270,
    FONT: 16,
    PADDING: 20,
    COLUMNWIDTH: 40,
  };

  var positions = {
    CLOUDSTARTX: 100,
    CLOUDSTARTY: 10,
  };
  
  var colors = {
    CLOUD: 'white',
    CLOUDSHADOW: 'rgba(0, 0, 0, 0.7)',
    TEXT: 'black',
  };

  var fonts = {
    TEXT: '16px PT Mono'
  };

window.renderStatistics = function (ctx, names, times) {
  drawCloudShadow(ctx);
  drawCloud(ctx);
  writeGreeteng(ctx);
  drawResults(times, names, ctx);
};

var drawCloudShadow = function (ctx) {
  var CLOUDSHADOWOFFSET = 10;
  ctx.fillStyle = colors.CLOUDSHADOW;
  ctx.fillRect(positions.CLOUDSTARTX + CLOUDSHADOWOFFSET, positions.CLOUDSTARTY
   + CLOUDSHADOWOFFSET, sizes.CLOUDWIDTH, sizes.CLOUDHEIGHT);
};

var drawCloud = function (ctx) {
  ctx.fillStyle = colors.CLOUD;
  ctx.fillRect(positions.CLOUDSTARTX, positions.CLOUDSTARTY, sizes.CLOUDWIDTH, 
    sizes.CLOUDHEIGHT);
};

var writeGreeteng = function (ctx) {
  var VICTORY = 'Ура вы победили!';
  var RESULTS = 'Список результатов:';
  ctx.fillStyle = colors.TEXT;
  ctx.font = fonts.TEXT;
  ctx.fillText(VICTORY, positions.CLOUDSTARTX + sizes.PADDING, 
    positions.CLOUDSTARTY + sizes.FONT + sizes.PADDING);
  ctx.fillText(RESULTS, positions.CLOUDSTARTX + sizes.PADDING, 
    positions.CLOUDSTARTY + (sizes.FONT * 2) + sizes.PADDING);
};

var drawResults = function (times, names, ctx) {
  var COLUMNINTERVAL = 50;
  var CURRENTPLAYER = 'Вы';
  var maxTime = getMaxTime(times);
  var positionNum = 1;
  var name;
  var time;
  var player;
  var currentPosition;
  for (var i = 0; i < names.length; i++) {
    name = names[i];
    time = Math.round(times[i]);
    if (name === CURRENTPLAYER) {
      player = true;
      currentPosition = positions.CLOUDSTARTX + COLUMNINTERVAL;
      drawColumn(currentPosition, name, time, maxTime, player, ctx);
    } else {
      player = false;
      currentPosition = ((sizes.COLUMNWIDTH + COLUMNINTERVAL) * positionNum)
       + COLUMNINTERVAL + positions.CLOUDSTARTX;
      drawColumn(currentPosition, name, time, maxTime, player, ctx);
      positionNum++;
    }
  }
};

var getMaxTime = function (times) {
  var currentTime = 0;
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    currentTime = Math.round(times[i]);
    if (currentTime > maxTime) {
      maxTime = currentTime;
    }
  }
  return maxTime;
};

var drawColumn = function (currentPosition, name, time, maxTime, player, ctx) {
  var COLUMNHEIGHT = 150;
  var columnCurrentHeight = (COLUMNHEIGHT * time) / maxTime;
  var columnStartY = positions.CLOUDSTARTY + sizes.CLOUDHEIGHT - sizes.PADDING
   - sizes.FONT - COLUMNHEIGHT + (COLUMNHEIGHT - columnCurrentHeight);
  writePlayerName(columnStartY, currentPosition, name, time, ctx);
  drawHistogram(currentPosition, columnStartY, columnCurrentHeight, player, ctx);
};

var writePlayerName = function (columnStartY, currentPosition, name, time, ctx) {
  ctx.fillStyle = colors.TEXT;
  ctx.font = fonts.TEXT;
  ctx.fillText(name, currentPosition, positions.CLOUDSTARTY + sizes.CLOUDHEIGHT
   - sizes.PADDING);
  ctx.fillText(time, currentPosition, columnStartY - sizes.PADDING / 2);
};

var drawHistogram = function (currentPosition, columnStartY, columnCurrentHeight, player, ctx) {
  var COLUMNPLAYER = 'rgba(255, 0, 0, 1)';
  var COLUMNOTHER = 'rgba(0, 0, 255, opacity)';
  ctx.fillStyle = player ? COLUMNPLAYER : COLUMNOTHER.replace('opacity', getRandom(0.3, 1));
  ctx.fillRect(currentPosition, columnStartY, sizes.COLUMNWIDTH, columnCurrentHeight);
};

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};
