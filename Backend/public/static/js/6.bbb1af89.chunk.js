(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1285:function(e,t,a){"use strict";var n=a(9),r=a(10),c=a(13),o=a(12),s=a(14),l=a(0),i=a.n(l),m=a(113),u=a(20);t.a=function(e,t){return function(a){return function(l){function d(a){var r;return Object(n.a)(this,d),r=Object(c.a)(this,Object(o.a)(d).call(this,a)),Object(m.b)(e,t),r}return Object(s.a)(d,l),Object(r.a)(d,[{key:"render",value:function(){var t=this;return i.a.createElement(u.a.Consumer,null,function(n){return n.store,n.storeState[e]?i.a.createElement(a,t.props):null})}}]),d}(i.a.PureComponent)}}},1286:function(e,t,a){"use strict";var n=a(68),r="[GAMES PAGE] GET GAMES",c="[GAMES PAGE] ADD GAME",o="[GAMES PAGE] UPDATE GAME NAME",s="[GAMES PAGE] SELECT GAME",l="[GAMES PAGE] REMOVE GAME NAME";function i(){return function(e){return n.a.get("/games/getAllGameNames",{}).then(function(t){e({type:r,payload:t.data.doc})})}}function m(e){return function(t){return n.a.post("/games/addGameName",{game:e}).then(function(e){return Promise.all([t({type:c})]).then(function(){return t(i())})})}}function u(e){return function(t){return n.a.post("/games/updateGameName",{game:e}).then(function(e){return Promise.all([t({type:o,selected_game:null})]).then(function(){return t(i())})})}}function d(e){return function(t){return n.a.post("/games/removeGameName",{game:e}).then(function(e){return Promise.all([t({type:l,selected_game:null})]).then(function(){return t(i())})})}}function p(e){return console.log(e),{type:s,selected_game:e}}a.d(t,"b",function(){return r}),a.d(t,"a",function(){return c}),a.d(t,"e",function(){return o}),a.d(t,"d",function(){return s}),a.d(t,"c",function(){return l}),a.d(t,"g",function(){return i}),a.d(t,"f",function(){return m}),a.d(t,"j",function(){return u}),a.d(t,"h",function(){return d}),a.d(t,"i",function(){return p})},1288:function(e,t,a){"use strict";var n=a(17),r=a(8),c=a(1286),o={entities:[],selected_game:null},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.b:return Object(r.a)({},e,{entities:t.payload});case c.a:return Object(r.a)({},e);case c.d:return Object(r.a)({},e,{selected_game:t.selected_game});case c.e:return console.log("reducer"),Object(r.a)({},e,{selected_game:t.selected_game});case c.c:return Object(r.a)({},e);default:return e}},l=Object(n.d)({games:s});t.a=l},1295:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(9),c=a(10),o=a(13),s=a(12),l=a(14),i=a(0),m=a.n(i),u=a(2),d=a(74),p=a(29),E=a(17),h=a(31),f=a(212),b=a(20),g=a(1285),v=a(15),C=a(1286),N=a(68),y="[CONTESTS PAGE] GET CONTESTS",w="[CONTESTS PAGE] ADD CONTEST",O="[CONTESTS PAGE] UPDATE CONTEST",_="[CONTESTS PAGE] REMOVE CONTEST",j="[CONTESTS PAGE] OPEN NEW CONTEST DIALOG",S="[CONTESTS PAGE] CLOSE NEW CONTEST DIALOG",G="[CONTESTS PAGE] OPEN EDIT CONTEST DAILOG";function T(){return function(e){return N.a.get("/contests/getAllContests",{}).then(function(t){e({type:y,payload:t.data.doc})})}}function A(e){return function(t){return N.a.post("/contests/addContest",{contest:e}).then(function(e){return Promise.all([t({type:w})]).then(function(){return t(T())})})}}function D(e){return function(t){return N.a.post("/contests/updateContest",{contest:e}).then(function(e){return Promise.all([t({type:O})]).then(function(){return t(T())})})}}function k(e){return function(t){return N.a.post("/contests/removeContest",{contest:e}).then(function(e){return Promise.all([t({type:_})]).then(function(){return t(T())})})}}function P(){return{type:j}}function x(e){return{type:G,data:e}}function W(){return{type:S}}var X=a(1288),I={entities:[],contestDialog:{type:"new",props:{open:!1},data:null}},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(n.a)({},e,{entities:t.payload});case w:case O:case _:return Object(n.a)({},e);case j:return Object(n.a)({},e,{contestDialog:{type:"new",props:{open:!0},data:null}});case G:return Object(n.a)({},e,{contestDialog:{type:"edit",props:{open:!0},data:t.data}});case S:return Object(n.a)({},e,{contestDialog:{type:"new",props:{open:!1},data:null}});default:return e}},B=Object(E.d)({contests:M}),L=a(245),q=a.n(L),R=a(244),V=a.n(R),z=new Date,U={_id:"",game_id:0,contest_name:"",contest_type:"",entry_fee:"",contest_goal:"",contest_rewards:"",start_time:z.toISOString().slice(0,16),end_time:z.toISOString().slice(0,16),contest_description:""},H=function(e){function t(){var e,a;Object(r.a)(this,t);for(var c=arguments.length,l=new Array(c),i=0;i<c;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state=Object(n.a)({},U),a.handleChange=function(e){console.log(e.target.value),a.setState(v.a.set(Object(n.a)({},a.state),e.target.name,"checkbox"===e.target.type?e.target.checked:e.target.value))},a.closeComposeDialog=function(){a.props.contestDialog.type,a.props.closeNewContestDialog()},a}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,t){!e.contestDialog.props.open&&this.props.contestDialog.props.open&&("edit"===this.props.contestDialog.type&&this.props.contestDialog.data&&!v.a.isEqual(this.props.contestDialog.data,t)&&this.setState(Object(n.a)({},this.props.contestDialog.data)),"new"!==this.props.contestDialog.type||v.a.isEqual(U,t)||this.setState(Object(n.a)({},U)))}},{key:"canBeSubmitted",value:function(){return this.state.contest_name.length>0}},{key:"render",value:function(){var e=this,t=this.props,a=t.contestDialog,n=t.addContest,r=t.updateContest;return m.a.createElement(u.j,Object.assign({classes:{paper:"m-24"}},a.props,{onClose:this.closeComposeDialog,fullWidth:!0,maxWidth:"md"}),m.a.createElement(u.a,{position:"static",elevation:1},m.a.createElement(u.cb,{className:"flex w-full"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit"},"new"===a.type?"New Contest":"Edit Contest"))),m.a.createElement(u.l,{classes:{root:"p-24"}},m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Game"),m.a.createElement(q.a,{className:"mb-24",value:this.state.game_id,onChange:this.handleChange,input:m.a.createElement(V.a,{name:"game_id",labelWidth:0,id:"game_id"}),fullWidth:!0},m.a.createElement("option",{value:"0"},"Blackjack Gone Wild"),m.a.createElement("option",{value:"1"},"Blackjack Bundle"))),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Contest Name"),m.a.createElement(u.bb,{className:"mb-24",label:"Contest Name",autoFocus:!0,id:"contest_name",name:"contest_name",value:this.state.contest_name,onChange:this.handleChange,variant:"outlined",required:!0,fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Contest Type"),m.a.createElement(q.a,{className:"mb-24",value:this.state.contest_type,onChange:this.handleChange,input:m.a.createElement(V.a,{name:"contest_type",labelWidth:0,id:"contest_type"}),fullWidth:!0},m.a.createElement("option",{value:"Amounts Wagered"},"Amounts Wagered"),m.a.createElement("option",{value:"Credits Won"},"Credits Won"),m.a.createElement("option",{value:"Hands Played"},"Hands Played"),m.a.createElement("option",{value:"Consective Wins"},"Consective Wins"))),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Entry fee"),m.a.createElement(u.bb,{className:"mb-24",label:"Entry fee",id:"entry_fee",name:"entry_fee",type:"number",value:this.state.entry_fee,onChange:this.handleChange,variant:"outlined",required:!0,fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Contest Goal"),m.a.createElement(u.bb,{className:"mb-24",label:"Contest Goal",id:"contest_goal",name:"contest_goal",type:"number",value:this.state.contest_goal,onChange:this.handleChange,variant:"outlined",required:!0,fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Contest Rewards"),m.a.createElement(u.bb,{className:"mb-24",label:"Contest Rewards",id:"contest_rewards",name:"contest_rewards",type:"number",value:this.state.contest_rewards,onChange:this.handleChange,variant:"outlined",required:!0,fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Start Time"),m.a.createElement(u.bb,{className:"mb-24",id:"start_time",name:"start_time",label:"Start Time",type:"datetime-local",defaultValue:this.state.start_time,onChange:this.handleChange,InputLabelProps:{shrink:!0},variant:"outlined",fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"End Time"),m.a.createElement(u.bb,{className:"mb-24",id:"end_time",name:"end_time",label:"End Time",type:"datetime-local",defaultValue:this.state.end_time,onChange:this.handleChange,InputLabelProps:{shrink:!0},variant:"outlined",fullWidth:!0})),m.a.createElement("div",{className:"flex"},m.a.createElement(u.eb,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Description"),m.a.createElement(u.bb,{className:"mb-24",id:"contest_description",name:"contest_description",label:"Description",multiline:!0,rows:"4",defaultValue:this.state.contest_description,onChange:this.handleChange,InputLabelProps:{shrink:!0},variant:"outlined",fullWidth:!0}))),"new"===a.type?m.a.createElement(u.k,{className:"justify-between pl-16"},m.a.createElement(u.c,{variant:"contained",color:"primary",onClick:function(){n(e.state),e.closeComposeDialog()},disabled:!this.canBeSubmitted()},"Add")):m.a.createElement(u.k,{className:"justify-between pl-16"},m.a.createElement(u.c,{variant:"contained",color:"primary",onClick:function(){r(e.state),e.closeComposeDialog()},disabled:!this.canBeSubmitted()},"Save")))}}]),t}(i.Component);var J=Object(b.b)(function(e){return{contestDialog:e.contestsPage.reducer.contests.contestDialog}},function(e){return Object(E.c)({closeNewContestDialog:W,addContest:A,updateContest:D},e)})(H),Z=function(e){function t(){var e,a;Object(r.a)(this,t);for(var c=arguments.length,l=new Array(c),i=0;i<c;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={data:[],new_name:"",selectedGameId:0},a.handleChange=function(e){a.setState(v.a.set(Object(n.a)({},a.state),e.target.name,"checkbox"===e.target.type?e.target.checked:e.target.value))},a.selectGame=function(e){a.setState({selectedGameId:e})},a}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.getContests(this.props.match.params)}},{key:"componentDidUpdate",value:function(e,t){}},{key:"onAddNewContestName",value:function(){var e=this.state.new_name;(0,this.props.addContestName)({name:e})}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.contests,r=t.openNewContestDialog,c=t.openEditContestDialog,o=t.deleteContest;return m.a.createElement(p.l,{classes:{root:a.layoutRoot},header:m.a.createElement("div",{className:"py-80"},m.a.createElement(u.eb,{variant:"h6",className:"hidden sm:flex"},"Manage Contests")),contentToolbar:m.a.createElement("div",{className:"px-24 flex flex-row"},m.a.createElement("div",{className:"px-24 flex flex-row"},m.a.createElement(u.eb,{variant:"subtitle1"},"Select Game"),m.a.createElement(u.q,{className:"pl-24"},m.a.createElement(u.P,{value:this.state.selectedGameId,onChange:function(t){return e.selectGame(t.target.value)},displayEmpty:!0,name:"selectedGameId",className:a.selectEmpty},m.a.createElement(u.I,{value:0}," ","Blackjack Gone Wild"," "),m.a.createElement(u.I,{value:1}," ","Blackjack Bundle"," ")))),m.a.createElement("div",{className:"px-24"},m.a.createElement(u.c,{variant:"contained",color:"primary",onClick:function(){return r()}},"Add New Contest"))),content:m.a.createElement("div",{className:"p-24"},0===n.length&&m.a.createElement("div",{className:"flex items-center justify-center h-full"},m.a.createElement(u.eb,{color:"textSecondary",variant:"h5"},"No Contests Exist")),0!==n.length&&m.a.createElement(u.L,{className:a.root},m.a.createElement(u.V,{className:a.table},m.a.createElement(u.Y,null,m.a.createElement(u.Z,null,m.a.createElement(u.X,null,"No"),m.a.createElement(u.X,{align:"center"},"Contest name"),m.a.createElement(u.X,{align:"center"},"Contest type"),m.a.createElement(u.X,{align:"center"},"Entry fee"),m.a.createElement(u.X,{align:"center"},"Goal"),m.a.createElement(u.X,{align:"center"},"Rewards"),m.a.createElement(u.X,{align:"center"},"Start"),m.a.createElement(u.X,{align:"center"},"End"))),m.a.createElement(u.W,null,n.map(function(t,n){return t.game_id===e.state.selectedGameId&&m.a.createElement(u.Z,{key:t._id},m.a.createElement(u.X,{component:"th",scope:"row"},n+1),m.a.createElement(u.X,{component:"th",scope:"row"},t.contest_name),m.a.createElement(u.X,{component:"th",scope:"row"},t.contest_type),m.a.createElement(u.X,{component:"th",scope:"row"},t.entry_fee),m.a.createElement(u.X,{component:"th",scope:"row"},t.contest_goal),m.a.createElement(u.X,{component:"th",scope:"row"},t.contest_rewards),m.a.createElement(u.X,{component:"th",scope:"row"},t.start_time),m.a.createElement(u.X,{component:"th",scope:"row"},t.end_time),m.a.createElement(u.X,{align:"center",component:"th",scope:"row"},m.a.createElement(u.o,{variant:"contained",color:"default",className:a.fab,size:"small"},m.a.createElement(h.a,{to:"/contests_data/"+t._id},m.a.createElement("span",null,"view"))),m.a.createElement(u.o,{variant:"contained",color:"primary",className:a.fab,onClick:function(){return c(t)},size:"small"},m.a.createElement(u.w,null,"edit")),m.a.createElement(u.o,{variant:"contained",color:"secondary",className:a.fab,onClick:function(){window.confirm("Are you sure to delete it?")&&o(t)},size:"small"},m.a.createElement(u.w,null,"delete"))))})))),m.a.createElement(J,null))})}}]),t}(i.Component);t.default=Object(g.a)("contestsPage",Object(E.d)({reducer:B,games_reducer:X.a}))(Object(d.withStyles)(function(e){return{addButton:{position:"absolute",right:12,bottom:12,zIndex:99},root:{width:"100%",marginTop:3*e.spacing.unit,overflowX:"auto"},table:{minWidth:700}}},{withTheme:!0})(Object(f.g)(Object(b.b)(function(e){var t=e.contestsPage;return{contests:t.reducer.contests.entities,games:t.games_reducer.games.entities}},function(e){return Object(E.c)({getContests:T,openNewContestDialog:P,openEditContestDialog:x,deleteContest:k,getGames:C.g},e)})(Z))))}}]);