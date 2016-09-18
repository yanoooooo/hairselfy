angular.module("hairselfy").provider('guidelinePrvd', function() {
    var vm = this;
    var canvas, ctx;
    var camera_data;

    function drawFaceGuide(camera) {
        var img = new Image();
        img.onload = function onImageLoad() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = camera_data[camera].src;
    }

    vm.$get = function(common){
        camera_data = common.camera;
        return {
            processController: function(cv, data) {
                canvas = cv;
                if ( !canvas || ! canvas.getContext ) { return false; }
                ctx = canvas.getContext('2d');
                var process_num = 0;
                var guide_num = 0;
                
                //2重配列
                drawFaceGuide(data[process_num][guide_num].camera);
                /*switch(data[process_num].guide) {
                    case "Twist":
                        break;
                    case "French":
                        break;
                    case "Braid":
                        break;
                    default:
                        break;
                }*/
            }
        };
    };
});
