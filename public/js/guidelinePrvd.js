angular.module("hairselfy").provider('guidelinePrvd', function() {
    var vm = this;
    var canvas, ctx;
    var interval = 1000;
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

        function methodFrench(canvas, ctx, num, data, max, deferred) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            var method = num%5;
            var img = new Image();
            var vertex = 500 + num * 12;
            var base = 100 + num * 12;
            img.onload = function onImageLoad() {
                ctx.drawImage(img, 30, canvas.height/3*2, canvas.width+30, canvas.height/3);
            };
            img.src = img_path.French.hand[method];

            //swap colors
            if(num%5 === 0 && num !== 0) {
                var old = swap_color[0];
                swap_color[0] = swap_color[1];
                swap_color[1] = swap_color[2];
                swap_color[2] = old;
                //console.dir(swap_color);
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

                //すくう髪
                ctx.fillStyle = swap_color[3];
                ctx.beginPath();
                ctx.moveTo(160,vertex);
                ctx.lineTo(175,base);
                ctx.lineTo(145,base);
                ctx.closePath();
                ctx.fill();
            } else if(method === 2) {
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

                //すくう髪
                ctx.fillStyle = swap_color[3];
                ctx.beginPath();
                ctx.moveTo(350,vertex);
                ctx.lineTo(175,base);
                ctx.lineTo(145,base);
                ctx.closePath();
                ctx.fill();
            } else if(method === 3) {
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

                //すくった髪
                ctx.fillStyle = swap_color[3];
                ctx.beginPath();
                ctx.moveTo(350,vertex);
                ctx.lineTo(175,base);
                ctx.lineTo(145,base);
                ctx.closePath();
                ctx.fill();

                //すくう髪
                ctx.fillStyle = swap_color[4];
                ctx.beginPath();
                ctx.moveTo(190+(3*50),vertex);
                ctx.lineTo(205+(3*50),base);
                ctx.lineTo(175+(3*50),base);
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

                //すくった髪
                ctx.fillStyle = swap_color[3];
                ctx.beginPath();
                ctx.moveTo(350,vertex);
                ctx.lineTo(175,base);
                ctx.lineTo(145,base);
                ctx.closePath();
                ctx.fill();

                //すくう髪
                ctx.fillStyle = swap_color[4];
                ctx.beginPath();
                ctx.moveTo(200+(-1*50),vertex);
                ctx.lineTo(205+(3*50),base);
                ctx.lineTo(175+(3*50),base);
                ctx.closePath();
                ctx.fill();
            }
            if(num < max) {
                num++;
                $timeout(function(){
                    methodFrench(canvas, ctx, num, data, max, deferred);
                }, interval);
            } else {
                deferred.resolve(true);
            }
        }

        function methodBraid(canvas, ctx, num, data, max, deferred) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            var method = num%3;
            var img = new Image();
            var vertex = 500 + num * 12;
            var base = (100 + num * 12) / data.heigh;
            console.log(vertex);
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
                //console.dir(swap_color);
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

        function methodDivide(canvas, ctx, data, hand_path) {
            // num: 0, 1, 2, center, dist, thickness
            var deferred = $q.defer();
            var img = new Image();
            var thickness = 25 * data.thickness;
            var start_vertex = data.center-(data.num-1)*thickness;

            //draw hand
            img.onload = function onImageLoad() {
                if(data.num > 2) {
                    ctx.drawImage(img, 30, canvas.height/3*2, canvas.width+30, canvas.height/3);
                } else {
                    ctx.drawImage(img, 0, canvas.height/5*3, canvas.width, canvas.height/4);
                }
                deferred.resolve(true);
            };
            img.onerror = function() {
                deferred.reject(false);
            };

            img.src = hand_path;

            for(var i=0; i<data.num; i++) {
                ctx.fillStyle = colors[i];
                ctx.beginPath();
                ctx.moveTo(start_vertex+(i*thickness*2)+(i*data.dist),500);
                ctx.lineTo(start_vertex+thickness+(i*thickness*2)+(i*data.dist),100);
                ctx.lineTo(start_vertex-thickness+(i*thickness*2)+(i*data.dist),100);
                //console.log(start_vertex+(i*thickness*2)+(i*data.dist), start_vertex+thickness+(i*thickness*2)+(i*data.dist), start_vertex-thickness+(i*thickness*2)+(i*data.dist));
                /*ctx.moveTo(200+(i*50),500);
                ctx.lineTo(225+(i*50),100);
                ctx.lineTo(175+(i*50),100);*/
                ctx.closePath();
                ctx.fill();
            }
            return deferred.promise;
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
            drawTurn: function(canvas, ctx, data) {
                var deferred = $q.defer();
                ctx.fillStyle = colors[0];
                ctx.beginPath();
                ctx.moveTo(canvas.width/2+50, 400);
                ctx.lineTo(95, 100);
                ctx.lineTo(50, 100);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = colors[1];
                ctx.beginPath();
                ctx.moveTo(canvas.width/2-50, 400);
                ctx.lineTo(350, 100);
                ctx.lineTo(305, 100);
                ctx.closePath();
                ctx.fill();

                var img = new Image();
                img.onload = function onImageLoad() {
                    ctx.drawImage(img, canvas.width/3, canvas.height/2, 380/2, 141/2);
                };
                img.src = img_path.Turn.hand;

                var img_arrow = new Image();
                img_arrow.onload = function onImageLoad() {
                    ctx.drawImage(img_arrow, canvas.width/2-20, canvas.height/3, 117, 90);
                    deferred.resolve(true);
                };
                img_arrow.onerror = function() {
                    deferred.reject(false);
                };

                img_arrow.src = img_path.Turn.arrow;

                return deferred.promise;
            },
            drawTwist: function(canvas, ctx, data) {
                var deferred = $q.defer();
                var divide_promise = methodDivide(canvas, ctx, data, img_path.Twist.hand);
                divide_promise.then(function(response){
                    var img = new Image();

                    img.onload = function onImageLoad() {
                        ctx.drawImage(img, 0, canvas.height/3, canvas.width, canvas.height/3);
                        deferred.resolve(true);
                    };
                    img.onerror = function() {
                        deferred.reject(false);
                    };

                    img.src = img_path.Twist.arrow;
                }, function(response) {
                    console.log("error!");
                });
                return deferred.promise;
            },
            drawFrench: function(canvas, ctx, data) {
                //thickness, heigh, hardness, num
                var braid_deferred = $q.defer();
                var deferred = $q.defer();
                var num = data.num;
                swap_color = colors;
                methodBraid(canvas, ctx, 0, data, 3, braid_deferred);
                braid_deferred.promise.then(function(response){
                    methodFrench(canvas, ctx, 0, data, num, deferred);
                }, function(response){
                    deferred.reject(false);
                });
                return deferred.promise;
            },
            drawBraid: function(canvas, ctx, data) {
                //thickness, heigh, hardness, num
                var deferred = $q.defer();
                var num = data.num;
                swap_color = colors;
                methodBraid(canvas, ctx, 0, data, num, deferred);
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
                    img.onload = function onImageLoad() {
                        ctx.drawImage(img, 0, canvas.height/3*2, canvas.width, canvas.height/3);
                        deferred.resolve(true);
                    };
                    img.onerror = function() {
                        deferred.reject(false);
                    };
                    img.src = img_path.Gather[data.direction];
                }
                return deferred.promise;
            },
            drawDivide: function(canvas, ctx, data) {
                // num: 0, 1, 2, center, dist, thickness
                var path = "";
                if(data.num > 2) {
                    path = img_path.Divide.hand_many;
                } else {
                    path = img_path.Divide.hand_less;
                }
                var promise = methodDivide(canvas, ctx, data, path);
                return promise;
            },
            drawTie: function(canvas, ctx, data) {
                // position
                var deferred = $q.defer();
                var hand_position = {};
                var img = new Image();
                if(data.num == 1) {
                    ctx.fillStyle = colors[0];
                    ctx.beginPath();
                    ctx.moveTo(250, 600);
                    ctx.lineTo(300, 100);
                    ctx.lineTo(200, 100);
                    ctx.closePath();
                    ctx.fill();

                    hand_position.x = 30;
                    hand_position.width = canvas.width+30;
                } else if(data.num == 2) {
                    ctx.fillStyle = colors[0];
                    ctx.beginPath();
                    ctx.moveTo(canvas.width/2+50, 400);
                    ctx.lineTo(95, 100);
                    ctx.lineTo(50, 100);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle = colors[1];
                    ctx.beginPath();
                    ctx.moveTo(canvas.width/2-50, 400);
                    ctx.lineTo(350, 100);
                    ctx.lineTo(305, 100);
                    ctx.closePath();
                    ctx.fill();

                    hand_position.x = 0;
                    hand_position.width = canvas.width;
                }
                if(data.position == "bottom") {
                    hand_position.y = canvas.height/3*2;
                    hand_position.height = canvas.height/3;
                } else if(data.position == "above") {
                    hand_position.y = canvas.height/3;
                    hand_position.height = canvas.height/3;
                }
                //draw hand
                img.onload = function onImageLoad() {
                    ctx.drawImage(img, hand_position.x, hand_position.y, hand_position.width, hand_position.height);
                    deferred.resolve(true);
                };
                img.onerror = function() {
                    deferred.reject(false);
                };
                img.src = img_path.Tie.hand;
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
