angular.module("hairselfy").controller('guidelineCtrl', function guidelineCtrl(common, guidelinePrvd) {
  var vm = this;
  var conn;
  var process_datas = common.process;
  var peer = new Peer({
    host: '192.168.108.239',
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
    var canvas = document.getElementById("draw_guide");
    //var ctx = canvas.getContext('2d');
    //console.log(ctx);
    //ctx.beginPath();
    //ctx.fillRect(20, 20, 80, 40);
    /*********** 本当はandroidからアクセスがあった時に表示 ****************/
    var w = $('#peer-camera').width();
    var h = $('#peer-camera').height();
    $('#draw_guide').attr('width', w);
    $('#draw_guide').attr('height', h);
    guidelinePrvd.processController(canvas, vm.process_datas);
  };

  vm.init = function(ua, peer_id, datas) {
    vm.user_agent = "pc";
    vm.peer_id = "";
    vm.rot_data = 0;
    vm.process_datas = [];

    //existing selected data
    if(datas.length > 0) {
      var select_datas = JSON.parse(datas);
      for(var i=0; i<select_datas.length; i++) {
        vm.process_datas.push(process_datas[select_datas[i].name]);
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