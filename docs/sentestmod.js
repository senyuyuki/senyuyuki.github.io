(function () {
    'use strict';
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
        const sentest = bcModSdk.registerMod({
            name: 'SENTEST',
            fullName: 'Selenslusa_Test_Mod',
            version: '0.2',
            // Optional - Link to the source code of the mod
            repository: 'https://github.com/senyuyuki/senyuyuki.github.io/tree/main/docs/sentestmod.js',
        });
        var Tarot = [
            "愚者正位，代表自发行为的塔罗牌，一段跳脱某种状态的日子，或尽情享受眼前日子的一段时光。好冒险，有梦想，不拘泥于传统的观念，自由奔放，居无定所，一切从基础出发。当你周遭的人都对某事提防戒慎，你却打算去冒这个险时，愚人牌可能就会出现。愚人暗示通往成功之路是经由自发的行动，而长期的计划则是将来的事。",
            "愚者逆位，暗示当你被要求有所承诺时，却想从责任当中寻求解脱。你正在找一个脱身之道，然而目前并不是这么做的时机。现在是你对自己的将来有所承诺，或是解决过去问题的时候了，如此你才能够重新过着自发性的生活。在你能够安全出发之前，还有某些未完成的事情需要你去处理。",
            "魔术师正位，这是个着手新事物的适当时机。对的时间，对的机会，对的动机，使你的努力值回票价。对于展开行动，实现计划而言，这正是一个良好时机。由于你已为实现计划扎下良好基础，所以新的冒险很可能会实现。清楚的方向感和意志力的贯彻，大大的提升了成功的可能性。",
            "魔术师逆位，对别人进行控制可能导致毁掉对方，可能是暗中作梗，或以任何他想得到的方法，这可能包括妖术，雇人暗杀，自己动手。也可能做出违反社会的行为。可能会变得不切实际，而导致精神，情感或身体健康上出问题；会变的漫无目标且缺乏自律。",
            "女祭司正位，你应该要相信你的直觉，因为在这一点上，有些东西你可能看不见。高位的女教皇是一张代表精神和心灵发展的牌。它代表了向内心探索的一段时期，以便为你人生的下一个阶段播种，或者去消化你在肉体的层次上所处理的事情。",
            "女祭司逆位，你没有办法倾听你内在的声音，或你内在的知识没有办法转化成行动。这个时候应当出去走走，认识新朋友，因为刚认识的人可以帮你介绍新的可能以及机会。你可能会因此而找到新工作或新伴侣，或者得到崭新的理解。",
            "女皇正位，生活优雅而富贵，充满了喜悦，有艺术天分，善于营造气氛，人生经历丰富，家庭观念重。如果求问者是男性，可能暗示与女性有纠缠，或女性气质强。",
            "女皇逆位，在家庭环境或某段两性关系中遭遇到的困难。可能无法实现自己的计划或在某段关系中，没有办法打心里去爱，因为对爱过于知性或理想化了。另一层意思可说是，冷静地思考所有的选择之后，运用理性来解决问题。",
            "国王正位，透过自律和实际的努力而达到成功。这可以代表你生活中一段相当稳定，且井然有序的时光。你被周遭的人设下种种限制，但只要你能在这些限制之内努力的话，你还是可以达成你的目标的。",
            "国王逆位，由于缺乏自律而无法成功。有时候可能会在面临严苛抉择时退却下来，因为你缺乏向目标迈进的勇气。丧失了皇帝正位时的管理特质，所以容易失去掌控的能力与缺乏先机，无法承担责任，没有担当，懦弱，刚愎自用。另一方面，也会处处提防他人，显得防卫心极强，疑神疑鬼。",
            "教皇正位，教皇暗示你向某人或某个团体的人屈服了。或许这正是你为自己，及心灵上的需求负起责任的时刻了。你目前的行事作风并非应付事情的唯一方式，假设你愿意加以探索的话，或许你就会找到新的可能。",
            "教皇逆位，代表新思想，观念的形成，或拒绝一些流于俗态的观念。它也可以说你在为自己人生写脚本，照着自己对生命的理解而活。现在你正为自己的心灵发展负起责任，虽然道路可能是崎岖不平的，然而这通常是值得的。",
            "恋人正位，通常是指有关两性关系的决定。它可能是在描述沉浸在爱恋之中的过程，因为它可以意指一段两性关系中的最初，或者是罗曼蒂克的阶级。也可以形容在决定到底要保留旧有的关系，或转进新关系当中。它暗示你已经由过去经验而得到成长了，因此你可以安全的迈向一个新的阶段。",
            "恋人逆位，欲求不满，多愁善感和迟疑不决，意味着任何追求相互关系新阶段的努力，都只能建立在期待和梦想上，还是维持原状较好。也可能在暗示一段关系的结束，或是一种毁灭性的关系，并暗示逃避责任和承诺。",
            "战车正位，正道的战车不畏道路艰难，暗示控制情绪，对两性关系是有帮助的，传达着”不要放弃”的讯息。只要能协调好关系中的冲突，用理智去超越恐惧和欲望，就能看出问题的解决之道。应该抛开过去的束缚，并从中吸取教训。",
            "战车逆位，暗示专制的态度和拙劣的方向感，可能被情绪蒙蔽了视线导致情绪化的判断事件。它象征太过于多愁善感，或因悬而未决的感情，影响了你对事物的看法。",
            "力量正位，精力旺盛，有逢凶化吉，遇难呈祥的潜质。但谋事在人，成事在天，力量所体现的仅仅是“人”这个部分。有时由于种种因缘巧合，求问者虽然身手了得，却也未必能取得圆满的结果。",
            "力量逆位，精神趋于软弱，体现在依赖他人，推卸责任等，也可能因此更容易变得更具有攻击性来掩饰，在感到无力时会寻找可以支配的他人或他物，来帮助自己再度感到强大有力。",
            "隐士正位，含有解决问题，开导迷茫者的涵义。代表独处，心智保持寂静，这样你才能听见自己心底的声音，想要得到内在的成功，你需要独自去经历一些事。跟随你的内在召唤，离开某种再也无法满足你的情境。",
            "隐士逆位，沉溺在一切可以由你独立操作的事物中，以便不去注意自己的颓废和孤独。沉溺是这样一种东西，时间越久就越难解救。对于耽溺者而言，勇敢面对固然是方法之一，他人的帮助在此时却也是必不可少的。",
            "命运之轮正位，通常命运之轮象征你生命境遇的改变。或许你并不了解这些改变的原因，不过在这里，你如何应对改变是比较重要的。你要迎接生命所提供给你的机会，还是要抗拒改变呢？此牌正立时就是在告诉你，要去适应这些改变。",
            "命运之轮逆位，当命运之轮逆位时，所发生的改变可能是比较苦难的。它暗示要努力对抗这些事件，也许是你生活中一些不断重复的模式，命运以一种新的挑战让你直面。四季轮转，时光飞逝，更应好好反省过去。",
            "正义正位，意味事情已经达成它应有的使命，你过往的决定或行为已经引导你走到了目前的境遇。你已经得到你应得的了，这是你诚信待人，承担应有责任的成果",
            "正义逆位，你对自己或其他人可能并不诚实。你并不愿意追踪现今事件的原因。如果继续如此，恐怕会丧失了解自己，以及人生的机会，这是一个自救的时机。直到洞悉之前，类似的困境都将反复出现。",
            "倒吊人正位，当你在这段期间内，透过对生命的顺从，并让它引领你到你需要去的地方，那么你便可以获益良多。你应该顺着感觉走，或是接受自己，即使别人都认为你的方式很奇怪也不用在意。",
            "倒吊人逆位，代表外部的压力迫使你按某种规范行事，你受到拘束，却拼命想要的自由。可能你并不理解目前生活的目的，或它能带给你什么，然而挣扎并不恰当，因为得到自由还需等待适当的时间到来。",
            "死神正位，死亡为旧事物画上休止符，并将开启崭新的道路。改变将要出现或正在期间，而你对这份改变的接纳，将使得变化自然而然地发生，生命将会带来某些比它从你身上拿走的更美好的东西。",
            "死神逆位，改变不可避免却受到内外的重重阻碍，痛苦的时间被迫延长，你面临不可避免的改变感到恐慌无助，也因此会通过较极端的行为方式汲取周围人的精神能量来抵抗改变带来的痛苦。",
            "节制正位，凭借调和对立的思想，相反结果的能力，你的内心安祥而平静；学会了调节正义和怜悯，成功与失败，欢乐与悲伤，缓和生命中的各种需求。你包容和自己意见不同的声音，但不会完全迎合它们",
            "节制逆位，一个人与其灵魂的分离。不论这个人在做什么，不管他做得多成功，基本上他其实都根本不知道自己在做什么，物质与精神已经失衡。重新回到最基本的问题上：内心想要的究竟是什么？如今所做的是否与我的真心相一致？",
            "恶魔正位，你对自己极度缺乏信心，认为自己不可能做好任何事情。你的态度被动而消极，总是让命运决定自己的未来，不相信自己可以决定自己的命运，这是需要抗争的负面心态，是精神层面的恶魔。",
            "恶魔逆位，现在你正积极的找寻改变或新的选择，你不再打算接受目前的状况了。可代表抛弃控制生命的需求，并接受自己的黑暗面。如此一来，你便可以将用在压抑你内在需求与欲望的精力给要回来，然后把它用在更具价值的目的。",
            "高塔正位，当高塔牌出现时，便是到了改变的时刻。现在再来为改变做准备，或选择如何改变都已太迟，现在你需要做的就是丢掉旧东西。你的信念遭到质疑；你的生活遭到干扰；你的习惯遭到破坏；你必须舍弃以往的一切，来适应新的模式。",
            "高塔逆位，改变的迹象依然明显，不过改变的程度就没有正立时来得多了。它可能是在形容一种被阻挠或被监禁的持续感，因为你不允许所有的改变都发生。藉由稳固控制你的行动，可以减轻这份痛苦，但这么做的话也会使你的成长趋缓。",
            "星辰正位，一段你能感觉不慌不忙，心平气和的时光。伴随这张牌而来的是一种“有时间去思想及行动”的感觉。在这段期间内，你了解你就是潜意识和有形世界之间的联系。你选择什么东西来表现潜意识，完全由你决定，于是你最好的作品或最精彩的表现，是来自和潜意识最清楚的沟通。",
            "星辰逆位，受限于生命，或和你创造力的来源失去联系，感到缺乏灵感。当星星出现逆位时，意味着和生命或世界的灵魂联系被切断了，因此而空虚。进行心灵上的放松，重新构建自己的目标体系，回到高塔中遥望属于自己的风光",
            "月亮正位，有些事物隐而不见，因此得看得比表象更深入，以发掘某种状态的真相。月亮暗示你需要面对你的恐惧，因它们可能会阻碍你去作某些事情，或获得某些东西。多留意你的潜意识思考。",
            "月亮逆位，暗示着那些尚未被解决的事情又降临到你身上了。现在是去面对这些内在挑战，而非退缩到有形世界的安全领域中的时候了。同一个困境既包含了你的恐惧，也蕴藏着你的力量和问题的解决之道。",
            "太阳正位，代表一种内在的知识，你了解挑战是重要的；挑战可以考验你，让你对生命持续赐予你的一些小礼物充满感激。它也代表你知道幸福是一种选择，而且它并不需要与你周遭的有形事物有任何关联。",
            "太阳逆位，象征对人生及创造性抱着一种竞争的态度。这是基于对不足的恐惧——怕支援不够，怕没有机会或爱不够。这可能是一种根本性的恐惧，怕这个世界不会支持你的努力。在两性关系当中，也可能暗示两个相互竞争的人。",
            "审判正位，你正处于人生旅途的重要阶段：反省过去，重新规画未来。你内心的声音正在呼唤自己，要你与自己的内在对话，检视自己过去的行为和追求是否正确？目前你所拥有的是否能带给自己真正的快乐和满足？你必须正视这些问题，因为这是你获得长久成功和快乐的二次机会。",
            "审判逆位，你正在找寻某些东西，以填补命中越来越大的鸿沟。你并不知道这个召唤是来自内心，也不知道解决方法也来自内心。简单说，这张牌指明了阻碍你的是缺乏清晰的判断力。",
            "世界正位，意指重大的成功及快乐。就变通的角度而言，它暗示你就站在生命希望你站的地方，而你也能感受到生命及你周遭的人的支持。它描述着一种快乐，它不是来自拥有或耕耘，而是来自存在。",
            "世界逆位，这是一个思绪有些烦乱的时期，但现实本质上却并不糟糕，因此只要重整思路就可以顺利前进，比现在看来更大的成功也是可能实现的。另外世界逆位也有可能是巨大的成功已经过去的意思，这种情况下，你也许会有心理落差，也许只是想好好休息一阵，一切就得看你的感受了。"
        ]
        sentest.hookFunction('ChatRoomMessage', 0, (args, next) => {
            const message = args[0];
            if (message.Type === "Whisper" && message.Content === "今日塔罗牌") {
                tarotMes = Tarot[RandomTarot()];
                sendWhisperChatMessage(tarotMes, message.sender);
            }
            return next(args);
        });
        sentest.hookFunction("ChatRoomSyncMemberJoin", 0, (args, next) => {
            const playerId = args[0].Character.MemberNumber;
            const welMes = {
                Type: "Whisper",
                Content: "你好~可点击咱名字私聊发送“今日塔罗牌”抽取一张塔罗牌并查看大致含义（此消息自动发送，抱歉暂时没写关闭逻辑）",
                Target: playerId
            }
            ServerSend("ChatRoomChat", welMes);
            return next(args);
        });
        function sendWhisperChatMessage(messageContent, userId) {
            const message = {
                Type: "Whisper",
                Content: messageContent,
                Target: userId
            };
            ServerSend("ChatRoomChat", message);
        }
        function RandomTarot() {
            return Math.floor(Math.random() * 44);
        }
})();