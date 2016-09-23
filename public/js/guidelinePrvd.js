angular.module("hairselfy").provider('guidelinePrvd', function() {
    var vm = this;
    var canvas, ctx;
    var interval = 10000;
    var camera_data, img_path;
    var colors = [
        "rgba(255, 184, 213, 0.7)",
        "rgba(197, 187, 255, 0.7)",
        "rgba(246, 255, 131, 0.7)",
        "rgba(100, 163, 255, 0.7)",
        "rgba(255, 135, 54, 0.7)"
    ];
    var swap_color = colors;

    vm.$get = function(common, $q, $timeout){
        camera_data = common.camera;
        img_path = common.img_path;

        function methodBraid(canvas, ctx, num, data, max, deferred) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            var method = num%3;
            var img = new Image();
            var three_colors = [];
            var vertex = 500 + num * 12;
            var base = 100 + num * 12;
            img.onload = function onImageLoad() {
                ctx.drawImage(img, 30, canvas.height/3*2, canvas.width+30, canvas.height/3);
            };
            img.src = img_path.Braid.hand[method];

            //swap colors
            if(num%3 === 0 && num !== 0) {
                var old = swap_color[0];
                swap_color[0] = swap_color[1];
                swap_color[1] = swap_color[2];
                swap_color[2] = old;
                console.dir(swap_color);
            }

            if(method === 0) {
                for(i=0; i<3; i++) {
                    ctx.fillStyle = swap_color[i];
                    ctx.beginPath();
                    ctx.moveTo(200+(i*50),vertex);
                    //座標を指定してラインを引いていく
                    ctx.lineTo(225+(i*50),base);
                    ctx.lineTo(175+(i*50),base);
                    ctx.closePath();
                    ctx.fill();
                }
            } else if(method === 1) {
                ctx.fillStyle = swap_color[2];
                ctx.beginPath();
                ctx.moveTo(200+(2*50),vertex);
                ctx.lineTo(225+(2*50),base);
                ctx.lineTo(175+(2*50),base);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = swap_color[1];
                ctx.beginPath();
                ctx.moveTo(200+(-1*50),vertex);
                ctx.lineTo(225+(1*50),base);
                ctx.lineTo(175+(1*50),base);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = swap_color[0];
                ctx.beginPath();
                ctx.moveTo(350,vertex);
                ctx.lineTo(225,base);
                ctx.lineTo(175,base);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillStyle = swap_color[1];
                ctx.beginPath();
                ctx.moveTo(200+(-1*50),vertex);
                ctx.lineTo(225+(1*50),base);
                ctx.lineTo(175+(1*50),base);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = swap_color[0];
                ctx.beginPath();
                ctx.moveTo(350,vertex);
                ctx.lineTo(225,base);
                ctx.lineTo(175,base);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = swap_color[2];
                ctx.beginPath();
                ctx.moveTo(200+(-1*50),vertex);
                ctx.lineTo(225+(2*50),base);
                ctx.lineTo(175+(2*50),base);
                ctx.closePath();
                ctx.fill();
            }
            if(num < max) {
                num++;
                $timeout(function(){
                    methodBraid(canvas, ctx, num, data, max, deferred);
                }, interval);
            } else {
                deferred.resolve(true);
            }
        }

        return {
            drawFaceGuide:function(canvas, ctx, camera) {
                var img = new Image();
                img.onload = function onImageLoad() {
                    ctx.drawImage(img, canvas.width/10*1, 30, canvas.width/10*8, canvas.height-30);
                };
                img.src = camera_data[camera].src;
            },
            drawText: function(canvas, ctx, text) {
                ctx.font = "20px 'ヒラギノ 角ゴ'";
                /* 青色でstrokText */
                ctx.fillStyle = "rgb(254, 168, 126)";
                ctx.fillText(text, 30, 25);
            },
            drawBraid: function(canvas, ctx, data) {
                //thickness, heigh, hardness
                var deferred = $q.defer();
                swap_color = colors;
                methodBraid(canvas, ctx, 0, data, 14, deferred);
                return deferred.promise;
            },
            drawGather: function(canvas, ctx, data) {
                // direction: right, left
                var deferred = $q.defer();
                var img = new Image();
                if (data.direction == "right") {
                    img.onload = function onImageLoad() {
                        ctx.drawImage(img, 0, canvas.height/3*2, canvas.width, canvas.height/3);
                        deferred.resolve(true);
                    };
                    img.onerror = function() {
                        deferred.reject(false);
                    };
                    img.src = img_path.Gather[data.direction];
                } else {

                }
                return deferred.promise;
            },
            drawDivide: function(canvas, ctx, data) {
                // num: 0, 1, 2
                var deferred = $q.defer();
                var img = new Image();
                //draw hand
                img.onload = function onImageLoad() {
                    ctx.drawImage(img, 30, canvas.height/3*2, canvas.width+30, canvas.height/3);
                    deferred.resolve(true);
                };
                img.onerror = function() {
                    deferred.reject(false);
                };
                img.src = img_path.Divide.hand;

                for(var i=0; i<data.num; i++) {
                    ctx.fillStyle = colors[i];
                    ctx.beginPath();
                    ctx.moveTo(200+(i*50),500);
                    //座標を指定してラインを引いていく
                    ctx.lineTo(225+(i*50),100);
                    ctx.lineTo(175+(i*50),100);
                    ctx.closePath();
                    ctx.fill();
                }
                return deferred.promise;
            },
            drawTie: function(canvas, ctx, data) {
                // position
                var deferred = $q.defer();
                var img = new Image();
                if(data.position == "bottom") {
                    ctx.fillStyle = colors[0];
                    ctx.beginPath();
                    ctx.moveTo(250, 600);
                    ctx.lineTo(300, 100);
                    ctx.lineTo(200, 100);
                    ctx.closePath();
                    ctx.fill();

                    //draw hand
                    img.onload = function onImageLoad() {
                        ctx.drawImage(img, 30, canvas.height/3*2, canvas.width+30, canvas.height/3);
                        deferred.resolve(true);
                    };
                    img.onerror = function() {
                        deferred.reject(false);
                    };
                    img.src = img_path.Tie.hand;
                }
                return deferred.promise;
            },
            drawFinish: function(canvas, ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var img = new Image();
                img.onload = function onImageLoad() {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = img_path.Finish.src;
            },
            clear: function(canvas, ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
    };
});
