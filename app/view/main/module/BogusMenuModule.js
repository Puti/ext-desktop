/**
 * 
 */
Ext.define('Desktop.view.main.module.BogusMenuModule', {
    extend: 'Desktop.view.main.module.BogusModule',

    init : function() {

        this.launcher = {
            text: 'More items',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: []
            }
        };

        for (var i = 0; i < 5; ++i) {
            this.launcher.menu.items.push({
                text: 'Window '+(++windowIndex),
                iconCls:'bogus',
                handler : this.createWindow,
                scope: this,
                windowId: windowIndex
            });
        }
    }
});