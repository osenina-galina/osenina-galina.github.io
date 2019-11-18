var Pagination = function(dItem, iCount, dContainer){
    var _data;

    var pagination = function(items, page, count){
        var _trimStart = (page - 1)*count;
        var _trimEnd = _trimStart + count;
        var _pages = Math.ceil(items.length/count);

        return {
            'start' : _trimStart,
            'end' : _trimEnd,
            'pages' : _pages
        }

    };

    var createButtons = function(pages, container){
        container.innerHTML = '';
        if (pages > 1){
            container.innerHTML += `<li class="pagination__item pagination__item--prev" >
                </li>`
            for (var i=1; i <= pages; i++){
                var _active = i == 1 ? 'pagination__item--active' : '';
                container.innerHTML += `<li class="pagination__item ${_active}" data-page=${i}>
                    ${i}
                </li>`
            };
            container.innerHTML += `<li class="pagination__item pagination__item--next" >
                </li>`
        }

        document.querySelectorAll('.pagination__item').forEach(function(el){
            el.addEventListener('click', function(){
                var _current = document.getElementsByClassName('pagination__item--active');
                if  (this.classList.contains('pagination__item--prev')){
                    _current[0].previousSibling.click();
                } else if (this.classList.contains('pagination__item--next')){
                    _current[0].nextSibling.click();
                } else {
                    handleButtons(this);
                    var _data = pagination(dItem, this.getAttribute('data-page'), iCount);
                    handleItems(_data.start, _data.end, dItem);
                }
            });
        });
    };

    // var createCard = function(data, container){
    //     container.innerHTML = '';
    //     for (var i=0; i < data.length; i++){
    //         container.innerHTML += `<a href=${data[i].link} class="position-link">
    //                 <div class="position">
    //                     <div class="position__logo">
    //                         <img src=${data[i].logo} class="position__logo-img" alt="" >
    //                     </div>
    //                     <div class="position__state">
    //                         ${data[i].state}
    //                     </div>
    //                     <div class="position__title">
    //                         ${data[i].job}
    //                     </div>
    //                     <div class="position__category">
    //                         ${data[i].category}
    //                     </div>
    //                 </div>
    //             </a>`
    //     }
    // };

    var handleItems = function(start, end, item){
        for (var i=0; i<item.length; i++){
            item[i].classList += ' position--hidden';
        }

        if (end > item.length){
            end = item.length;
        }

        for (var i=start; i<end; i++){
            item[i].classList.remove('position--hidden');
        }
    };

    var handleButtons = function(el){
        var _current = document.getElementsByClassName('pagination__item--active');
        var _last = document.querySelectorAll('.pagination__item').length - 2;

        if (el.getAttribute('data-page') == 1){
            document.getElementsByClassName('pagination__item--prev')[0].classList += ' pagination__item--hidden';
            document.getElementsByClassName('pagination__item--next')[0].classList.remove('pagination__item--hidden');
        } else if (el.getAttribute('data-page') == _last){
            document.getElementsByClassName('pagination__item--prev')[0].classList.remove('pagination__item--hidden');
            document.getElementsByClassName('pagination__item--next')[0].classList += ' pagination__item--hidden';
        } else {
            document.getElementsByClassName('pagination__item--next')[0].classList.remove('pagination__item--hidden');
            document.getElementsByClassName('pagination__item--prev')[0].classList.remove('pagination__item--hidden');
        }

        _current[0].className = _current[0].className.replace(' pagination__item--active', '');
        el.classList += ' pagination__item--active';
    };

    this.init = function(){
        _data = pagination(dItem, 1, iCount);
        createButtons(_data.pages, dContainer);
        document.getElementsByClassName('pagination__item--prev')[0].classList += ' pagination__item--hidden';
        handleItems(_data.start, _data.end, dItem);
    }
};
