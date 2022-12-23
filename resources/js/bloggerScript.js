const ScrollFix = function(ele, options) {
    const sf = this;
    let opts = {
        'offSet':0,
        'zIndex':9
    };
    opts = {...opts, ...options};
    function initScrollFix() {
        sf.offset = opts.offset || 0;
        sf.spacer = getSpacer();
        window.addEventListener('scroll' , checkPos);
        sf.window = window;
    }
    function getSpacer() {
      let spacer = document.createElement('div');
      spacer.classList.add('scrollFix-spacer');
      spacer.setAttribute('class',ele.getAttribute('class'));
      return spacer;
    }
    function setCss(ele,valuesObj) {
        for (const prop in valuesObj) {
            ele.style[prop] = valuesObj[prop];
        }
    }
    function checkPos() {
        let scrollTop = sf.window.document.body.parentNode.scrollTop,
                totalOffset = ele.offsetTop - sf.offset,
                fixed = null
        ;
        if (sf.fixed && sf.limit != null && scrollTop <= sf.limit) {
            sf.spacer.remove();
            ele.classList.remove('scrollFixed');
            setCss(ele,
                {
                    'position': ''
                    , 'top': ''
                    , 'z-index': ''
                    , 'width': ''
                }
            );
            fixed = false;
        }
        else if (!sf.fixed && scrollTop >= totalOffset) {
            setCss(sf.spacer,
                {
                    'height': ele.offsetHeight+'px',
                    'width': ele.offsetWidth+'px'
                }
            );
            ele.insertAdjacentElement('beforebegin',sf.spacer);
            setCss(ele,
                {
                    'position': 'fixed'
                    , 'top': (0 + sf.offset)+'px'
                    , 'z-index': opts.zIndex
                    , 'width': ele.offsetWidth+'px'
                }
            );
            ele.classList.add('scrollFixed');
            fixed = true;
        }
        if (fixed != null) {
            if (sf.fixed == fixed) { return; }
            sf.fixed = fixed;
            sf.limit = (sf.fixed ? totalOffset :  null);
        }
    }
    this.checkPosition = () => checkPos();
    initScrollFix();
    sf.checkPosition();
    ele.ScrollFix = sf;
    return sf;
}
document.querySelectorAll('.tabs-outer').forEach((e) => {
    new ScrollFix(e,{'zIndex':999});
});