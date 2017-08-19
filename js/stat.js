'use strict';

window.renderStatistics = function(ctx, names, times) {
  /**
  * Enum для размеров.
  * @readonly
  * @enum {number}
  */
  var sizes = {
    CLOUDWIDTH: 420,
    CLOUDHEIGHT: 270,
    FONT: 16,
    PADDING: 20,
    COLUMNWIDTH: 40,
    COLUMNHEIGHT: 150,
    COLUMNINTERVAL: 50
  }

  /**
  * Enum для позиции.
  * @readonly
  * @enum {number}
  */
  var positions = {
    CLOUDSTARTX : 100,
    CLOUDSTARTY : 10,
    CLOUDSHADOWOFFSET : 10
  }

  /**
  * Enum для имени.
  * @readonly
  * @enum {string}
  */
  var namesPlayers = {
    PLAYER: 'Вы'    
  }

  /**
  * Enum для цветов.
  * @readonly
  * @enum {string}
  */
  var colors = {
    CLOUD: 'white',
    CLOUDSHADOW: 'rgba(0, 0, 0, 0.7)',
    TEXT: 'black',
    COLUMNPLAYER: 'rgba(255, 0, 0, 1)',
    COLUMNOTHER: 'rgba(0, 0, 255, opacity)'
  }

  /**
  * Enum шрифта.
  * @readonly
  * @enum {string}
  */  
  var fonts = {
    TEXT: '16px PT Mono'
  }

  /**
  * Enum сообщений.
  * @readonly
  * @enum {string}
  */  
  var messages = {
    VICTORY: 'Ура вы победили!',
    RESULTS: 'Список результатов:'
  }  

  drawCloudShadow(positions.CLOUDSTARTX, positions.CLOUDSTARTY, sizes.CLOUDWIDTH, sizes.CLOUDHEIGHT, positions.CLOUDSHADOWOFFSET, colors.CLOUDSHADOW, ctx);
  drawCloud(positions.CLOUDSTARTX, positions.CLOUDSTARTY, sizes.CLOUDWIDTH, sizes.CLOUDHEIGHT, colors.CLOUD, ctx);  
  writeGreeteng(positions.CLOUDSTARTX, positions.CLOUDSTARTY, sizes.FONT, sizes.PADDING, colors.TEXT, fonts.TEXT, messages.VICTORY, messages.RESULTS, ctx);  
  drawResults(positions.CLOUDSTARTX, positions.CLOUDSTARTY, sizes.CLOUDHEIGHT, sizes.COLUMNWIDTH, sizes.COLUMNHEIGHT, sizes.COLUMNINTERVAL, sizes.PADDING, sizes.FONT, fonts.TEXTSIZE, colors.COLUMNPLAYER, colors.COLUMNOTHER,  colors.TEXT, times, names, namesPlayers.PLAYER, ctx);
}

var drawCloudShadow = function(cloudStartX, cloudStartY, cloudWidth, cloudHeight, cloudShadowOffset, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(cloudStartX + cloudShadowOffset, cloudStartY + cloudShadowOffset, cloudWidth, cloudHeight);
}

var drawCloud = function(cloudStartX, cloudStartY, cloudWidth, cloudHeight, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(cloudStartX, cloudStartY, cloudWidth, cloudHeight);
}

var writeGreeteng = function(cloudStartX, cloudStartY, fontSize, padding, textColor, font, messageVictory, messageResults, ctx) {
  ctx.fillStyle = textColor;
  ctx.font = font;
  ctx.fillText(messageVictory, cloudStartX + padding, cloudStartY + fontSize + padding);
  ctx.fillText(messageResults, cloudStartX + padding, cloudStartY + (fontSize * 2) + padding);
}

var drawResults = function(cloudStartX, cloudStartY, cloudHeight, columnWidth, columnHeight, columnInterval, padding, fontSize, textSize, columnPlayerColor, columnOtherColor, textColor, times, names, namePlayer, ctx) {
  var maxTime = getMaxTime(times);
  var positionNum = 1
  var name, time, player, currentPosition;
  for (var i = 0; i < names.length; i++) {
    name = names[i];
    time = Math.round(times[i]);
    if (name === namePlayer) {
      player = true;
      currentPosition = cloudStartX + columnInterval;
      drawColumn(cloudStartY, cloudHeight, currentPosition, columnHeight, columnWidth, columnPlayerColor, columnOtherColor, padding, fontSize, textSize, textColor, name, time, maxTime, player, ctx);
    } else {
      player = false;
      currentPosition = ((columnWidth + columnInterval) * positionNum) + columnInterval + cloudStartX;
      drawColumn(cloudStartY, cloudHeight, currentPosition, columnHeight, columnWidth, columnPlayerColor, columnOtherColor, padding, fontSize, textSize, textColor, name, time, maxTime, player, ctx);
      positionNum ++;
    }
  }
}

var getMaxTime = function(times) {
  var currentTime = 0;
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    currentTime = Math.round(times[i]);
    if (currentTime > maxTime) {
      maxTime = currentTime;
    }
  }
  return maxTime;
} 

var drawColumn = function(cloudStartY, cloudHeight, currentPosition, columnHeight, columnWidth, colorColumnPlayer, colorColumnOther, padding, fontSize, textSize, colorText, name, time, maxTime, player, ctx) {
  var columnCurrentHeight = (columnHeight * time) / maxTime;
  var columnStartY = cloudStartY + cloudHeight - padding - fontSize - columnHeight + (columnHeight - columnCurrentHeight);
  writePlayerName(cloudStartY, cloudHeight, columnStartY, currentPosition, colorText, textSize, padding, name, time, ctx);
  DrawHistogram(currentPosition, columnStartY, columnWidth, columnCurrentHeight, player, colorColumnPlayer, colorColumnOther, ctx);
}

var writePlayerName = function(cloudStartY, cloudHeight, columnStartY, currentPosition, colorText, textSize, padding, name, time, ctx) {
  ctx.fillStyle = colorText;
  ctx.font = textSize;
  ctx.fillText(name, currentPosition, cloudStartY + cloudHeight - padding);
  ctx.fillText(time, currentPosition, columnStartY - padding / 2);
}

var DrawHistogram = function(currentPosition, columnStartY, columnWidth, columnCurrentHeight, player, colorColumnPlayer, colorColumnOther, ctx) {
  ctx.fillStyle = player ? colorColumnPlayer : colorColumnOther.replace('opacity', getRandom(0.3, 1));
  ctx.fillRect(currentPosition, columnStartY, columnWidth, columnCurrentHeight);
}

var getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}