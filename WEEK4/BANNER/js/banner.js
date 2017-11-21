~function () {
    var container = document.getElementById('container'),
        containerChild = utils.children(container),
        wrapper = containerChild[0],
        focusBox = containerChild[1],
        arrowLeft = containerChild[2],
        arrowRight = containerChild[3];
    var slideList = null,
        imgList = null,
        focusList = null,
        bannerData = null;

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
                    <img src="${item.img}" alt="${item.desc}">
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
        utils.css(wrapper, 'width', bannerData.length * container.offsetWidth);
    }();

    
}();