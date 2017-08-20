'use strict';

var sizes = {
  CLOUD_WIDTH: 420,
  CLOUD_HEIGHT: 270,
  FONT: 16,
  PADDING: 20,
  COLUMN_WIDTH: 40,
};

var positions = {
  CLOUD_START_X: 100,
  CLOUD_START_Y: 10,
};

var colors = {
  CLOUD: 'white',
  CLOUD_SHADOW: 'rgba(0, 0, 0, 0.7)',
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
  var CLOUD_SHADOW_OFFSET = 10;
  ctx.fillStyle = colors.CLOUD_SHADOW;
  ctx.fillRect(positions.CLOUD_START_X + CLOUD_SHADOW_OFFSET, positions.CLOUD_START_Y
   + CLOUD_SHADOW_OFFSET, sizes.CLOUD_WIDTH, sizes.CLOUD_HEIGHT);
};

var drawCloud = function (ctx) {
  ctx.fillStyle = colors.CLOUD;
  ctx.fillRect(positions.CLOUD_START_X, positions.CLOUD_START_Y, sizes.CLOUD_WIDTH,
      sizes.CLOUD_HEIGHT);
};

var writeGreeteng = function (ctx) {
  var VICTORY = 'Ура вы победили!';
  var RESULTS = 'Список результатов:';
  ctx.fillStyle = colors.TEXT;
  ctx.font = fonts.TEXT;
  ctx.fillText(VICTORY, positions.CLOUD_START_X + sizes.PADDING,
      positions.CLOUD_START_Y + sizes.FONT + sizes.PADDING);
  ctx.fillText(RESULTS, positions.CLOUD_START_X + sizes.PADDING,
      positions.CLOUD_START_Y + (sizes.FONT * 2) + sizes.PADDING);
};

var drawResults = function (times, names, ctx) {
  var COLUMN_INTERVAL = 50;
  var CURREN_TPLAYER = 'Вы';
  var maxTime = getMaxTime(times);
  var positionNum = 1;
  var name;
  var time;
  var player;
  var currentPosition;
  for (var i = 0; i < names.length; i++) {
    name = names[i];
    time = Math.round(times[i]);
    if (name === CURREN_TPLAYER) {
      player = true;
      currentPosition = positions.CLOUD_START_X + COLUMN_INTERVAL;
      drawColumn(currentPosition, name, time, maxTime, player, ctx);
    } else {
      player = false;
      currentPosition = ((sizes.COLUMN_WIDTH + COLUMN_INTERVAL) * positionNum)
       + COLUMN_INTERVAL + positions.CLOUD_START_X;
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
  var COLUMN_HEIGHT = 150;
  var columnCurrentHeight = (COLUMN_HEIGHT * time) / maxTime;
  var columnStartY = positions.CLOUD_START_Y + sizes.CLOUD_HEIGHT - sizes.PADDING
   - sizes.FONT - COLUMN_HEIGHT + (COLUMN_HEIGHT - columnCurrentHeight);
  writePlayerName(columnStartY, currentPosition, name, time, ctx);
  drawHistogram(currentPosition, columnStartY, columnCurrentHeight, player, ctx);
};

var writePlayerName = function (columnStartY, currentPosition, name, time, ctx) {
  ctx.fillStyle = colors.TEXT;
  ctx.font = fonts.TEXT;
  ctx.fillText(name, currentPosition, positions.CLOUD_START_Y + sizes.CLOUD_HEIGHT
   - sizes.PADDING);
  ctx.fillText(time, currentPosition, columnStartY - sizes.PADDING / 2);
};

var drawHistogram = function (currentPosition, columnStartY, columnCurrentHeight, player, ctx) {
  var COLUMN_PLAYER = 'rgba(255, 0, 0, 1)';
  var COLUMN_OTHER = 'rgba(0, 0, 255, opacity)';
  ctx.fillStyle = player ? COLUMN_PLAYER : COLUMN_OTHER.replace('opacity', getRandom(0.3, 1));
  ctx.fillRect(currentPosition, columnStartY, sizes.COLUMN_WIDTH, columnCurrentHeight);
};

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

