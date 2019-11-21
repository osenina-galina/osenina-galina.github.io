document.addEventListener("DOMContentLoaded", function(){
    document.getElementsByClassName('header__menu--mob')[0].addEventListener('click', function(){
        document.body.classList.toggle('header-menu-open');
    });

    document.getElementsByClassName('overlay')[0].addEventListener('click', function(){
        document.body.classList.remove('header-menu-open');
    });
});
