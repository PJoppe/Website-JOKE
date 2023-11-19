/* eslint-disable */

"use strict";
(function () {
    // CONSTs
    let filters = [];
    let baseFolder = window.location.href.includes("localhost") ? "/" : "/WebsiteJoke/" ;
    const url = baseFolder + "csv/portfolio.csv";

    let currentPage = window.location.href.split("/");
    currentPage = currentPage[currentPage.length - 1];
    let isPortfolio = currentPage.includes("portfolio");

    fetch("csv/portfoliocategories.csv")
        .then(response => response.text())
        .then(data => {
            afterGetPortfoliocategories(data);
        }).finally(() => {
            fetch("csv/menu.csv")
                .then(response => response.text())
                .then(data => {            
                    afterGetMenu(data);
                }).finally(() => {
                    main();
                });
        });


function afterGetPortfoliocategories(data) {
    let rows = data.split("\r\n");
    rows.forEach(row => {
        let cols = row.split(";");
        // Display - Filter - RoStock
        filters.push([cols[0], cols[1], cols[2]]);
    });
    // Add filters to html
    if(isPortfolio){
        let filters_html = "";
        filters.forEach(f => {
            filters_html += `<li><a class="fw-bold" data-isotope-filter="${f[1]}" data-isotope-rostock="${f[2]}" href="#">${f[0]}</a></li>`;
        });
        document.getElementById("isotope-53").innerHTML = filters_html;
    }   
}

function afterGetMenu(data){
    let MENU_ITEMS_HTML = "";
    let rows = data.split("\r\n");
    let subMenuLength = rows.filter(x => x.split(";")[0] == "Portfolio").length;
    let counter = 0;
    rows.forEach(row => {
        let cols = row.split(";")
        if(cols[0] == "Portfolio"){
            if(counter == 0){
                MENU_ITEMS_HTML += `<li ${currentPage.includes( cols[2] ) ? 'class="active"' : ''}><a href="${cols[2]}"><span>${cols[1]}</span></a><ul class="rd-navbar-dropdown">`
            }
            else{
                MENU_ITEMS_HTML += `<li><a href="${cols[2]}" class="closeOnClick" data-isotope-filter="${filters[counter - 1][1]}" data-isotope-rostock="${filters[counter - 1][2]}" ><span class="text-middle">${cols[1]}</span></a></li>`
            }
            counter++;
            if(counter == subMenuLength){
                MENU_ITEMS_HTML += `</ul></li>`
            }
        }
        else{
            MENU_ITEMS_HTML += `<li ${currentPage.includes( cols[1] ) ? 'class="active"' : ''} ><a href="${cols[1]}"><span>${cols[0]}</span></a></li>`;
        }
    });
    
    // Add Navbar
    document.getElementById('nav-content').innerHTML = 
    `<!--Navbar Brand Mobile-->
    <div class="rd-navbar-mobile-brand"><a href="index.html"><img width='200' src='images/logo-joke.png' alt=''/></a></div>
    <!-- RD Navbar Nav-->
    <ul class="rd-navbar-nav" id="isotope-nav-wrap">
      ${MENU_ITEMS_HTML}
    </ul>
    <div class="rd-navbar-footer">
      <div class="rd-navbar-address">
        <dl class="offset-top-0">
          <dt><span class="mdi mdi-phone"></span></dt>
          <dd><a href="tel:+32478449274">+32 (0)478 44 92 74</a></dd>
        </dl>
        <dl>
          <dt><span class="mdi mdi-email-open"></span></dt>
          <dd><a href="mailto:info@jokeverrelst.com">info@jokeverrelst.com</a></dd>
        </dl>
      </div>
      <ul class="list-inline">
        <li class="list-inline-item"><a class="icon fa fa-instagram  icon-xxs icon-circle icon-darker-filled"  target="_blank" href="https://www.instagram.com/jokeverrelst_art"></a></li>
        <li class="list-inline-item"><a class="icon fa fa-facebook icon-xxs icon-circle icon-darker-filled" href="https://www.facebook.com/JokeVerrelstArt/"></a></li>
        <!-- <li class="list-inline-item"><a class="icon fa fa-twitter icon-xxs icon-circle icon-darker-filled" href="#"></a></li> -->
        <!-- <li class="list-inline-item"><a class="icon fa fa-google-plus icon-xxs icon-circle icon-darker-filled" href="#"></a></li> -->
        <!-- <li class="list-inline-item"><a class="icon fa fa-500px icon-xxs icon-circle icon-darker-filled" href="#"></a></li> -->
        <!-- <li class="list-inline-item"><a class="icon fa fa-behance icon-xxs icon-circle icon-darker-filled" href="#"></a></li> -->
      </ul>
    </div>`;
}

function main(){
    // Global variables
    let
    userAgent = navigator.userAgent.toLowerCase(),
    isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false;

    // Unsupported browsers
    if (isIE !== false && isIE < 12) {
        console.warn("[Core] detected IE" + isIE + ", load alert");
        var script = document.createElement("script");
        script.src = "./js/support.js";
        document.querySelector("head").appendChild(script);
    }

    let
        initialDate = new Date(),

        $document = $(document),
        $window = $(window),
        $html = $("html"),

        isDesktop = $html.hasClass("desktop"),
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isNoviBuilder,

        plugins = {
            rdInputLabel:            $(".form-label"),
            rdNavbar:                $(".rd-navbar"),
            regula:                  $("[data-constraints]"),
            swiper:                  $('.swiper-container'),
            isotope:                 $(".isotope-wrap"),
            customToggle:            $("[data-custom-toggle]"),
            rdMailForm:              $(".rd-mailform"),
            materialParallax:        $(".parallax-container"),
            copyrightYear:           $('.copyright-year'),
            wow:                     $('.wow'),
            maps:                    $(".google-map-container"),
            lightGallery:            $("[data-lightgallery='group']"),
            lightGalleryItem:        $("[data-lightgallery='item']"),
            lightDynamicGalleryItem: $("[data-lightgallery='dynamic']")
        };

    /**
     * @desc Check the element was been scrolled into the view
     * @param {object} elem - jQuery object
     * @return {boolean}
     */
    function isScrolledIntoView(elem) {
        if (isNoviBuilder) return true;
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
    }

    /**
     * @desc Calls a function when element has been scrolled into the view
     * @param {object} element - jQuery object
     * @param {function} func - init function
     */
    function lazyInit(element, func) {
        let scrollHandler = function () {
            if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
                func.call(element);
                element.addClass('lazy-loaded');
            }
        };

        scrollHandler();
        $window.on('scroll', scrollHandler);
    }

    /**
     * Wrapper to eliminate json errors
     * @param {string} str - JSON string
     * @returns {object} - parsed or empty object
     */
    function parseJSON(str) {
        try {
            if (str) return JSON.parse(str);
            else return {};
        } catch (error) {
            console.warn(error);
            return {};
        }
    }


    /**
     * @desc Sets the actual previous index based on the position of the slide in the markup. Should be the most recent action.
     * @param {object} swiper - swiper instance
     */
    function setRealPrevious(swiper) {
        let element = swiper.$wrapperEl[0].children[swiper.activeIndex];
        swiper.realPrevious = Array.prototype.indexOf.call(element.parentNode.children, element);
    }

    /**
     * @desc Sets slides background images from attribute 'data-slide-bg'
     * @param {object} swiper - swiper instance
     */
    function setBackgrounds(swiper) {
        let swipersBg = swiper.el.querySelectorAll('[data-slide-bg]');

        for (let i = 0; i < swipersBg.length; i++) {
            let swiperBg = swipersBg[i];
            swiperBg.style.backgroundImage = 'url(' + swiperBg.getAttribute('data-slide-bg') + ')';
        }
    }

    /**
     * @desc Initialize the gallery with set of images
     * @param {object} itemsToInit - jQuery object
     * @param {string} [addClass] - additional gallery class
     */
    function initLightGallery(itemsToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemsToInit).lightGallery({
                thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
                selector:  "[data-lightgallery='item']:not(.swiper-slide-duplicate)",
                autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
                pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
                addClass:  addClass,
                mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
                loop:      $(itemsToInit).attr("data-lg-loop") !== "false",
                controls:  true,
                share:     false,
                copy:      false,
                zoom:      false,
                fullScreen:false,
                autoplayControls :  false,
                download:  false

            });
        }
    }

    /**
     * @desc Initialize the gallery with dynamic addition of images
     * @param {object} itemsToInit - jQuery object
     * @param {string} [addClass] - additional gallery class
     */
    function initDynamicLightGallery(itemsToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemsToInit).on("click", function () {
                $(itemsToInit).lightGallery({
                    thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
                    selector:  "[data-lightgallery='item']",
                    autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
                    pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
                    addClass:  addClass,
                    mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
                    loop:      $(itemsToInit).attr("data-lg-loop") !== "false",
                    dynamic:   true,
                    dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
                });
            });
        }
    }

    /**
     * @desc Initialize the gallery with one image
     * @param {object} itemToInit - jQuery object
     * @param {string} [addClass] - additional gallery class
     */
    function initLightGalleryItem(itemToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemToInit).lightGallery({
                selector:            "this",
                addClass:            addClass,
                counter:             false,
                youtubePlayerParams: {
                    modestbranding: 1,
                    showinfo:       0,
                    rel:            0,
                    controls:       0
                },
                vimeoPlayerParams:   {
                    byline:   0,
                    portrait: 0
                }
            });
        }
    }

    /**
     * @desc Animate captions on active slides
     * @param {object} swiper - swiper instance
     */
    function initCaptionAnimate(swiper) {
        let
            animate = function (caption) {
                return function () {
                    let duration;
                    if (duration = caption.getAttribute('data-caption-duration')) caption.style.animationDuration = duration + 'ms';
                    caption.classList.remove('not-animated');
                    caption.classList.add(caption.getAttribute('data-caption-animate'));
                    caption.classList.add('animated');
                };
            },
            initializeAnimation = function (captions) {
                for (let i = 0; i < captions.length; i++) {
                    let caption = captions[i];
                    caption.classList.remove('animated');
                    caption.classList.remove(caption.getAttribute('data-caption-animate'));
                    caption.classList.add('not-animated');
                }
            },
            finalizeAnimation = function (captions) {
                for (let i = 0; i < captions.length; i++) {
                    let caption = captions[i];
                    if (caption.getAttribute('data-caption-delay')) {
                        setTimeout(animate(caption), Number(caption.getAttribute('data-caption-delay')));
                    } else {
                        animate(caption)();
                    }
                }
            };

        // Caption parameters
        swiper.params.caption = {
            animationEvent: 'slideChangeTransitionEnd'
        };

        initializeAnimation(swiper.$wrapperEl[0].querySelectorAll('[data-caption-animate]'));
        finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));

        if (swiper.params.caption.animationEvent === 'slideChangeTransitionEnd') {
            swiper.on(swiper.params.caption.animationEvent, function () {
                initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
                finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
            });
        } else {
            swiper.on('slideChangeTransitionEnd', function () {
                initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
            });

            swiper.on(swiper.params.caption.animationEvent, function () {
                finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
            });
        }
    }

    // Custom made

    function readUrl(nextFilter, rostock){
        // Modify url
        let currentUrl = location.href;
        let nextUrl;

        if(!currentUrl.includes("?")){
            nextUrl = currentUrl + "?cat=" + nextFilter + "&rostock=" + rostock;
        }else{
            nextUrl = currentUrl.split("?")[0] + "?cat=" + nextFilter + "&rostock=" + rostock
        }

        if (setNextUrl(nextUrl)) {   
            // Set correct active
            let filter = document.querySelectorAll('[data-isotope-filter="' + nextFilter + '"]')
            if(filter.length > 0){
                filter[0].classList.add('active');
                if(filter.length > 1){
                    filter[1].classList.add('active');
                }
            }
            document.getElementById('cat-btn').innerHTML = formatCatBtnText(nextFilter);
        }
    }


// Triggers when page is loaded, returns correct filter and sets correct button as active
function setDefaultFilter(wrap){
    let currentFilter;
    if(location.href.includes("?")){
        currentFilter = location.href.split("=")[1].split("&")[0];
        if(filters.filter(x => x[1] == currentFilter).length == 0){
            document.getElementById('cat-btn').innerHTML = formatCatBtnText(filters[0][1]);
            return filters[0][1];
        }
        // Remove all active classes
        for (let n = 0; n < wrap.isoGroup.filters.length; n++) 
            wrap.isoGroup.filters[n].classList.remove('active');

    }else{
        // If url has no params => set url and filter
        let next = location.href + "?cat=" + filters[0][1] + "&rostock=" + filters[0][2];
        currentFilter = filters[0][1];
        setNextUrl(next);
    }

    setInStockCheckbox(filters[0][2])

    // Set correct active
    let filter = wrap.querySelectorAll('[data-isotope-filter="' + currentFilter + '"]')
    filter[0].classList.add('active');    
    document.getElementById('cat-btn').innerHTML = formatCatBtnText(currentFilter);

    return currentFilter;
}

function setNextUrl(nextUrl){
    if (typeof (history.pushState) != "undefined") {
        var obj = {
         Title: "title",
         Url: nextUrl
        };
        history.pushState(obj, obj.Title, obj.Url);
        return true;
    }
    return false;
}

function setInStockCheckbox(rostock){
    let checkbox = document.getElementById('soldCheck');
    if(rostock == "y"){
        checkbox.setAttribute('disabled', 'disabled');
    }
    else{
        checkbox.removeAttribute('disabled');
    }
    checkbox.checked = false;
}

function formatCatBtnText(text){
    if( text.includes('-'))
        text = text.replace('-', ' ');
        
    if( text.includes('.'))
        text = text.replace('.', '');

    if(text.includes(':'))
        text = text.split(':')[0];

    return text;
}


document.querySelectorAll(".closeOnClick").forEach(e => {
    e.addEventListener('click', closeNavBar());
});
function closeNavBar(){
    if(location.href.includes("portfolio")){
        document.querySelectorAll(".rd-navbar-nav-wrap")[0].classList.remove('active');
        document.querySelectorAll(".rd-navbar-sidebar-toggle")[0].classList.remove('active');
        document.querySelectorAll(".rd-navbar-toggle")[0].classList.remove('active');
        document.querySelectorAll(".isotope-filters-list")[0].classList.remove('active');
    }
}

// Initialize scripts that require a loaded window
$document.ready(async function () {
    
    async function DETAIL_generateHTMLFromCSV(){
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                var rows = data.split("\r\n"); 
            
                var url = window.location.href;
                var projectTitle;
                if(url.includes('project='))
                    projectTitle = url.split('project=')[1];
                //console.log(projectTitle);
            
                let title;
                let description;
                let image;
                let available;
                let categories;
                let imagesdetail;
                let bulletpoints;
                let descriptiondetail;
                
                for (var i = 1; i < rows.length - 1; i++) {
                    if(i == rows.length - 1 && rows[i].split(";")[0].trim() == ""){
                        break;
                    }
                
                    var cells = rows[i].split(';');
                    title = cells[0];
                    if(title == projectTitle.replaceAll("~", " ")){
                        description = cells[1];
                        image = cells[2];
                        available = cells[3];
                        categories = cells[4];
                        imagesdetail = cells[5];
                        bulletpoints = cells[6];
                        descriptiondetail = cells[7];
                        break;   
                    }
                }

                if(description != undefined && imagesdetail != undefined){                    
                    let src = baseFolder + "images/portfolio/";
                    let images_HTML = "";
                    let images_array = imagesdetail.split("/");
                    for(let i = 0; i < images_array.length; i++){
                        if(images_array[i].includes("mp4")){
                            images_HTML += `
                            <div class="swiper-slide swiper-slide-overlay-disable" >
                            <video muted autoplay loop>
                            <source src="${src+images_array[i]}" type="video/mp4">
                            Your browser does not support HTML video.
                          </video></div>`
                        }
                        else{
                            images_HTML += `<div class="swiper-slide swiper-slide-overlay-disable" data-lightgallery="item" href="${src+images_array[i]}" ><img src="${src+images_array[i]}"/></div>`
                        }
                    }
                    document.getElementById('detail-swiper').innerHTML = images_HTML;

                    let bulletpoints_HTML = "";
                    let bulletpoints_array = bulletpoints.split("/");
                    for(let i = 0; i < bulletpoints_array.length; i++){
                        bulletpoints_HTML += `<li class="font-accent">${bulletpoints_array[i]}</li>`
                    }

                    document.getElementById("project-detail-to-fill").innerHTML = 
                    `
                    <div class="col-md-6 col-lg-12">
                        
                      <h2 id="detail-title" class="font-default mb-1">${title}</h2>
                      <p class="mt-3 font-accent">${descriptiondetail}</p>
                    </div>
                    <div class="col-md-6 col-lg-12 offset-top-50 mt-md-4">
                      <h4 class="text-dark font-default mb-0">Specifications</h4>
                      <ul class="list list-marked mt-3">
                        ${bulletpoints_HTML}
                      </ul>
                      ${available == 'n' ? "" : "" }
                    </div>
                    `
                }       
        })
        .catch(error => console.log(error));
    }
    async function PORTFOLIO_generateHTMLFromCSV() {
        
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                
                var rows = data.split("\r\n"); 
                var htmlCode = "";
    
                for (var i = 1; i < rows.length - 1; i++) {
                    if(i == rows.length - 1 && rows[i].split(";")[0].trim() == ""){
                        break;
                    }
    
                    var cells = rows[i].split(';');
                    // Structure: Title;Description;Image;available;categories
                    let title = cells[0];
                    let description = cells[1];
                    let image = cells[2];
                    let available = cells[3];
                    let categories = cells[4];
                    console.log()
                    htmlCode += 
                    `<div class="col-6 col-md-4 isotope-item ${categories} ${available == "y" ? '' : 'sold'}">
                        <!-- Thumbnail Apollo-->
                        <a class="thumbnail-apollo" href="project-detail.html?project=${title.replace(/ /g,'~')}">
                            <figure>
                                <img  src="${baseFolder}images/portfolio/${image}" loading="lazy" alt="New accessories"/>
                                <figcaption>
                                    <h3 class="thumbnail-apollo-title text-white font-default mb-0">${title}</h3>
                                    <p class="small font-accent mt-1">${description}</p>
                                </figcaption>
                            </figure>
                        </a>
                    </div>`
                }

                document.getElementById('isotope-gallery').innerHTML = htmlCode;       
        })
      .catch(error => console.log(error));
    }
    if(currentPage.includes("project-detail")){
        await DETAIL_generateHTMLFromCSV()
        .then(() => {
            if (plugins.swiper.length) {

                for (let i = 0; i < plugins.swiper.length; i++) {
    
                    let
                        node = plugins.swiper[i],
                        params = parseJSON(node.getAttribute('data-swiper')),
                        defaults = {
                            speed: 1000,
                            loop: true,
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            keyboard: {
                                enabled: true,
                              },
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            },
                            autoplay: {
                                delay: 5000
                            },                        
                        },
                        xMode = {
                            autoplay: false,
                            loop: false,
                            simulateTouch: false,
                        };
    
                    params.on = {
                        init: function () {
                            setBackgrounds(this);
                            setRealPrevious(this);
                            initCaptionAnimate(this);
    
                            // Real Previous Index must be set recent
                            this.on('slideChangeTransitionEnd', function () {
                                setRealPrevious(this);
                            });
                        }
                    };
    
    
             
                    new Swiper(node, isNoviBuilder ?  {...defaults, ...params, ...xMode} :  {...defaults, ...params} );
    
                    
    
                    
                }
            }

            // lightGallery
            if (plugins.lightGallery.length) {
                for (let i = 0; i < plugins.lightGallery.length; i++) {
                    initLightGallery(plugins.lightGallery[i]);
                }
            }

            // // lightGallery item
            // if (plugins.lightGalleryItem.length) {

            //     // Filter carousel items
            //     let notCarouselItems = [];
            
            //     for (let z = 0; z < plugins.lightGalleryItem.length; z++) {
            //         if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
            //             !$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
            //             !$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
            //             notCarouselItems.push(plugins.lightGalleryItem[z]);
            //         }
            //     }
            
            //     plugins.lightGalleryItem = notCarouselItems;
            
            //     for (let i = 0; i < plugins.lightGalleryItem.length; i++) {
            //         initLightGalleryItem(plugins.lightGalleryItem[i]);
            //     }
            // }

            // // Dynamic lightGallery
            // if (plugins.lightDynamicGalleryItem.length) {
            //     for (let i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
            //         initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
            //     }
            // }
            
        
        });
    }

    if(currentPage.includes("portfolio")){
        
        await PORTFOLIO_generateHTMLFromCSV()
        .then(() => {
            
            // Isotope
            if (plugins.isotope.length) {
                for (let i = 0; i < plugins.isotope.length; i++) {
                    let currentFilter = filters[0][1];
                    let wrap = 
                        plugins.isotope[i],
                        filterHandler = function (event) {
                            event.preventDefault();
                            for (let n = 0; n < this.isoGroup.filters.length; n++) this.isoGroup.filters[n].classList.remove('active');
                            this.classList.add('active');
                            currentFilter = this.getAttribute("data-isotope-filter");
                            let rostock = this.getAttribute("data-isotope-rostock");
                            setInStockCheckbox(rostock);
                            if(document.querySelector('#soldCheck').checked){
                                currentFilter += ':not(.sold)'
                            }
                            this.isoGroup.isotope.arrange({filter: currentFilter });
                            readUrl(currentFilter, rostock);
                            closeNavBar();
                        },
                        resizeHandler = function () {
                            this.isoGroup.isotope.layout();
                        };
                    
                    wrap.isoGroup = {};
                    wrap.isoGroup.filters = wrap.querySelectorAll('[data-isotope-filter]');
                    wrap.isoGroup.node = wrap.querySelector('.isotope');
                    wrap.isoGroup.layout = wrap.isoGroup.node.getAttribute('data-isotope-layout') ? wrap.isoGroup.node.getAttribute('data-isotope-layout') : 'masonry';
                    wrap.isoGroup.isotope = new Isotope(wrap.isoGroup.node, {
                        itemSelector: '.isotope-item',
                        layoutMode:   wrap.isoGroup.layout,
                        // filter:       wrap.isoGroup.node.hasAttribute( 'data-isotope-filter-active' ) ? '[data-filter*="' + wrap.isoGroup.node.getAttribute( 'data-isotope-filter-active' ) + '"]' : '*',
                        filter: setDefaultFilter(wrap),
                        columnWidth:  (function () {
                            if (wrap.isoGroup.node.hasAttribute('data-column-class')) return wrap.isoGroup.node.getAttribute('data-column-class');
                            if (wrap.isoGroup.node.hasAttribute('data-column-width')) return parseFloat(wrap.isoGroup.node.getAttribute('data-column-width'));
                        }())
                    });

                    //Add eventlistener to nav items
                    for (let n = 0; n < wrap.isoGroup.filters.length; n++) {
                        let filter = wrap.isoGroup.filters[n];
                        filter.isoGroup = wrap.isoGroup;
                        filter.addEventListener('click', filterHandler);    
                    }
                    let navbarItems = document.getElementById('isotope-nav-wrap').querySelectorAll('[data-isotope-filter]');
                    for (let n = 0; n < navbarItems.length; n++) {
                        let filter = navbarItems[n];
                        filter.isoGroup = wrap.isoGroup;
                        filter.addEventListener('click', filterHandler);      
                    }
                
                    window.addEventListener('resize', resizeHandler.bind(wrap));
                
                    if (!isIE) {
                        let imgs = document.querySelectorAll('img[loading="lazy"]')
                        for (let i = 0; i < imgs.length; i++) {
                            let img = imgs[i]
                            img.addEventListener('load', function (e) {
                                window.dispatchEvent(new Event('resize'));
                            })
                        }
                    }

                    // Custom checkbox sold/available fitler
                    var check = document.querySelector('#soldCheck');
                    check.addEventListener('change', function(event) {
                        event.preventDefault();

                        let nextFilter;
                        if(currentFilter.includes(':not(.sold)'))
                                currentFilter = currentFilter.split(':')[0];
                        if(this.checked){
                            nextFilter = currentFilter + ':not(.sold)'
                        }else{
                            
                            nextFilter = currentFilter;
                        }
                        let base = location.href.split("?");
                        setNextUrl(base[0] + "?cat=" + nextFilter + "&" + base[1].split("&")[1]);
                        wrap.isoGroup.isotope.arrange({filter: nextFilter});
                    })
                }
            }
        });
    }
    
    

    // Material Parallax
    if (plugins.materialParallax.length) {
        if (!isNoviBuilder && !isIE && !isMobile) {
            plugins.materialParallax.parallax();
        } else {
            for (let i = 0; i < plugins.materialParallax.length; i++) {
                let $parallax = $(plugins.materialParallax[i]);

                $parallax.addClass('parallax-disabled');
                $parallax.css({"background-image": 'url(' + $parallax.data("parallax-img") + ')'});
            }
        }
    }
});

/**
 * Initialize All Scripts
 */
$document.ready(function () {

    isNoviBuilder = window.xMode;


    /**
     * @desc Google map function for getting latitude and longitude
     */
    function getLatLngObject(str, marker, map, callback) {
        let coordinates = {};
        try {
            coordinates = JSON.parse(str);
            callback(new google.maps.LatLng(
                coordinates.lat,
                coordinates.lng
            ), marker, map)
        } catch (e) {
            map.geocoder.geocode({'address': str}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    let latitude = results[0].geometry.location.lat();
                    let longitude = results[0].geometry.location.lng();

                    callback(new google.maps.LatLng(
                        parseFloat(latitude),
                        parseFloat(longitude)
                    ), marker, map)
                }
            })
        }
    }

    /**
     * @desc Initialize Google maps
     */
    function initMaps() {
        let key = "AIzaSyCgHUnbb5Fum8IF_r2-uhpWW3f3KflRtDA";

        for (let i = 0; i < plugins.maps.length; i++) {
            if (plugins.maps[i].hasAttribute("data-key")) {
                key = plugins.maps[i].getAttribute("data-key");
                break;
            }
        }

        $.getScript('//maps.google.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'libraries=geometry,places&v=quarterly', function () {
            let head = document.getElementsByTagName('head')[0],
                insertBefore = head.insertBefore;

            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };
            let geocoder = new google.maps.Geocoder;
            for (let i = 0; i < plugins.maps.length; i++) {
                let zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
                let styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
                let center = plugins.maps[i].getAttribute("data-center") || "New York";

                // Initialize map
                let map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
                    zoom:        zoom,
                    styles:      styles,
                    scrollwheel: false,
                    center:      {
                        lat: 0,
                        lng: 0
                    }
                });

                // Add map object to map node
                plugins.maps[i].map = map;
                plugins.maps[i].geocoder = geocoder;
                plugins.maps[i].keySupported = true;
                plugins.maps[i].google = google;

                // Get Center coordinates from attribute
                getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
                    mapElement.map.setCenter(location);
                });

                // Add markers from google-map-markers array
                let markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

                if (markerItems.length) {
                    let markers = [];
                    for (let j = 0; j < markerItems.length; j++) {
                        let markerElement = markerItems[j];
                        getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function (location, markerElement, mapElement) {
                            let icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                            let activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
                            let info = markerElement.getAttribute("data-description") || "";
                            let infoWindow = new google.maps.InfoWindow({
                                content: info
                            });
                            markerElement.infoWindow = infoWindow;
                            let markerData = {
                                position: location,
                                map:      mapElement.map
                            }
                            if (icon) {
                                markerData.icon = icon;
                            }
                            let marker = new google.maps.Marker(markerData);
                            markerElement.gmarker = marker;
                            markers.push({
                                markerElement: markerElement,
                                infoWindow:    infoWindow
                            });
                            marker.isActive = false;
                            // Handle infoWindow close click
                            google.maps.event.addListener(infoWindow, 'closeclick', (function (markerElement, mapElement) {
                                let markerIcon = null;
                                markerElement.gmarker.isActive = false;
                                markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                                markerElement.gmarker.setIcon(markerIcon);
                            }).bind(this, markerElement, mapElement));


                            // Set marker active on Click and open infoWindow
                            google.maps.event.addListener(marker, 'click', (function (markerElement, mapElement) {
                                let markerIcon;
                                if (markerElement.infoWindow.getContent().length === 0) return;
                                let gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
                                for (let k = 0; k < markers.length; k++) {
                                    if (markers[k].markerElement === markerElement) {
                                        currentInfoWindow = markers[k].infoWindow;
                                    }
                                    gMarker = markers[k].markerElement.gmarker;
                                    if (gMarker.isActive && markers[k].markerElement !== markerElement) {
                                        gMarker.isActive = false;
                                        markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
                                        gMarker.setIcon(markerIcon);
                                        markers[k].infoWindow.close();
                                    }
                                }

                                currentMarker.isActive = !currentMarker.isActive;
                                if (currentMarker.isActive) {
                                    if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
                                        currentMarker.setIcon(markerIcon);
                                    }

                                    currentInfoWindow.open(map, marker);
                                } else {
                                    if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
                                        currentMarker.setIcon(markerIcon);
                                    }
                                    currentInfoWindow.close();
                                }
                            }).bind(this, markerElement, mapElement))
                        })
                    }
                }
            }
        });
    }

    

    /**
     * @desc Attach form validation to elements
     * @param {object} elements - jQuery object
     */
    function attachFormValidator(elements) {
        // Custom validator - phone number
        regula.custom({
            name:           'PhoneNumber',
            defaultMessage: 'Invalid phone number format',
            validator:      function () {
                if (this.value === '') return true;
                else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
            }
        });

        for (let i = 0; i < elements.length; i++) {
            let o = $(elements[i]), v;
            o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
            v = o.parent().find(".form-validation");
            if (v.is(":last-child")) o.addClass("form-control-last-child");
        }

        elements.on('input change propertychange blur', function (e) {
            let $this = $(this), results;

            if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
            if ($this.parents('.rd-mailform').hasClass('success')) return;

            if ((results = $this.regula('validate')).length) {
                for (let i = 0; i < results.length; i++) {
                    $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
                }
            } else {
                $this.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }).regula('bind');

        let regularConstraintsMessages = [
            {
                type:       regula.Constraint.Required,
                newMessage: "The text field is required."
            },
            {
                type:       regula.Constraint.Email,
                newMessage: "The email is not a valid email."
            },
            {
                type:       regula.Constraint.Numeric,
                newMessage: "Only numbers are required"
            },
            {
                type:       regula.Constraint.Selected,
                newMessage: "Please choose an option."
            }
        ];


        for (let i = 0; i < regularConstraintsMessages.length; i++) {
            let regularConstraint = regularConstraintsMessages[i];

            regula.override({
                constraintType: regularConstraint.type,
                defaultMessage: regularConstraint.newMessage
            });
        }
    }

    /**
     * @desc Check if all elements pass validation
     * @param {object} elements - object of items for validation
     * @param {object} captcha - captcha object for validation
     * @return {boolean}
     */
    function isValidated(elements, captcha) {
        let results, errors = 0;

        if (elements.length) {
            for (let j = 0; j < elements.length; j++) {

                let $input = $(elements[j]);
                if ((results = $input.regula('validate')).length) {
                    for (let k = 0; k < results.length; k++) {
                        errors++;
                        $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                    }
                } else {
                    $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                }
            }

            if (captcha) {
                if (captcha.length) {
                    return validateReCaptcha(captcha) && errors === 0
                }
            }

            return errors === 0;
        }
        return true;
    }

    /**
     * @desc Validate google reCaptcha
     * @param {object} captcha - captcha object for validation
     * @return {boolean}
     */
    function validateReCaptcha(captcha) {
        let captchaToken = captcha.find('.g-recaptcha-response').val();

        if (captchaToken.length === 0) {
            captcha
                .siblings('.form-validation')
                .html('Please, prove that you are not robot.')
                .addClass('active');
            captcha
                .closest('.form-wrap')
                .addClass('has-error');

            captcha.on('propertychange', function () {
                let $this = $(this),
                    captchaToken = $this.find('.g-recaptcha-response').val();

                if (captchaToken.length > 0) {
                    $this
                        .closest('.form-wrap')
                        .removeClass('has-error');
                    $this
                        .siblings('.form-validation')
                        .removeClass('active')
                        .html('');
                    $this.off('propertychange');
                }
            });

            return false;
        }

        return true;
    }

    /**
     * @desc Initialize Google reCaptcha
     */
    window.onloadCaptchaCallback = function () {
        for (let i = 0; i < plugins.captcha.length; i++) {
            let
                $captcha = $(plugins.captcha[i]),
                resizeHandler = (function () {
                    let
                        frame = this.querySelector('iframe'),
                        inner = this.firstElementChild,
                        inner2 = inner.firstElementChild,
                        containerRect = null,
                        frameRect = null,
                        scale = null;

                    inner2.style.transform = '';
                    inner.style.height = 'auto';
                    inner.style.width = 'auto';

                    containerRect = this.getBoundingClientRect();
                    frameRect = frame.getBoundingClientRect();
                    scale = containerRect.width / frameRect.width;

                    if (scale < 1) {
                        inner2.style.transform = 'scale(' + scale + ')';
                        inner.style.height = (frameRect.height * scale) + 'px';
                        inner.style.width = (frameRect.width * scale) + 'px';
                    }
                }).bind(plugins.captcha[i]);

            grecaptcha.render(
                $captcha.attr('id'),
                {
                    sitekey:  $captcha.attr('data-sitekey'),
                    size:     $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
                    theme:    $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
                    callback: function () {
                        $('.recaptcha').trigger('propertychange');
                    }
                }
            );

            $captcha.after("<span class='form-validation'></span>");

            if (plugins.captcha[i].hasAttribute('data-auto-size')) {
                resizeHandler();
                window.addEventListener('resize', resizeHandler);
            }
        }
    };

    // Adds some loosing functionality to IE browsers (IE Polyfills)
    if (isIE) {
        if (isIE === 12) $html.addClass("ie-edge");
        if (isIE === 11) $html.addClass("ie-11");
        if (isIE < 10) $html.addClass("lt-ie-10");
        if (isIE < 11) $html.addClass("ie-10");
    }

    // Copyright Year (Evaluates correct copyright year)
    if (plugins.copyrightYear.length) {
        plugins.copyrightYear.text(initialDate.getFullYear());
    }

    // RD Input Label
    if (plugins.rdInputLabel.length) {
        plugins.rdInputLabel.RDInputLabel();
    }

    // Regula
    if (plugins.regula.length) {
        attachFormValidator(plugins.regula);
    }

    // WOW
    if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
        new WOW().init();
    }

    // Swiper
    if(window.location.href.includes("index") || window.location.href.includes("on-display")){
        if (plugins.swiper.length) {
            for (let i = 0; i < plugins.swiper.length; i++) {
                let
                    node = plugins.swiper[i],
                    params = parseJSON(node.getAttribute('data-swiper')),
                    defaults = {
                        speed: 1000,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        keyboard: {
                            enabled: true,
                          },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        autoplay: {
                            delay: window.location.href.includes("index") ? 5000 : 10000000
                        }
                    },
                    xMode = {
                        autoplay: false,
                        loop: false,
                        simulateTouch: false
                    };
                params.on = {
                    init: function () {
                        setBackgrounds(this);
                        setRealPrevious(this);
                        initCaptionAnimate(this);

                        // Real Previous Index must be set recent
                        this.on('slideChangeTransitionEnd', function () {
                            setRealPrevious(this);
                        });
                    }
                };

                new Swiper(node, isNoviBuilder ?  {...defaults, ...params, ...xMode} :  {...defaults, ...params} );              
            }
        }
        
        if(window.location.href.includes("on-display")) {
            // lightGallery
            if (plugins.lightGallery.length) {
                for (let i = 0; i < plugins.lightGallery.length; i++) {
                    initLightGallery(plugins.lightGallery[i]);
                }
            }
        }
         

    }
    

    // UI To Top
    if (isDesktop && !isNoviBuilder) {
        $().UItoTop({
            easingType: 'easeOutQuad',
            containerClass: 'ui-to-top fa fa-angle-up'
        });
    }

    // RD Navbar
    if (plugins.rdNavbar.length) {
        let
            navbar = plugins.rdNavbar,
            aliases = {
                '-':     0,
                '-sm-':  576,
                '-md-':  768,
                '-lg-':  992,
                '-xl-':  1200,
                '-xxl-': 1600
            },
            responsive = {},
            navItems = $('.rd-nav-item');

        for (let i = 0; i < navItems.length; i++) {
            let node = navItems[i];

            if (node.classList.contains('opened')) {
                node.classList.remove('opened')
            }
        }

        for (let alias in aliases) {
            let link = responsive[aliases[alias]] = {};
            if (navbar.attr('data' + alias + 'layout')) link.layout = navbar.attr('data' + alias + 'layout');
            if (navbar.attr('data' + alias + 'device-layout')) link.deviceLayout = navbar.attr('data' + alias + 'device-layout');
            if (navbar.attr('data' + alias + 'hover-on')) link.focusOnHover = navbar.attr('data' + alias + 'hover-on') === 'true';
            if (navbar.attr('data' + alias + 'auto-height')) link.autoHeight = navbar.attr('data' + alias + 'auto-height') === 'true';
            if (navbar.attr('data' + alias + 'stick-up-offset')) link.stickUpOffset = navbar.attr('data' + alias + 'stick-up-offset');
            if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
            if (isNoviBuilder) link.stickUp = true;
            else if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
        }

        plugins.rdNavbar.RDNavbar({
            anchorNav:    !isNoviBuilder,
            stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
            responsive: responsive,
            callbacks:    {
                onStuck:        function () {
                    let navbarSearch = this.$element.find('.rd-search input');

                    if (navbarSearch) {
                        navbarSearch.val('').trigger('propertychange');
                    }
                },
                onDropdownOver: function () {
                    return !isNoviBuilder;
                },
                onUnstuck:      function () {
                    if (this.$clone === null)
                        return;

                    let navbarSearch = this.$clone.find('.rd-search input');

                    if (navbarSearch) {
                        navbarSearch.val('').trigger('propertychange');
                        navbarSearch.trigger('blur');
                    }

                }
            }
        });
    }

    // RD Mailform
    if (plugins.rdMailForm.length) {
        let i, j, k,
            msg = {
                'MF000': 'Successfully sent!',
                'MF001': 'Recipients are not set!',
                'MF002': 'Form will not work locally!',
                'MF003': 'Please, define email field in your form!',
                'MF004': 'Please, define type of your form!',
                'MF254': 'Something went wrong with PHPMailer!',
                'MF255': 'Aw, snap! Something went wrong.'
            };

        for (i = 0; i < plugins.rdMailForm.length; i++) {
            let $form = $(plugins.rdMailForm[i]),
                formHasCaptcha = false;

            $form.attr('novalidate', 'novalidate').ajaxForm({
                data:         {
                    "form-type": $form.attr("data-form-type") || "contact",
                    "counter":   i
                },
                beforeSubmit: function (arr, $form, options) {
                    if (isNoviBuilder)
                        return;

                    let form = $(plugins.rdMailForm[this.extraData.counter]),
                        inputs = form.find("[data-constraints]"),
                        output = $("#" + form.attr("data-form-output")),
                        captcha = form.find('.recaptcha'),
                        captchaFlag = true;

                    output.removeClass("active error success");

                    if (isValidated(inputs, captcha)) {

                        // veify reCaptcha
                        if (captcha.length) {
                            let captchaToken = captcha.find('.g-recaptcha-response').val(),
                                captchaMsg = {
                                    'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
                                    'CPT002': 'Something wrong with google reCaptcha'
                                };

                            formHasCaptcha = true;

                            $.ajax({
                                method: "POST",
                                url:    "bat/reCaptcha.php",
                                data:   {'g-recaptcha-response': captchaToken},
                                async:  false
                            })
                                .done(function (responceCode) {
                                    if (responceCode !== 'CPT000') {
                                        if (output.hasClass("snackbars")) {
                                            output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

                                            setTimeout(function () {
                                                output.removeClass("active");
                                            }, 3500);

                                            captchaFlag = false;
                                        } else {
                                            output.html(captchaMsg[responceCode]);
                                        }

                                        output.addClass("active");
                                    }
                                });
                        }

                        if (!captchaFlag) {
                            return false;
                        }

                        form.addClass('form-in-process');

                        if (output.hasClass("snackbars")) {
                            output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
                            output.addClass("active");
                        }
                    } else {
                        return false;
                    }
                },
                error:        function (result) {
                    if (isNoviBuilder)
                        return;

                    let output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
                        form = $(plugins.rdMailForm[this.extraData.counter]);

                    output.text(msg[result]);
                    form.removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                        window.dispatchEvent(new Event('resize'));
                    }
                },
                success:      function (result) {
                    if (isNoviBuilder)
                        return;

                    let form = $(plugins.rdMailForm[this.extraData.counter]),
                        output = $("#" + form.attr("data-form-output")),
                        select = form.find('select');

                    form
                        .addClass('success')
                        .removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                        window.dispatchEvent(new Event('resize'));
                    }

                    result = result.length === 5 ? result : 'MF255';
                    output.text(msg[result]);

                    if (result === "MF000") {
                        if (output.hasClass("snackbars")) {
                            output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
                        } else {
                            output.addClass("active success");
                        }
                    } else {
                        if (output.hasClass("snackbars")) {
                            output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
                        } else {
                            output.addClass("active error");
                        }
                    }

                    form.clearForm();

                    if (select.length) {
                        select.select2("val", "");
                    }

                    form.find('input, textarea').trigger('blur');

                    setTimeout(function () {
                        output.removeClass("active error success");
                        form.removeClass('success');
                    }, 3500);
                }
            });
        }
    }

    // Custom Toggles
    if (plugins.customToggle.length) {
        var i;
        for (i = 0; i < plugins.customToggle.length; i++) {
            var $this = $(plugins.customToggle[i]);
            $this.on('click', function (e) {
                e.preventDefault();
                $("#" + $(this).attr('data-custom-toggle')).add(this).toggleClass('active');
            });

            if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
                $("body").on("click", $this, function (e) {
                    if (e.target !== e.data[0] && $("#" + e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
                        $("#" + e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
                    }
                })
            }
        }
    }

    // Google maps
    if (plugins.maps.length) {
        lazyInit(plugins.maps, initMaps);
    }

    
    

});
}
}());
