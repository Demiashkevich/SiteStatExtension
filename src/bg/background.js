var tab_store = window.tab_store = new ChromeTabsData();
var tab_id_glob;

function get_data(param, callback) {
    var request = new XMLHttpRequest();
    request.onload = callback;
    request.open("get", "http://localhost:9191/bpm-api/v2/task/searchByDomainName?domainName=" + param, false);
    request.setRequestHeader("Content-type", "application/json");
    request.send();

}
function process_data() {
    // if (this.status === 404) {
    //     // chrome.browserAction.disable();
    //     // chrome.browserAction.setPopup({tabId: tab_id_glob, popup: ""});
    //     chrome.browserAction.setIcon({tabId: tab_id_glob, path: '../../icons/default.png'});
    //     return;
    // }
    //
    // if (this.status === 406) {
    //     // chrome.browserAction.disable();
    //     // chrome.browserAction.setPopup({tabId: tab_id_glob, popup: ""});
    //     chrome.browserAction.setIcon({tabId: tab_id_glob, path: '../../icons/has_late.png'});
    //     return;
    // }

    tab_store.new_tab(1);

    var items = JSON.parse(this.responseText);

    // chrome.browserAction.enable();
    // chrome.browserAction.setPopup({tabId: tab_id_glob, popup: "../page_action/page_action.html"});
    // chrome.browserAction.setIcon({tabId: tab_id_glob, path: '../../icons/has_projects.png'});

    for (i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.status === 'PAST DUE') {
            item.status = 'background: #ff000061'
        } else {
            item.status = 'background: #55ca0059'
        }

        if (item.currentStaffName === null) {
            item.currentStaffName = "Unassigned";
        }

    }

    tab_store.get_tab(1).add_info('args', items);
}

function process_url(tabId, changeInfo, tab) {
    var url = extractHostname(tab.url);
    tab_id_glob = tabId;
    get_data(url, process_data)
}

function extractHostname(url) {
    var hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
}

chrome.tabs.onUpdated.addListener(process_url);