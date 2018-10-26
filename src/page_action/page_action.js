tab_store = chrome.extension.getBackgroundPage().tab_store;

chrome.tabs.query({'highlighted':true,'currentWindow':true}, function(tabs){
    $.get('template.html', function(template){
        var info = tab_store.get_tab(1).get_info('args');
        $('#main').append(Mustache.render(template, info));
    });
});
