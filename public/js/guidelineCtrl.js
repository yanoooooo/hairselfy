//渡されたヘアアレンジの種類とパラメータを描画する
angular.module("hairselfy").controller('guidelineCtrl', function guidelineCtrl(common, guidelinePrvd, $timeout, $location, $anchorScroll) {
  var vm = this;
  var interval = 10000;
  var conn;
  var process_datas = [];
  var camera_datas = common.camera;
  var pc_debug = false;
  var peer = new Peer({
    //host: '192.168.108.224',
    host: '192.168.0.95',
    port: 9000,
    path: '/peerjs',
    debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
      //credential: 'muazkh', username: 'webrtc@live.com' }
      credential: 'test', username: 'test' }
    ]}
  });

  vm.draw = function() {
    /*********** 本当はandroidからアクセスがあった時に表示 ****************/
    var data = vm.process_datas;
    var w = $('#peer-camera').width();
    var h = $('#peer-camera').height();
    $('#draw_guide').attr('width', w);
    $('#draw_guide').attr('height', h);
    $('#animation').attr('width', w);
    $('#animation').attr('height', h);

    var canvas = document.getElementById("draw_guide");
    if ( !canvas || ! canvas.getContext ) { return false; }
    var ctx = canvas.getContext('2d');
    vm.proccessCtrl(canvas, ctx, data, 0);
  };

  vm.proccessCtrl = function(canvas, ctx, data, process_num) {
    var guide_num = 0;

    if(process_num < data.length) {
      vm.guideCtrl(canvas, ctx, data, guide_num, process_num);
    } else {
      console.log("finish");
      vm.changeIconCss(process_num-1, data[process_num-1].length);
      angular.element("#icon_finish").css({'border':'solid 2px red', 'border-radius': '10px'});
      guidelinePrvd.drawFinish(canvas, ctx);
    }
  };

  vm.changeIconCss = function(process_num, guide_num) {
    //渡されたguide_num以前の枠を消す
    if(guide_num > 0) {
      var id = "#icon_"+process_num+"_"+String(guide_num-1);
      angular.element(id).css('border', '');
    }
    
    //渡されたguide_numに赤い枠と自動スクロール
    angular.element("#icon_"+process_num+"_"+guide_num).css({'border':'solid 2px red', 'border-radius': '10px'});
    $location.hash("icon_"+process_num+"_"+guide_num);
    // call $anchorScroll()
    $anchorScroll();
  };

  vm.guideCtrl = function(canvas, ctx, data, guide_num, process_num) {
    //create style
    vm.changeIconCss(process_num, guide_num);

    //console.log(data[process_num][guide_num]);
    var ani_canvas = document.getElementById("animation");
    if ( !ani_canvas || ! ani_canvas.getContext ) { return false; }
    var ani_ctx = ani_canvas.getContext('2d');
    var promise;
    guidelinePrvd.clear(ani_canvas, ani_ctx);
    guidelinePrvd.clear(canvas, ctx);
    guidelinePrvd.drawFaceGuide(canvas, ctx, data[process_num][guide_num].camera);
    guidelinePrvd.drawText(canvas, ctx, data[process_num][guide_num].text);

    //moving camera
    if(!pc_debug) {
      var rot = camera_datas[data[process_num][guide_num].camera].rot;
      console.log(rot);
      conn.send(rot);
      handleMessage(rot);
    }
    
    switch(data[process_num][guide_num].guide) {
      case "Turn":
        promise = guidelinePrvd.drawTurn(canvas, ctx, data[process_num][guide_num].parameter);
        break;
      case "Twist":
        promise = guidelinePrvd.drawTwist(canvas, ctx, data[process_num][guide_num].parameter);
        break;
      case "French":
        promise = guidelinePrvd.drawFrench(ani_canvas, ani_ctx, data[process_num][guide_num].parameter);
        break;
      case "Braid":
        promise = guidelinePrvd.drawBraid(ani_canvas, ani_ctx, data[process_num][guide_num].parameter);
        break;
      case "Gather":
        promise = guidelinePrvd.drawGather(canvas, ctx, data[process_num][guide_num].parameter);
        break;
      case "Divide":
        promise = guidelinePrvd.drawDivide(canvas, ctx, data[process_num][guide_num].parameter);
        break;
      case "Tie":
        promise = guidelinePrvd.drawTie(canvas, ctx, data[process_num][guide_num].parameter);
        break;
      default:
        break;
    }
    promise.then(function(response){
      if(guide_num < data[process_num].length-1) {
        guide_num += 1;
        $timeout(function(){
          vm.guideCtrl(canvas, ctx, data, guide_num, process_num);
        }, interval);
      } else {
        process_num += 1;
        $timeout(function(){
          guidelinePrvd.clear(ani_canvas, ani_ctx);
          guidelinePrvd.clear(canvas, ctx);
          vm.proccessCtrl(canvas, ctx, data, process_num);
        }, interval);
      }
    }, function(response){
      console.log("error!");
    });
  };

  vm.init = function(ua, peer_id, datas) {
    vm.user_agent = "pc";
    vm.peer_id = "";
    vm.rot_data = 0;
    vm.process_datas = [];
    vm.icon_style = [];

    //existing selected data
    if(datas.length > 0) {
      var select_datas = JSON.parse(datas);
      for(var i=0; i<select_datas.select.length; i++) {
        vm.process_datas = select_datas.process;
      }
    }

    //console.log(peer_id);
    if (ua.indexOf('Android') > 0) {
      vm.user_agent = "sp";
      vm.peer_id = peer_id;
      //vm.tracker = new HT.Tracker();
    } else {
      peer.on('open', function(){
        angular.element('#id').text(peer.id);
      });
    }

    //servo
    if(peer_id) {
      conn = peer.connect(peer_id, {metadata: {
        'username': vm.user_agent
      }});
      conn.on('data', handleMessage);
    }

    peer.on('connection', function(connection){
      conn = connection;
      conn.on('data', handleMessage);
    });

    //spの場合、自動で通信開始
    setTimeout(function() {
      if(vm.peer_id !== undefined && vm.user_agent == "sp") {
        vm.login();
      }
    }, 3000);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //pc video setting
    function getVideo(callback){
      navigator.getUserMedia({audio: false, video: true}, callback, function(error){
        //console.log(error);
        alert('An error occured. Please try again');
      });
    }

    getVideo(function(stream){
      window.localStream = stream;
      onReceiveStream(stream, vm.user_agent+'Video');
    });
  };

  vm.sendServo = function() {
    var data = vm.rot_data;
    conn.send(data);
    handleMessage(data);
  };

  //callback function
  function onReceiveStream(stream, element_id){
    var video = $('#' + element_id + ' video')[0];
    video.src = window.URL.createObjectURL(stream);
    window.peer_stream = stream;
  }

  function onReceiveCall(call){
    call.answer(window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      onReceiveStream(stream, 'peer-camera');
      //vm.draw();
    });
  }

  function handleMessage(data){
    vm.rotServo(data);
  }

  vm.rotServo = function(rot) {
    if(vm.user_agent == "sp") {
      //console.log(rot);
      android.rotServo(rot);
    }
  };

  vm.login = function() {
    //console.log(vm.peer_id);
    /*if(vm.peer_id){
      conn = peer.connect(vm.peer_id, {metadata: {
        'username': 'smartphone'
      }});
    }*/

    var call = peer.call(vm.peer_id, window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      onReceiveStream(stream, 'peer-camera');
    });
  };

  peer.on('call', function(call){
    onReceiveCall(call);
  });
});