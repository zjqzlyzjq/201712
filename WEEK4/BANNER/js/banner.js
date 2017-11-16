var bannerRender = (function () {
    var container = document.getElementById('container'),
        wrapper = utils.getElementsByClassName('wrapper', container)[0];

    var step = 0,//=>步长:当前展示SLIDE的索引(默认展示第一张,所以STEP从零开始)
        autoTimer = null,//=>存储自动切换定时器的返回值
        autoInterval = 1500;//=>时间因子:多长时间切换一次SLIDE

    /*
     * 无缝衔接原理:
     *   1、把第一个SLIDE原封不动克隆一份放在WRAPPER的末尾(WRAPPER的宽度应该在原来的基础上加1000PX)
     *   2、当我们运动到索引为3(第四张)后,下一次继续向后走(看到的是克隆的第一张,此时STEP===4)
     *   3、再过autoInterval这么长时间,又开始新的下一次,此时STEP++,让STEP===5,此时我们不能再向后走了
     *   =>让WRAPPER立即回到第一张位置(索引为零的位置),当前展示的是克隆的这一张,立即回到第一张,展示的内容没区别,用户分辨不出跳转的过程
     *   =>让STEP=1,这样继续执行animate动画,相当于让WRAPPER运动到第二张位置了
     */
    function autoMove() {
        step++;
        if (step === 5) {
            //=>不能在继续向后走了:立即回到第一张,让STEP=1
            utils.css(wrapper, 'left', 0);
            step = 1;
        }
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