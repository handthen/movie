
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","style":"custom","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"movie","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.4.15","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999","selectedColor":"#007aff","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","list":[{"pagePath":"pages/index/index","iconPath":"/static/tabBar/home.png","selectedIconPath":"/static/tabBar/homeA.png","text":"首页"},{"pagePath":"pages/classif/classif","iconPath":"/static/tabBar/fenlei.png","selectedIconPath":"/static/tabBar/fenleiA.png","text":"分类"},{"pagePath":"pages/me/me","iconPath":"/static/tabBar/me.png","selectedIconPath":"/static/tabBar/meA.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"enablePullDownRefresh":true,"navigationBar":{"titleText":"首页"},"isNVue":false}},{"path":"pages/classif/classif","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{"titleText":"分类"},"isNVue":false}},{"path":"pages/me/me","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{"titleText":"我的"},"isNVue":false}},{"path":"pages/palyMovie/palyMovie","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"components/swperMovie/swperMovie","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"components/searchList/searchList","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"components/NavBar/NavBar","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/collection/collection","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"我的收藏"},"isNVue":false}},{"path":"pages/Error/Error","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"components/Image/Image","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/historyList/historyList","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"components/loading/loading","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  