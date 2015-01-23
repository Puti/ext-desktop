/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Desktop.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'Desktop.view.main.MainController',
        'Desktop.view.main.MainModel',
 	    
 	    'Desktop.view.login.Login',
 	    
 	    'Desktop.view.main.region.DesktopApp'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'fit'
    },

    items: [{
    	xtype: 'desktopapp'
    }]
});
