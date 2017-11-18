var bannerRender = (function () {
    var container = document.getElementById('container'),
        wrapper = utils.getElementsByClassName('wrapper', container)[0],
        focusBox = utils.getElementsByClassName('focusBox', container)[0],
        arrow = utils.children(container, 'a'),
        arrowLeft = arrow[0],
        arrowRight = arrow[1];
    var bannerData = null,
        wrapperList = null,
        focusList = null,
        wrapperImgList = null;

    //=>获取数据
    function queryData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //=>绑定数据
    function bindData() {
        if (!bannerData) return;
        var str = ``,
            strFocus = ``;
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += `<li class="slide">
                <img src="" data-img="${item.img}" alt="">
            </li>`;

            strFocus += `<li class="${i === bannerData.length - 1 ? 'last' : ''}"></li>`;
        }
        wrapper.innerHTML = str;
        focusBox.innerHTML = strFocus;

        //=>获取所有的LI以及IMG
        wrapperList = wrapper.getElementsByTagName('li');
        focusList = focusBox.getElementsByTagName('li');
        wrapperImgList = wrapper.getElementsByTagName('img');
    }

    //=>设置默认展示
    function initDefault(index) {
        index = index || 0;
        utils.css(wrapperList[index], {
            opacity: 1,
            zIndex: 1
        });
        focusList[index].className += ' select';//=>一定是加等于(因为部分LI有自己的原有样式)
    }

    return {
        init: function () {
            queryData();
            bindData();
            initDefault();
        }
    }
})();
bannerRender.init();
