function PageData() {
    var information = {};

    this.add_info = function(key, data) {
        information[key] = data;
    };

    this.get_info = function(key) {
        return information[key];
    };

}

function ChromeTabsData () {

    var tabs = {};

    this.new_tab = function(tabid) {
        if (tabid === undefined) {
            return
        }
        if (!tabs[tabid]) {
            tabs[tabid] = new PageData();
        }
    };

    this.get_tab = function(tabid) {
        return tabs[tabid];
    };
}