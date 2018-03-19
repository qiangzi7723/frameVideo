requirejs.config({
    shim: {
        easel: {
            exports: 'createjs'
        },
        preload: {
            exports: 'createjs'
        }
    },
    paths: {
        easel: '../lib/easeljs.min',
        preload: '../lib/preload.min'
    }
});

requirejs(['easel', 'preload', 'assets'], function(a, b, assets) {
	const w=window.innerWidth;
    const h=window.innerHeight;
    const canvas=document.getElementById('canvas');
    const stage = new createjs.Stage("canvas");
    const queue = new createjs.LoadQueue(true);
    // 全屏
    stage.canvas.width=w*2;
    stage.canvas.height=h*2;
    canvas.style.width=w+'px';
    canvas.style.height=h+'px';

    queue.loadManifest(assets);
    const assetsObj=[];
    let screen;
    
    const handleTick=(event)=> {
        // 更新舞台
        stage.update();
    }

    const fileLoadHandle=(e)=>{
    	assetsObj.push(e.result);
    }

    const completeHandle=()=>{
   		console.log('视频加载完毕');
        const spriteSheet = new createjs.SpriteSheet({
            images: assetsObj,
            frames: {
                width: w*2,
                height: h*2
            },
            animations: {
                watchTv: [0, 6],
                cheer: [6,25,,0.8],
                loop: [25,66]
            }
        });
        screen = new createjs.Sprite(spriteSheet, "watchTv");
        stage.addChild(screen);
    }

    queue.on('fileload',fileLoadHandle);
    queue.on('complete',completeHandle);
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick", handleTick);
    // 点击播放接下来的视频
    document.body.addEventListener('click',()=>{
    	screen.gotoAndPlay('cheer');
    	screen.addEventListener('animationend',()=>{
    		screen.stop();
    		screen.gotoAndPlay('loop');
    	})
    })
})