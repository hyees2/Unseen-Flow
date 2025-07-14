document.addEventListener('DOMContentLoaded', () => {
 //lotti
  path: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'
 
  // 1. DOM Element References
  const about = document.querySelector('.footer-about');
  const access = document.querySelector('.footer-about1');
  const questionBoxes = document.querySelectorAll('.question-box');
  const resetButtons = document.querySelectorAll('.reset-btn');
  const closeButtons = document.querySelectorAll('.circle-icon.close-btn');
  const nextButtons = document.querySelectorAll('.next-btn');
  const nationalitySelect = document.getElementById('nationality');
  const bodyRows = document.querySelectorAll('.body-row1');
  const notificationContainer = document.getElementById('notification-container');

  const NOTIFICATION_DURATION = 5000;
  let expanded = false;

  
  // 2. Helper Functions

  // Updates the highlight on the currently active question box
  function updateStepHighlight(currentBox) {
    document.querySelectorAll('.question-box').forEach(box => {
      box.classList.remove('highlight');
    });
    currentBox.classList.add('highlight');
  }

  // Resets the entire interface to its initial state
  function resetInterfaceToInitial() {
    // Hide all question boxes
    questionBoxes.forEach(box => box.classList.remove('visible'));
    // Show the first question box and highlight it
    if (questionBoxes.length > 0) {
      questionBoxes[0].classList.add('visible');
      updateStepHighlight(questionBoxes[0]);
    }
    // Reset select boxes and yes/no buttons
    questionBoxes.forEach(box => {
      box.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
      box.querySelectorAll('.yes-btn, .no-btn').forEach(btn => btn.classList.remove('selected'));
    });
    // Remove 'dimmed' class from all elements
    document.querySelectorAll('.dimmed').forEach(elem => elem.classList.remove('dimmed'));

    // Clear any active notifications
    while (notificationContainer.firstChild) {
      notificationContainer.removeChild(notificationContainer.firstChild);
    }

    // Reset expanded states for footer elements
    about.classList.remove('expanded');
    access.classList.remove('expanded');
    expanded = false;
    about.classList.remove('about-expanded');
  }

  // Creates and displays a notification
  function createNotification(message) {
    // Clear existing notifications
    while (notificationContainer.firstChild) {
      notificationContainer.removeChild(notificationContainer.firstChild);
    }

    const notif = document.createElement('div');
    notif.classList.add('custom-notification');
    notif.innerHTML = message;

    // Top box for design
    const topBox = document.createElement('div');
    topBox.classList.add('top-box');
    notif.appendChild(topBox);

    // Close button
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-box');
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>`;
    closeBtn.addEventListener('click', () => {
      if (notif.parentElement) notif.parentElement.removeChild(notif);
      if (closeBtn.parentElement) closeBtn.parentElement.removeChild(closeBtn);
      if (undoBtn.parentElement) undoBtn.parentElement.removeChild(undoBtn);
    });

    // Undo button
    const undoBtn = document.createElement('div');
    undoBtn.classList.add('undo-box');
    undoBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>`;
  
    undoBtn.addEventListener('click', () => {
      resetInterfaceToInitial(); // Calls the central reset function
      if (notif.parentElement) notif.parentElement.removeChild(notif);
      if (closeBtn.parentElement) closeBtn.parentElement.removeChild(closeBtn);
      if (undoBtn.parentElement) undoBtn.parentElement.removeChild(undoBtn);
    });

    // Append elements to container
    notificationContainer.appendChild(notif);
    notificationContainer.appendChild(closeBtn);
    notificationContainer.appendChild(undoBtn);
  }

  // 3. Data Mappings
  const restrictionMap = {
    Group_A: ['Informational'],
    Group_B: ['Political'],
    Group_C: ['Administrative'],
    Group_D: ['Economic'],
    Group_E: ['Labor&Financial'],
    Group_F: ['Socio-Cultural'],
    Group_G: ['Security&Military'],
    Group_H: ['Health&Quarantine'],
    Group_I: ['Physical'],
    Group_J: ['Natural']
  };

  const restrictionDescriptions = {
    'Informational': `This border fluidly restricts the flow of information based on a country's policies, censorship, and the state of its technological infrastructure. For instance, some nations might monitor internet traffic or block access to specific websites for security reasons. These restrictions are enforced by government laws and regulations, and their intensity can fluctuate, strengthening or weakening due to complex factors like political circumstances or technological advancements. The liquidity of information is only restored when various conditions are met, such as policy changes, international pressure, or the widespread adoption of circumvention technologies.`,
    'Political': 'This boundary’s meaning and effectiveness vary fluidly depending on complex political factors such as diplomatic relations between countries, the state of disputes, and international agreements. When tensions escalate between certain countries, entry and exit procedures become stricter, and crossing the border may be restricted. These measures are primarily taken to protect national security and sovereignty, reflecting the complexity of diplomatic dynamics rather than a simple allowance or blockade. When peace agreements are signed, diplomatic accords reached, or political relations improve, these restrictions are gradually lifted.',
    'Administrative': 'This boundary is flexibly restricted based on administrative conditions such as document submission, approval procedures, and agreements. For example, to enter a specific area, one must complete processes like obtaining a visa, a permit, or registration, which can be very complex and time-consuming. These restrictions reflect various administrative goals, including administrative efficiency, population management, and resource control. Therefore, once all required documents are prepared and administrative approval is granted, the boundary restrictions are lifted, allowing access. The timing of this lifting can be accelerated by complex factors such as the simplification of administrative procedures or changes in public institution policies.',
    'Economic': 'Economic boundaries operate flexibly under complex economic factors such as trade policies between countries, financial sanctions, and currency regulations. For example, if a country is subject to international financial sanctions, transactions with that country may be restricted, blocking the movement of capital or goods. These restrictions arise from international political conflicts, unfair trade practices, or sanctions on specific economic activities, reflecting the complexity of economic interactions between nations. Such limitations are gradually lifted as economic relations improve through the removal of sanctions, the signing of trade agreements, or strengthened currency cooperation, with their flexibility determined by changing market conditions.',
    'Labor&Financial': 'Labor and financial boundaries are flexibly influenced by complex factors involving individual conditions such as work permits, visa status, and remittance restrictions, as well as country-specific regulations. For example, foreign workers must obtain employment authorization, and if their visa expires or the permit is revoked, access to the labor market is blocked. These measures aim to protect domestic workers, prevent illegal immigration, and control capital outflows. Such conditions fluctuate based on legal changes, fulfillment of personal qualification requirements (e.g., visa renewals, reobtaining work permits), and government policies, among other complex elements.',
    'Socio-Cultural': 'Sociocultural boundaries are not physically visible but are fluidly shaped by complex social codes such as language, religion, ethnicity, and social norms. In certain regions or groups, failing to follow specific languages or customs can make it difficult to feel a sense of belonging, thereby limiting social accessibility. These boundaries stem from the preservation of cultural identity, social integration, or the exclusivity of certain groups, reflecting the complex interplay of individual identity, personal experience, and the degree of social acceptance. Such boundaries can gradually soften through various social changes, including personal efforts (e.g., learning the language, understanding the culture), shifts in social perceptions, and the promotion of cultural exchange.',
    'Security&Military': 'This boundary is established for national security and the safety of citizens, with access being flexibly and strictly restricted depending on complex situations such as military operations and enhanced security measures. For example, during military training periods or emergencies, the boundary becomes more stringent, while in peacetime, crossing may often be permitted. These measures serve to defend against potential threats, protect military secrets, or respond to large-scale disaster situations. The boundary is lifted when military tensions ease, operations conclude, or threats are eliminated.',
    'Health&Quarantine': 'This boundary operates flexibly to protect public health and prevent the spread of diseases, with conditions varying according to complex health factors such as the state of infectious diseases, vaccination status, and recent travel history. For example, during an epidemic, quarantine procedures may be strengthened, restricting passage and requiring submission of vaccination certificates or negative test results. These measures primarily aim to prevent the spread of infections and safeguard public health. Restrictions are gradually lifted as quarantine policies ease or the infectious disease situation improves.',
    'Physical': 'This boundary is flexibly influenced by complex physical conditions such as structures, access controls, managing authorities, and time zones. For example, even if physical facilities like bridges or tunnels exist, passage may be restricted depending on permits, operating hours, and the policies of the managing authority. These measures aim to ensure facility management, safety, or the efficient operation of a specific area. Such restrictions are lifted and access becomes possible once physical or administrative conditions—such as completion of maintenance, extension of operating hours, or changes in management policies—are met, reflecting the complexity of physical infrastructure and management policies.',
    'Natural': 'This boundary’s accessibility varies greatly and flexibly according to complex natural environmental factors such as terrain, climate, and seasonal changes. For example, rivers or mountain ranges can usually be crossed, but during adverse weather conditions like floods or blizzards, access may become impossible. Furthermore, long-term geological changes such as earthquakes, volcanic eruptions, sea level rise, and shifts in river flows also alter the nature of natural boundaries. Nature continuously ‘resets’ these boundaries, and the meaning and accessibility of the boundary change as humans adapt to new terrains and build infrastructure accordingly.'
  };

  // 4. Event Listeners
let expandedSection = null;

function toggleExpansion(section) {
  const isAbout = section.classList.contains('footer-about');
  const isAccess = section.classList.contains('footer-about1');

  // 이전에 열려있던 섹션이 있으면 닫고 축소 처리
  if (expandedSection && expandedSection !== section) {
    expandedSection.classList.remove('about-expanded', 'access-expanded');
    
    // 축소 클래스 추가
    if (expandedSection.classList.contains('footer-about')) {
      expandedSection.classList.add('shrunk');
    } else if (expandedSection.classList.contains('footer-about1')) {
      expandedSection.classList.add('shrunk');
    }
  }

  // 현재 클릭한 섹션이 이미 열려있다면 닫기 및 초기화
  if (section.classList.contains('about-expanded') || section.classList.contains('access-expanded')) {
    section.classList.remove('about-expanded', 'access-expanded');
    section.classList.remove('shrunk');

    questionBoxes.forEach(box => box.classList.remove('visible'));
    expandedSection = null;
    
    // 축소 상태도 초기화
    document.querySelectorAll('.footer-about, .footer-about1').forEach(el => el.classList.remove('shrunk'));

  } else {
    // 클릭한 섹션 열기
    if (isAbout) {
      section.classList.add('about-expanded');
      section.classList.remove('shrunk');
      
      // 다른 섹션 축소 처리
      document.querySelector('.footer-about1').classList.add('shrunk');

      // questionBoxes 숨기기
      questionBoxes.forEach(box => box.classList.remove('visible'));
    } else if (isAccess) {
      section.classList.add('access-expanded');
      section.classList.remove('shrunk');

      // 다른 섹션 축소 처리
      document.querySelector('.footer-about').classList.add('shrunk');

      // questionBoxes 활성화
      if (questionBoxes.length > 0) {
        questionBoxes[0].classList.add('visible');
        updateStepHighlight(questionBoxes[0]);
      }
    }

    expandedSection = section;
  }
}



// 이벤트 연결
about.addEventListener('click', () => toggleExpansion(about));
access.addEventListener('click', () => toggleExpansion(access));

// Next 버튼 로직 동일
nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentBox = button.closest('.question-box');
    currentBox.classList.remove('visible');
    const targetId = button.dataset.target;
    const nextBox = document.getElementById(targetId);
    if (nextBox) {
      nextBox.classList.add('visible');
      updateStepHighlight(nextBox);
    }
  });
});

// Reset 버튼
resetButtons.forEach(resetBtn => {
  resetBtn.style.cursor = 'pointer';
  resetBtn.addEventListener('click', () => {
    resetInterfaceToInitial();
  });
});



  // 'Close' buttons click to close the question interface and reset
  closeButtons.forEach(closeBtn => {
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => {
      resetInterfaceToInitial();
    });
  });

  // Nationality selection change event to apply restrictions and show notification
  nationalitySelect.addEventListener('change', () => {
    const selectedGroup = nationalitySelect.value;
    const restrictedTypes = restrictionMap[selectedGroup] || [];

    const matchedTypes = new Set();
    const matchedRowsByType = {};

    bodyRows.forEach(row => {
      const types = row.dataset.types?.split(',').map(t => t.trim()) || [];
      const restrictedTypesInRow = types.filter(type => restrictedTypes.includes(type));

      if (restrictedTypesInRow.length > 0) {
        row.classList.add('dimmed');
        restrictedTypesInRow.forEach(type => {
          if (!matchedRowsByType[type]) {
            matchedRowsByType[type] = [];
          }
          const name = row.dataset.name || row.dataset.id || 'Unknown boundary';
          matchedRowsByType[type].push(name);
          matchedTypes.add(type);
        });
      } else {
        row.classList.remove('dimmed');
      }
    });

    if (matchedTypes.size > 0) {
      let message = '';
      matchedTypes.forEach(type => {
        const desc = restrictionDescriptions[type] || `${type} There are restrictions on the boundary.`;
        const rows = matchedRowsByType[type] || [];

        message += `
        <div class="notif-title">
          <span class="type-font">${type.toUpperCase()} BORDER</span>
          <span class="criteria-font">OPERATIONAL CRITERIA</span>
        </div>
        <div class="notif-desc">${desc}</div>
      `;
      });
      createNotification(message);
    }
  });
});







/* See more -> 애니메이션 */
document.querySelectorAll('.slide-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // 기본 이동 막음

      const url = this.getAttribute('href');

      // 슬라이드 아웃 클래스 추가
      document.body.classList.add('slide-out');

      // 애니메이션 후 이동
      setTimeout(() => {
        window.location.href = url;
      }, 600); // CSS 애니메이션과 동일한 시간
    });
  });




//   🐱드롭다운되었을때.
const commonSeeMoreText = "[ ⇥ See more details ]";

const data = {
  "drina-river": {
    boundaryDescription: "The Drina River has long served as a natural national border, particularly acting as a physical divide between Bosnia and Herzegovina and Serbia. Following the breakup of Yugoslavia, the river became a symbolic line of division, often associated with conflict and collective memory. Although both sides of the river share language and cultural similarities, religious and ethnic differences create an invisible boundary. The river illustrates how identity and living conditions can shift with just one crossing. Bridges across the Drina are limited, and the act of crossing the river itself has often been subject to control and restriction.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=drina-river"
  },
  "bridge-of-no-return": {
    boundaryDescription: "The Bridge of No Return is located at the western end of the Joint Security Area (JSA) and crosses the Military Demarcation Line (MDL). It was a symbolic site where Korean War prisoners were given the choice to return home or stay in captivity—once crossed, they could never return. The bridge has been unused since 1976, when two U.S. officers were killed by North Korean soldiers. This incident highlights the political tensions between North and South Korea, U.S. involvement, and deep socio-cultural divisions. Today, the bridge stands as a powerful symbol of historical conflict, division, and the legacy of the Cold War.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=bridge-of-no-return"
  },
  "schengen-area": {
    boundaryDescription: "The Schengen Area represents more than just open borders—it embodies a political decision to erase internal frontiers among member states. Politically, it symbolizes European unity and cooperation, yet also highlights exclusion, as non-Schengen EU countries face restricted movement. Socio-culturally, it fosters a shared European identity while marginalizing those from outside, reinforcing an us vs. them division. Historically, it marks a shift from a divided Europe—shaped by wars and the Iron Curtain—toward integration, but its controlled external borders echo past mechanisms of surveillance and control.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=schengen-area"
  },
  "okubo-bar": {
    boundaryDescription: "An Italian restaurant called Okubo Bar in Shinjuku, Tokyo, sparked outrage after posting a handwritten sign explicitly refusing service to Chinese and Korean customers. The sign, also shared on the restaurant’s official X (formerly Twitter) account, stated that “diversity and tolerance may be fashionable,” but they reject Chinese and Koreans due to unpleasant thoughts. The discriminatory message, visible at the store entrance, quickly went viral—garnering over 13 million views.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=okubo-bar" 
  },
  "the-slash": {
   boundaryDescription: "The U.S.–Canada “Slash” is a 20-foot-wide deforested corridor stretching 5,525 miles—the longest international land border. Politically, it materializes a cooperative yet controlled boundary between two allied nations, maintained by the International Boundary Commission. Socio-culturally, it symbolizes an invisible yet visible separation, quietly reminding travelers of national identity, even in remote wilderness. Historically, it reflects 19th-century territorial mapping practices, where the border was set at the 49th parallel without GPS, leading to zig-zagging markers and anomalies like the Northwest Angle.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=the-slash" 
  },
  "great-firewall": {
    boundaryDescription: "The Great Firewall of China is a sophisticated political and technological border that separates Chinese cyberspace from the global Internet. Politically, it enforces state control by filtering and blocking foreign websites deemed harmful to government interests. Socio-culturally, it creates a distinct digital ecosystem, isolating Chinese users and promoting domestic alternatives like WeChat and Baidu, shaping online behavior and information access within China. Historically, it emerged in the late 1990s through the Golden Shield Project as a response to rapid Internet growth, aiming to maintain government authority while embracing technology. The Firewall employs techniques such as keyword filtering, DNS poisoning, and TCP reset attacks to monitor and restrict information flow, reinforcing both control and cultural separation in the digital realm.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=great-firewall"
  },
  "the-big-bend-national-park": {
    boundaryDescription: "Big Bend National Park sits along a 118-mile stretch of the Rio Grande, marking a natural and political border between the U.S. (Texas) and Mexico (Chihuahua and Coahuila). Politically, it represents a defined frontier zone where two nations meet across a rugged, often inaccessible landscape. Socio-culturally, the park reflects the complex interactions and separations between border communities shaped by geography and history. Established in 1944, the park preserves diverse desert and mountain ecosystems, highlighting both natural beauty and the challenges of maintaining this boundary region. Historically, the Rio Grande’s deep canyons and shifting waters symbolize the fluid yet contested nature of the U.S.–Mexico border, where environmental and human factors continuously shape notions of separation and connection.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=the-big-bend-national-park" 
  },
  "mount-roraima": {
    boundaryDescription: "Mount Roraima, a dramatic flat-topped mountain rising at the tri-border point of Brazil, Venezuela, and Guyana, serves as both a natural and political boundary marker. Politically, it stands at the intersection of long-disputed territorial claims, particularly between Venezuela and Guyana, making it a symbol of contested sovereignty. Socio-culturally, the mountain is sacred to Indigenous peoples like the Pemon and plays a central role in their cosmologies, contrasting with its appropriation in national boundary narratives. Historically, its remote location delayed colonial mapping efforts, and it became a key reference in defining modern national borders. As the highest point in Guyana and part of the Guiana Highlands, Mount Roraima embodies a confluence of cultural meaning, geopolitical tension, and environmental significance.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=mount-roraima" 
  },
  "berlin-wall": {
    boundaryDescription: "The Berlin Wall symbolized the Cold War’s sharp political and ideological divide. As a physical and political border, it separated Soviet-controlled East Berlin from capitalist West Berlin to stop the mass exodus of East Germans fleeing repression and economic hardship. The Wall entrenched socio-cultural division, severing families, education, and everyday life across the city. It also became a site of deadly surveillance, with a “death strip” patrolled by armed guards. Historically, it embodied the post-WWII tension between East and West, and its fall in 1989 marked a turning point in the collapse of communist regimes in Eastern Europe and the end of a divided Germany.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=berlin-wall" 
  },
  "kashmir-line-of-control": {
    boundaryDescription: "Kashmir is a complex borderland in the northwestern Indian subcontinent, fiercely contested by India and Pakistan. The region is bisected by a Line of Control, a de facto political boundary that neither nation officially recognizes, with China also administering parts of eastern Ladakh. This political division is mirrored by sociocultural fragmentation. The Vale of Kashmir is predominantly Muslim, while Jammu is largely Hindu, and Ladakh is primarily Buddhist. This rich tapestry of ethnicities and religions, coupled with a history of only being unified since the mid-19th century, underscores the profound challenges in defining Kashmir's identity as a border region and the enduring nature of the conflict.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=kashmir-line-of-control" 
  },
  "himalayas-nathu-la-pass": {
    boundaryDescription: "Himalayas Nathu La Pass is a strategic mountain pass on the India-China border in Sikkim, historically part of the ancient Silk Road. Politically, it represents a sensitive Indo-Chinese boundary, once sealed after the 1962 war and reopened in 2006 for limited trade and military dialogue. The pass is one of only three official trading routes between the two nations. Socio-culturally, it restricts access to Indian citizens with permits, symbolizing controlled movement and national identity enforcement. Historically, it reflects decades of geopolitical tension, from the 1959 Tibetan uprising to recent border negotiations. Though reopened, trade remains tightly regulated, and the area is marked by ongoing diplomatic caution and surveillance, highlighting the layered complexity of this high-altitude geopolitical border.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=himalayas-nathu-la-pass" 
  },
  "rio-grande": {
    boundaryDescription: "The Rio Grande, or Río Bravo in Mexico, is a key political border between the U.S. and Mexico, stretching from El Paso/Ciudad Juárez to the Gulf of Mexico. Once central to indigenous irrigation and Spanish colonization, it became a contested boundary during the 1846 Mexican-American War. Shifting channels have altered territories, prompting treaties like the Chamizal settlement. Today, it divides communities with shared cultures and histories, while also symbolizing broader socio-economic divides through migration, maquiladoras, and overuse that leaves the river dry in places. More than a natural boundary, the Rio Grande represents enduring tensions over sovereignty, identity, and shared resources.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=rio-grande" 
  },
  "llívia": {
    boundaryDescription: "Llívia is a Spanish exclave in France, a historical quirk born from the 1659 Treaty of the Pyrenees. Deemed a town rather than a village, Llívia uniquely remained Spanish while surrounding Cerdanya became French territory. This created a distinct political boundary, historically requiring special passes for residents to cross into mainland Spain. Today, while physical frontier formalities have vanished due to the Schengen Area, Llívia retains its unique identity. Its border with France is marked by 45 numbered stones, remnants of the 1868 demarcation. These markers, often hidden in hedges or fields, symbolize Llívia's enduring social and cultural separation, even as it shares services like a hospital with its French neighbors. This historical anomaly offers a tangible link to a past where geographic and political lines created a truly singular community.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=llívia" 
  },
  "euroairport": {
    boundaryDescription: "The EuroAirport Basel-Mulhouse-Freiburg stands as a remarkable example of international cooperation, uniquely serving France, Germany, and Switzerland. Established in 1946 as a post-war collaboration, with Switzerland funding and France providing land, it embodies a shared vision transcending national borders. Although located entirely in France, the airport features distinct Swiss and French customs zones, each operating under their respective regulations. This blend of governance highlights the seamless, yet segmented, political boundary. Despite the Schengen Agreement's removal of systematic passport controls for many, customs inspections remain, reflecting ongoing economic and regulatory distinctions. The airport's unique structure, managed by a Franco-Swiss board with German advisors, fosters cultural exchange and regional cooperation, making it a true symbol of tri-national unity at the heart of Europe.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=euroairport" 
  },
  "belarus-pillbox": {
    boundaryDescription: "The Belarus-Russia-Ukraine tripoint, known as The Three Sisters monument, embodies a unique intersection of political boundaries. While intended as a symbol of friendship, visiting this site reveals the intricate realities of its borderlands. The region highlights strict border controls and the challenges of transiting between politically sensitive nations. Despite the monument's symbolic unity, the experience of navigating checkpoints underscores the ongoing socio-cultural separation and varying national regulations. Travelers encounter distinct customs procedures, language barriers, and restrictions on photography, reflecting the area's complex historical and political context. This tripoint is not merely a geographical marker but a tangible representation of geopolitical divisions and the persistent presence of state authority.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=belarus-pillbox" 
  },
  "iron-curtain": {
    boundaryDescription: "The Iron Curtain was a profound political, military, and ideological barrier that divided Europe from the end of World War II until 1989. Coined by Winston Churchill, it symbolized the Soviet Union's efforts to isolate itself and its Eastern and Central European allies from the West. This curtain wasn't just a metaphor; it manifested as heavily guarded borders, including the Berlin Wall, preventing citizens of Eastern Bloc countries from migrating. It enforced a stark socio-cultural separation through censorship and restricted contact, defining the Cold War's historical context. Its fall in 1989, notably with the opening of the Austria-Hungary border, marked the symbolic end of the Cold War and the collapse of communism, reshaping the political landscape of Europe.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=iron-curtain" 
  },
  "dover-strait": {
    boundaryDescription: "The Strait of Dover is a narrow, vital water passage separating England and France, linking the English Channel and the North Sea. Historically, it served as a formidable natural political boundary, often dictating military strategies, as seen in naval battles like the defeat of the Spanish Armada. Despite its narrow width, the strait represented a significant socio-cultural divide for millennia, physically separating the British Isles from mainland Europe until relatively recent geological changes. Its role as a border was transformed with the 1994 completion of the Channel Tunnel, creating an undersea rail link that dramatically altered its historical context from a natural barrier to a key transportation corridor, fostering increased connectivity while remaining a busy international maritime border.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=dover-strait" 
  },
  "maginot-line": {
    boundaryDescription: "The Maginot Line was an elaborate, state-of-the-art defensive barrier built by France in the 1930s along its border with Germany. Conceived as an impregnable shield, its construction reflected France's interwar military doctrine favoring static defense and a deep-seated desire to avoid the catastrophic human cost of WWI trench warfare. Though a marvel of engineering for its time, the Line became a symbol of strategic miscalculation. Its failure to extend along the French-Belgian border allowed the Germans to simply outflank it in May 1940, rendering its immense political and financial investment useless. This historical misstep tragically underscored the disconnect between France's defensive mindset and the evolving mobile warfare tactics of WWII, ultimately failing to prevent the political and physical invasion it was designed to prevent.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=maginot-line" 
  },
  "gaza-strip": {
    boundaryDescription: "The Gaza Strip is a densely populated territory marked by complex and often violent border dynamics. Since the 1948 Arab-Israeli War, its boundaries have been fluid and heavily controlled, reflecting a turbulent political boundary shifting between Egyptian, Israeli, and, more recently, Hamas governance. This contested border has created severe socio-cultural separation, isolating Gazans and severely impacting their daily lives through blockades, restricted movement, and high unemployment. The rise of a smuggling industry via tunnels highlighted the desperate need for basic goods, underscoring the severe economic impact of these political divisions. The ongoing conflict and frequent border closures are direct manifestations of the historical context of unresolved disputes and the perpetual struggle for self-determination within a tightly controlled geopolitical space.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=gaza-strip" 
  },
  "amazon-rainforest": {
    boundaryDescription: "The Amazon Rainforest serves as a vast, living border across northern South America, primarily within Brazil, but also extending into surrounding nations. While not a conventional political boundary defined by treaties or walls, its immense scale and unique ecosystems create de facto divisions between nations and within them. Historically, this natural border limited human encroachment. However, its modern context is shaped by deforestation and exploitation, reflecting complex economic pressures from agriculture and resource extraction. This has led to environmental and social challenges, blurring the lines between conservation and development. The rainforest's porous nature allows for both illicit activities and the movement of indigenous populations, highlighting a socio-cultural landscape deeply intertwined with, yet constantly threatened by, external pressures.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=amazon-rainforest" 
  },
  "san-ysidro-port-of-entry": {
    boundaryDescription: "The San Ysidro Port of Entry is the Western Hemisphere's busiest land border crossing, fundamentally shaping the political and economic relationship between the U.S. and Mexico. Established in 1906, its ongoing, massive expansion reflects sustained growth and the complex demands of managing vast flows of people and commerce. This border point is a vibrant illustration of socio-cultural exchange, facilitating daily commutes, family visits, and tourism, yet simultaneously serving as a critical security and military checkpoint. Its modern infrastructure, including expanded lanes and advanced inspection, underscores the physical reality of a highly controlled and technologically advanced border. San Ysidro's evolution highlights its pivotal historical role as a gateway, balancing national sovereignty with deep economic and cultural interdependence.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=san-ysidro-port-of-entry" 
  },
  "kuwait-saudi-arabia-zone": {
    boundaryDescription: "The Kuwait-Saudi Neutral Zone is a unique border area, originally established after World War I due to undefined boundaries. Spanning approximately 5,180 sq km, it primarily represents a political and economic border defined by shared natural resource rights, rather than clear sovereignty. While formally partitioned in 1965, both nations continue to equally share oil revenues, highlighting an enduring economic interdependence. This historical arrangement underscores the dynamic nature of international boundaries, where political agreements prioritize shared resources over absolute territorial control. The zone's evolution from an isolated area to a focus of regional politics due to expanding oil exploration showcases how resource potential can shape and complicate border definitions.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=kuwait-saudi-arabia-zone" 
  },
  "refugee-camps": {
    boundaryDescription: "Za'atari Refugee Camp, in Jordan, emerged a decade ago as a makeshift border crossing for Syrians fleeing conflict. Rapidly growing to house 80,000 refugees, it symbolizes the political boundary created by war and the ensuing humanitarian crisis. This border is defined by socio-cultural separation, as its inhabitants, many born within its confines, live separated from their homeland, yet strive to maintain Syrian culture. The camp's self-sustaining market and services highlight an internal, albeit fragile, economic system. Managed by UNHCR and Jordan, Za'atari embodies a de facto administrative border, representing a complex, long-term displacement shaped by ongoing geopolitical instability and the hope of eventual return.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=refugee-camps" 
  },
  "tumen-river": {
    boundaryDescription: "The Tumen River, originating from Mount Paektu, forms a significant natural border separating North Korea from China and Russia. Stretching 521 km, it has historically served as a crucial passage for cultural exchange and migration, often under duress. Its political boundary function intensified through periods of dynastic power struggles and, tragically, during Japan's colonial rule, when Koreans crossed it seeking refuge. This river remains a poignant symbol of socio-cultural separation, embodying both a historical migration route and a contemporary barrier, profoundly impacting the lives of those on its banks. Despite its limited navigability, its strategic location continues to shape regional dynamics and the livelihoods of border communities.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=tumen-river" 
  },
  "ceuta-melilla": {
    boundaryDescription: "Ceuta and Melilla, two Spanish exclaves in North Africa, mark the only land borders between the EU and Africa. Surrounded by high double fences topped with barbed wire, these borders aim to prevent irregular migration from Morocco. Politically, they represent EU external frontiers, though situated on African soil. Socially and culturally, they embody separation—European-administered cities with a Christian majority bordering largely Muslim Moroccan regions. Historically, both cities have been sites of colonial control, military significance, and symbolic resistance—retained by Spain even after Morocco's independence in 1956. Frequent attempts by African migrants to cross the fences, often facing violence and humanitarian crises, have made Ceuta and Melilla flashpoints in debates on migration, security, and Europe's colonial legacy.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=ceuta-melilla" 
  },
  "green-line": {
    boundaryDescription: "The Green Line is a UN-controlled buffer zone dividing Cyprus since 1974, marking the de facto border between the Greek Cypriot south (RoC) and Turkish Cypriot north (TRNC). It reflects deep political conflict, ethnic division, and colonial legacies. In Nicosia, once-bustling streets like Ermou lie abandoned, symbolizing social fragmentation. Though heavily militarized, parts of the zone now house civilians and wildlife. Its layered history and uncertain future raise questions: reclaim, preserve, or transform?",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=green-line" 
  },
  "shenzhen-checkpoints": {
    boundaryDescription: "Shenzhen features a comprehensive system of land and sea checkpoints facilitating convenient travel to Hong Kong and Macao. Major land ports include Futian, Luohu, Huanggang, Shenzhen Bay, Liantang, Wenjindu, and Shatoujiao. Each checkpoint varies in capacity, infrastructure, and operating hours. Futian and Luohu are key metro-connected pedestrian crossings, while Huanggang and Shenzhen Bay support large-scale passenger and cargo movement. West Kowloon Station in Hong Kong connects via high-speed rail under a “two inspections in one place” model. Sea routes operate via Shekou Port and Daya Bay Port (private). These ports reflect “One Country, Two Systems,” enabling seamless integration within the Greater Bay Area while maintaining separate administrative controls and inspections.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=shenzhen-checkpoints" 
  },
  "mount-everest": {
    boundaryDescription: "Mount Everest, the world's highest peak, serves as a fundamental natural border between Nepal and Tibet (China). Its formidable terrain acts as a physical barrier, yet it has evolved into a significant political boundary, notably with China's separation line policy reflecting geopolitical sensitivities. Historically, Everest fostered deep socio-cultural ties with the indigenous Sherpa people, shaping their lives and traditions. However, modern climbing has transformed it into a contested space, highlighting national ambitions, environmental concerns, and the stark realities of human endurance and tragic losses. It's a living border where natural grandeur meets complex human challenges.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=mount-everest" 
  },
  "calais-jungle": {
    boundaryDescription: "The Calais Jungle was a sprawling, informal migrant encampment near Calais, France, serving as a desperate borderland for those attempting to cross into the UK. Its existence and forced dismantling in 2016 highlight a critical political boundary dispute between France and the UK, exacerbated by the Le Touquet Treaty which effectively moved the UK's border to French soil. This site starkly revealed a profound socio-cultural separation, with migrants living in squalid conditions, largely unseen by the surrounding Calaisfornia. Its historical context is rooted in decades of migration flows, culminating in a highly militarized landscape designed to deter crossings, pushing migrants into increasingly precarious situations and fueling local anti-immigration sentiments.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=calais-jungle" 
  },
  "aral-sea": {
    boundaryDescription: "The Aral Sea, straddling the natural border between Kazakhstan and Uzbekistan, was once Central Asia's fourth-largest lake. Its drastic shrinkage, primarily due to Soviet-era irrigation diversions, has transformed it into a stark ecological boundary where once-submerged land is now a salt-encrusted desert. This environmental disaster created severe socio-cultural impacts, devastating the local fishing industry and causing widespread health problems due to toxic dust storms. Historically, the sea thrived until ambitious agricultural policies fundamentally altered its water balance. Today, the Aral Sea stands as a poignant reminder of human-induced environmental destruction and the urgent need for international cooperation to address ecological challenges.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=aral-sea" 
  },

  "panama-Canal-Zone": {
    boundaryDescription: "From 1903 to 1979, the U.S. controlled the Panama Canal Zone, a 10-mile-wide strip that split Panama and created separate administrative zones. The U.S. oversaw key functions like tolls, labor, health, and security, limiting Panama’s sovereignty. Although the zone was fully returned to Panama in 1999, the canal remains vital to global trade and geopolitics. Recently, U.S. concerns have grown over China's increasing presence, particularly through companies managing port facilities at both ends of the canal. Washington views this as a potential threat to its strategic interests amid U.S.-China rivalry. Despite these tensions, Panama continues to assert its neutrality and sovereign control over the canal.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=panama-Canal-Zone" 
  },
"chernobyl-exclusion-zone": {
boundaryDescription: "The Chernobyl Exclusion Zone, created after the 1986 nuclear disaster, serves as a physical, political, and socio-cultural border. Marked by dangerous radiation, it restricts human habitation and access, functioning as a health and quarantine zone. Initially managed by the Soviet Union, it is now under Ukrainian control. The disaster displaced thousands and created long-term economic and environmental impacts, including unusable agricultural land. Although permanent residents are absent, monitoring and cleanup activities continue. Entry is tightly controlled through permits, forming an administrative border. The Zone also holds strategic importance, highlighted by military involvement during both the original disaster response and the 2022 Russian invasion. Despite its hazards, the area remains closely managed for safety, research, and security purposes.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=chernobyl-exclusion-zone" 
},
"checkpoint-charlie": {
boundaryDescription: "Checkpoint Charlie was a key Cold War border dividing East and West Berlin. It served as the main crossing for foreigners, dignitaries, and Allied personnel, symbolizing the broader political and ideological divide. The East side was heavily fortified with barriers and surveillance, while the West had a more open layout. Though it allowed limited movement, its main role was to enforce separation, both physically and socio-culturally. The checkpoint became a focal point for escape attempts, reflecting the human cost of division. It also had strong informational and propaganda value, widely featured in media and spy fiction. While not an economic trade hub, it impacted labor and daily life by regulating the flow of people. Its closure in 1990 marked the end of Berlin’s division and the Cold War era.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=checkpoint-charlie" 
},
"svalbard-archipelago": {
boundaryDescription: "The Svalbard Archipelago serves as a unique border due to its Arctic location and the 1920 Svalbard Treaty. While under Norwegian sovereignty, the treaty allows citizens of signatory nations equal rights to economic activities, especially resource extraction, creating an open-access economic border. Harsh natural conditions isolate it physically, though it remains seasonally accessible. Its non-indigenous, transient population requires specific health protocols. Historically contested for resources, Svalbard now sees active coal mining by Norway and Russia. The area remains demilitarized, with limited security presence, though maritime disputes have occurred. Scientific research and environmental monitoring, such as the Global Seed Vault, are central. Lacking indigenous culture, Svalbard hosts a temporary, international community focused on mining, tourism, and research. This balance of Norwegian control and international access defines its porous Arctic border status.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=svalbard-archipelago" 
},
"guantanamo-bay": {
boundaryDescription: "Guantánamo Bay is a contested U.S. naval base within Cuban territory, operating under a 1903 treaty that grants the U.S. full control despite Cuba’s objections. Primarily serving military and security functions, it gained global attention as a detention site for alleged Muslim militants, sparking controversy over human rights and legal protections. The base also processes migrants and serves as a health and quarantine zone. Isolated from Cuban infrastructure, it maintains self-sufficient water and energy systems, forming a distinct economic and labor enclave. Its existence creates a socio-cultural divide, raising debates on constitutional rights and international law. With a deep natural harbor and strategic location, Guantánamo remains a highly symbolic and politically complex border space.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=guantanamo-bay" 
},
"karakoram-highway": {
boundaryDescription: "The Karakoram Highway (KKH) acts as a significant physical and political border, carving a 1,300km path through the world's most formidable mountain ranges (Himalayas, Karakoram, Hindu Kush) to link China and Pakistan. This joint administrative project, built by 24,000 laborers, navigates extreme natural terrain, including the 4,800m Khunjerab Pass, demanding continuous maintenance. Economically, the KKH unlocked remote areas for trade and tourism, yet also presented environmental challenges. Its profound socio-cultural impact lies in connecting diverse ethnic groups like the Uyghurs, Tajiks, and the unique communities of the Hunza Valley (Burusho, Wakhi). While fostering modernization, it also highlights local efforts to preserve distinct traditions and support female entrepreneurship. Though not explicitly a military checkpoint, its strategic link between two nations imbues it with inherent security relevance.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=karakoram-highway" 
},
"un-buffer-zone": {
boundaryDescription: `The UN Buffer Zone, or "Green Line," is a 180km physical and political border in Cyprus, separating Greek and Turkish Cypriots since 1974. Under UNFICYP's administrative control, it's a demilitarized security & military zone. While enforcing separation, it hosts "Civil Use Areas" like Pyla, where over 10,000 people live, fostering unique socio-cultural interactions. Economically, parts are farmed, but much remains abandoned, preserving a unique natural environment. UNFICYP's presence ensures environmental protection and manages incidents. Though not a typical health & quarantine border, its controlled nature indirectly aids public safety. Ongoing informational monitoring and recently opened crossing points signal evolving normalization efforts across this complex, yet inhabited, boundary.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=un-buffer-zone" 
},
"canadian-arctic-waters": {
boundaryDescription: "Canada's Arctic waters form a complex, evolving border critical to its sovereignty. Historically, extreme cold provided natural and physical defense, creating a robust security & military barrier. However, climate change now makes this border permeable; thinning ice hinders military operations and thaws permafrost. Politically, Canada's claim over the Northwest Passage as internal waters faces international contestation, generating informational disputes. Increased accessibility boosts economic interest in resources and shipping, challenging Canadian control. Administratively, Canada asserts presence via the Canadian Rangers (Indigenous paramilitary forces) and historical actions like Inuit relocations, which underpin socio-cultural aspects of its claim. While direct health & quarantine isn't a primary focus, the harsh, changing environment presents unique challenges. The Arctic is transforming from a frozen defense to a vulnerable frontier.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=canadian-arctic-waters" 
},
"enclaves": {
boundaryDescription: `The India-Bangladesh enclaves were a deeply complex physical and political border issue. These "chhits"—162 land pockets totally surrounded by foreign territory—rendered 50,000 residents stateless for nearly 70 years. Lacking administrative and legal recognition, they were deprived of basic economic and civil rights, including access to services, causing severe labor & financial hardship and a profound socio-cultural identity crisis. The often-shifting natural riverine border exacerbated land disputes. Security & military incidents were frequent. Decades of bilateral informational efforts, notably the 1974 Indira-Mujib Agreement, culminated in the 2015 Land Boundary Agreement. This landmark accord facilitated the exchange of enclaves, formalizing control and granting long-awaited citizenship, thus resolving a century-old border anomaly.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=enclaves" 
},
"cross-strait": {
boundaryDescription: `The Taiwan Strait is a highly contested political and physical border separating mainland China (PRC) and Taiwan (ROC). China claims Taiwan as a breakaway province under its "One China" policy, while Taiwan, a democratic state, balances between independence and maintaining the status quo. Military tensions are high, with China's growing force projection and the U.S. upholding strategic ambiguity. There is no formal administrative border, complicating diplomacy and international recognition. Despite this, cross-strait economic ties remain strong, though China’s leverage causes concern. Movement of labor and capital is tightly regulated. Culturally, Taiwan’s evolving identity further deepens the divide. While not a natural barrier, the Strait acts as a geographic and strategic divide, with health and quarantine measures—like during COVID-19—highlighting restricted, complex interactions across this sensitive border.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=cross-strait" 
},

"silk-road": {
boundaryDescription: "Silk Road (Historical Trade Route) was an ancient, sprawling physical trade network, effectively a cultural borderland linking China with the West for centuries. Primarily an economic conduit for goods like silk, wool, and precious metals, it also facilitated the socio-cultural exchange of ideas, including the spread of Buddhism and Nestorian Christianity from India to China.This vast natural pathway, traversing mountains and deserts, faced security & military threats over time, becoming unsafe before its revival under the Mongols. It acted as a crucial informational artery, transmitting knowledge and even pathogens like the Black Death. While not a formal administrative border, its various segments were controlled by different empires and middlemen. Modern counterparts, like the Karakoram Highway and proposed UN trans-Asian routes, underscore its enduring legacy as a symbol of cross-continental connectivity and cultural exploration, as exemplified by projects like Yo-Yo Ma's Silk Road Project.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=silk-road" 
},
"ever-given-blockage": {
boundaryDescription: `The 2021 Ever Given blockage of the Suez Canal exemplifies a "border" disruption at a crucial physical chokepoint in global supply chains. This man-made Black Swan event had widespread repercussions. Economically, it caused significant financial losses for shipping lines, incurring higher operational, environmental, and inventory costs, and reduced revenue for the Canal Authority. Operationally, refloating the massive ship required unprecedented dredging and towing efforts, highlighting the complexities and risks of maintaining vital maritime infrastructure. The incident also had an informational impact, drawing global attention through real-time satellite imagery. This event underscored how a single disruption at a physical border can cascade into vast economic and operational challenges worldwide.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=ever-given-blockage" 
},
"uyuni-salt-flats-zone": {
boundaryDescription: "The Uyuni Salt Flats Zone is a vital natural and physical border between Bolivia and Chile, marked by high-altitude salt flats and unique ecosystems. Politically and militarily, it has a history of tension, including Chilean landmines placed in 1973 near Volcan Licancabur, reflecting ongoing security concerns. Administratively, Bolivia manages this area through government bodies overseeing lithium extraction, a key economic resource with vast reserves promising future labor and financial growth. However, development challenges include infrastructure gaps and ensuring health and quarantine measures in its harsh environment. Socioculturally, indigenous communities face impacts from industrialization, requiring careful informational and social engagement. Overall, Uyuni Salt Flats represents a multifaceted border zone.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=uyuni-salt-flats-zone" 
},
"gibraltar": {
boundaryDescription: `Gibraltar is a highly contested physical and political border, a British overseas territory occupying a narrow peninsula connected to Spain. Its strategic location guarding the Strait of Gibraltar highlights its immense security and military importance, historically as a British air and naval base, and currently with NATO operations. The political dispute over its cession by the Treaty of Utrecht impacts administrative aspects, with Spain imposing restrictions on flight paths and other operations, preventing full EU "Open Skies" integration. This creates economic challenges for the airport, influencing labor and financial flows. The border's unique feature was the physical crossing of Winston Churchill Avenue over the runway, now replaced by an underground tunnel, a significant informational change for visitors. The movement of labor across the border has also evolved, with Moroccan workers replacing Spanish ones after the 1969 border closure.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=gibraltar" 
},
"blaine-peace-arch": {
boundaryDescription: "The Peace Arch Border Crossing, connecting Blaine, Washington, and Surrey, British Columbia, serves as a significant physical and political border between the U.S. and Canada. The striking Peace Arch itself, a 67-foot white structure, stands as a powerful socio-cultural symbol of lasting peace between the two nations, uniquely situated within a park split across both countries. Administratively, this is the third-busiest crossing, vital for economic activity and labor movement for non-commercial vehicles, directly linking major cities like Seattle and Vancouver. The continuous upgrading of physical infrastructure, with new facilities opening in 2009 and 2010, reflects its importance. The evolution of border stations provides rich informational insights into how security and cross-border interactions have been managed over time, highlighting a blend of shared ideals and practical border operations",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=blaine-peace-arch" 
},
"west-bank-barrier": {
boundaryDescription: `The West Bank Barrier, built by Israel since 2002, functions as a highly disputed physical and political border within the occupied Palestinian territories. Its route often deviates from the pre-1967 line, effectively annexing Palestinian land and incorporating Israeli settlements. Human rights groups condemn this as "de facto annexation." This barrier carries significant administrative weight, controlling Palestinian movement and access, which in turn causes severe economic hardship by limiting access to farmlands and livelihoods. It impacts health & quarantine by hindering medical care. The barrier's design also shapes demographics, aiming to increase Jewish Israeli presence in East Jerusalem, fragmenting socio-cultural ties. International bodies, including the ICJ, deem it illegal, underscoring its deep informational and security implications beyond stated security goals.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=west-bank-barrier" 
},
"storskog": {
    boundaryDescription: "The Storskog-Borisoglebsky crossing is the only legal border between Norway and Russia, marked by strict security and military surveillance on both sides. Located on the E105 highway, it features modern administrative facilities but operates under tight controls due to geopolitical tensions. Historically a vibrant economic and socio-cultural hub with local trade and a permit system enabling cross-border visits, these exchanges have largely ceased, sharply limiting labor, financial flows, and tourism. The border spans a natural landscape along the Pasvikelva River and includes a new bridge to facilitate transit for the few permitted crossings. Storskog exemplifies a high-stakes, heavily monitored border where political and security concerns dominate, reflecting broader international dynamics while constraining previous local connectivity.",
    seeMoreText: commonSeeMoreText,
    detailPageUrl: "detail.html?id=storskog" 
  },
"darien-gap-panama": {
boundaryDescription: `The Darién Gap in Panama is a natural and physical border separating Central and South America, characterized by dense rainforest and rugged terrain with no formal infrastructure. This formidable barrier poses serious health and safety risks, lacking organized security or quarantine systems, while serving as a perilous migration route for thousands fleeing poverty and unrest. Despite government efforts to control crossings through increased border policing, fencing, and deportations, migrant flows continue, impacting indigenous communities and regional stability. Administratively, Panama collaborates with international organizations to provide limited humanitarian aid, though resources remain insufficient. The Darién Gap remains a complex border zone where natural obstacles, political challenges, and humanitarian concerns intersect, making it a critical, yet dangerous, gateway on the migration path northward.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=darien-gap-panama" 
},
"taiwans-adiz": {
boundaryDescription: "Taiwan's Air Defense Identification Zone (ADIZ), established by the US in 1954, functions as a critical security and military border. Extending beyond Taiwan's sovereign airspace and encompassing parts of mainland China, it enables Taiwan to monitor and control aircraft for national defense, a crucial aspect of its national security. It encompasses the Taiwan Strait, parts of the Chinese mainland coast, and the East China Sea, reflecting geopolitical tensions with China, which frequently conducts incursions. The ADIZ serves as a quasi-territorial boundary that supports Taiwan’s sovereignty claims and strategic defense posture, while also influencing political and security dynamics in the region. This zone is vital for early warning, airspace management, and deterring military threats, highlighting the intersection of security, political sovereignty, and international aviation norms in a contested border environment.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=taiwans-adiz" 
},
"eurotunnel-zone": {
boundaryDescription: `The Eurotunnel, or "Chunnel," is a vital physical and political border linking the UK and France beneath the English Channel. Opened under the 1986 Treaty of Canterbury, it supports major economic flows via Eurostar and LeShuttle services. Operated by Getlink, it integrates advanced engineering systems for safety, ventilation, and signaling. While enabling commerce and tourism, it also serves as a tightly managed security border, especially evident during the 2015 migrant crisis. Its design reflects strict health and quarantine standards, highlighting the balance between facilitating cross-border movement and maintaining national control and security.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=eurotunnel-zone" 
},

"us-surveillance-towers": {
boundaryDescription: "The U.S.-Mexico border surveillance tower system emerged in a post-9/11 climate that framed migration as a national security threat. Driven by political narratives portraying irregular migration as dangerous, the U.S. adopted a militarized approach focused on control rather than root causes like economic disparity or humanitarian need. Surveillance towers offer physical detection in remote terrains, but their deployment often reflects more than security: powerful defense industry lobbying, technological solutionism, and a reluctance to enact meaningful immigration reform. These towers symbolize a shift from managing human mobility to deterring it through high-tech enforcement—prioritizing territorial sovereignty and political optics over sustainable, people-centered solutions. In essence, the border is not just a response to movement, but a constructed line shaped by security fears, economic interests, and a need to perform national control.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=us-surveillance-towers" 
},
"haskell-free-library": {
boundaryDescription: `The Haskell Free Library and Opera House exists as a unique physical and political border due to its deliberate placement astride the U.S.-Canada line. It was established through the Socio-Cultural vision of the Haskell family, who sought to provide Informational and artistic access equally to both Canadian and American communities. This philanthropic act created a space where two nations literally meet under one roof, fostering cross-border exchange. However, despite its inclusive origin, the library has increasingly become a site of Security & Military concern, leading to evolving Administrative regulations, especially following events like the 2015 migrant crisis and 2025 border policy changes, highlighting the tension between its founding spirit of openness and modern border control imperatives.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=haskell-free-library" 
},
"south-china-sea-disputed-waters": {
boundaryDescription: `The territorial disputes in the South China Sea represent a complex, multifaceted Political and Physical border, primarily arising from unresolved claims over Natural resources (oil, gas, fishing grounds) and strategic Economic and Security & Military maritime passages (SLOCs). This border emerged significantly after World War II, when Japan renounced its claims, leaving a vacuum that various sovereign states, notably China, Vietnam, the Philippines, Malaysia, and Brunei, sought to fill based on historical assertions and geographic proximity. China's expansive "nine-dash line" claim, combined with aggressive land reclamation and militarization efforts, has intensified these disputes. The U.S. and other nations have become involved to ensure freedom of navigation and counter China's assertive Political stance, transforming the region into a critical geopolitical flashpoint.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=south-china-sea-disputed-waters" 
},
"ledra-palace-border": {
boundaryDescription: `The Ledra Palace Border Crossing, located in Nicosia, Cyprus, emerged as a physical and political border following the 1974 Turkish invasion and the island's partition. This division created the "Green Line," a UN buffer zone separating Greek Cypriot and Turkish Cypriot areas. Initially, the crossing was primarily for Administrative and Security & Military personnel (officials, UN, SBA), symbolizing the deep political chasm. Its existence is a direct result of a Socio-Cultural conflict and the failure to achieve political unification. While the Ledra Palace Hotel, a pre-invasion landmark, became a UN HQ within this no-man's-land, the crossing itself represents the island's enduring division, with ongoing, albeit sometimes easing, Administrative and Security & Military checks reflecting the complex, unresolved political landscape.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=ledra-palace-border" 
},
"un-blue-line": {
boundaryDescription: `The UN Blue Line is a physical and political demarcation established by the United Nations in 2000 to confirm Israel's withdrawal from Lebanon. It is explicitly "not a border" but a "line of withdrawal," reflecting its temporary Administrative nature and an ongoing Security & Military dispute rather than a mutually agreed international boundary. Its origin traces back to earlier Political agreements like the 1923 Mandate Line and 1949 Armistice. Despite visible markers, its precise path causes friction, leading to frequent Security & Military violations and emphasizing unresolved Political and Socio-Cultural tensions.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=un-blue-line" 
},
"narva-river": {
boundaryDescription: "The Narva River serves as a natural and historically significant political border dividing Estonia and Russia. Its formation traces back to 13th-century territorial contests, evolving into the external border of the European Union and Schengen Zone today. This boundary reflects centuries of Socio-Cultural and Political struggle. Despite an unratified Administrative treaty, it functions as a de facto line with substantial Security & Military infrastructure, including fencing, watchtowers, and recent X-ray upgrades for freight. Recent incidents like removed buoys and vehicle bans underscore persistent political tensions and directly impact Economic transit.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=narva-river" 
},
"australias-offshore": {
boundaryDescription: "Australia’s offshore detention center in Nauru functions as a Political and Administrative border, designed to process asylum seekers outside Australian territory. Established in 2012, its existence is rooted in Political policy aimed at deterring unauthorized maritime arrivals. Despite a UN ruling highlighting Human Rights violations and arbitrary detention of asylum seekers, including minors, this Security & Military system persists. These policies have caused severe Health & Quarantine and Socio-Cultural harm, leading to calls for abolition and compensation for survivors. The center represents Australia's controversial approach to immigration control, creating a de facto Physical barrier to asylum, with profound Socio-Cultural and Political implications.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=australias-offshore" 
},
"transnistria-checkpoints": {
boundaryDescription: `The "Transnistria Checkpoints," established in 2022, primarily serve as Security & Military measures within a demilitarized Security Zone along the Dniester River, stemming from the 1992 conflict. While initially justified by an alleged 'terrorist threat,' their removal is a Political and Economic condition of a gas agreement with Moldova, highlighting Russia's use of gas as a leverage tool. These Physical barriers (concrete barriers, related infrastructure) have significantly impacted regional Socio-Cultural mobility and caused an Economic crisis due to energy shortages. Their dismantling aims to restore Administrative normalcy and freedom of movement, reflecting ongoing geopolitical negotiations and Moldova's efforts to reintegrate the region.`,
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=transnistria-checkpoints" 
},
"berlin-tegel-refugee-shelter": {
boundaryDescription: "The Berlin Tegel Refugee Shelter, once an airport, functions as a Political and Administrative border, establishing strict controls over asylum seekers and refugees. Hastily set up in 2022 to manage the influx from Ukraine, it has become a long-term Physical containment point for nearly 5,500 people, with plans to expand to 8,000. The camp's design and stringent rules, including constant surveillance and limited movement, create a Security & Military barrier. This environment has raised serious Health & Quarantine and Socio-Cultural concerns, impacting well-being and hindering integration. Criticized for its high costs (up to €250 per person per day) and prison-like conditions, Tegel embodies Germany's evolving, often controversial, approach to migration.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=berlin-tegel-refugee-shelter" 
},
"crimea": {
boundaryDescription: "Crimea functions as a deeply contested Political and Security & Military border, primarily due to Russia's illegal 2014 annexation. Historically part of Russia until 1954, its current status stems from military seizure by unmarked Russian troops and a disputed referendum, leading to international condemnation. This has created a Physical barrier, intensified by infrastructure like the Kerch Strait Bridge, and a severe Socio-Cultural divide, polarizing ethnic Russians and Crimean Tatars. The border's existence is a key driver of regional instability, continuous armed conflict, and economic sanctions, embodying a critical geopolitical fault line between Ukraine and Russia.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=crimea" 
},
"tohono-oʼodham-nation": {
boundaryDescription: "The Gadsden Purchase of 1853 unilaterally imposed an international border through the Tohono O'odham Nation's ancestral territory, fundamentally altering their existence. This political division fractured socio-cultural unity, separating families and disrupting traditional migration for ceremonies and vital services. Consequently, the Nation now grapples with immense security and military burdens from increased illegal crossings and smuggling, leading to a humanitarian crisis on their lands. These challenges, along with rising crime rates, place considerable strain on their economic resources, compelling the use of casino profits for border management. Furthermore, the construction of physical barriers and intensified surveillance by Integrated Fixed Towers jeopardize tribal sovereignty and cultural practices, often impeding tribal members' movement due to insufficient informational recognition of their identity.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=tohono-oʼodham-nation" 
},
"baarle-nassau": {
boundaryDescription: "Baarle-Hertog and Baarle-Nassau share one of the world’s most complex borders, shaped by centuries of medieval treaties dividing land between the Dukes of Brabant and the Lords of Breda. This political border created numerous Belgian enclaves within the Netherlands and Dutch counter-enclaves, resulting in a patchwork of overlapping jurisdictions. The border’s intricate layout reflects historical land ownership rather than natural or administrative divisions, leading to unique challenges in governance, infrastructure, and daily life. Despite political complexity, the border fosters socio-cultural coexistence, though economic and administrative differences remain evident. This anomaly highlights how historical agreements can produce enduring and intricate borders beyond simple geographic lines.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=baarle-nassau" 
},
"turtuk": {
boundaryDescription: "Turtuk, once part of Baltistan, came under Indian control during the 1971 Indo-Pak war, shifting its status from a Pakistani-administered village to a strategic Indian borderland. This border emerged not through natural geography but through post-colonial conflict and military conquest. The division fractured families, many of whom still communicate via flash drives sent across the Line of Control. As one of five Balti-populated villages now in India, Turtuk embodies a socio-cultural and political border—Muslim-majority in a Buddhist-Hindu region—and a military gateway to Siachen Glacier. Though it remained closed for decades, local efforts led to its 2010 opening, transforming it from a restricted security zone into a rare site of cross-border memory, contested identity, and cautious connection.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=turtuk" 
},
"triple-frontier": {
boundaryDescription: "The Triple Frontier marks the convergence of Argentina, Brazil, and Paraguay at the Iguazú and Paraná rivers, forming a unique tri-border area. Its complexity stems from the intertwined presence of major border cities (Ciudad del Este, Foz do Iguaçu, Puerto Iguazú) and its status as a significant global tourist destination, home to Iguazú Falls. Beyond tourism, the region is a notorious hub for organized crime, including drug and arms trafficking, smuggling, money laundering, and has been cited by some as a financing point for terrorist organizations like Hezbollah and Hamas. This creates a challenging environment where economic reliance on cross-border activity clashes with persistent security concerns and weak institutional control, making it a critical area for regional and international cooperation.",
seeMoreText: commonSeeMoreText,
detailPageUrl: "detail.html?id=triple-frontier" 
},
};

const rows = document.querySelectorAll(".body-row1");

rows.forEach(row => {
  const id = row.getAttribute("data-id");  // data-id 가져오기
  if (id && data[id]) {
    // item-2에 설명 텍스트 넣기
    const item2 = row.querySelector(".dropdown-item.item-2");
    if (item2) {
      item2.innerText = data[id].boundaryDescription;
    }

    // item-3에 a 링크 태그 넣기
    const item3 = row.querySelector(".dropdown-item.item-3");
    if (item3) {
      item3.innerHTML = ""; // 기존 내용 비우기

      const a = document.createElement("a");
      a.className = "slide-link";
      a.href = data[id].detailPageUrl || "#"; // 없으면 #으로
      a.innerText = data[id].seeMoreText;

      item3.appendChild(a);
    }
  }
});




//map box
document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaHllZXMyIiwiYSI6ImNtYjI5enNxbzFocm8yanM2dDl6ZDAyZ3gifQ.IRCkkbbPlddk-a3V6zthSQ';

  const mapContainers = document.querySelectorAll('.map');

  // 이미 초기화된 맵을 저장하는 Set
  const initializedMaps = new Set();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const mapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        if (!initializedMaps.has(container)) {
          const lat = parseFloat(container.dataset.lat);
          const lng = parseFloat(container.dataset.lng);
          const zoom = parseFloat(container.dataset.zoom) || 5;  // 없으면 기본 1

          // 맵 인스턴스 생성
          const map = new mapboxgl.Map({
            container: container,
            style: 'mapbox://styles/hyees2/cm9sjow0q018j01que0xeh0hr',
            center: [lng, lat],
            zoom: zoom,
          });

          // ✨ 커스텀 마커 생성
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker'; // CSS로 정의된 스타일 사용

          new mapboxgl.Marker(markerEl)
            .setLngLat([lng, lat])
            .addTo(map);

          // 초기화된 맵을 Set에 추가
          initializedMaps.add(container);

          // 관찰 중단
          observer.unobserve(container);
        }
      }
    });
  }, observerOptions);

  mapContainers.forEach(container => {
    mapObserver.observe(container);
  });
});



//데이터 각 셀 드롭다운!!!!!!!!!!1
document.addEventListener('DOMContentLoaded', () => {
  // 모든 .body-row1 요소를 선택합니다.
  const bodyRows = document.querySelectorAll('.body-row1');

  bodyRows.forEach(row => {
      // 각 .body-row1 요소에 클릭 이벤트 리스너를 추가합니다.
      row.addEventListener('click', function() {
          // 클릭된 row에 'active' 클래스를 토글합니다.
          this.classList.toggle('active');

          // 다른 모든 열려있는 드롭다운을 닫으려면:
          bodyRows.forEach(otherRow => {
              if (otherRow !== this && otherRow.classList.contains('active')) {
                  otherRow.classList.remove('active');
              }
          });
      });
  });
});



// 되돌아감
document.addEventListener('DOMContentLoaded', () => {
  let idleTime = 0;
  const maxIdleMinutes = 2;  // 분 단위

  function resetIdleTimer() {
    idleTime = 0;
    console.log('Idle timer reset');
  }

  ['mousemove', 'keydown', 'touchstart', 'click'].forEach(event => {
    document.addEventListener(event, resetIdleTimer);
  });

  setInterval(() => {
    idleTime++;
    console.log('Idle time (seconds):', idleTime);
    if (idleTime >= maxIdleMinutes * 60) {
      window.location.href = './intro.html';
    }
  }, 1000);
});

