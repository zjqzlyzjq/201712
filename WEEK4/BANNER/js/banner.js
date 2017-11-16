var bannerRender = (function () {
    var container = document.getElementById('container'),
        wrapper = utils.getElementsByClassName('wrapper', container)[0];

    var step = 0,//=>步长:当前展示SLIDE的索引(默认展示第一张,所以STEP从零开始)
        autoTimer = null,//=>存储自动切换定时器的返回值
        autoInterval = 3000;//=>时间因子:多长时间切换一次SLIDE

    function autoMove() {
        step++;
        animate({
            curEle: wrapper,
            target: {left: -step * 1000},
            duration: 300
        });
    }

    return {
        init: function () {
            autoTimer = setInterval(autoMove, autoInterval);
        }
    }
})();
bannerRender.init();