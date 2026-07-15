'use strict';

const CATEGORY_LABELS = {
  public: '公共空间', house: '宅邸', religion: '神庙', leisure: '休闲娱乐', daily: '日常生活', entrance: '入口与服务'
};

// 坐标用于现场定向，部分为建筑中心点的近似值；到场后请结合门牌与现场标识。
const PLACES = [
  {
    id:'porta-marina', name:'海门', it:'Porta Marina', regio:'VII / 城墙西侧', category:'entrance', lat:40.74855, lng:14.48255,
    tagline:'从车站方向进入古城最常用的入口之一。',
    intro:'“海门”得名于古代道路通向海岸。门道建在陡坡上，分为车行与步行通道；从这里进入，可以直观感受古城地势从城外向公共中心抬升。',
    look:['观察门道内外的高差和车辙。','回头看城墙与城外道路的关系。','继续向东可到古物陈列馆、维纳斯神庙和广场区。'],
    fact:'先别急着赶路：这里是理解庞贝“城墙—城门—主街”结构的最佳起点。'
  },
  {
    id:'antiquarium', name:'古物陈列馆', it:'Antiquarium', regio:'VIII.1', category:'entrance', lat:40.74822, lng:14.48325,
    tagline:'用出土文物和石膏铸型快速建立庞贝的时间线。',
    intro:'陈列馆位于海门附近，展示城市历史、日常用品、壁画和与公元79年灾难有关的遗存。若你第一次来，先看这里会让后续建筑更容易理解。',
    look:['先建立“萨莫奈时期—罗马殖民地—公元79年”的时间线。','留意原件与遗址中复制品的区别。','把陈列中的饮食、宗教和家居物件与后续宅邸对应起来。'],
    fact:'这里不是“附加项目”，而是整座古城的说明书。'
  },
  {
    id:'basilica', name:'巴西利卡', it:'Basilica', regio:'VIII.1.1', category:'public', lat:40.74878, lng:14.48445,
    tagline:'庞贝的司法与商业大厅，不是教堂。',
    intro:'罗马时代的巴西利卡是处理诉讼、商务和公共事务的大型有顶大厅。内部由柱列划分空间，西端较高的平台通常被理解为审判或官员活动区域。',
    look:['沿长轴看柱列如何制造庄严感。','辨认高位平台与普通公众活动区。','从建筑北侧转向广场，理解司法空间与城市中心的紧密联系。'],
    fact:'后来基督教堂借用了这种大厅式空间，因此现代人容易把“巴西利卡”误认为教堂。'
  },
  {
    id:'forum', name:'庞贝广场', it:'Foro', regio:'VII.8', category:'public', lat:40.74950, lng:14.48495,
    tagline:'政治、宗教、商业和公共仪式汇聚的城市核心。',
    intro:'广场是一条南北向的长方形公共空间，周围集中布置神庙、市场、行政建筑和巴西利卡。步入广场时，视线会被北端的朱庇特神庙和远处的维苏威火山方向吸引。',
    look:['站在南端向北看整体轴线。','观察四周建筑立面如何共同围合广场。','寻找限制车辆进入的石柱或障碍设施。'],
    fact:'把这里想成市政厅、法院、市场和宗教广场的综合体，你就能理解庞贝公共生活的密度。'
  },
  {
    id:'jupiter', name:'朱庇特神庙', it:'Tempio di Giove', regio:'VII.8.1', category:'religion', lat:40.75008, lng:14.48496,
    tagline:'位于广场北端的国家级主神庙。',
    intro:'神庙建在高台上，正面朝向广场。罗马殖民时期，它与朱诺、密涅瓦共同构成卡皮托利三神崇拜，强化了庞贝与罗马国家秩序的联系。',
    look:['观察高台、正面阶梯和六柱式立面布局。','从神庙前回望广场，体会宗教建筑对公共空间的控制。','留意公元62年地震后尚未完全修复的痕迹。'],
    fact:'公元79年时，庞贝仍像一个巨大的修复工地；这座神庙正是最明显的证据之一。'
  },
  {
    id:'apollo', name:'阿波罗圣所', it:'Santuario di Apollo', regio:'VII.7.32', category:'religion', lat:40.74921, lng:14.48442,
    tagline:'庞贝最古老的宗教中心之一。',
    intro:'阿波罗崇拜可追溯到城市早期。圣所由柱廊围合，中部高台上曾立神庙，院内设置祭坛、日晷和神像。它紧邻广场，却保留独立的宗教庭院。',
    look:['看神庙轴线与广场轴线并不完全一致。','寻找青铜阿波罗与狄安娜雕像的复制品位置。','观察柱廊为仪式和人流提供的环形空间。'],
    fact:'这里让你看到：庞贝在成为罗马城市之前，已经拥有深厚的希腊—意大利文化传统。'
  },
  {
    id:'macellum', name:'食品市场', it:'Macellum', regio:'VII.9.7', category:'daily', lat:40.74977, lng:14.48572,
    tagline:'肉、鱼和其他食品交易的专门市场。',
    intro:'市场位于广场东北侧，围绕中央庭院布置商铺和功能空间。中央圆形建筑通常与鱼类销售或清洗有关，周边房间兼有交易与宗教用途。',
    look:['辨认中央圆形结构的柱基。','观察临街铺面与内部庭院的双重组织。','想象早晨货物、商贩和买主集中于此的声音与气味。'],
    fact:'庞贝的市场不是简单的一排店铺，而是被制度化、分区管理的城市食品中心。'
  },
  {
    id:'forum-baths', name:'广场浴场', it:'Terme del Foro', regio:'VII.5.24', category:'daily', lat:40.75045, lng:14.48527,
    tagline:'紧凑而保存良好的公共浴场。',
    intro:'浴场分为男、女区域，并设置更衣室、冷水室、温水室和热水室。墙体夹层、地板下支柱与炉房共同组成供暖系统。',
    look:['寻找地板下的悬空供暖结构。','观察拱顶和壁龛如何减轻空间压迫感。','留意石凳、洗浴盆和墙面装饰的组合。'],
    fact:'罗马浴场不仅用于洗澡，也是社交、休息和建立人际关系的公共客厅。'
  },
  {
    id:'tragic-poet', name:'悲剧诗人之家', it:'Casa del Poeta Tragico', regio:'VI.8.3–5', category:'house', lat:40.75083, lng:14.48483,
    tagline:'以“当心恶犬”马赛克和戏剧题材装饰闻名。',
    intro:'这座宅邸面积不算巨大，却以精致的地面马赛克和神话壁画著称。入口著名的犬形马赛克提醒来客注意看门犬，也展示了主人对门面和文化身份的经营。',
    look:['寻找入口处 Cave Canem（当心恶犬）马赛克。','观察中庭—主厅—柱廊庭院的连续视线。','留意神话和戏剧题材如何服务于主人的文化形象。'],
    fact:'庞贝宅邸的“豪华”不只看面积，更看访客进入后被安排看到什么。'
  },
  {
    id:'faun', name:'农牧神之家', it:'Casa del Fauno', regio:'VI.12.2', category:'house', lat:40.75162, lng:14.48403,
    tagline:'庞贝规模最大、最奢华的私人宅邸之一。',
    intro:'宅邸几乎占据整个街区，拥有两个中庭和多个柱廊庭院。入口中庭以跳舞的农牧神铜像得名；著名的亚历山大马赛克原作现藏那不勒斯国家考古博物馆。',
    look:['从入口感受超长的视觉轴线。','比较两个中庭与两个柱廊庭院的不同功能。','寻找亚历山大马赛克复制品所在的宴会空间。'],
    fact:'这座住宅约三千平方米，相当于把多套宅邸合并成一座权力与财富的舞台。'
  },
  {
    id:'vettii', name:'维蒂之家', it:'Casa dei Vettii', regio:'VI.15.1', category:'house', lat:40.75210, lng:14.48457,
    tagline:'以第四风格壁画和富裕获释奴身份故事著称。',
    intro:'宅邸最后阶段的主人通常被认为是维蒂兄弟，他们曾是奴隶，获释后跻身富裕阶层。房屋围绕中庭和花园组织，壁画保存丰富，题材从神话到商业繁荣象征。',
    look:['入口处普里阿普斯称量财富的图像极具象征性。','在花园周围观察房间如何面向绿化和喷泉。','比较正式接待空间与服务空间的装饰等级。'],
    fact:'维蒂之家最迷人的地方，是它把社会上升、财富展示和精致审美放在同一座房子里。'
  },
  {
    id:'lupanar', name:'妓院', it:'Lupanare', regio:'VII.12.18–20', category:'daily', lat:40.74972, lng:14.48655,
    tagline:'庞贝最著名的专门性交易场所之一。',
    intro:'建筑上下两层，底层小房间内设置石砌床台，门上方有性爱题材图像。墙面大量涂鸦记录姓名、价格、夸耀和玩笑，是研究普通人语言与城市流动人口的重要材料。',
    look:['观察狭窄走廊和小房间的高密度布置。','留意门上方图像与实际服务之间可能的指示作用。','不要只把它当猎奇地点：墙面文字是庞贝社会史的一手资料。'],
    fact:'“Lupa”在拉丁语中既可指母狼，也可隐喻性工作者，因此建筑被称为 Lupanar。'
  },
  {
    id:'stabian-baths', name:'斯塔比亚浴场', it:'Terme Stabiane', regio:'VII.1.8', category:'daily', lat:40.74917, lng:14.48713,
    tagline:'庞贝最古老、规模最大的浴场综合体之一。',
    intro:'浴场经历多次改建，包含男女洗浴区、运动庭院、泳池和供暖设施。它能清晰展示罗马浴场从运动、清洁到社交的完整流程。',
    look:['先看大庭院，再进入封闭的洗浴房间。','寻找冷、温、热三类空间的顺序。','观察供暖炉、双层墙和地板下热气通道。'],
    fact:'浴场把身体训练、卫生、休闲和社交整合在一套建筑系统中。'
  },
  {
    id:'large-theatre', name:'大剧场', it:'Teatro Grande', regio:'VIII.7.20', category:'leisure', lat:40.74831, lng:14.48843,
    tagline:'依地形而建的戏剧与公共表演空间。',
    intro:'剧场利用坡地设置半圆形观众席，舞台建筑与观众区共同形成高度集中的表演空间。它可容纳数千人，是城市节庆和政治展示的重要场所。',
    look:['站在上层看观众席、乐池和舞台的关系。','尝试在不同位置感受声音传播。','观察贵宾席与普通座席的社会分区。'],
    fact:'罗马剧场不仅演戏：赞助演出的精英也借此向全城展示慷慨与政治影响力。'
  },
  {
    id:'isis', name:'伊西斯神庙', it:'Tempio di Iside', regio:'VIII.7.28', category:'religion', lat:40.74804, lng:14.48874,
    tagline:'一座与埃及女神崇拜有关、震后迅速重建的神庙。',
    intro:'公元62年地震后，神庙由一位获释奴隶以其幼子名义出资重建。中央高台、祭坛、净化用水设施和周围房间共同服务于仪式。',
    look:['观察中央神庙与四周柱廊的关系。','寻找与尼罗河、埃及神话相关的装饰线索。','注意铭文所反映的赞助、身份与社会晋升。'],
    fact:'它说明罗马城市宗教远不止“传统罗马诸神”，跨地中海信仰同样活跃。'
  },
  {
    id:'menander', name:'米南德之家', it:'Casa del Menandro', regio:'I.10.4', category:'house', lat:40.74905, lng:14.48919,
    tagline:'大型贵族宅邸，以米南德画像和银器窖藏闻名。',
    intro:'宅邸以柱廊庭院为核心，设有接待、宴饮、洗浴和服务空间。柱廊墙面上的喜剧作家米南德画像为房屋命名；地下发现的大批银器显示主人阶层和灾难前的财产处置。',
    look:['从中庭向柱廊庭院观察层层展开的空间。','寻找米南德画像所在区域。','留意私人浴室与住宅主体的连接。'],
    fact:'一座宅邸既是家，也是经营声望、接待依附者和展示希腊文化修养的社会机构。'
  },
  {
    id:'fullery', name:'斯特法努斯洗衣作坊', it:'Fullonica di Stephanus', regio:'I.6.7', category:'daily', lat:40.74943, lng:14.48903,
    tagline:'由住宅改造而成的洗涤、漂白和整理作坊。',
    intro:'作坊内设置洗涤槽、踩洗容器和晾晒整理空间。古代布料清洁需要碱性物质和大量人工，作坊把生产流程嵌入临街住宅。',
    look:['辨认中庭被改造成生产空间的痕迹。','观察不同尺寸的槽体和工作位置。','想象工人踩洗、漂洗、硫熏和整理织物的完整流程。'],
    fact:'庞贝的住宅与商业并非严格分开，一栋建筑可以同时容纳居住、生产和销售。'
  },
  {
    id:'vetutius', name:'维图提乌斯·普拉西杜斯热食店', it:'Thermopolium di Vetutius Placidus', regio:'I.8.8', category:'daily', lat:40.74962, lng:14.49008,
    tagline:'面向街道供应热食和饮品的“古罗马快餐店”。',
    intro:'L形柜台内嵌大陶罐，用于储存或陈列食物。后部空间兼有住宅和宗教功能，柜台彩绘中的家神强调经营活动受到家庭神灵保护。',
    look:['观察柜台内嵌陶罐的尺寸与位置。','寻找拉雷斯家神和商业保护神的图像。','站在街对面看店铺如何直接吸引行人。'],
    fact:'并非所有庞贝人都在家做饭；街边餐饮是高密度城市生活的重要组成部分。'
  },
  {
    id:'via-abbondanza', name:'丰饶街', it:"Via dell'Abbondanza", regio:'I / VII / IX 主轴', category:'public', lat:40.74968, lng:14.49078,
    tagline:'贯穿古城东西的商业与交通主街。',
    intro:'丰饶街连接广场区与东部城门，沿线密集分布商铺、作坊、热食店和宅邸。高起的人行道、过街石和车辙展示了古城交通如何与排水系统协调。',
    look:['观察车轮在石板上留下的深槽。','从过街石间距推测车辆轮距。','留意店铺门槛、推拉门槽和墙面竞选标语。'],
    fact:'不要只把它当“去下一个景点的路”；这条街本身就是庞贝日常生活最完整的展品。'
  },
  {
    id:'fugitives', name:'逃亡者花园', it:'Orto dei Fuggiaschi', regio:'I.21', category:'public', lat:40.74960, lng:14.49220,
    tagline:'保存遇难者石膏铸型、直面灾难最后时刻的地点。',
    intro:'这里原是种植葡萄等作物的园地。考古发掘中发现多名遇难者留下的空腔，通过灌注石膏记录了身体姿态和衣物细节。',
    look:['保持适当距离和安静，尊重这里的人类遗存。','观察铸型姿态与人群聚集关系。','把它放回火山灾害的时间过程，而不是作为孤立的“震撼展品”。'],
    fact:'铸型不是尸体雕塑，而是火山灰中人体分解后形成空腔的三维记录。'
  },
  {
    id:'venus-shell', name:'贝壳中的维纳斯之家', it:'Casa della Venere in Conchiglia', regio:'II.3.3', category:'house', lat:40.75008, lng:14.49227,
    tagline:'花园墙上巨幅维纳斯壁画营造私人乐园。',
    intro:'宅邸后部花园以“维纳斯乘贝壳”壁画为视觉焦点，两侧神话人物和园林图像延伸了真实花园的空间感。',
    look:['站在花园入口处看壁画如何延长视线。','比较真实植物空间与绘制花园之间的边界。','留意维纳斯与庞贝城市保护神身份的联系。'],
    fact:'罗马壁画常通过“画中的建筑和花园”制造超越实体墙面的空间。'
  },
  {
    id:'giulia-felice', name:'朱莉娅·费利克斯产业群', it:'Praedia di Giulia Felice', regio:'II.4', category:'house', lat:40.75048, lng:14.49286,
    tagline:'住宅、花园、浴室和出租空间组合成的大型产业。',
    intro:'这组建筑占据大片街区，由女业主朱莉娅·费利克斯经营。铭文显示她曾出租浴室、商铺和居住空间，体现不动产经营与城市服务的结合。',
    look:['观察长水渠花园如何模仿豪华别墅景观。','区分私人住宅、公共浴室和出租单元。','思考女性业主如何通过地产参与城市经济。'],
    fact:'这里不是单纯的“豪宅”，更像一座复合型商业地产项目。'
  },
  {
    id:'palaestra', name:'大竞技场', it:'Palestra Grande', regio:'II.7', category:'leisure', lat:40.75126, lng:14.49365,
    tagline:'青年训练、运动和公共集会的大型开放空间。',
    intro:'建筑由巨大的矩形庭院和四周柱廊组成，中央设泳池，外围种植梧桐。它位于圆形竞技场旁，服务于体育训练和青年教育。',
    look:['感受开阔庭院与封闭柱廊的尺度反差。','寻找中央泳池位置。','比较这里的训练功能与圆形竞技场的观演功能。'],
    fact:'罗马城市的“体育设施”同时承担教育、社交和身份塑造。'
  },
  {
    id:'amphitheatre', name:'圆形竞技场', it:'Anfiteatro', regio:'II.6', category:'leisure', lat:40.75127, lng:14.49518,
    tagline:'现存最早的罗马圆形竞技场之一。',
    intro:'竞技场约建于公元前70年，利用土堤支撑观众席，可容纳庞大观众群体。这里举行角斗、狩猎等表演；公元59年庞贝人与努凯里亚人发生严重冲突，导致比赛一度被禁。',
    look:['沿外部坡道看观众如何快速分流入场。','在场内辨认竞技区、低矮护墙和分层座席。','想象遮阳篷如何覆盖部分看台。'],
    fact:'它比罗马斗兽场早约一个半世纪，是理解圆形竞技建筑发展史的关键遗存。'
  },
  {
    id:'villa-mysteries', name:'秘仪别墅', it:'Villa dei Misteri', regio:'城墙西北郊外', category:'house', lat:40.75363, lng:14.47756,
    tagline:'以连续的大型“秘仪”壁画闻名的城郊别墅。',
    intro:'别墅兼具豪华居住与农业生产功能。最著名房间内，真人大小的红底人物形成连续叙事，常被解释为与狄俄尼索斯崇拜、婚礼或女性仪式有关，但确切含义仍有争议。',
    look:['不要只逐个看人物，要沿四壁读取连续场景。','观察人物视线、手势和空间节奏。','留意豪华居住区与酒类生产设施并存。'],
    fact:'这组壁画之所以迷人，正因为它保存得极好，却仍拒绝给出唯一答案。'
  },
  {
    id:'piazza-esedra', name:'埃塞德拉广场入口', it:'Piazza Esedra', regio:'城墙南侧', category:'entrance', lat:40.74778, lng:14.48413,
    tagline:'靠近剧场区和海门的南侧入口。',
    intro:'该入口适合以剧场区、伊西斯神庙和南部公共建筑为起点，也可作为从丰饶街和剧场区结束参观的出口。',
    look:['进门后先确认剧场区与广场区方向。','若使用轮椅或婴儿车，优先参考园区无障碍路线。'],
    fact:'选择入口会显著改变游览节奏：西侧入口更快到广场，东侧入口更快到竞技场。'
  },
  {
    id:'porta-anfiteatro', name:'竞技场广场入口', it:'Piazza Anfiteatro', regio:'城墙东侧', category:'entrance', lat:40.75099, lng:14.49602,
    tagline:'最适合从圆形竞技场和大竞技场开始。',
    intro:'东侧入口靠近圆形竞技场、大竞技场和丰饶街东端。若计划由东向西穿越古城，它通常能减少折返。',
    look:['入园后先看圆形竞技场，再沿丰饶街向西。','记住出口位置，以免参观结束时横穿全城。'],
    fact:'从这里出发，古城会从“娱乐与日常生活”逐步过渡到“政治与宗教中心”。'
  }
];

const ROUTES = [
  {
    id:'essential', name:'核心精华线', duration:'约2小时', distance:'约2.2 km', start:'海门 / 埃塞德拉入口',
    description:'重点理解公共中心、豪宅、日常生活和剧场，适合时间有限或第一次到访。',
    stops:['porta-marina','antiquarium','basilica','forum','apollo','jupiter','forum-baths','tragic-poet','faun','lupanar','stabian-baths','large-theatre','piazza-esedra']
  },
  {
    id:'daily-life', name:'日常生活线', duration:'约3小时', distance:'约3.3 km', start:'竞技场广场入口',
    description:'从竞技娱乐、商业街、餐饮和作坊进入普通人的城市生活，再到公共中心。',
    stops:['porta-anfiteatro','amphitheatre','palaestra','giulia-felice','venus-shell','via-abbondanza','fugitives','vetutius','fullery','menander','stabian-baths','lupanar','forum','basilica','piazza-esedra']
  },
  {
    id:'grand', name:'完整经典线', duration:'约5小时', distance:'约5.6 km', start:'海门入口',
    description:'加入秘仪别墅、北部豪宅区和东部竞技场，覆盖庞贝最具代表性的空间类型。',
    stops:['porta-marina','villa-mysteries','vettii','faun','tragic-poet','forum-baths','jupiter','macellum','forum','apollo','basilica','large-theatre','isis','menander','fullery','vetutius','via-abbondanza','fugitives','venus-shell','giulia-felice','palaestra','amphitheatre','porta-anfiteatro']
  }
];

const state = {
  map:null, markers:new Map(), userMarker:null, accuracyCircle:null, userPos:null,
  watchId:null, deferredInstall:null, activeRoute:null,
  favorites:new Set(JSON.parse(localStorage.getItem('pompeiiFavorites') || '[]')),
  visited:new Set(JSON.parse(localStorage.getItem('pompeiiVisited') || '[]')),
  notified:new Set()
};

const el = id => document.getElementById(id);

function initMap(){
  state.map = L.map('map', { zoomControl:false, minZoom:14, maxZoom:20 }).setView([40.7502,14.4872], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:20, attribution:'&copy; OpenStreetMap contributors'
  }).addTo(state.map);
  L.control.zoom({position:'bottomright'}).addTo(state.map);
  PLACES.forEach(place => {
    const icon = L.divIcon({
      className:'', iconSize:[34,34], iconAnchor:[17,30], popupAnchor:[0,-28],
      html:`<div class="marker-pin marker-${place.category}"><span>${place.name.slice(0,1)}</span></div>`
    });
    const marker = L.marker([place.lat,place.lng], {icon, title:place.name}).addTo(state.map);
    marker.bindTooltip(place.name, {direction:'top', offset:[0,-25]});
    marker.on('click', () => openDetail(place.id));
    state.markers.set(place.id, marker);
  });
}

function switchView(viewId){
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
  if(viewId === 'mapView') setTimeout(() => state.map.invalidateSize(), 50);
  if(viewId === 'savedView') renderSaved();
}

function startLocation(){
  if(!navigator.geolocation){ updateGps('浏览器不支持定位', false); return; }
  if(state.watchId !== null){ navigator.geolocation.clearWatch(state.watchId); state.watchId=null; }
  updateGps('正在获取位置…', false);
  state.watchId = navigator.geolocation.watchPosition(onPosition, onLocationError, {
    enableHighAccuracy:true, maximumAge:5000, timeout:15000
  });
  el('locateBtn').textContent = '定位中';
}

function onPosition(pos){
  state.userPos = {lat:pos.coords.latitude, lng:pos.coords.longitude, accuracy:pos.coords.accuracy, heading:pos.coords.heading};
  const latlng=[state.userPos.lat,state.userPos.lng];
  if(!state.userMarker){
    state.userMarker=L.circleMarker(latlng,{radius:8,weight:3,color:'#fff',fillColor:'#1c76d2',fillOpacity:1}).addTo(state.map);
    state.accuracyCircle=L.circle(latlng,{radius:state.userPos.accuracy,weight:1,color:'#1c76d2',fillColor:'#1c76d2',fillOpacity:.08}).addTo(state.map);
    state.map.setView(latlng,18);
  } else {
    state.userMarker.setLatLng(latlng); state.accuracyCircle.setLatLng(latlng).setRadius(state.userPos.accuracy);
  }
  updateGps(`定位精度约 ${Math.round(state.userPos.accuracy)} 米`, true);
  el('locateBtn').textContent='更新定位';
  renderPlaces(); updateNearest();
}

function onLocationError(err){
  const message = err.code===1 ? '定位权限未开启' : err.code===2 ? '暂时无法确定位置' : '定位超时，请重试';
  updateGps(message,false); el('locateBtn').textContent='重试定位';
}

function updateGps(text,on){ el('gpsStatus').textContent=text; el('gpsDot').classList.toggle('on',on); }

function haversine(a,b){
  const R=6371000, toRad=x=>x*Math.PI/180;
  const dLat=toRad(b.lat-a.lat), dLng=toRad(b.lng-a.lng);
  const q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;
  return 2*R*Math.asin(Math.sqrt(q));
}
function bearing(a,b){
  const toRad=x=>x*Math.PI/180, toDeg=x=>x*180/Math.PI;
  const p1=toRad(a.lat),p2=toRad(b.lat),dl=toRad(b.lng-a.lng);
  const y=Math.sin(dl)*Math.cos(p2),x=Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl);
  return (toDeg(Math.atan2(y,x))+360)%360;
}
function formatDistance(m){ return m<1000 ? `${Math.round(m)} 米` : `${(m/1000).toFixed(1)} 公里`; }
function directionName(deg){ return ['北','东北','东','东南','南','西南','西','西北'][Math.round(deg/45)%8]; }

function placesSorted(){
  return PLACES.map(p=>({...p,distance:state.userPos?haversine(state.userPos,p):null}))
    .sort((a,b)=> state.userPos ? a.distance-b.distance : a.name.localeCompare(b.name,'zh-CN'));
}

function renderPlaces(){
  const q=el('searchInput').value.trim().toLowerCase();
  const cat=el('categoryFilter').value;
  const items=placesSorted().filter(p => (cat==='all'||p.category===cat) && (!q||`${p.name} ${p.it} ${p.tagline} ${p.regio}`.toLowerCase().includes(q)));
  el('placesList').innerHTML = items.length ? items.map(placeCard).join('') : '<div class="empty">没有找到匹配地点。</div>';
  document.querySelectorAll('[data-place-open]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.placeOpen)));
  document.querySelectorAll('[data-favorite]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.favorite);renderPlaces();}));
}

function placeCard(p){
  const distance=p.distance!==null?`<span>${formatDistance(p.distance)}</span>`:'';
  return `<article class="place-card" role="button" tabindex="0" data-place-open="${p.id}">
    <div><h3>${p.name}</h3><p>${p.it} · ${p.tagline}</p><div class="place-meta"><span class="tag">${CATEGORY_LABELS[p.category]}</span><span>${p.regio}</span>${distance}${state.visited.has(p.id)?'<span class="status-pill">已到访</span>':''}</div></div>
    <button class="star-btn ${state.favorites.has(p.id)?'on':''}" data-favorite="${p.id}" aria-label="收藏">${state.favorites.has(p.id)?'★':'☆'}</button>
  </article>`;
}

function updateNearest(){
  if(!state.userPos){ el('nearestCard').classList.add('hidden'); return; }
  const nearest=placesSorted()[0];
  const arrived=nearest.distance<=45;
  el('nearestCard').innerHTML=`<button data-nearest-open="${nearest.id}"><div><strong>${arrived?'你可能已到达：':'最近地点：'}${nearest.name}</strong><small>${nearest.it} · ${directionName(bearing(state.userPos,nearest))}方向</small></div><span class="distance-pill">${formatDistance(nearest.distance)}</span></button>`;
  el('nearestCard').classList.remove('hidden');
  el('nearestCard').querySelector('button').addEventListener('click',()=>openDetail(nearest.id));
  if(arrived && !state.notified.has(nearest.id)){
    state.notified.add(nearest.id); if(navigator.vibrate) navigator.vibrate(80);
  }
}

function openDetail(id){
  const p=PLACES.find(x=>x.id===id); if(!p)return;
  const dist=state.userPos?haversine(state.userPos,p):null;
  const brg=state.userPos?bearing(state.userPos,p):null;
  const direction=dist!==null?`<div class="detail-section"><h3>从你的位置前往</h3><div class="direction-card"><div class="compass" style="transform:rotate(${brg}deg)">↑</div><div><strong>${directionName(brg)}方向 · ${formatDistance(dist)}</strong><p>${dist<=45?'你可能已经在建筑附近，请结合门牌确认。':'沿开放道路前往；直线方向不代表可穿越封闭建筑。'}</p></div></div></div>`:'<div class="detail-section"><h3>现场定位</h3><p>开启定位后，这里会显示方向和距离。</p></div>';
  el('detailContent').innerHTML=`
    <div class="detail-title"><p class="eyebrow">${CATEGORY_LABELS[p.category]} · ${p.regio}</p><h2>${p.name}</h2><div class="italian">${p.it}</div></div>
    <div class="detail-badges"><span class="tag">${CATEGORY_LABELS[p.category]}</span>${state.visited.has(p.id)?'<span class="status-pill">已到访</span>':''}${dist!==null&&dist<=45?'<span class="status-pill">就在附近</span>':''}</div>
    <div class="hero-fact">${p.fact}</div>
    <div class="detail-section"><h3>这里是什么</h3><p>${p.intro}</p></div>
    <div class="detail-section"><h3>现场重点看什么</h3><ul>${p.look.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    ${direction}
    <div class="detail-actions"><button id="visitBtn" class="primary-btn">${state.visited.has(p.id)?'取消到访':'标记到访'}</button><button id="favBtn" class="secondary-btn">${state.favorites.has(p.id)?'取消收藏':'加入收藏'}</button><button id="showMapBtn" class="secondary-btn">地图定位</button></div>`;
  el('visitBtn').onclick=()=>{toggleVisited(p.id);openDetail(p.id);};
  el('favBtn').onclick=()=>{toggleFavorite(p.id);openDetail(p.id);};
  el('showMapBtn').onclick=()=>{el('detailDialog').close();switchView('mapView');state.map.setView([p.lat,p.lng],19);state.markers.get(p.id).openTooltip();};
  el('detailDialog').showModal();
}

function persist(){
  localStorage.setItem('pompeiiFavorites',JSON.stringify([...state.favorites]));
  localStorage.setItem('pompeiiVisited',JSON.stringify([...state.visited]));
}
function toggleFavorite(id){state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);persist();renderSaved();}
function toggleVisited(id){state.visited.has(id)?state.visited.delete(id):state.visited.add(id);persist();renderSaved();}

function renderRoutes(){
  el('routeCards').innerHTML=ROUTES.map(r=>`<article class="route-card"><div class="route-card-head"><p class="eyebrow">${r.start}</p><h3>${r.name}</h3><p>${r.description}</p><div class="route-stats"><span class="tag">${r.duration}</span><span class="tag">${r.distance}</span><span class="tag">${r.stops.length}站</span></div></div><ol>${r.stops.slice(0,7).map(id=>`<li>${PLACES.find(p=>p.id===id).name}</li>`).join('')}${r.stops.length>7?`<li>以及另外 ${r.stops.length-7} 个地点</li>`:''}</ol><div class="route-card-actions"><button class="primary-btn" data-route="${r.id}">在地图显示</button><button class="secondary-btn" data-first="${r.stops[0]}">查看起点</button></div></article>`).join('');
  document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>showRoute(b.dataset.route)));
  document.querySelectorAll('[data-first]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.first)));
}

function showRoute(id){
  const route=ROUTES.find(r=>r.id===id); if(!route)return;
  state.activeRoute=route;
  if(state.routeLayer) state.routeLayer.remove();
  const latlngs=route.stops.map(s=>{const p=PLACES.find(x=>x.id===s);return [p.lat,p.lng];});
  state.routeLayer=L.polyline(latlngs,{color:'#9a3d22',weight:4,opacity:.82,dashArray:'8 7'}).addTo(state.map);
  state.map.fitBounds(state.routeLayer.getBounds(),{padding:[35,35]});
  switchView('mapView');
  const old=document.querySelector('.route-focus-banner'); if(old)old.remove();
  const banner=document.createElement('div');banner.className='route-focus-banner';banner.innerHTML=`<span><strong>${route.name}</strong> · ${route.stops.length}站（连线仅表示顺序）</span><button>关闭路线</button>`;
  el('mapView').appendChild(banner);banner.querySelector('button').onclick=()=>{state.routeLayer.remove();state.routeLayer=null;banner.remove();state.activeRoute=null;};
}

function renderSaved(){
  const items=PLACES.filter(p=>state.favorites.has(p.id)).map(p=>({...p,distance:state.userPos?haversine(state.userPos,p):null}));
  el('savedList').innerHTML=items.length?items.map(placeCard).join(''):'<div class="empty">还没有收藏地点。打开任意地点后点击“加入收藏”。</div>';
  el('visitedCount').textContent=state.visited.size; el('favoriteCount').textContent=state.favorites.size;
  el('savedList').querySelectorAll('[data-place-open]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.placeOpen)));
  el('savedList').querySelectorAll('[data-favorite]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.favorite);}));
}

function setupInstall(){
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.deferredInstall=e;el('installBtn').classList.remove('hidden');});
  el('installBtn').onclick=async()=>{if(!state.deferredInstall)return;state.deferredInstall.prompt();await state.deferredInstall.userChoice;state.deferredInstall=null;el('installBtn').classList.add('hidden');};
}

function init(){
  initMap(); renderPlaces(); renderRoutes(); renderSaved(); setupInstall();
  document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
  el('locateBtn').onclick=startLocation; el('recenterBtn').onclick=()=>state.userPos?state.map.setView([state.userPos.lat,state.userPos.lng],18):startLocation();
  el('fitBtn').onclick=()=>state.map.fitBounds(L.latLngBounds(PLACES.map(p=>[p.lat,p.lng])),{padding:[25,25]});
  el('searchInput').addEventListener('input',renderPlaces); el('categoryFilter').addEventListener('change',renderPlaces);
  el('closeDialog').onclick=()=>el('detailDialog').close();
  el('detailDialog').addEventListener('click',e=>{if(e.target===el('detailDialog'))el('detailDialog').close();});
  if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}

document.addEventListener('DOMContentLoaded',init);
