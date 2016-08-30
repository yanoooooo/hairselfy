angular.module("hairselfy").controller('videoCtrl', function videoCtrl() {
  var vm = this;
  vm.user_agent = "pc";
  vm.peer_id = "";
  //var messages = [];
  //var peer_id, name, conn;

  var peer = new Peer({
    host: 'localhost',
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

  //callback function
  function onReceiveStream(stream, element_id){
    var video = $('#' + element_id + ' video')[0];
    video.src = window.URL.createObjectURL(stream);
    window.peer_stream = stream;
  }

  function onReceiveCall(call){
    console.log("through");
    call.answer(window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      onReceiveStream(stream, 'peer-camera');
    });
  }

  //hand tracking
  vm.HandTraking = function(){
    var hand_video = $("#spVideo video")[0];
    var that = vm, image, candidate;
    
    requestAnimationFrame( function() { return that.HandTraking(); } );
    
    console.dir(hand_video);
    if (hand_video.readyState === hand_video.HAVE_ENOUGH_DATA){
      image = snapshot(hand_video);
      
      candidate = vm.tracker.detect(image);
      
      draw(candidate);
    }
  };

  function snapshot(video){
    vm.context.drawImage(video, 0, 0, vm.canvas.width, vm.canvas.height);
      
    return vm.context.getImageData(0, 0, vm.canvas.width, vm.canvas.height);
  }

  function draw(candidate){
    if (candidate){
      drawHull(candidate.hull, "red");
      /*if (this.cbxHull.checked){
        drawHull(candidate.hull, "red");
      }
      
      if (this.cbxDefects.checked){
        this.drawDefects(candidate.defects, "blue");
      }
    }
    
    if (this.cbxSkin.checked){
      this.context.putImageData(
        this.createImage(this.tracker.mask, this.image), 
        this.canvas.width - this.image.width,
        this.canvas.height - this.image.height);
    }*/
    }
  }
  
  function drawHull(hull, color){
    var len = hull.length, i = 1;
  
    if (len > 0){
      vm.context.beginPath();
      vm.context.lineWidth = 3;
      vm.context.strokeStyle = color;

      vm.context.moveTo(hull[0].x, hull[0].y);
      for (; i < len; ++ i){
        vm.context.lineTo(hull[i].x, hull[i].y);
      }

      vm.context.stroke();
      vm.context.closePath();
    }
  }
  
  /*DEMO.prototype.drawDefects = function(defects, color){
    var len = defects.length, i = 0, point;
  
    if (len > 0){
      this.context.beginPath();
      this.context.lineWidth = 3;
      this.context.strokeStyle = color;

      for (; i < len; ++ i){
        point = defects[i].depthPoint;
        this.context.strokeRect(point.x - 4, point.y - 4, 8, 8);
      }

      this.context.stroke();
      this.context.closePath();
    }
  };

  DEMO.prototype.createImage = function(imageSrc, imageDst){
    var src = imageSrc.data, dst = imageDst.data,
        width = imageSrc.width, span = 4 * width,
        len = src.length, i = 0, j = 0, k = 0;
    
    for(i = 0; i < len; i += span){
    
      for(j = 0; j < width; j += 5){
      
        dst[k] = dst[k + 1] = dst[k + 2] = src[i];
        dst[k + 3] = 255;
        k += 4;
        
        i += 5;
      }
    }
    
    return imageDst;
  };*/

  vm.init = function(ua) {
    if (ua.indexOf('Android') > 0) {
      vm.user_agent = "sp";
      vm.tracker = new HT.Tracker();
    }

    peer.on('open', function(){
      angular.element('#id').text(peer.id);
    });

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //pc video setting
    function getVideo(callback){
      navigator.getUserMedia({audio: false, video: true}, callback, function(error){
        console.log(error);
        alert('An error occured. Please try again');
      });
    }

    getVideo(function(stream){
      window.localStream = stream;
      onReceiveStream(stream, vm.user_agent+'Video');
      if(vm.user_agent == "sp") {
        vm.HandTraking();
      }
    });
  };

  vm.setCanvas = function() {
    vm.canvas = document.getElementById("hand_tracking");
    vm.context = vm.canvas.getContext("2d");
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