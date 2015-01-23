Ext.define('Desktop.view.main.region.DesktopApp', {
	extend: 'Ext.ux.desktop.Desktop',
	alias: 'widget.desktopapp',
	
    requires: [
       'Ext.window.MessageBox',

       'Ext.ux.desktop.ShortcutModel',

       'Desktop.view.main.module.SystemStatus',
       'Desktop.view.main.module.VideoWindow',
       'Desktop.view.main.module.GridWindow',
       'Desktop.view.main.module.TabWindow',
       'Desktop.view.main.module.AccordionWindow',
       'Desktop.view.main.module.Notepad',
       'Desktop.view.main.module.BogusMenuModule',
       'Desktop.view.main.module.BogusModule',

       //'Desktop.Blockalanche',
       'Desktop.view.main.module.Settings'
   ],	
   
   getModules : function(){
       return [
           new Desktop.view.main.module.VideoWindow(),
           //new Desktop.Blockalanche(),
           new Desktop.view.main.module.SystemStatus(),
           new Desktop.view.main.module.GridWindow(),
           new Desktop.view.main.module.TabWindow(),
           new Desktop.view.main.module.AccordionWindow(),
           new Desktop.view.main.module.Notepad(),
           new Desktop.view.main.module.BogusMenuModule(),
           new Desktop.view.main.module.BogusModule()
       ];
   },
   
   initComponent: function () {
	   var me = this;
	   
       me.modules = me.getModules();
       if (me.modules) {
           me.initModules(me.modules);
       }
       //初始化配置参数
       me.getDesktopConfig();
       this.callParent();
       //将自身赋值给app变量
       me.app = me;
   },    
   
   initModules : function(modules) {
       var me = this;
       Ext.each(modules, function (module) {
           module.app = me;
       });
   },
   
   getModule : function(name) {
   	var ms = this.modules;
       for (var i = 0, len = ms.length; i < len; i++) {
           var m = ms[i];
           if (m.id == name || m.appType == name) {
               return m;
           }
       }
       return null;
   },
   
   getDesktopConfig : function(){
	   var me = this
       Ext.apply(me, {
    	   //右键菜单
    	   contextMenuItems: [
              { text: 'Change Settings', handler: me.onSettings, scope: me }
           ],
    	   //桌面快捷键
    	   shortcuts: Ext.create('Ext.data.Store', {
               model: 'Ext.ux.desktop.ShortcutModel',
               data: [
                   { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                   { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                   { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                   { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
               ]
           }),
    	   //墙纸
           wallpaper: 'resources/images/wallpapers/CG101.jpg',
           wallpaperStretch: false,
           //任务栏和开始菜单配置
           taskbarConfig : me.getTaskbarConfig()
       });
	   
   },

   // 开始菜单
   getStartConfig : function() {
       var me = this, ret = {};
       Ext.apply(ret, {
           title: 'Don Griffin',
           iconCls: 'user',
           height: 300,
           menu: [],
           toolConfig: {
               width: 100,
               items: [
                   {
                       text:'Settings',
                       iconCls:'settings',
                       handler: me.onSettings,
                       scope: me
                   },
                   '-',
                   {
                       text:'Logout',
                       iconCls:'logout',
                       handler: 'onLogout'
                   }
               ]
           }
       });
       //程序按钮
       Ext.each(me.modules, function (module) {
           launcher = module.launcher;
           if (launcher) {
               launcher.handler = launcher.handler || Ext.bind(me.createWindowFromModule, me, [module]);
               ret.menu.push(module.launcher);
           }
       });       
       return ret;
   },
   
   createWindowFromModule: function(module) {
       var window = module.createWindow();
       window.show();
   },   
   
   getTaskbarConfig: function () {
       var me = this, ret = {};
       return Ext.apply(ret, {
    	   app : me,
    	   //将开始按钮配置在任务栏上
           startConfig :  me.getStartConfig(),
           //任务栏快捷方式
           quickStart: [
               { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
               { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
           ],
           //时钟
           trayItems: [
               { xtype: 'trayclock', flex: 1 }
           ]
       });
   },    

   getDesktop : function() {
	   var me = this;
	   return me;
   },
   
   /*onLogout :function(){
	   Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
       // Remove the localStorage key/value
       localStorage.removeItem('LOGGEDIN');

       // Remove Main View
       this.getView().destroy();

       // Add the Login Window
       Ext.widget('login');
	}, */   

   onSettings: function () {
	   var me = this,
       dlg = new Desktop.view.main.module.Settings({
           desktop: me
       });
       dlg.show();
   }   
  
});