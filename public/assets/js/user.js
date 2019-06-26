console.warn("This script is development version.");
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

"use strict";


var TRANSITION_END = 'transitionend'; // 2つ指定していると2回バインドされる
var ANIMATION_END = 'animationend'; // 2つ指定していると2回バインドされる

/*
 * 初期化
 */
var database = firebase.database();
var refTitle = database.ref('title');
var refCount = database.ref('count');
var refName = database.ref('name');
var refComment = database.ref('comment');
var refCountStop = database.ref('countStop');
var refView = database.ref('view');
var $title = $('.js-title');
var titleObj = {};
var nameObj = {};
var $post = $('.js-post');
var $submit = $('.js-submit');
var $form = $('#js-form');
var countObj = {};
var commentObj = {};

var $count = $('.js-count');

var countStop = false;

var $layer = $('.js-layer');
var $layerLoading = $('.js-layer-loading');
var $layerCountStop = $('.js-layer-count-stop');

/*
 * View
 * ・タイトル表示
 * ・カウント表示
 * ・名前表示
 */

var defRenderTitle = function defRenderTitle(titleObj) {
  $title.text(titleObj.value);
};

var renderTitle = function renderTitle(titleObj) {
  $title.text(titleObj.title);
};

var defRenderCount = function defRenderCount(countObj) {
  var $targetCountObj = $('.js-count-' + countObj.id);

  $targetCountObj.text(countObj.value);
  checkFontSize($targetCountObj);
};

var renderCount = function renderCount(countObj) {
  for (var key in countObj) {
    if (parseInt($('.js-count-' + key).text(), 10) !== countObj[key]) {
      var $targetCountObj = $('.js-count-' + key);
      var $targetCountObjPost = $targetCountObj.closest('.js-post');

      $targetCountObjPost.addClass('is-animated');
      $targetCountObj.text(countObj[key]);
      checkFontSize($targetCountObj);
    }
  }
};

var defRenderName = function defRenderName(nameObj) {
  $('.js-name-' + nameObj.id).text(nameObj.value);
};

var renderName = function renderName(nameObj) {
  for (var key in nameObj) {
    $('.js-name-' + key).text(nameObj[key]);
  }
};

var postActionCount = function postActionCount(initial, countVal) {
  var arg = {};
  arg[initial] = countVal;
  show();
  refCount.update(arg).then(function (res) {
    setTimeout(function () {
      hide();
    }, 300);
  });
};

var postActionComment = function postActionComment(commentVal) {
  var arg = {};
  arg['comment'] = commentVal;

  refComment.push(arg).then(function (res) {
    //console.log(res);
  });
};

/*
 * カウント表示/非表示判定
 */

/*
 * 集計停止判定
 */

/*
 * クリックイベント
 * ・アルファベット桜花
 * ・コメント送信
 * ・初期読み込み
 * ・pushイベント検知
 */
$post.on('click', function (e) {
  if (countStop) {
    return;
  }
  var initial = $(e.currentTarget).data('initial');
  countObj[initial] = countObj[initial] + 1;
  postActionCount(initial, countObj[initial]);
});

$form.on('submit', function (e) {
  e.preventDefault();
  var commentVal = $(e.currentTarget).find('.js-comment').val();

  postActionComment(commentVal);

  // データベースに送信後は値を空にする
  $(e.currentTarget).find('.js-comment').val('');
});

refTitle.on("child_added", function (snapshot) {
  // データベースと同期
  //titleObj[snapshot.key] = snapshot.val();
  //renderTitle(titleObj);
  defRenderTitle({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refTitle.on("value", function (snapshot) {
  renderTitle(snapshot.val());
});

//refName.on("child_added", (snapshot) => {
//  // データベースと同期
//  nameObj[snapshot.key] = snapshot.val();
//  renderName(nameObj);
//});

refName.on("child_added", function (snapshot) {
  // データベースと同期
  //nameObj[snapshot.key] = snapshot.val();

  defRenderName({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refName.on("value", function (snapshot) {
  renderName(snapshot.val());
});

refCount.on("child_added", function (snapshot) {
  console.log('hoge');
  // データベースと同期
  countObj[snapshot.key] = snapshot.val();

  defRenderCount({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refCount.on("value", function (snapshot) {
  console.log('fuga');
  var snapshotObj = snapshot.val();

  // データベースと同期
  for (var key in snapshotObj) {
    countObj[key] = snapshotObj[key];
  }

  renderCount(snapshot.val());
});

refView.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refView.on("value", function (snapshot) {
  if (snapshot.val().view === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refCountStop.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

refCountStop.on("value", function (snapshot) {
  if (snapshot.val().countStop === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

/*
 * その他
 */
var checkFontSize = function checkFontSize(targetCountObj) {
  var $countTextLength = targetCountObj.text().length;
  if ($countTextLength > 3) {
    targetCountObj.addClass('count__num--long');
  } else {
    targetCountObj.removeClass('count__num--long');
  }
};

var show = function show() {
  $layer.removeClass('dn');
  $layerLoading.removeClass('dn');
  $layer.addClass('is-show');
};

var hide = function hide() {
  $layer.removeClass('is-show').one(TRANSITION_END, function () {
    $layerLoading.addClass('dn');
    $layer.addClass('dn');
  });
};

var showCountStop = function showCountStop() {
  $layer.removeClass('dn');
  $layerCountStop.removeClass('dn');
  $layer.addClass('is-show');
};

var hideCountStop = function hideCountStop() {
  $layer.removeClass('is-show').one(TRANSITION_END, function () {
    $layerCountStop.addClass('dn');
    $layer.addClass('dn');
  });
};

$post.on(ANIMATION_END, function (e) {
  $(e.currentTarget).removeClass('is-animated');
});

/***/ }

/******/ });
//# sourceMappingURL=maps/user.map