(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,n,t){e.exports=t.p+"static/media/game-bg.67a493c7.svg"},26:function(e,n,t){e.exports=t.p+"static/media/card-bg.7dcc97aa.svg"},30:function(e,n,t){e.exports=t(61)},61:function(e,n,t){"use strict";t.r(n);var r=t(2),a=t(0),c=t.n(a),i=t(11),u=t.n(i),o=t(3),s=t(16),l=t(1),d=t.n(l),p=t(4),f=t(6),m=t(7),h=t(9),b=t(8),g=t(10),v=t(24),k={firstPlayerName:"dealer",deckCount:1,deckShuffled:!0,numPlayers:2},y=t.n(v).a.create({baseURL:"https://deckofcardsapi.com/api"}),x=function(){var e=Object(p.a)(d.a.mark(function e(){var n,t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=k.deckShuffled?"/deck/new/shuffle/":"/deck/new/",e.next=3,y.get(n,{params:{deck_count:k.deckCount}});case 3:return t=e.sent,e.abrupt("return",t.data);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(p.a)(d.a.mark(function e(n){var t,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="/deck/".concat(n,"/"),e.next=3,y.get(t);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(d.a.mark(function e(n){var t,r,a;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=k.numPlayers,r="/deck/".concat(n,"/draw/"),e.next=4,y.get(r,{params:{count:t}});case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),j=function(){var e=Object(p.a)(d.a.mark(function e(n,t,r){var a,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="/deck/".concat(n,"/pile/").concat(t,"/add/"),e.next=3,y.get(a,{params:{cards:r}});case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}},e,this)}));return function(n,t,r){return e.apply(this,arguments)}}(),O=function(){var e=Object(p.a)(d.a.mark(function e(n,t){var r,a;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r="/deck/".concat(n,"/pile/").concat(t,"/list/"),e.next=4,y.get(r);case 4:return a=e.sent,e.abrupt("return",Object.keys(a.data.piles));case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",[]);case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(n,t){return e.apply(this,arguments)}}(),C=function(){var e=Object(p.a)(d.a.mark(function e(n,t){var r,a;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r="/deck/".concat(n,"/pile/").concat(t,"/list/"),e.next=3,y.get(r);case 3:return a=e.sent,e.abrupt("return",a.data.piles[t]);case 5:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),D={deckofcards:y,getNewDeck:x,getPrevDeck:w,drawCards:E,dealCardToPlayer:j,getPlayerNames:O,getPlayerHand:C},P={board:"seagreen",red:"#b81b1b",black:"#272727"},S=t(25),I=t.n(S),N=t(26),A=t.n(N);function R(){var e=Object(r.a)(["\n  font-size: 2.4rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  line-height: 1;\n  padding: 16px;\n  position: absolute;\n  ","\n\n"]);return R=function(){return e},e}function U(){var e=Object(r.a)(["\n  font-size: 6.4rem;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return U=function(){return e},e}function G(){var e=Object(r.a)(["\n  opacity: ",";\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]);return G=function(){return e},e}function F(){var e=Object(r.a)(["\n  color: ",";\n  background-color: #08AEEA;\n  background-image: url(","), linear-gradient(30deg, #08AEEA 0%, #2AF598 100%);\n  background-position: center center, auto auto;\n  ","\n  border-radius: 16px;\n  box-shadow: 0px 0px 4px rgba(0,0,0,0.2), -2px 0px 8px rgba(0,0,0,0.2);\n  width: 160px;\n  height: 240px;\n  cursor: pointer;\n  user-select: none;\n\n  margin: 0 calc("," * 160px);\n  transform: rotate(","deg) translateY(","%);\n  transform-origin: ",";\n  transition: all 0.3s ease;\n\n  :first-child { margin-left: 0; }\n  :last-child { margin-right: 0; }\n  :hover {\n    margin: 0 32px 0 0;\n    transform: translateY(-10%);\n  }\n\n  i {\n    font-style: normal;\n  }\n"]);return F=function(){return e},e}var z=o.b.div(F(),function(e){return P[e.suitColor]},A.a,function(e){return e.isFaceUp&&"background-color: white;\n    background-image: linear-gradient(30deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 100%);\n    "},function(e){return e.overlapPercent/-100},function(e){return e.rotateDegrees},function(e){return e.offsetPercent},function(e){return e.rotateDegrees<0?"bottom right":"bottom left"}),B=o.b.div(G(),function(e){return e.isFaceUp?1:0}),H=o.b.div(U()),J=o.b.div(R(),function(e){return e.isRotated?"bottom: 0;\n    right: 0;\n    transform: rotate(180deg);":"top: 0;\n    left: 0;"});function K(e){return"SPADES"===e?"\u2660":"CLUBS"===e?"\u2663":"HEARTS"===e?"\u2665":"DIAMONDS"===e?"\u2666":"\ufe0fE"}function M(e){var n=e.suit,t=e.value,r=e.isRotated;return c.a.createElement(J,{isRotated:r},c.a.createElement("i",null,function(e){return isNaN(e)?"ACE"===e?"A":"JACK"===e?"J":"QUEEN"===e?"Q":"KING"===e?"K":"E":""+e}(t)),c.a.createElement("i",null,K(n)))}function _(e){var n=e.suit;return c.a.createElement(H,null,c.a.createElement("i",null,K(n)))}var T=function(e){function n(){var e,t;Object(f.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(h.a)(this,(e=Object(b.a)(n)).call.apply(e,[this].concat(a)))).handleClick=function(e){t.props.onFlipCard(e,t.props.code)},t}return Object(g.a)(n,e),Object(m.a)(n,[{key:"render",value:function(){var e=this.props,n=e.isFaceUp,t=e.value,r=e.suit,a=e.overlapPercent,i=e.offsetPercent,u=e.rotateDegrees,o=function(e){return"HEARTS"===e||"DIAMONDS"===e?"red":"black"}(r);return c.a.createElement(z,{onClick:this.handleClick,isFaceUp:n,suitColor:o,overlapPercent:a,offsetPercent:i,rotateDegrees:u},c.a.createElement(B,{isFaceUp:n},c.a.createElement(_,{suit:r}),c.a.createElement(M,{suit:r,value:t}),c.a.createElement(M,{suit:r,value:t,isRotated:!0})))}}]),n}(a.Component);T.defaultProps={offsetPercent:0,rotateDegrees:0};var Q=T;function Z(){var e=Object(r.a)(["\n  display: flex;\n  justify-content: center;\n  max-width: 100%;\n  min-height: 240px;\n"]);return Z=function(){return e},e}function L(){var e=Object(r.a)(["\n  font-weight: normal;\n  display: inline-block;\n  background: ",";\n  border-radius: 1.6rem;\n  padding: 0.8rem 2.4rem;\n  margin: 0.8rem;\n"]);return L=function(){return e},e}function Y(){var e=Object(r.a)(["\n  text-transform: uppercase;\n  margin: 0;\n"]);return Y=function(){return e},e}function W(){var e=Object(r.a)(["\n  padding: 4rem 0 2.4rem 0;\n"]);return W=function(){return e},e}function q(){var e=Object(r.a)(["\n  padding: 1.6rem;\n"]);return q=function(){return e},e}var V=o.b.section(q()),X=o.b.header(W()),$=o.b.h1(Y()),ee=o.b.h2(L(),function(e){return e.priority?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.1)"}),ne=o.b.div(Z());var te=function(e){function n(){var e,t;Object(f.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(h.a)(this,(e=Object(b.a)(n)).call.apply(e,[this].concat(a)))).state={faceUpCards:new Set},t.handleFlipCard=function(e,n){var r=new Set(t.state.faceUpCards);t.state.faceUpCards.has(n)?(r.delete(n),t.setState({faceUpCards:r})):(r.add(n),t.setState({faceUpCards:r}))},t}return Object(g.a)(n,e),Object(m.a)(n,[{key:"getPoints",value:function(){var e=this;return this.props.cards.reduce(function(n,t){return e.state.faceUpCards.has(t.code)?n+e.getCardPoints(t):n},0)}},{key:"getCardPoints",value:function(e){return isNaN(e.value)?"ACE"===e.value?1:"JACK"===e.value||"QUEEN"===e.value||"KING"===e.value?10:0:+e.value}},{key:"render",value:function(){var e,n=this,t=this.props,r=t.deckID,a=t.playerName,i=t.cards,u=(e=i.length)<2?0:e<4?15:e<6?25:e<10?30:e<20?33:36,o=function(e){var n=e<2?0:e<8?3:e<12?2:e<22?1:0,t=Array(e).fill(n),r=Math.floor(t.length/2);return t.map(function(e,n){return e*(n-r)})}(i.length);return c.a.createElement(V,null,c.a.createElement(X,null,c.a.createElement($,null,a),c.a.createElement(ee,{priority:!0},this.getPoints()," ",c.a.createElement("small",null,"Points")),c.a.createElement(ee,null,i.length," ",c.a.createElement("small",null,"Cards"))),c.a.createElement(ne,null,i.map(function(e,t){var a=n.state.faceUpCards;return c.a.createElement(Q,Object.assign({key:"".concat(e.code,"-").concat(r),isFaceUp:a.has(e.code),onFlipCard:n.handleFlipCard,overlapPercent:u,rotateDegrees:o[t]},e))})))}}]),n}(a.Component);var re=function(e){var n=function(e){var n=e.slice();return n.sort(function(e,n){return e.name<n.name?-1:e.name>n.name?1:0}),n}(e.players).map(function(n){var t=n.name,r=n.hand;return c.a.createElement(te,{key:"".concat(t,"-").concat(e.deckID),deckID:e.deckID,playerName:t,cards:r})});return c.a.createElement("div",null,n)};function ae(){var e=Object(r.a)(["\n  text-transform: uppercase;\n  opacity: 0.6;\n  font-size: 0.8em;\n  letter-spacing: 0.1ch;\n  margin: 0.8rem 0 0 0;\n  font-weight: bold;\n"]);return ae=function(){return e},e}function ce(){var e=Object(r.a)(["\n  font-size: 3.2rem;\n  font-weight: bold;\n  text-align: center;\n  line-height: 7.2rem;\n  height: 8rem;\n  width: 8rem;\n  background:",";\n  border: ",";\n  border-radius: 2rem;\n  margin: auto;\n"]);return ce=function(){return e},e}function ie(){var e=Object(r.a)(["\n  display: flex;\n  align-items: center;\n"]);return ie=function(){return e},e}function ue(){var e=Object(r.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2.4rem;\n  margin-top: 2.4rem;\n  border-top: 2px solid rgba(0,0,0,0.2);\n"]);return ue=function(){return e},e}function oe(){var e=Object(r.a)(["\n  ","\n\n"]);return oe=function(){return e},e}function se(){var e=Object(r.a)(["\n  font-family: inherit;\n  font-weight: inherit;\n  font-size: 2.4rem;\n  color: mediumseagreen;\n  height: 8rem;\n  width: 24rem;\n  margin: 0.8rem;\n  background: white;\n  border: none;\n  border-radius: 8rem;\n  outline: none;\n  box-shadow: 0 2px 2px rgba(0,0,0,0.2), 0 4px 4px rgba(0,0,0,0.1);\n  cursor: pointer;\n  transition: all 0.3s ease;\n  :hover {\n    color: seagreen;\n    box-shadow: 0 2px 2px rgba(0,0,0,0.2), 0 4px 4px rgba(0,0,0,0.4);\n  }\n\n  ","\n  ","\n"]);return se=function(){return e},e}function le(){var e=Object(r.a)(["\n  text-align: center;\n  padding: 4rem;\n  opacity: 0.5;\n"]);return le=function(){return e},e}function de(){var e=Object(r.a)(["\n  text-align: center;\n  padding: 4rem;\n"]);return de=function(){return e},e}function pe(){var e=Object(r.a)(["\n  font-size: 4.8rem;\n  margin: 0;\n"]);return pe=function(){return e},e}function fe(){var e=Object(r.a)(["\n  text-align: center;\n  height: 100vh;\n  width: 100vw;\n  color: white;\n  background: "," url(",");\n  box-shadow: inset 0 0 160px rgba(0,0,0,0.2), inset 0 0 240px rgba(0,0,0,0.3);\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n\n  \n"]);return fe=function(){return e},e}var me=o.b.div(fe(),P.board,I.a),he=o.b.h1(pe()),be=o.b.header(de()),ge=o.b.footer(le()),ve=o.b.button(se(),function(e){return e.accent&&"\n    background: mediumseagreen;\n    color: honeydew;\n    :hover { color: white; }\n  "},function(e){return e.disabled&&"\n    cursor: not-allowed;\n    background: darkseagreen;\n    color: honeydew;\n    :hover { color: inherit; }\n  "}),ke=o.b.div(oe(),function(e){return e.isActive&&"\n    /* display: flex;\n    height: 100%;\n    width: 100%; */\n  "}),ye=o.b.aside(ue()),xe=o.b.div(ie()),we=o.b.p(ce(),function(e){return e.isZero?"rgba(0,0,0,0.1)":"rgba(0,0,0,0.3)"},function(e){return e.isZero?"8px dashed rgba(255,255,255, 0.8)":"8px solid rgba(255,255,255,0.6)"}),Ee=o.b.p(ae());function je(e){return c.a.createElement(he,null,c.a.createElement("span",{role:"img","aria-label":"Playing Card"},"\ud83c\udccf")," Card Game",c.a.createElement("br",null))}function Oe(e){return c.a.createElement(be,null,c.a.createElement(je,null))}function Ce(e){return c.a.createElement(ge,null,"By ",c.a.createElement("a",{href:"https://arpitsheth.com/",target:"_blank",rel:"noopener noreferrer"},"Arpit Sheth"))}var De=function(e){function n(){var e,t;Object(f.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(h.a)(this,(e=Object(b.a)(n)).call.apply(e,[this].concat(a)))).state={gameStarted:!1,deckID:"",deckRemaining:0,players:[],prevDeckID:""},t.onNewGame=function(){var e=Object(p.a)(d.a.mark(function e(n){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.getNewDeck();case 2:r=e.sent,t.setState({gameStarted:!0,deckID:r.deck_id,deckRemaining:r.remaining,players:t.initPlayerStates(k.numPlayers)}),localStorage.setItem("deckID",r.deck_id);case 5:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),t.onResumeGame=function(){var e=Object(p.a)(d.a.mark(function e(n){var r,a,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.prevDeckID){e.next=16;break}return e.prev=1,e.next=4,D.getPrevDeck(t.state.prevDeckID);case 4:return r=e.sent,e.next=7,t.getPlayerStates(t.state.prevDeckID);case 7:a=e.sent,c=0===a.length?t.initPlayerStates(k.numPlayers):a,t.setState({gameStarted:!0,deckID:r.deck_id,deckRemaining:r.remaining,players:c}),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),localStorage.removeItem("deckID"),alert("Unable to resume previous game.");case 16:case"end":return e.stop()}},e,this,[[1,12]])}));return function(n){return e.apply(this,arguments)}}(),t.getPlayerStates=function(){var e=Object(p.a)(d.a.mark(function e(n){var t,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.getPlayerNames(n,k.firstPlayerName);case 2:return t=e.sent,r=t.map(function(){var e=Object(p.a)(d.a.mark(function e(t){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.getPlayerHand(n,t);case 2:return r=e.sent,e.abrupt("return",{name:t,hand:r.cards,numCards:r.remaining});case 4:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}()),e.abrupt("return",Promise.all(r));case 5:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),t.onDeal=Object(p.a)(d.a.mark(function e(){var n,r,a,c,i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=Object(p.a)(d.a.mark(function e(n,r){var a,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.dealCardToPlayer(t.state.deckID,n.name,r.code);case 2:return a=e.sent,c=a.piles[n.name].remaining,e.abrupt("return",{name:n.name,hand:[].concat(Object(s.a)(n.hand),[r]),numCards:c});case 5:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),r=function(){return t.state.players.map(function(){var e=Object(p.a)(d.a.mark(function e(t,r){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t,c[r]);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}())},e.next=4,D.drawCards(t.state.deckID);case 4:return a=e.sent,t.setState({deckRemaining:a.remaining}),c=a.cards,e.next=9,Promise.all(r());case 9:i=e.sent,t.setState({players:i});case 11:case"end":return e.stop()}},e,this)})),t}return Object(g.a)(n,e),Object(m.a)(n,[{key:"componentWillMount",value:function(){var e=localStorage.getItem("deckID");null!==e&&this.setState({prevDeckID:e})}},{key:"initPlayerStates",value:function(e){return Object(s.a)(Array(e)).map(function(e,n){var t={name:"player".concat(n),hand:[],numCards:0};return 0===n&&(t.name=k.firstPlayerName),t})}},{key:"renderResumeGame",value:function(){if(this.state.prevDeckID)return c.a.createElement(ve,{onClick:this.onResumeGame},"Resume Game")}},{key:"renderGameboard",value:function(){return this.state.gameStarted?c.a.createElement(ke,{isActive:!0},c.a.createElement(re,{deckID:this.state.deckID,players:this.state.players}),c.a.createElement(ye,null,c.a.createElement(ve,{onClick:this.onNewGame,accent:0!==this.state.deckRemaining},"New Game"),c.a.createElement(xe,null,c.a.createElement("div",null,c.a.createElement(we,{isZero:0===this.state.deckRemaining},this.state.deckRemaining),c.a.createElement(Ee,null,"Cards Remaining")),c.a.createElement(ve,{onClick:this.onDeal,disabled:0===this.state.deckRemaining},"Deal")))):c.a.createElement(ke,{id:"gameboard-splash"},c.a.createElement("div",null,c.a.createElement(ve,{onClick:this.onNewGame},"Start Game"),this.renderResumeGame()))}},{key:"render",value:function(){return c.a.createElement(me,{className:"App"},c.a.createElement(Oe,null),this.renderGameboard(),c.a.createElement(Ce,null))}}]),n}(a.Component);function Pe(){var e=Object(r.a)(["\n  * {\n    box-sizing: border-box;\n  }\n  html {\n    font-size: 62.5%;\n  }\n  body {\n    font-family: Bahnschrift, 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    font-weight: 300;\n    font-size: 1.6rem;\n    margin: 0;\n    padding: 0;\n  }\n  a, a:hover, a:visited, a:focus {\n    color: inherit;\n    outline: none;\n  }\n"]);return Pe=function(){return e},e}var Se=Object(o.a)(Pe());u.a.render(c.a.createElement(c.a.Fragment,null,c.a.createElement(Se,null),c.a.createElement(De,null)),document.getElementById("root"))}},[[30,2,1]]]);
//# sourceMappingURL=main.83b2bb14.chunk.js.map