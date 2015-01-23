Ext.define("Desktop.view.login.Login",{
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'Desktop.view.login.LoginModel',
        'Desktop.view.login.LoginController',
        'Ext.form.Panel'
    ],

    viewModel: {
        type: 'login'
    },    
    
    controller: 'login',
    
    bodyPadding: 10,
    title: '登录窗口',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: '用户名',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: '密&nbsp;&nbsp;&nbsp;&nbsp;码',
            allowBlank: false,
            enableKeyEvents: true,
            cls: 'password',
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: '请输入用户名和密码'
        }],
        buttons: [{
            text: '登录',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});