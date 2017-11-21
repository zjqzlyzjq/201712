~function (options) {
    var container = document.getElementById('container'),
        containerChild = utils.children(container),
        wrapper = containerChild[0],
        focusBox = containerChild[1],
        arrowLeft = containerChild[2],
        arrowRight = containerChild[3];
    var slideList = null,
        imgList = null,
        focusList = null,
        bannerData = null,
        containerWidth = container.clientWidth;

    //=>INIT PARAMETERS
    var _default = {
        initIndex: 0
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }
    var initIndex = _default.initIndex;


    //=>GET DATA & BIND DATA
    ~function () {
        //->AJAX GET DATA
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);

        //->BIND DATA
        var str = ``,
            strFocus = ``;
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += `<li class="slide">
                <a href="${item.link}">
                    <img src="" data-img="${item.img}" alt="${item.desc}">
                </a>
            </li>`;

            strFocus += `<li></li>`;
        }
        wrapper.innerHTML = str;
        focusBox.innerHTML = strFocus;

        //->GET ELEMENT LIST
        slideList = wrapper.getElementsByTagName('li');
        imgList = wrapper.getElementsByTagName('img');
        focusList = focusBox.getElementsByTagName('li');

        //->COMPUTED WRAPPER WIDTH
        utils.css(wrapper, 'width', bannerData.length * containerWidth);
    }();

    //=>INIT SHOW & LAZY IMG
    ~function () {
        //->FOCUS DEFAULT SHOW
        for (var i = 0; i < focusList.length; i++) {
            focusList[i].className = i === initIndex ? 'select' : null;
        }

        //->WRAPPER DEFAULT SHOW
        utils.css(wrapper, 'left', -containerWidth * initIndex);

        //->LAZY IMG
        var timer = setTimeout(function () {
            for (var k = 0; k < imgList.length; k++) {
                lazyImg(imgList[k]);
            }
            clearTimeout(timer);
        }, 500);

        function lazyImg(curImg) {
            var tempImg = new Image;
            tempImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = 'block';
                animate({
                    curEle: curImg,
                    target: {opacity: 1},
                    duration: 200
                });
                tempImg = null;
            };
            tempImg.src = curImg.getAttribute('data-img');
        }
    }();

}();