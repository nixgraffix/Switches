// injects a a querySelector for (switches)
// and corresponding selectors for elements(lights)
// to be activated when "switch" is clicked
function switches(switches, options){

    var defaultOptions = {
        acceptQuery : false,
        validQueryParams : null, // must be array
        defaultActivateIds : null // must be array
    };

    var defaultSwitches = {
        menuBtn : {
            switch: "#menuBtn",
            lights : ['#menuBtn', '#mainNav']
        },
        mobileNavSearchIcon : {
            switch: "#mobileNavSearchIcon",
            lights : ['#mobileNavSearch', '#mobileNavSearchIcon']
        },
        closeMobileNavSearch : {
            switch: '#closeMobileNavSearch',
            lights : ['#mobileNavSearch', '#mobileNavSearchIcon'],
        }
    };

    var settings = merge(defaultOptions, options);
    var switches = merge(defaultSwitches, switches);

    function init(){
        for(var k in switches){
            if(switches.hasOwnProperty(k)) {

                switches[k].elements = Array.from(document.querySelectorAll(switches[k].switch));
                if(switches[k].elements){
                    switches[k].elements.forEach(function(el){
                        let temp = [];
                        switches[k].lights.forEach(function(id){
                            temp.push(id);
                        });
                        el.dataset.activate = el.dataset.activate ? el.dataset.activate : temp.toString();
                    });
                }
            }
        }
        if(settings.defaultActivateIds && settings.defaultActivateIds !== ""){
            settings.defaultActivateIds.forEach(activate);
        }

        if(settings.acceptQuery){
            urlParams = new URLSearchParams(window.location.search);
            settings.validQueryParams.forEach(function(param){
                let tempID = urlParams.get(param);
                if(tempID){
                    activate('#'+tempID);
                }
            });
        }

        bind();
    }

    function bind(){
        for(var k in switches){
            if (switches.hasOwnProperty(k)) {
                switches[k].elements.forEach(function(el){
                    el.addEventListener('click', function(el){
                        let temp = this.dataset.activate.split(",");
                        temp.forEach(activate);
                    });
                });
            }
        }
    }

    function activate(selector){
        if(selector !== "" && selector !== null){    
            let tempEls = Array.from(document.querySelectorAll(selector));

            if(tempEls.length > 0){
                tempEls.forEach(function(tempEl){
                    if(tempEl.hasClass('active')){
                        if(tempEl.style.display == 'inline-block'){
                            tempEl.removeClass('active');
                            setTimeout(function(){
                                tempEl.style.display = null;
                            },750);
                        }else{
                            tempEl.removeClass('active');
                        }
                    }else{
                        if(getComputedStyle(tempEl, null).display == 'none'){
                            tempEl.style.display = 'inline-block';
                            setTimeout(function(){
                                tempEl.addClass('active')
                            },24);
                        }else{
                            tempEl.addClass('active');
                        }
                    }
                });
            }
        }
    }

    function merge(defaultJSON, overWriteJSON){
        let result = {};
        for(var key in defaultJSON) result[key] = defaultJSON[key];
        for(var key in overWriteJSON) result[key] = overWriteJSON[key];
        return result;
    }

    init();
}
