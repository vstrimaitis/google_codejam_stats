(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5474:function(e,a,t){e.exports=t(5727)},5727:function(e,a,t){"use strict";t.r(a);var n,r=t(0),i=t.n(r),o=t(17),l=t.n(o),s=t(23),c=t(24),u=t(26),d=t(25),m=t(27),p=t(35),h=t.n(p),g=t(63),f=t(20),b=t(2),y=t(45),E=function(e){return Object(f.createStyles)({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},drawer:Object(y.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),drawerPaper:{width:240},content:{flexGrow:1,padding:3*e.spacing.unit,display:"flex",flexDirection:"column",overflowX:"auto"},toolbar:e.mixins.toolbar,progress:{margin:2*e.spacing.unit,alignSelf:"center"},menuButton:Object(y.a)({marginRight:20},e.breakpoints.up("sm"),{display:"none"}),tableRoot:{overflowX:"auto"}})},w=t(65),v=t.n(w),S=function(e){if(e.status<200||e.status>=300)throw new Error(e.status+": "+e.statusText);return e.data},k=function(e){return v.a.get("round_data/info/".concat(e,".json")).then(S)},C=function(e){return v.a.get("round_data/scores/".concat(e,".json")).then(S)},O=t(64),A=(t(125),["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Benin","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Cambodia","Cameroon","Canada","Cayman Islands","Chad","Chile","China","Colombia","Congo [DRC]","Congo [Republic]","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","C\xf4te d'Ivoire","Decline to Answer","Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Georgia","Germany","Ghana","Greece","Guatemala","Guernsey","Guinea","Haiti","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia [FYROM]","Madagascar","Malawi","Malaysia","Malta","Martinique","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar [Burma]","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","R\xe9union","Saudi Arabia","Senegal","Serbia","Singapore","Sint Maarten","Slovakia","Slovenia","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","Spain","Sri Lanka","Sudan","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","U.S. Minor Outlying Islands","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vatican City","Venezuela","Vietnam","Yemen","Zimbabwe","\xc5land Islands","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Antarctica","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cayman Islands","Chile","China","Colombia","Congo [DRC]","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","C\xf4te d'Ivoire","Decline to Answer","Denmark","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Fiji","Finland","France","Georgia","Germany","Ghana","Greece","Greenland","Guadeloupe","Guatemala","Guernsey","Guinea","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia [FYROM]","Madagascar","Malaysia","Malta","Martinique","Mauritius","Mexico","Moldova","Monaco","Mongolia","Morocco","Mozambique","Myanmar [Burma]","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","North Korea","Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Romania","Russia","Rwanda","R\xe9union","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vatican City","Venezuela","Vietnam","Western Sahara","Yemen","Zimbabwe","\xc5land Islands"].distinct().sort()),j=t(182),x=function(e){return e||"Worldwide"},I=Object(f.withStyles)(function(e){return Object(f.createStyles)(Object(O.a)({},E,{countrySelect:{fontFamily:e.typography.fontFamily}}))},{withTheme:!0})(function(e){var a=e.selectedCountry,t=e.onSelectionChanged,n=e.classes;return i.a.createElement(j.a,{className:n.countrySelect,defaultValue:{value:x(a),label:x(a)},isSearchable:!0,options:["Worldwide"].concat(A).map(function(e){return{value:e,label:e}}),onChange:function(e){return t("Worldwide"===e.label?void 0:e.label)}})});!function(e){e.NONE="NONE",e.SCORE="SCORE",e.RANK="RANK"}(n||(n={}));var B=function(e){return e.challenge.tasks.map(function(e){return e.tests.map(function(e){return e.value}).sum()}).sum()},N=function(e,a){return e.filter(function(e){return e.score1===a})},T=function(e){return e.map(function(e){return e.taskInfo.map(function(e){return e.totalAttempts}).sum()}).sum()},M=function(e){return e.filter(function(e){return e.taskInfo.filter(function(e){return e.score>0}).length>0})},R=function(e,a,t){for(var n=new Map(Array.from(e.groupBy(function(e,a,t){return e.score1})).map(function(e){return[e[0],e[1].length]}).sort(function(e,a){return e[0]-a[0]})),r=[],i=a;i<=t;i++)r.push(i);return new Map(r.map(function(e){return[e,n.get(e)||0]}))},P=function(e,a,t,n){return new Map(Array.from(e.groupBy(function(e,a,t){return e.country}).entries()).map(function(e){return[e[0],a(e[1])]}).sort(function(e,a){return t(e[1],a[1])}).slice(0,n))},z=function(e){return void 0!==e&&e.type!==n.NONE},D=function(e,a){return a.type===n.RANK?e.rank<=a.threshold:a.type==n.SCORE&&e.score1>=a.threshold},L=Object(f.withStyles)(function(e){return Object(f.createStyles)(Object(O.a)({},E,{card:{textAlign:"center"}}))})(function(e){var a=e.number,t=e.label,n=e.classes;return i.a.createElement(b.b,null,i.a.createElement(b.c,{className:n.card},i.a.createElement(b.u,{variant:"h2"},a),i.a.createElement(b.u,{color:"textSecondary"},t)))}),q=t(34),G=Object(f.withStyles)(E,{withTheme:!0})(function(e){var a=e.data,t=e.title,n=e.label,r=e.theme;return i.a.createElement(q.b,{options:{scales:{xAxes:[{ticks:{beginAtZero:!0}}]},title:{display:!0,text:t},legend:{display:!1}},data:{labels:Array.from(a.keys()),datasets:[{label:n,backgroundColor:r.palette.primary.light,borderColor:r.palette.primary.dark,borderWidth:1,hoverBackgroundColor:r.palette.secondary.light,hoverBorderColor:r.palette.secondary.dark,data:Array.from(a.values())}]}})}),K=Object(f.withStyles)(E,{withTheme:!0})(function(e){var a=e.results,t=e.round,n=e.roundInfo,r=e.theme,o=(t.qualification,B(n)),l=function(e,a){return P(e,function(e){return e.length},function(e,a){return-e+a},a)}(a,10),s=function(e,a){return P(e,function(e){return e.map(function(e){return e.score1}).average()},function(e,a){return-e+a},a)}(a,10),c=function(e,a,t){return P(e,function(e){return e.filter(function(e){return e.score1===a}).length},function(e,a){return-e+a},t)}(a,o,10),u=R(a,0,o);return i.a.createElement(b.g,{container:!0,spacing:16},i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:n.fullScoreboardSize,label:"participants worldwide"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:N(a,o).length,label:"perfect scores"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:T(a),label:"submissions in total"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:M(a).length,label:"people solved at least one test set"})),i.a.createElement(b.g,{item:!0,xs:12,md:6},i.a.createElement(G,{data:l,title:"Number of participants per country (top ".concat(l.size,")"),label:"number of participants"})),i.a.createElement(b.g,{item:!0,xs:12,md:6},i.a.createElement(G,{data:s,title:"Top ".concat(s.size," countries by average score"),label:"average score"})),i.a.createElement(b.g,{item:!0,xs:12,md:6},i.a.createElement(G,{data:c,title:"Top ".concat(c.size," countries with the most top-scorers"),label:"number of top-scorers"})),i.a.createElement(b.g,{item:!0,xs:12,md:6},i.a.createElement(q.a,{options:{scales:{xAxes:[{ticks:{beginAtZero:!0},barPercentage:1,categoryPercentage:1}]},title:{display:!0,text:"Score distribution"},legend:{display:!1}},data:{labels:Array.from(u.keys()),datasets:[{label:"number of participants",backgroundColor:r.palette.primary.light,hoverBackgroundColor:r.palette.secondary.light,data:Array.from(u.values())}]}})))}),U=t(46),F=Object(f.withStyles)(E,{withTheme:!0})(function(e){var a=e.classes,t=e.qualification,n=e.results;return i.a.createElement(b.n,{className:a.tableRoot},i.a.createElement(b.o,null,i.a.createElement(b.r,null,i.a.createElement(b.s,null,i.a.createElement(b.q,null,"Rank"),i.a.createElement(b.q,null,"Username"),i.a.createElement(b.q,null,"Score"),z(t)?i.a.createElement(b.q,null,"Qualified"):null)),i.a.createElement(b.p,null,n.sort(function(e,a){return e.rank-a.rank}).map(function(e,a){return i.a.createElement(b.s,{key:a},i.a.createElement(b.q,null,e.rank),i.a.createElement(b.q,null,e.displayname),i.a.createElement(b.q,null,e.score1),z(t)?D(e,t)?i.a.createElement(b.q,null,i.a.createElement(b.i,null,i.a.createElement(U.a,null))):i.a.createElement(b.q,null,i.a.createElement(b.i,null,i.a.createElement(U.b,null))):null)}))))}),V=Object(f.withStyles)(E,{withTheme:!0})(function(e){var a=e.results,t=e.round,n=e.roundInfo,r=e.theme,o=B(n),l=R(a,0,o);return i.a.createElement(b.g,{container:!0,spacing:16},i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:a.length,label:"participants"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:N(a,o).length,label:"perfect scores"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:M(a).length,label:"people solved at least one test set"})),i.a.createElement(b.g,{item:!0,xs:12,sm:6,md:3},i.a.createElement(L,{number:a.filter(function(e){return D(e,t.qualification)}).length,label:"people qualified for the next round"})),i.a.createElement(b.g,{item:!0,xs:12},i.a.createElement(q.a,{options:{scales:{xAxes:[{ticks:{beginAtZero:!0},barPercentage:1,categoryPercentage:1}]},title:{display:!0,text:"Score distribution"},legend:{display:!1}},data:{labels:Array.from(l.keys()),datasets:[{label:"number of participants",backgroundColor:r.palette.primary.light,hoverBackgroundColor:r.palette.secondary.light,data:Array.from(l.values())}]}})),i.a.createElement(b.g,{item:!0,xs:12},i.a.createElement(F,{results:a,qualification:t.qualification})))}),H=Object(f.withStyles)(E,{withTheme:!0})(function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={isLoading:!1,roundInfo:void 0,roundResults:[],selectedCountry:void 0},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"componentWillReceiveProps",value:function(){var e=Object(g.a)(h.a.mark(function e(a){var t,n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.props!=a){e.next=2;break}return e.abrupt("return");case 2:if(a.round){e.next=5;break}return this.setState({isLoading:!1,roundInfo:void 0,roundResults:[]}),e.abrupt("return");case 5:return this.setState({isLoading:!0}),t=a.round.id,e.next=9,k(t);case 9:return n=e.sent,e.next=12,C(t);case 12:r=e.sent,console.log(n,r),this.setState({isLoading:!1,roundInfo:n,roundResults:r});case 15:case"end":return e.stop()}},e,this)}));return function(a){return e.apply(this,arguments)}}()},{key:"renderHelp",value:function(){return i.a.createElement(b.u,{paragraph:!0},"Please select a round from the side menu.")}},{key:"renderStats",value:function(e,a){var t=this;if(!this.props.round)return null;var n=this.state.selectedCountry;return void 0!==n&&(a=a.filter(function(e){return e.country.toUpperCase()===n.toUpperCase()})),i.a.createElement(b.g,{container:!0,spacing:16},i.a.createElement(b.g,{item:!0,xs:12},i.a.createElement(I,{selectedCountry:this.state.selectedCountry,onSelectionChanged:function(e){return t.setState({selectedCountry:e})}})),i.a.createElement(b.g,{item:!0,xs:12},this.state.selectedCountry?i.a.createElement(V,{round:this.props.round,roundInfo:e,results:a}):i.a.createElement(K,{round:this.props.round,roundInfo:e,results:a})))}},{key:"render",value:function(){return i.a.createElement("main",{className:this.props.classes.content},i.a.createElement("div",{className:this.props.classes.toolbar}),this.state.isLoading?i.a.createElement(b.d,{className:this.props.classes.progress,color:"secondary"}):this.state.roundInfo?this.renderStats(this.state.roundInfo,this.state.roundResults):this.renderHelp())}}]),a}(r.Component)),J=Object(f.withStyles)(E)(function(e){var a=e.classes,t=e.onDrawerToggle;return i.a.createElement(b.a,{position:"fixed",className:a.appBar},i.a.createElement(b.t,null,i.a.createElement(b.j,{color:"inherit","aria-label":"Open drawer",onClick:t,className:a.menuButton},i.a.createElement(U.c,null)),i.a.createElement(b.u,{variant:"h6",color:"inherit",noWrap:!0},"Google Code Jam Statistics")))}),W=Object(f.withStyles)(E,{withTheme:!0})(function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={isDrawerOpen:!1},t.handleDrawerToggle=function(){t.setState({isDrawerOpen:!t.state.isDrawerOpen})},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"renderDrawer",value:function(e){var a=this,t=this.props,n=t.classes,r=t.isLoading,o=t.rounds,l=t.onRoundClicked;return r?i.a.createElement(b.d,{className:n.progress}):i.a.createElement(b.k,null,o.map(function(t){return i.a.createElement(b.l,{key:t.id,button:!0},i.a.createElement(b.m,{primary:"".concat(t.displayName," ").concat(t.year),onClick:function(){e&&a.handleDrawerToggle(),l(t)}}))}))}},{key:"render",value:function(){var e=this.props.classes;return i.a.createElement("div",null,i.a.createElement(J,{onDrawerToggle:this.handleDrawerToggle}),i.a.createElement("nav",{className:e.drawer},i.a.createElement(b.h,{smUp:!0,implementation:"css"},i.a.createElement(b.f,{className:e.drawer,variant:"temporary",anchor:"rtl"===this.props.theme.direction?"right":"left",open:this.state.isDrawerOpen,onClose:this.handleDrawerToggle,classes:{paper:e.drawerPaper}},this.renderDrawer(!0))),i.a.createElement(b.h,{xsDown:!0,implementation:"css"},i.a.createElement(b.f,{className:e.drawer,variant:"permanent",classes:{paper:e.drawerPaper},open:!0},i.a.createElement("div",{className:e.toolbar}),this.renderDrawer(!1)))))}}]),a}(r.Component)),Z=Object(f.withStyles)(E)(function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={rounds:[],isLoading:!0},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(h.a.mark(function e(){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("config.json").then(S);case 2:return a=e.sent,e.next=5,new Promise(function(e){return setTimeout(e,1e3)});case 5:this.setState({rounds:a.rounds,isLoading:!1});case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,a=this.state,t=a.isLoading,n=a.rounds,r=a.selectedRound,o=this.props.classes;return i.a.createElement("div",{className:o.root},i.a.createElement(W,Object.assign({},this.props,{isLoading:t,rounds:n,onRoundClicked:function(a){return e.setState({selectedRound:a})}})),i.a.createElement(H,Object.assign({},this.props,{round:r})))}}]),a}(r.Component)),Y=t(44),Q=Object(f.createMuiTheme)({palette:{primary:Y.indigo,secondary:Y.pink,type:"light"},typography:{useNextVariants:!0}}),X=function(e){function a(){return Object(s.a)(this,a),Object(u.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(m.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return i.a.createElement(f.MuiThemeProvider,{theme:Q},i.a.createElement(i.a.Fragment,null,i.a.createElement(b.e,null),i.a.createElement(Z,null)))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(30);l.a.render(i.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5474,1,2]]]);
//# sourceMappingURL=main.321e5a37.chunk.js.map