'use strict';

window.renderStatistics = function(ctx, names, times) {
  var Parameters = {};
  Parameters.frameStartX = 100; //Координата X облака
  Parameters.frameStartY = 10; //Координата X облака
  Parameters.frameWidth = 420; //Ширина облака
  Parameters.frameHeight = 270; //Высота облака
  Parameters.frameShadowOffset = 10; //Смещение тени облака по X и Y
  Parameters.fontSize  = 16; //Размер шрифта
  Parameters.padding = 20; //Отступы для текста
  Parameters.gistWidth = 40; //Ширина столбца гистограммы
  Parameters.gistHeight = 150; //Высота столбца гистограммы
  Parameters.gistInt = 50; //Расстояние между столбцами
  Parameters.name = ''; //Имя игрока
  Parameters.time = 0; //Время игрока
  Parameters.maxTime = 0; //максимальное время
  Parameters.player = true; //флаг текущего игрока
  Parameters.currentPosition = 0; //для определения координат столбцов гистограммы

  // Рисуем тень от облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(Parameters.frameStartX + Parameters.frameShadowOffset, Parameters.frameStartY + Parameters.frameShadowOffset, Parameters.frameWidth, Parameters.frameHeight);
  // Рисуем облако
  ctx.fillStyle = 'white';
  ctx.fillRect(Parameters.frameStartX, Parameters.frameStartY, Parameters.frameWidth, Parameters.frameHeight);
  // Пишем приветствие
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', Parameters.frameStartX + Parameters.padding, Parameters.frameStartY + Parameters.fontSize + Parameters.padding);
  ctx.fillText('Список результатов:', Parameters.frameStartX + Parameters.padding, Parameters.frameStartY + (Parameters.fontSize * 2) + Parameters.padding);
  // Ищем максимальное время
  var currTime = 0;
  for (var i = 0; i < times.length; i++) {
    currTime = Math.round(times[i]);
    if (currTime > Parameters.maxTime) {
      Parameters.maxTime = currTime;
    }
  }
  // Выводим результаты (результат игрока - первый)
  var positionNum = 1 // позиция остальных результатов
  for (var i = 0; i < names.length; i++) {
    Parameters.name = names[i];
    Parameters.time = Math.round(times[i]);
    // Если игорок
    if (Parameters.name === 'Вы') {
      Parameters.player = true;
      Parameters.currentPosition = Parameters.frameStartX + Parameters.gistInt;
      DrawColumn(Parameters, ctx);
    } else {
      // Если остальные
      Parameters.player = false;
      Parameters.currentPosition = ((Parameters.gistWidth + Parameters.gistInt) * positionNum) + Parameters.gistInt + Parameters.frameStartX;
      DrawColumn(Parameters, ctx);
      positionNum ++;
    }
  }
}

var DrawColumn = function(Parameters, ctx) {
  // цвет столбца
  var color;
  // высота столбца
  var gistCurrentHeight = (Parameters.gistHeight * Parameters.time) / Parameters.maxTime;
  // Координата столбца по Y
  var gistColumnStartY = Parameters.frameStartY + Parameters.frameHeight - Parameters.padding - Parameters.fontSize - Parameters.gistHeight + (Parameters.gistHeight - gistCurrentHeight);
  // Цвет столбца
  if (Parameters.player) {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    color = 'rgba(0, 0, 255, ' + getRnd(0.3, 1) + ')';
  }
  // выводим имя игрока
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText(Parameters.name, Parameters.currentPosition, Parameters.frameStartY + Parameters.frameHeight - Parameters.padding);
  // выводим результат
  ctx.fillText(Parameters.time, Parameters.currentPosition, gistColumnStartY - Parameters.padding / 2);
  // Рисуем гистограмму
  ctx.fillStyle = color;
  ctx.fillRect(Parameters.currentPosition, gistColumnStartY, Parameters.gistWidth, gistCurrentHeight);
}

var getRnd = function(min, max) {
  return Math.random() * (max - min) + min;
}
