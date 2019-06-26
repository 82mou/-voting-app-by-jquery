const TRANSITION_END = 'transitionend';// 2つ指定していると2回バインドされる
const ANIMATION_END = 'animationend';// 2つ指定していると2回バインドされる

/*
 * 初期化
 */
let database = firebase.database();
let refTitle = database.ref('title');
let refCount = database.ref('count');
let refName = database.ref('name');
let refSound = database.ref('sound');
let refPushComment = database.ref('pushComment');
let refView = database.ref('view');
let refCountStop = database.ref('countStop');
let $titleForm = $('#js-title-form');
let $title = $('.js-title');
let titleObj = {};
let nameObj = {};
let $post = $('.js-post');
let $pushComment = $('.js-push-comment-text');
let pushCommentObj = {};
let countObj = {};

let $count = $('.js-count');

let countStop = false;

let $layer = $('.js-layer');
let $layerCountStop = $('.js-layer-count-stop');

let silentA = false;
let silentB = false;
let silentC = false;
let silentD = false;

/*
 * View
 * ・タイトル表示
 * ・カウント表示
 * ・名前表示
 * ・サウンド設定
 * ・コメント表示
 */

let defRenderTitle = (titleObj) => {
  $title.text(titleObj.value);
};

let renderTitle = (titleObj) => {
  $title.text(titleObj.title);
};

let defRenderCount = (countObj) => {
  $(`.js-count-${countObj.id}`).text(countObj.value);
};

let renderCount = (countObj) => {
  for (let key in countObj){
    if(parseInt($(`.js-count-${key}`).text(), 10) !== countObj[key]) {
      $(`.js-count-${key}`).text(countObj[key]);
      let $targetCountObjPost = $(`.js-count-${key}`).closest('.js-post');
      $targetCountObjPost.addClass('is-animated');

      if(key === 'a') {
        if(silentA === true) {
          return
        }
        playSound(soundListA);
      } else if(key === 'b') {
        if(silentB === true) {
          return
        }
        playSound(soundListB);
      } else if(key === 'c') {
        if(silentC === true) {
          return
        }
        playSound(soundListC);
      } else if(key === 'd') {
        if(silentD === true) {
          return
        }
        playSound(soundListD);
      }
    }
  }
};

let defRenderName = (nameObj) => {
  $(`.js-name-${nameObj.id}`).text(nameObj.value);
};

let renderName = (nameObj) => {
  for (let key in nameObj){
    $(`.js-name-${key}`).text(nameObj[key]);
  }
};

let defSound = (soundObj) => {
  if(soundObj.id === 'soundA') {
    if(soundObj.value === '') {
      silentA = true;
    } else {
      silentA = false;
      soundListA = soundList[soundObj.value];
    }
  } else if(soundObj.id === 'soundB') {
    if(soundObj.value === '') {
      silentB = true;
    } else {
      silentB = false;
      soundListB = soundList[soundObj.value];
    }
  } else if(soundObj.id === 'soundC') {
    if(soundObj.value === '') {
      silentC = true;
    } else {
      silentC = false;
      soundListC = soundList[soundObj.value];
    }
  } else if(soundObj.id === 'soundD') {
    if(soundObj.value === '') {
      silentD = true;
    } else {
      silentD = false;
      soundListD = soundList[soundObj.value];
    }
  }
};

let sound = (soundObj) => {
  for (let key in soundObj){
    if(key === 'soundA') {
      if(soundObj[key] === '') {
        silentA = true;
      } else {
        silentA = false;
        soundListA = soundList[soundObj[key]];
      }
    } else if(key === 'soundB') {
      if(soundObj[key] === '') {
        silentB = true;
      } else {
        silentB = false;
        soundListB = soundList[soundObj[key]];
      }
    } else if(key === 'soundC') {
      if(soundObj[key] === '') {
        silentC = true;
      } else {
        silentC = false;
        soundListC = soundList[soundObj[key]];
      }
    } else if(key === 'soundD') {
      if(soundObj[key] === '') {
        silentD = true;
      } else {
        silentD = false;
        soundListD = soundList[soundObj[key]];
      }
    }
  }
};

let defRenderPushComment = (pushCommentObj) => {
  $pushComment.text(pushCommentObj.value);
  setTimeout(() => {
    $pushComment.addClass('is-animate');
  });
};

let renderPushComment = (pushCommentObj) => {
  $pushComment.text(pushCommentObj.pushComment);
  setTimeout(() => {
    $pushComment.addClass('is-animate');
  });
};

/*
 * サウンド
 */
let ctx,
  soundList,
  soundListA,
  soundListB,
  soundListC,
  soundListD,
  loadSound,
  playSound;

loadSound = function(sound) {
  let xml;
  xml = new XMLHttpRequest();
  xml.responseType = 'arraybuffer';
  xml.open('GET', sound.url, true);
  xml.onload = function() {
    ctx.decodeAudioData(
      xml.response,
      function(data) {
        sound.data = data;
      },
      function(e) {
        //alert(e.err);
      }
    );
  };
  xml.send();
};
playSound = function(sound) {
  let bufferSource;
  if (!sound.data) {
    return;
  }
  bufferSource = ctx.createBufferSource();
  bufferSource.buffer = sound.data;
  bufferSource.connect(ctx.destination);
  bufferSource.start(0);
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();
soundList = [
  {url: 'https://lig824.github.io/event/public/assets/lib/media/decision13.mp3', data: null},
  {url: 'https://lig824.github.io/event/public/assets/lib/media/clearing1.mp3', data: null},
  {url: 'https://lig824.github.io/event/public/assets/lib/media/tin1.mp3', data: null},
  {url: 'https://lig824.github.io/event/public/assets/lib/media/decision12.mp3', data: null}
];
soundList.forEach(loadSound);

/*
 * カウント表示/非表示判定
 */

/*
 * クリックイベント
 * ・初期読み込み
 * ・pushイベント検知
 */
refTitle.on("child_added", (snapshot) => {
  // データベースと同期
  //titleObj[snapshot.key] = snapshot.val();
  //renderTitle(titleObj);
  defRenderTitle({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refTitle.on("value", (snapshot) => {
  renderTitle(snapshot.val());
});

refName.on("child_added", (snapshot) => {
  // データベースと同期
  //nameObj[snapshot.key] = snapshot.val();

  defRenderName({
      id: snapshot.key,
      value: snapshot.val()
    });
});

refName.on("value", (snapshot) => {
  renderName(snapshot.val());
});

refCount.on("child_added", (snapshot) => {
  // データベースと同期
  //countObj[snapshot.key] = snapshot.val();

  defRenderCount({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refCount.on("value", (snapshot) => {
  renderCount(snapshot.val());
});

refSound.on("child_added", (snapshot) => {
  defSound({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refSound.on("value", (snapshot) => {
  sound(snapshot.val());
});

refPushComment.on("child_added", (snapshot) => {
  // データベースと同期
  //pushCommentObj[snapshot.key] = snapshot.val();
  // DBのテキストが空だったら何もしない
  if(snapshot.val() === '') {
    return;
  }
  defRenderPushComment({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refPushComment.on("value", (snapshot) => {
  // DBのテキストが空だったら何もしない
  if(snapshot.val().pushComment === '') {
    return;
  }
  renderPushComment(snapshot.val());
});


refView.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refView.on("value", (snapshot) => {
  if(snapshot.val().view === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refCountStop.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

refCountStop.on("value", (snapshot) => {
  if(snapshot.val().countStop === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

$pushComment.on('animationend', (e) => {
  $pushComment.text('');
  refPushComment.update({
    pushComment: ''
  });
  $(e.currentTarget).removeClass('is-animate');
});

/*
 * その他
 */
let showCountStop = () => {
  $layer.removeClass('dn');
  $layerCountStop.removeClass('dn');
  $layer.addClass('is-show');
};

let hideCountStop = () => {
  $layer.removeClass('is-show').one(TRANSITION_END, () => {
    $layerCountStop.addClass('dn');
    $layer.addClass('dn');
  });
};

$post.on(ANIMATION_END, (e) => {
  $(e.currentTarget).removeClass('is-animated');
});
