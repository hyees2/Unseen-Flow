// 뒤로가기 버튼!!!!!!
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("back-button");

  if (backButton) {
    backButton.addEventListener("click", function () {
      const urlParams = new URLSearchParams(window.location.search);
      const sourcePage = urlParams.get('source'); // 'source' 파라미터 값 가져오기

      if (sourcePage === 'gallery') {
        window.location.href = "gallery.html"; // gallery.html에서 왔으면 gallery.html로 이동
      } else if (sourcePage === 'index') {
        window.location.href = "index.html"; // index.html에서 왔으면 index.html로 이동
      } else if (window.history.length > 1) { // source 정보가 없으면 일반 뒤로가기
        window.history.back();
      } else {
        window.location.href = "index.html"; // 폴백 (기본적으로 index.html로)
      }
    });
  }
});




// 1. URL 파라미터에서 ID 추출
const params = new URLSearchParams(window.location.search);
const id = params.get('id');


// 2. crossingType 별 배경색 정의
const typeColors = {
  "Air": "lightblue",
  "Bridge": "lightgreen",
  "Pedestrian": "lightcoral",
  "Rail": "lightgoldenrodyellow",
  "Road": "lightsalmon",
  "Sea": "lightseagreen",
  "River": "lightskyblue",
};




// 3. 데이터셋 정의
const data = {
  "drina-river": {
    title: "Drina River",
    description: "The Drina River has long served as a natural national border, particularly acting as a physical divide between Bosnia and Herzegovina and Serbia. Following the breakup of Yugoslavia, the river became a symbolic line of division, often associated with conflict and collective memory. Although both sides of the river share language and cultural similarities, religious and ethnic differences create an invisible boundary. The river illustrates how identity and living conditions can shift with just one crossing. Bridges across the Drina are limited, and the act of crossing the river itself has often been subject to control and restriction.",
    length: "346 km",
    established: "The Drina River has historically served as a natural boundary. The current political border was established in 1992 following the independence of Bosnia and Herzegovina.",
    Length: "346 km",
    crossingType: ["Air", "Bridge", "Pedestrian", "Rail", "Road", "Sea"],
    status: "Active",
    tags: ["Natural", "Physical", "Political", "Socio-Cultural"],
    lat: 44.8900,
    lng: 19.3540,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "Serbia to Bosnia and Herzegovina",
     visibility: "Medium",
     control: "Moderate",
     bridgeInfo: "1.Passport or national ID card 2.Vehicle registration papers 3.Green Card (international motor insurance certificate) 4.International Driving Permit (recommended).",

     // 두 번째 섹션 정보 추가
    heading2: "Bosnia and Herzegovina to Serbia",
     visibility2: "Medium",
     control2: "Moderate",
     bridgeInfo2: "1.Passport or national ID card 2.Vehicle registration papers 3.Green Card (international motor insurance certificate) 4.International Driving Permit (recommended)"
  },
  "bridge-of-no-return": {
    title: "The Bridge of No Return",
    description: "The Bridge of No Return is located at the western end of the Joint Security Area (JSA) and crosses the Military Demarcation Line (MDL). It was a symbolic site where Korean War prisoners were given the choice to return home or stay in captivity—once crossed, they could never return. The bridge has been unused since 1976, when two U.S. officers were killed by North Korean soldiers. This incident highlights the political tensions between North and South Korea, U.S. involvement, and deep socio-cultural divisions. Today, the bridge stands as a powerful symbol of historical conflict, division, and the legacy of the Cold War",
    length: "170 m",
    established: "1953",
    crossingType: "Bridge",
    status: "Inactive",
    tags: ["Physical", "Political", "Security&Military"],
    lat: 37.9613,
    lng: 126.6699,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "South Korea to North Korea", // ✅ 추가
     visibility: "High",
     control: "Strong",
     bridgeInfo: "The bridge is permanently closed to the public. Access is strictly forbidden.",
    
     // 두 번째 섹션 정보 추가
     heading2: "North Korea to South Korea", // ✅ 추가
     visibility2: "Medium",
     control2: "Weak",
     bridgeInfo2: "AThe bridge is permanently closed to the public. Access is strictly forbidden."
  },
  "schengen-area": {    
    title: "Schengen Area",
    description: `The Schengen Area represents more than just open borders—it embodies a political decision to erase internal frontiers among member states. Politically, it symbolizes European unity and cooperation, yet also highlights exclusion, as non-Schengen EU countries face restricted movement. Socio-culturally, it fosters a shared European identity while marginalizing those from outside, reinforcing an "us vs. them" division. Historically, it marks a shift from a divided Europe—shaped by wars and the Iron Curtain—toward integration, but its controlled external borders echo past mechanisms of surveillance and control. More information on the current reintroductions of internal border controls: <a href="https://home-affairs.ec.europa.eu/policies/schengen/schengen-area/temporary-reintroduction-border-control_en">here</a>.`,
    length: "Varies",
    established: "1985 (Schengen Agreement signed)",
    crossingType: ["Air", "Bridge", "Pedestrian", "Rail", "Road", "Sea"],
    status: "Active",
    tags: ["Administrative", "Economic", "Health&Quarantine", "Informational", "Labor&Financial", "Natural", "Physical", "Political", "Security&Military"],
    lat: 48.8566,
    lng: 2.3522,
    zoom: 3.5,
     // 첫 번째 섹션 정보
     heading1: "Schengen Internal Borders", // ✅ 추가
     visibility: "Lpw",
     control: "Weak",
     bridgeInfo: "Internal border controls are generally absent, allowing free movement between Schengen countries. However, in exceptional cases of serious threats to public policy or internal security, member states may temporarily reintroduce controls, which must be communicated to the EU Council, Parliament, and Commission.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Schengen External Borders", // ✅ 추가
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "External borders are strictly controlled. EU citizens can travel freely with minimal checks, often via automated gates. Third-country nationals must apply for a Schengen visa and are subject to systematic entry/exit checks, supported by the Schengen Information System (SIS), Visa Information System (VIS), Entry-Exit System (EES), and ETIAS. These checks are conducted on behalf of all Schengen States to ensure security while maintaining efficient travel."
  },
  "okubo-bar": {
    title: "Okubo bar",
    description: `An Italian restaurant called Okubo Bar in Shinjuku, Tokyo, sparked outrage after posting a handwritten sign explicitly refusing service to Chinese and Korean customers. The sign, also shared on the restaurant’s official X (formerly Twitter) account, stated that “diversity and tolerance may be fashionable,” but they reject Chinese and Koreans due to "unpleasant thoughts." The discriminatory message, visible at the store entrance, quickly went viral—garnering over 13 million views. More information: <a href="https://www.mk.co.kr/en/world/11071143">here</a>.`,
    length: "N/A",
    established: "Recent incident (2023/2024)",
    crossingType: ["Pedestrian"],
    status: "Active",
    tags: ["Socio-Cultural"],
    lat: 35.69974, 
    lng: 139.69755,
    zoom: 20,
     // 첫 번째 섹션 정보
     heading1: "To Non-Japanese Customers", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "A discriminatory sign explicitly restricts entry for Chinese and Korean customers, with likely verbal reinforcement by staff.",
    
     // 두 번째 섹션 정보 추가
     heading2: "To Japanese Customers",
     visibility2: "High",
     control2: "Weak",
     bridgeInfo2: "Japanese customers face no explicit restrictions and are readily served."
  },
  "the-slash": {
    title: "The Slash",
    description: `The U.S.–Canada “Slash” is a 20-foot-wide deforested corridor stretching 5,525 miles—the longest international land border. Politically, it materializes a cooperative yet controlled boundary between two allied nations, maintained by the International Boundary Commission. Socio-culturally, it symbolizes an invisible yet visible separation, quietly reminding travelers of national identity, even in remote wilderness. Historically, it reflects 19th-century territorial mapping practices, where the border was set at the 49th parallel without GPS, leading to zig-zagging markers and anomalies like the Northwest Angle. More information: <a href="https://www.internationalboundarycommission.org/en/">here</a>.`,
    length: "Approximately 1,349 miles (2,170 km) of the 5,525-mile (8,891 km) border are maintained as The Slash.",
    established: "Formalized by treaties in 1908 and 1925",
    crossingType: ["Air", "Bridge", "Pedestrian", "Rail", "Road", "Sea"],
    status: "Active",
    tags: ["Administrative", "Informational", "Natural", "Physical", "Political", "Security&Military"],
    lat: 45.00490,
    lng: -72.23148,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "U.S. to Canada", 
     visibility: "Medium",
     control: "Moderate",
     bridgeInfo: "Crossing outside designated ports of entry is illegal. Both countries maintain surveillance and patrols to enforce border security.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Canada to U.S.",
     visibility2: "Medium",
     control2: "Moderat",
     bridgeInfo2: "Crossing outside designated ports of entry is illegal. Both countries maintain surveillance and patrols to enforce border security."
  },
  "great-firewall": {
    title: "Great Firewall",
    description: "The Great Firewall of China is a sophisticated political and technological border that separates Chinese cyberspace from the global Internet. Politically, it enforces state control by filtering and blocking foreign websites deemed harmful to government interests. Socio-culturally, it creates a distinct digital ecosystem, isolating Chinese users and promoting domestic alternatives like WeChat and Baidu, shaping online behavior and information access within China. Historically, it emerged in the late 1990s through the Golden Shield Project as a response to rapid Internet growth, aiming to maintain government authority while embracing technology. The Firewall employs techniques such as keyword filtering, DNS poisoning, and TCP reset attacks to monitor and restrict information flow, reinforcing both control and cultural separation in the digital realm.",
    length: "N/A",
    established: "1998",
    crossingType: ["Digital"],
    status: "Active",
    tags: ["Informational", "Political"],
    lat: 39.91666,
    lng: 116.38333,
    zoom: 5,
     // 첫 번째 섹션 정보
     heading1: "Information Flow into China", 
     visibility: "Low",
     control: "Strong",
     bridgeInfo: "Extensive censorship and blocking of foreign websites and platforms. Access to global internet is highly restricted.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Information Flow out of China",
     visibility2: "Medium",
     control2: "Moderate",
     bridgeInfo2: "Content creation and sharing are monitored; attempts to export sensitive information are subject to surveillance."
  },    
  "the-big-bend-national-park": {
    title: "The Big Bend National Park",
    description: "Big Bend National Park sits along a 118-mile stretch of the Rio Grande, marking a natural and political border between the U.S. (Texas) and Mexico (Chihuahua and Coahuila). Politically, it represents a defined frontier zone where two nations meet across a rugged, often inaccessible landscape. Socio-culturally, the park reflects the complex interactions and separations between border communities shaped by geography and history. Established in 1944, the park preserves diverse desert and mountain ecosystems, highlighting both natural beauty and the challenges of maintaining this boundary region. Historically, the Rio Grande’s deep canyons and shifting waters symbolize the fluid yet contested nature of the U.S.–Mexico border, where environmental and human factors continuously shape notions of separation and connection.",
    length: "118 miles (190 km)",
    established: "1944",
    crossingType: ["Pedestrian", "River"],
    status: "Active",
    tags: ["Natural", "Physical", "Political", "Security&Military"],
    lat: 29.25,
    lng: -103.25,
    zoom: 9,
     // 첫 번째 섹션 정보
     heading1: "U.S. to Mexico",
     visibility: "Low",
     control: "Weak",
     bridgeInfo: "There is no ownership of this area. The Rio Grande River is deep and gorge and diverse in its natural environment, so crossing the river is basically unofficial and not left to you. Your compliance is rare, and most crossings are used for unofficial purposes by illegal immigrants or local residents. The river conditions change significantly as a result, and crossing the season is very dangerous, especially during spring events. Those attempting to cross here are exposed to natural hazards such as strong and fast ranges, unstable shapes, etc. In addition, animal appearances and the subject of the action are omitted, which acts as an additional risk factor.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Mexico to U.S.", 
     visibility2: "Low",
     control2: "Weak",
     bridgeInfo2: "There are no official bridges or checkpoints for crossing from Mexico to the United States. The area is a vast, remote desert and mountainous terrain, so border control is relatively weak. Unofficial river crossing routes are used primarily as illegal immigration routes or informal passageways for local residents, and are relatively less heavily monitored than other areas with intensive border patrols. However, border security is not completely absent, and intermittent patrols and surveillance cameras are installed. The harshness of the natural environment, extreme weather, and irregular river flow pose significant risks to those crossing the border. These environmental factors present significant physical risk and uncertainty to those attempting to cross the border."
  },
  "mount-roraima": {
    title: "Mount Roraima",
    description: "Mount Roraima, a dramatic flat-topped mountain rising at the tri-border point of Brazil, Venezuela, and Guyana, serves as both a natural and political boundary marker. Politically, it stands at the intersection of long-disputed territorial claims, particularly between Venezuela and Guyana, making it a symbol of contested sovereignty. Socio-culturally, the mountain is sacred to Indigenous peoples like the Pemon and plays a central role in their cosmologies, contrasting with its appropriation in national boundary narratives. Historically, its remote location delayed colonial mapping efforts, and it became a key reference in defining modern national borders. As the highest point in Guyana and part of the Guiana Highlands, Mount Roraima embodies a confluence of cultural meaning, geopolitical tension, and environmental significance.",
    length: "N/A",
    established: "1931",
    crossingType: ["Pedestrian"],
    status: "Active",
    tags: ["Natural", "Political", "Socio-Cultural"],
    lat: 5.1433,
    lng: -60.7573,
    zoom: 13,
     // 첫 번째 섹션 정보
     heading1: "Access & Ascent", 
     visibility: "Medium",
     control: "Weak",
     bridgeInfo: "Access is primarily for guided treks to the summit, often starting from **Brazil or Venezuela**. There is no official border crossing infrastructure, and informal crossings may occur. Access from the **Guyanese** side is extremely challenging and less common.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Boundary Enforcement", 
     visibility2: "Low",
     control2: "Weak",
     bridgeInfo2: "The tri-border point is physically marked, but the vast, remote area makes continuous surveillance and enforcement difficult for **Brazil, Venezuela, and Guyana** alike. Each nation primarily focuses on controlling its own territorial access."
  },
  "berlin-wall": {
    title: "Berlin wall",
    description: "The Berlin Wall symbolized the Cold War’s sharp political and ideological divide. As a physical and political border, it separated Soviet-controlled East Berlin from capitalist West Berlin to stop the mass exodus of East Germans fleeing repression and economic hardship. The Wall entrenched socio-cultural division, severing families, education, and everyday life across the city. It also became a site of deadly surveillance, with a “death strip” patrolled by armed guards. Historically, it embodied the post-WWII tension between East and West, and its fall in 1989 marked a turning point in the collapse of communist regimes in Eastern Europe and the end of a divided Germany.",
    length: "155 km (96 miles)",
    established: "1961",
    crossingType: ["Pedestrian", "Rail", "Road"],
    status: "Inactive",
    tags: ["Administrative", "Economic", "Informational", "Political", "Security&Military", "Socio-Cultural"],
    lat: 52.5186,
    lng: 13.4083,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "East Berlin to West Berlin",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Extremely strict controls with armed guards and a 'death strip.' Crossing was severely restricted and often fatal.",
    
     // 두 번째 섹션 정보 추가
     heading2: "West Berlin to East Berlin", 
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Limited official checkpoints (e.g., Checkpoint Charlie) with stringent checks for authorized individuals."
  },
  "kashmir-line-of-control": {
    title: "Kashmir",
    description: "Kashmir is a complex borderland in the northwestern Indian subcontinent, fiercely contested by India and Pakistan. The region is bisected by a Line of Control, a de facto political boundary that neither nation officially recognizes, with China also administering parts of eastern Ladakh. This political division is mirrored by sociocultural fragmentation. The Vale of Kashmir is predominantly Muslim, while Jammu is largely Hindu, and Ladakh is primarily Buddhist. This rich tapestry of ethnicities and religions, coupled with a history of only being unified since the mid-19th century, underscores the profound challenges in defining Kashmir's identity as a border region and the enduring nature of the conflict.",
    length: "740 km (460 miles)",
    established: "1972",
    crossingType: ["Pedestrian", "Road"],
    status: "Active (Contested)",
    tags: ["Natural", "Political", "Security&Military", "Socio-Cultural"],
    lat: 34.9333,
    lng: 76.7667,
    zoom: 8,
     // 첫 번째 섹션 정보
     heading1: "Indian-Administered Kashmir to Pakistan-Administered Kashmir", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Extremely limited official crossing points (e.g., Poonch-Rawalakot) for specific purposes, highly restricted and monitored.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Pakistan-Administered Kashmir to Indian-Administered Kashmir",
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Similar highly restricted access and strict military surveillance from both sides; illegal infiltration is a major security concern."
  },
  "himalayas-nathu-la-pass": {
    title: "Himalayas Nathu La Pass",
    description: "Himalayas Nathu La Pass is a strategic mountain pass on the India-China border in Sikkim, historically part of the ancient Silk Road. Politically, it represents a sensitive Indo-Chinese boundary, once sealed after the 1962 war and reopened in 2006 for limited trade and military dialogue. The pass is one of only three official trading routes between the two nations. Socio-culturally, it restricts access to Indian citizens with permits, symbolizing controlled movement and national identity enforcement. Historically, it reflects decades of geopolitical tension, from the 1959 Tibetan uprising to recent border negotiations. Though reopened, trade remains tightly regulated, and the area is marked by ongoing diplomatic caution and surveillance, highlighting the layered complexity of this high-altitude geopolitical border.",
    length: "4,310 m (Elevation above sea level)",
    established: "Closed after the 1962 India-China War, officially reopened July 6, 2006, as one of three trading routes.",
    crossingType: ["Road", "Pedestrian"],
    status: "Active (Limited Access)",
    tags: ["Economic", "Natural", "Political", "Security&Military"],
    lat: 27.38729,
    lng: 88.83108,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "From Sikkim, India to Chumbi Valley, Tibet (China)",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "The Indian side of Nathu La, located in Sikkim, features a prominent border post with military presence and strict access control. Access for Indian citizens requires a permit, and only limited, authorized trade and military movement occurs towards the Chinese side. The border fence and gates are clearly visible, symbolizing the controlled nature of the crossing.",
    
     // 두 번째 섹션 정보 추가
     heading2: "From Chumbi Valley, Tibet (China) to Sikkim, India",
     visibility2: "Medium",
     control2: "Strong",
     bridgeInfo2: "The Chinese side of Nathu La, leading from the Chumbi Valley in Tibet, also maintains a significant border presence with controlled access towards India. While specific details may be less publicly visible, movement is highly regulated, primarily for authorized trade and official purposes. Surveillance and military presence are notable."
  },
  "rio-grande": {
    title: "Rio Grande",
    description: "The Rio Grande, or Río Bravo in Mexico, is a key political border between the U.S. and Mexico, stretching from El Paso/Ciudad Juárez to the Gulf of Mexico. Once central to indigenous irrigation and Spanish colonization, it became a contested boundary during the 1846 Mexican-American War. Shifting channels have altered territories, prompting treaties like the Chamizal settlement. Today, it divides communities with shared cultures and histories, while also symbolizing broader socio-economic divides through migration, maquiladoras, and overuse that leaves the river dry in places. More than a natural boundary, the Rio Grande represents enduring tensions over sovereignty, identity, and shared resources.",
    length: "3051 km (overall river length)",
    established: "1848 (Treaty of Guadalupe Hidalgo)",
    crossingType: ["River", "Road", "Pedestrian", "Rail"],
    status: "Active",
    tags: ["Labor&Financial", "Natural", "Political", "Security&Military", "Socio-Cultural"],
    lat: 29.52806,
    lng: -101.25834,
    zoom: 9,
     // 첫 번째 섹션 정보
     heading1: "U.S. to Mexico",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Numerous bridges and crossing points exist along the Rio Grande, facilitating movement from Mexico into the United States. These crossings are subject to strict U.S. Customs and Border Protection controls, including vehicle inspections and immigration checks. Visibility of border infrastructure and personnel is high.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Mexico to U.S.", 
     visibility2: "High",
     control2: "Medium",
     bridgeInfo2: "Crossings from the United States into Mexico are also numerous, primarily via road and pedestrian bridges. While customs checks are present, they are often less stringent than those entering the U.S., reflecting Mexico's varying immigration and import policies. Control is present but may vary by specific crossing."
  },
  "llívia": {
    title: "Llívia",
    description: "Llívia is a Spanish exclave in France, a historical quirk born from the 1659 Treaty of the Pyrenees. Deemed a town rather than a village, Llívia uniquely remained Spanish while surrounding Cerdanya became French territory. This created a distinct political boundary, historically requiring special passes for residents to cross into mainland Spain. Today, while physical frontier formalities have vanished due to the Schengen Area, Llívia retains its unique identity. Its border with France is marked by 45 numbered stones, remnants of the 1868 demarcation. These markers, often hidden in hedges or fields, symbolize Llívia's enduring social and cultural separation, even as it shares services like a hospital with its French neighbors. This historical anomaly offers a tangible link to a past where geographic and political lines created a truly singular community.",
    length: "12.8 km (perimeter of the exclave)",
    established: "1659 (Treaty of the Pyrenees)",
    crossingType: ["Road", "Pedestrian"],
    status: "Active",
    tags: ["Administrative", "Economic", "Political"],
    lat: 42.46320,
    lng: 1.98062,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "French Cerdanya to Entering Llívia", 
     visibility: "Low",
     control: "Low",
     bridgeInfo: "As Llívia is within the Schengen Area, there are no formal border controls when entering the exclave from surrounding French territory. The border is primarily marked by historical stones and often blends seamlessly into the landscape, reflecting the free movement of people within the EU.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Llívia to French Cerdanya", // ✅ 추가
     visibility2: "Lowm",
     control2: "Low",
     bridgeInfo2: "Similarly, exiting Llívia into France involves no formal checkpoints. The transition is fluid, highlighting the unique historical status of the exclave within the modern European framework. Local roads connect Llívia directly to surrounding French towns without physical barriers."
  },
  "euroairport": {
    title: "EuroAirport Basel-Mulhouse-Freiburg",
    description: "The EuroAirport Basel-Mulhouse-Freiburg stands as a remarkable example of international cooperation, uniquely serving France, Germany, and Switzerland. Established in 1946 as a post-war collaboration, with Switzerland funding and France providing land, it embodies a shared vision transcending national borders. Although located entirely in France, the airport features distinct Swiss and French customs zones, each operating under their respective regulations. This blend of governance highlights the seamless, yet segmented, political boundary. Despite the Schengen Agreement's removal of systematic passport controls for many, customs inspections remain, reflecting ongoing economic and regulatory distinctions. The airport's unique structure, managed by a Franco-Swiss board with German advisors, fosters cultural exchange and regional cooperation, making it a true symbol of tri-national unity at the heart of Europe.",
    length: "N/A",
    established: "1946",
    crossingType: ["Air"],
    status: "Active",
    tags: ["Administrative", "Economic", "Informational", "Labor&Financial", "Political"],
    lat: 47.59746,
    lng: 7.52599,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "International origins to French Zone", 
     visibility: "High",
     control: "Medium",
     bridgeInfo: "Arrivals at EuroAirport disembark into either the French or Swiss customs zone. For passengers entering the French zone, standard EU customs regulations apply. While passport checks are minimal for intra-Schengen flights, customs inspections for goods are always possible, reflecting France's jurisdiction.",
    
     // 두 번째 섹션 정보 추가
     heading2: "International origins to Swiss Zone", 
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Passengers heading to the Swiss zone undergo Swiss customs procedures. Although Switzerland is part of Schengen, its separate customs union means more rigorous checks on goods than those entering the EU. This distinct zone reflects Switzerland's independent customs and tax policies."
  },
  "belarus-pillbox": {
    title: "Three Sisters",
    description: "The Belarus-Russia-Ukraine tripoint, known as The Three Sisters monument, embodies a unique intersection of political boundaries. While intended as a symbol of friendship, visiting this site reveals the intricate realities of its borderlands. The region highlights strict border controls and the challenges of transiting between politically sensitive nations. Despite the monument's symbolic unity, the experience of navigating checkpoints underscores the ongoing socio-cultural separation and varying national regulations. Travelers encounter distinct customs procedures, language barriers, and restrictions on photography, reflecting the area's complex historical and political context. This tripoint is not merely a geographical marker but a tangible representation of geopolitical divisions and the persistent presence of state authority.",
    length: "N/A",
    established: "1975 (Monument)",
    crossingType: ["Road", "Pedestrian"],
    status: "Active",
    tags: ["Informational", "Political", "Security&Military"],
    lat: 52.11207,
    lng: 31.78168,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "Russia/Ukraine side to Three Sisters", // ✅ 추가
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Access to the Belarusian side of the tripoint is extremely restricted. Visitors from Russia or Ukraine approaching the monument will encounter Belarusian border guards and formal checkpoints. Strict controls on documentation, photography, and movement are enforced, reflecting Belarus's tight border security.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Belarus/Ukraine side to Three Sisters", // ✅ 추가
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Similarly, the Russian side of the tripoint is under stringent control. Visitors from Belarus or Ukraine will encounter Russian border authorities. Movement across the actual border lines at the monument is generally forbidden, underscoring the political sensitivity and security measures in place."
  },
  "iron-curtain": {
    title: "Iron Curtain",
    description: "The Iron Curtain was a profound political, military, and ideological barrier that divided Europe from the end of World War II until 1989. Coined by Winston Churchill, it symbolized the Soviet Union's efforts to isolate itself and its Eastern and Central European allies from the West. This curtain wasn't just a metaphor; it manifested as heavily guarded borders, including the Berlin Wall, preventing citizens of Eastern Bloc countries from migrating. It enforced a stark socio-cultural separation through censorship and restricted contact, defining the Cold War's historical context. Its fall in 1989, notably with the opening of the Austria-Hungary border, marked the symbolic end of the Cold War and the collapse of communism, reshaping the political landscape of Europe.",
    length: "7,000 km",
    established: "1947 (Start of Cold War/Formalization of Bloc Division)",
    crossingType: ["Road", "Rail", "Pedestrian"],
    status: "Inactive",
    tags: ["Economic", "Informational", "Physical", "Political", "Socio-Cultural"],
    lat: 48.87216,
    lng: 15.87082,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "Eastern Bloc Nations to Western Europe", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Movement from Eastern Bloc nations towards Western Europe was severely restricted and heavily guarded. This involved formidable physical barriers, extensive patrols, minefields, and strict border controls at designated checkpoints. Unauthorized crossings were often met with deadly force.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Western Europe to Eastern Bloc Nations", // ✅ 추가
     visibility2: "Medium",
     control2: "Strong",
     bridgeInfo2: "Entry from Western Europe into Eastern Bloc nations was also subject to stringent controls, requiring visas and often involving extensive scrutiny at border checkpoints. While the physical barriers were primarily designed to prevent outbound movement, inbound travel was carefully monitored and regulated."
  },
  "dover-strait": {
    title: "Dover Strait",
    description: "The Strait of Dover is a narrow, vital water passage separating England and France, linking the English Channel and the North Sea. Historically, it served as a formidable natural political boundary, often dictating military strategies, as seen in naval battles like the defeat of the Spanish Armada. Despite its narrow width, the strait represented a significant socio-cultural divide for millennia, physically separating the British Isles from mainland Europe until relatively recent geological changes. Its role as a border was transformed with the 1994 completion of the Channel Tunnel, creating an undersea rail link that dramatically altered its historical context from a natural barrier to a key transportation corridor, fostering increased connectivity while remaining a busy international maritime border.",
    length: "34 km",
    established: "Natural boundary since prehistoric times; modern crossing since 1994",
    crossingType: ["Sea", "Rail"],
    status: "Active",
    tags: ["Economic", "Labor&Financial", "Natural", "Political", "Security&Military"],
    lat: 51.0475,
    lng: 1.4883,
    zoom: 8,
     // 첫 번째 섹션 정보
     heading1: "England to France", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Crossing the Strait of Dover from England involves either maritime routes (ferries) or the Channel Tunnel (rail). Both methods are subject to rigorous border and customs controls, reflecting the UK's border policies with mainland Europe. Security measures are highly visible.",
    
     // 두 번째 섹션 정보
     heading2: "France to England", 
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Similarly, movement from France to England across the Strait is heavily regulated. Passengers and goods undergo thorough checks by UK border authorities, particularly given the UK's post-Brexit status. All modes of transport are closely monitored for security and immigration purposes."
  },
  "maginot-line": {
    title: "Maginot Line",
    description: "The Maginot Line was an elaborate, state-of-the-art defensive barrier built by France in the 1930s along its border with Germany. Conceived as an impregnable shield, its construction reflected France's interwar military doctrine favoring static defense and a deep-seated desire to avoid the catastrophic human cost of WWI trench warfare. Though a marvel of engineering for its time, the Line became a symbol of strategic miscalculation. Its failure to extend along the French-Belgian border allowed the Germans to simply outflank it in May 1940, rendering its immense political and financial investment useless. This historical misstep tragically underscored the disconnect between France's defensive mindset and the evolving mobile warfare tactics of WWII, ultimately failing to prevent the political and physical invasion it was designed to prevent.",
    length: "Approx. 750 km",
    established: "1930 (Start of Major Construction)",
    crossingType: ["Road", "Pedestrian"],
    status: "Inactive",
    tags: ["Physical", "Security&Military"],
    lat: 48.96896,
    lng: 7.91276,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "Germany to France", // ✅ 추가
     visibility: "High",
     control: "Strong",
     bridgeInfo: "The Maginot Line was designed to be an impenetrable barrier from the German side, featuring extensive fortifications, bunkers, and obstacles. Its purpose was to deter and halt any advance from the east into French territory, representing a formidable physical and military boundary.",
    
     // 두 번째 섹션 정보 추가
     heading2: "France to Germany", // ✅ 추가
     visibility2: "Medium",
     control2: "Strong",
     bridgeInfo2: "From the French interior, the Maginot Line functioned as a complex military installation with extensive underground networks for logistics and troop movement. Access was strictly controlled by the French military, designed to support the defensive posture rather than facilitate external crossings."
  },
  "gaza-strip": {
    title: "Gaza Strip",
    description: "The Gaza Strip is a densely populated territory marked by complex and often violent border dynamics. Since the 1948 Arab-Israeli War, its boundaries have been fluid and heavily controlled, reflecting a turbulent political boundary shifting between Egyptian, Israeli, and, more recently, Hamas governance. This contested border has created severe socio-cultural separation, isolating Gazans and severely impacting their daily lives through blockades, restricted movement, and high unemployment. The rise of a smuggling industry via tunnels highlighted the desperate need for basic goods, underscoring the severe economic impact of these political divisions. The ongoing conflict and frequent border closures are direct manifestations of the historical context of unresolved disputes and the perpetual struggle for self-determination within a tightly controlled geopolitical space.",
    length: "365 sq km",
    established: "1949 (Armistice Agreements)",
    crossingType: ["Road", "Pedestrian"],
    status: "Active",
    tags: ["Economic", "Informational", "Labor&Financial", "Physical", "Political", "Security&Military", "Socio-Cultural"],
    lat: 31.350,
    lng: 34.350,
    zoom: 8,
     // 첫 번째 섹션 정보
     heading1: "Israel/Egypt to Gaza Strip", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Entry into the Gaza Strip is severely restricted by Israeli and Egyptian authorities, primarily via controlled land crossings like Erez (Israel) and Rafah (Egypt). These points are characterized by extensive physical barriers, checkpoints, and rigorous security procedures, limiting the movement of people and goods.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Gaza Strip to Israel/Egypt",
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Exiting the Gaza Strip is equally challenging and tightly controlled. Movement is permitted only under strict conditions and often for specific humanitarian or authorized purposes. All individuals and goods are subject to intense scrutiny and inspection at the highly militarized crossing points."
  },
  "amazon-rainforest": {
    title: "Amazon Rainforest",
    description: "The Amazon Rainforest serves as a vast, living border across northern South America, primarily within Brazil, but also extending into surrounding nations. While not a conventional political boundary defined by treaties or walls, its immense scale and unique ecosystems create de facto divisions between nations and within them. Historically, this natural border limited human encroachment. However, its modern context is shaped by deforestation and exploitation, reflecting complex economic pressures from agriculture and resource extraction. This has led to environmental and social challenges, blurring the lines between conservation and development. The rainforest's porous nature allows for both illicit activities and the movement of indigenous populations, highlighting a socio-cultural landscape deeply intertwined with, yet constantly threatened by, external pressures.",
    length: "Approx. 5.5 million sq km",
    established: "Natural boundary with gradual political delimitation (19th–20th century treaties)",
    crossingType: ["River", "Air", "Pedestrian"],
    status: "Active",
    tags: ["Natural", "Political", "Socio-Cultural"],
    lat: -2.16310,
    lng: -55.12664,
    zoom: 6,
     // 첫 번째 섹션 정보
     heading1: "Adjacent Regions to Amazon Interior", 
     visibility: "Low",
     control: "Weak",
     bridgeInfo: "Movement into and within the Amazon Rainforest, both across national lines and into deeper interior regions, is primarily by river, small aircraft, or on foot. Formal controls are often minimal or absent due to the vastness and remote nature of the terrain, though local communities and authorities may exert informal control.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Amazon Interior to Adjacent Regions", 
     visibility2: "Low",
     control2: "Weak",
     bridgeInfo2: "Exiting the Amazon interior involves navigating challenging natural landscapes. While formal border checkpoints exist at specific points on national boundaries, much of the rainforest's 'border' is porous, allowing for undocumented movement of people and goods, both legal and illicit, due to the sheer scale and natural barriers."
  },
  "san-ysidro-port-of-entry": {
    title: "San Ysidro Port of Entry",
    description: "The San Ysidro Port of Entry is the Western Hemisphere's busiest land border crossing, fundamentally shaping the political and economic relationship between the U.S. and Mexico. Established in 1906, its ongoing, massive expansion reflects sustained growth and the complex demands of managing vast flows of people and commerce. This border point is a vibrant illustration of socio-cultural exchange, facilitating daily commutes, family visits, and tourism, yet simultaneously serving as a critical security and military checkpoint. Its modern infrastructure, including expanded lanes and advanced inspection, underscores the physical reality of a highly controlled and technologically advanced border. San Ysidro's evolution highlights its pivotal historical role as a gateway, balancing national sovereignty with deep economic and cultural interdependence.",
    length: "Approx. 500m (Checkpoint border segment)",
    established: "1906",
    crossingType: ["Pedestrian", "Road"],
    status: "Active",
    tags: ["Economic", "Informational", "Labor&Financial", "Physical", "Political", "Security&Military"],
    lat: 32.54449,
    lng: -117.02969,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "U.S. to Mexico", // ✅ 추가
     visibility: "High",
     control: "Medium",
     bridgeInfo: "Vehicular and pedestrian crossings are managed with inspection booths and customs procedures.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Mexico to U.S.", // ✅ 추가
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Vehicular and pedestrian crossings are managed with extensive primary and secondary inspection areas, customs, and immigration procedures."
  },
  "kuwait-saudi-arabia-zone": {
    title: "Kuwait Neutral Zone",
    description: "The Kuwait-Saudi Neutral Zone is a unique border area, originally established after World War I due to undefined boundaries. Spanning approximately 5,180 sq km, it primarily represents a political and economic border defined by shared natural resource rights, rather than clear sovereignty. While formally partitioned in 1965, both nations continue to equally share oil revenues, highlighting an enduring economic interdependence. This historical arrangement underscores the dynamic nature of international boundaries, where political agreements prioritize shared resources over absolute territorial control. The zone's evolution from an isolated area to a focus of regional politics due to expanding oil exploration showcases how resource potential can shape and complicate border definitions.",
    length: "5,180km²",
    established: "1922 (Uqair Protocol)",
    crossingType: ["Road"],
    status: "Active",
    tags: ["Administrative", "Economic", "Political"],
    lat: 28.4473,
    lng: 47.8621,
    zoom: 7,
     // 첫 번째 섹션 정보
     heading1: "Neutral Zone to Resource Areas", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Access from Kuwait into the former Neutral Zone—now divided yet jointly utilized for resource extraction—is strictly regulated. Entry is limited to authorized personnel involved in oil operations. Movement is monitored through designated checkpoints with a strong military and surveillance presence.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Resource Areas to Neutral Zone", 
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Similarly, access from Saudi Arabia into the shared oil production areas of the former Neutral Zone is highly restricted. Designated checkpoints enforce strict permit requirements for personnel and vehicles. Security measures are intensive due to the region's economic and strategic significance."
  },
  "refugee-camps": {
    title: "Zaatari refugee camp",
    description: "Za'atari Refugee Camp, in Jordan, emerged a decade ago as a makeshift border crossing for Syrians fleeing conflict. Rapidly growing to house 80,000 refugees, it symbolizes the political boundary created by war and the ensuing humanitarian crisis. This border is defined by socio-cultural separation, as its inhabitants, many born within its confines, live separated from their homeland, yet strive to maintain Syrian culture. The camp's self-sustaining market and services highlight an internal, albeit fragile, economic system. Managed by UNHCR and Jordan, Za'atari embodies a de facto administrative border, representing a complex, long-term displacement shaped by ongoing geopolitical instability and the hope of eventual return.",
    length: "Approx. 5.2 sq km",
    established: "2012 (Opened)",
    crossingType: ["Pedestrian", "Road"],
    status: "Active",
    tags: ["Administrative", "Health&Quarantine", "Informational", "Socio-Cultural"],
    lat: 32.29566,
    lng: 36.32375,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "Jordan/Syria to Zaatari Camp",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Entry into Zaatari Camp is tightly controlled by Jordanian authorities and UNHCR. New arrivals, primarily from Syria, undergo registration and security checks. Access for humanitarian workers and supplies is also regulated, with visible checkpoints and perimeter fencing.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Zaatari Camp to Jordan/Syria", 
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Exiting Zaatari Camp is also strictly managed. Refugees typically require permission to leave the camp, and their movement is monitored to ensure safety and compliance with regulations. The aim is to manage a contained environment while providing essential services."
  }, 
  "tumen-river": {
    title: "Tumen River",
    description: "The Tumen River, originating from Mount Paektu, forms a significant natural border separating North Korea from China and Russia. Stretching 521 km, it has historically served as a crucial passage for cultural exchange and migration, often under duress. Its political boundary function intensified through periods of dynastic power struggles and, tragically, during Japan's colonial rule, when Koreans crossed it seeking refuge. This river remains a poignant symbol of socio-cultural separation, embodying both a historical migration route and a contemporary barrier, profoundly impacting the lives of those on its banks. Despite its limited navigability, its strategic location continues to shape regional dynamics and the livelihoods of border communities.",
    length: "521 km (river length)",
    established: "Early 20th century (formalized by 1909 Gando Convention)",
    crossingType: "Bridge",
    status: "Active",
    tags: ["Economic", "Labor&Financial", "Natural", "Political", "Security&Military", "Socio-Cultural"],
    lat: 42.49560,
    lng: 129.60199,
    zoom: 9,
     // 첫 번째 섹션 정보
     heading1: "North Korea towards China/Russia (via Tumen River)",
     visibility: "Medium",
     control: "Strong",
     bridgeInfo: "Movement from North Korea across the Tumen River into China or Russia is severely restricted and often illegal. While some official bridges exist for limited trade, many attempts involve clandestine crossings, facing extreme danger from border patrols and the natural elements. Security is extremely high on the DPRK side.",
    
     // 두 번째 섹션 정보 추가
     heading2: "China/Russia towards North Korea (via Tumen River)", 
     visibility2: "Medium",
     control2: "Strong",
     bridgeInfo2: "Movement from China or Russia into North Korea across the Tumen River is also tightly controlled, primarily via official border crossings for authorized personnel and trade. Informal crossings are dangerous and illegal, with both Chinese/Russian and DPRK authorities maintaining strict surveillance of the river banks."
  },
  "ceuta-melilla": {
    title: "Ceuta and Melilla",
    description: "Ceuta and Melilla, two Spanish exclaves in North Africa, mark the only land borders between the EU and Africa. Surrounded by high double fences topped with barbed wire, these borders aim to prevent irregular migration from Morocco. Politically, they represent EU external frontiers, though situated on African soil. Socially and culturally, they embody separation—European-administered cities with a Christian majority bordering largely Muslim Moroccan regions. Historically, both cities have been sites of colonial control, military significance, and symbolic resistance—retained by Spain even after Morocco's independence in 1956. Frequent attempts by African migrants to cross the fences, often facing violence and humanitarian crises, have made Ceuta and Melilla flashpoints in debates on migration, security, and Europe's colonial legacy.",
    length: "Ceuta: 8.4 km fence; Melilla: 12 km fence",
    established: "1990s-2000s (Current Fence Construction)",
    crossingType: ["Road", "Pedestrian"],
    status: "Active",
    tags: ["Economic", "Informational", "Labor&Financial", "Physical", "Political", "Security&Military"],
    lat: 35.29252,
    lng: -2.93647,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "Morocco to Spanish Exclaves (Ceuta/Melilla)",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Entry into Ceuta and Melilla from Morocco is through heavily fortified land border crossings with multiple fences, barbed wire, and surveillance. Spanish and Moroccan authorities jointly manage these points, with strict immigration and customs checks. Attempts at irregular crossings are common and often result in significant security challenges.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Spanish Exclaves (Ceuta/Melilla) to Morocco", // ✅ 추가
     visibility2: "High",
     control2: "Medium",
     bridgeInfo2: "Exiting Ceuta and Melilla into Morocco also involves formal border procedures, though these may be somewhat less intensive than entering the exclaves. Moroccan authorities conduct their own checks. The high fencing remains visible, symbolizing the continued political and physical separation."
  },
  "green-line": {
    title: "The Green Line",
    description: "The Green Line is a UN-controlled buffer zone dividing Cyprus since 1974, marking the de facto border between the Greek Cypriot south (RoC) and Turkish Cypriot north (TRNC). It reflects deep political conflict, ethnic division, and colonial legacies. In Nicosia, once-bustling streets like Ermou lie abandoned, symbolizing social fragmentation. Though heavily militarized, parts of the zone now house civilians and wildlife. Its layered history and uncertain future raise questions: reclaim, preserve, or transform?",
    length: "Approx. 180 km (total length across Cyprus)",
    established: "1974 (Turkish invasion/UN demarcation)",
    crossingType: ["Pedestrian", "Road"],
    status: "Active",
    tags: ["Economic", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
    lat: 35.19390,
    lng: 33.38960,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "Greek Cypriot South to Turkish Cypriot North",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Designated crossing points along the Green Line, such as Ledra Street in Nicosia, allow pedestrian and vehicular movement between the Greek Cypriot South and the Turkish Cypriot North. These crossings involve identity checks by both sides and UN observation, reflecting the political divide.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Turkish Cypriot North to Greek Cypriot South",
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Similarly, movement from the Turkish Cypriot North into the Greek Cypriot South is managed through official crossing points. Travelers undergo checks by TRNC and Republic of Cyprus authorities, under the watchful eye of UN peacekeepers, highlighting the sensitive and controlled nature of the border."
  },
  "shenzhen-checkpoints": {
    title: "Shenzhen Checkpoints",
    description: "Shenzhen features a comprehensive system of land and sea checkpoints facilitating convenient travel to Hong Kong and Macao. Major land ports include Futian, Luohu, Huanggang, Shenzhen Bay, Liantang, Wenjindu, and Shatoujiao. Each checkpoint varies in capacity, infrastructure, and operating hours. Futian and Luohu are key metro-connected pedestrian crossings, while Huanggang and Shenzhen Bay support large-scale passenger and cargo movement. West Kowloon Station in Hong Kong connects via high-speed rail under a “two inspections in one place” model. Sea routes operate via Shekou Port and Daya Bay Port (private). These ports reflect “One Country, Two Systems,” enabling seamless integration within the Greater Bay Area while maintaining separate administrative controls and inspections.",
    length: "N/A (System of multiple checkpoints)",
    established: "Futian (2007), Shenzhen Bay (2007), Luohu (1999+), Huanggang (1999), Liantang (2017), Wenjindu (1989), Shatoujiao (1980s)",
    crossingType: ["Road", "Rail", "Pedestrian", "Sea"],
    status: "Active",
    tags: ["Administrative", "Economic", "Informational", "Labor&Financial", "Physical", "Security&Military"],
    lat: 22.50611,
    lng: 113.94472,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "Mainland China to Hong Kong/Macao", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Shenzhen's checkpoints facilitate high-volume crossings from mainland China into Hong Kong and Macao. Travelers undergo PRC immigration and customs checks. Land crossings (e.g., Futian, Luohu for pedestrians; Huanggang, Shenzhen Bay for vehicles) and sea routes are equipped with advanced facilities to manage passenger and cargo flows.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Hong Kong/Macao to Mainland China", // ✅ 추가
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Followed by PRC immigration/customs. The 'two inspections in one place' model at West Kowloon Station simplifies high-speed rail transit, but overall control remains stringent for all modes of transport."
  },
  "mount-everest": {
    title: "Mount Everest Summit Zone",
    description: "Mount Everest, the world's highest peak, serves as a fundamental natural border between Nepal and Tibet (China). Its formidable terrain acts as a physical barrier, yet it has evolved into a significant political boundary, notably with China's separation line policy reflecting geopolitical sensitivities. Historically, Everest fostered deep socio-cultural ties with the indigenous Sherpa people, shaping their lives and traditions. However, modern climbing has transformed it into a contested space, highlighting national ambitions, environmental concerns, and the stark realities of human endurance and tragic losses. It's a living border where natural grandeur meets complex human challenges.",
    length: "8,848m (elevation)",
    established: "Natural border historically recognized; formal boundary agreement between Nepal and China finalized in 1961",
    crossingType: ["Pedestrian"],
    status: "Active",
    tags: ["Natural", "Political"],
    lat: 27.9881,
    lng: 86.9253,
    zoom: 15,
     // 첫 번째 섹션 정보
     heading1: "Nepal Side Ascent to Summit/Tibet Borde",
     visibility: "High",
     control: "Medium",
     bridgeInfo: "Climbers ascending Mount Everest from the Nepal side (South Col route) approach the summit, which forms the border with Tibet. While there's no physical border post, a 'line of separation' is enforced by Chinese authorities, requiring permits and adherence to strict climbing regulations from the Nepali side.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Tibet Side Ascent to Summit/Nepal Border",
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "Climbers on the Tibetan side (North Ridge route) also ascend towards the summit, encountering the border with Nepal. Chinese authorities maintain very tight control over permits and routes, often enforcing a strict separation from climbers on the Nepali side, reflecting the geopolitical sensitivity of the summit."
  },
  "calais-jungle": {
    title: "Calais Jungle Migrant Camp",
    description: "The Calais Jungle was a sprawling, informal migrant encampment near Calais, France, serving as a desperate borderland for those attempting to cross into the UK. Its existence and forced dismantling in 2016 highlight a critical political boundary dispute between France and the UK, exacerbated by the Le Touquet Treaty which effectively moved the UK's border to French soil. This site starkly revealed a profound socio-cultural separation, with migrants living in squalid conditions, largely unseen by the surrounding Calaisfornia. Its historical context is rooted in decades of migration flows, culminating in a highly militarized landscape designed to deter crossings, pushing migrants into increasingly precarious situations and fueling local anti-immigration sentiments.",
    length: "Approx. 0.75 sq km",
    established: "Mid-2015 (Informal formation)",
    crossingType: ["Pedestrian"],
    status: "Inactive",
    tags: ["Administrative", "Health&Quarantine", "Informational", "Physical", "Socio-Cultural"],
    lat: 50.95446,
    lng: 1.86280,
    zoom: 10,
     // 첫 번째 섹션 정보
     heading1: "Calais to UK Attempted Crossings",
     visibility: "High",
     control: "Strong",
     bridgeInfo: "From the Calais Jungle, migrants attempted to cross into the UK, primarily via lorries, trains, or informal sea routes across the English Channel. This involved navigating extensive physical barriers, security forces, and adverse conditions, reflecting a desperate and often perilous journey with high levels of interdiction.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Movement Within Calais Area",
     visibility2: "Medium",
     control2: "Medium",
     bridgeInfo2: "The 'Jungle' itself was an informal settlement where migrants gathered, often having traveled through Europe. Movement into and within the Calais area was influenced by the presence of the camp and the heavy security response aimed at preventing irregular border crossings into the UK."
  },
  "aral-sea": {
    title: "Aral Sea",
    description: "The Aral Sea, straddling the natural border between Kazakhstan and Uzbekistan, was once Central Asia's fourth-largest lake. Its drastic shrinkage, primarily due to Soviet-era irrigation diversions, has transformed it into a stark ecological boundary where once-submerged land is now a salt-encrusted desert. This environmental disaster created severe socio-cultural impacts, devastating the local fishing industry and causing widespread health problems due to toxic dust storms. Historically, the sea thrived until ambitious agricultural policies fundamentally altered its water balance. Today, the Aral Sea stands as a poignant reminder of human-induced environmental destruction and the urgent need for international cooperation to address ecological challenges.",
    length: "Approx. 400 km",
    established: "Significant shrinkage since 1960s due to Soviet irrigation",
    crossingType: ["Sea"],
    status: "Active",
    tags: ["Natural", "Political"],
    lat: 45.13194,
    lng: 60.07541,
    zoom: 8,
     // 첫 번째 섹션 정보
     heading1: "Kazakhstan to Uzbekistan", 
     visibility: "Medium",
     control: "Weak",
     bridgeInfo: "The former lakebed on the Kazakhstan side is now a desert-like landscape with salt flats and makeshift dirt tracks. Crossing is difficult and limited to specialized off-road vehicles, with no formal border infrastructure.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Uzbekistan to Kazakhstan",
     visibility2: "Medium",
     control2: "Weak",
     bridgeInfo2: "Similarly, the Uzbekistan side features a dry, harsh environment with sparse infrastructure. Crossing the former sea bed is mainly possible by off-road vehicles or foot but lacks official crossing points."
  },
  "panama-Canal-Zone": {
    title: "Panama Canal Zone",
    description: "From 1903 to 1979, the U.S. controlled the Panama Canal Zone, a 10-mile-wide strip that split Panama and created separate administrative zones. The U.S. oversaw key functions like tolls, labor, health, and security, limiting Panama’s sovereignty. Although the zone was fully returned to Panama in 1999, the canal remains vital to global trade and geopolitics. Recently, U.S. concerns have grown over China's increasing presence, particularly through companies managing port facilities at both ends of the canal. Washington views this as a potential threat to its strategic interests amid U.S.-China rivalry. Despite these tensions, Panama continues to assert its neutrality and sovereign control over the canal.",
    length: "80 km (length of canal)",
    established: "1903 (U.S. control established)",
    crossingType: ["Rail", "Road", "Sea"],
    status: "Active (as a global transit route under Panamanian control)",
    tags: ["Administrative", "Economic", "Political", "Security&Military"],
    lat: 9.02404,
    lng: -79.61741,
    zoom: 12,
     // 첫 번째 섹션 정보
     heading1: "Atlantic to Pacific", 
     visibility: "High",
     control: "Strong",
     bridgeInfo: "Ships transiting from Colón to Panama City must comply with ACP (Panama Canal Authority) regulations, including advance scheduling, pilotage requirements, and toll payments based on vessel size and cargo. Security screening is standard, with stricter checks for flagged or high-risk vessels.",
    
     // 두 번째 섹션 정보 추가
     heading2: "Pacific to Atlantic",
     visibility2: "High",
     control2: "Strong",
     bridgeInfo2: "South-to-north transit requires similar ACP procedures: electronic pre-booking, mandatory canal pilots, environmental compliance (e.g., ballast water management), and customs inspection at exit. Vessel priority may be influenced by cargo type or urgency (e.g., LNG ships receive fast-track status)."
  },
"chernobyl-exclusion-zone": {
  title: "Chernobyl Exclusion Zone",
  description: "The Chernobyl Exclusion Zone, created after the 1986 nuclear disaster, serves as a physical, political, and socio-cultural border. Marked by dangerous radiation, it restricts human habitation and access, functioning as a health and quarantine zone. Initially managed by the Soviet Union, it is now under Ukrainian control. The disaster displaced thousands and created long-term economic and environmental impacts, including unusable agricultural land. Although permanent residents are absent, monitoring and cleanup activities continue. Entry is tightly controlled through permits, forming an administrative border. The Zone also holds strategic importance, highlighted by military involvement during both the original disaster response and the 2022 Russian invasion. Despite its hazards, the area remains closely managed for safety, research, and security purposes.",
  length: "Approx. 2,600 sq km (area of zone)",
  established: "1986",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Health&Quarantine", "Natural", "Security&Military"],
  lat: 51.29541,
  lng: 30.22270,
  zoom: 10,
   // 첫 번째 섹션 정보
   heading1: "Dytyatky to Northern Zone Interior",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Entry from the south requires a government-issued permit, identity verification, and radiation safety briefing. Entry is allowed only with an official guide or escort, and subject to security screening and health protocols.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Northern Zone Interior to Dytyatky", 
   visibility2: "Medium",
   control2: "Medium",
   bridgeInfo2: "Exit requires decontamination checks, radiation badge scans, and clearance by security. Unauthorized materials or samples are strictly prohibited from being taken out of the zone."
},
"checkpoint-charlie": {
  title: "Checkpoint Charlie",
  description: "Checkpoint Charlie was a key Cold War border dividing East and West Berlin. It served as the main crossing for foreigners, dignitaries, and Allied personnel, symbolizing the broader political and ideological divide. The East side was heavily fortified with barriers and surveillance, while the West had a more open layout. Though it allowed limited movement, its main role was to enforce separation, both physically and socio-culturally. The checkpoint became a focal point for escape attempts, reflecting the human cost of division. It also had strong informational and propaganda value, widely featured in media and spy fiction. While not an economic trade hub, it impacted labor and daily life by regulating the flow of people. Its closure in 1990 marked the end of Berlin’s division and the Cold War era.",
  length: "Approx. 100–200 meters (checkpoint and adjacent controlled zone)",
  established: "1961",
  crossingType: ["Pedestrian", "Road"],
  status: "Inactive (historical site)",
  tags: ["Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 52.50743,
  lng: 13.390271,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "East Berlin Side to West Berlin Side",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Crossing required documentation including foreign passports, diplomatic papers, or military authorization. East German guards performed strict screening and interrogations. Escape attempts were severely punished.",
  
   // 두 번째 섹션 정보 추가
   heading2: "West Berlin Side to East Berlin Side", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Entry to East Berlin required special visas, with visits often monitored by Stasi (secret police). Westerners could visit for limited periods but faced surveillance and restrictions on movement."
},
"svalbard-archipelago": {
  title: "Svalbard Archipelago",
  description: "The Svalbard Archipelago serves as a unique border due to its Arctic location and the 1920 Svalbard Treaty. While under Norwegian sovereignty, the treaty allows citizens of signatory nations equal rights to economic activities, especially resource extraction, creating an open-access economic border. Harsh natural conditions isolate it physically, though it remains seasonally accessible. Its non-indigenous, transient population requires specific health protocols. Historically contested for resources, Svalbard now sees active coal mining by Norway and Russia. The area remains demilitarized, with limited security presence, though maritime disputes have occurred. Scientific research and environmental monitoring, such as the Global Seed Vault, are central. Lacking indigenous culture, Svalbard hosts a temporary, international community focused on mining, tourism, and research. This balance of Norwegian control and international access defines its porous Arctic border status.",
  length: "Approx. 61,022 sq km (area of archipelago)",
  established: "1920 (Svalbard Treaty)",
  crossingType: ["Air", "Sea"],
  status: "Active",
  tags: ["Administrative", "Economic", "Natural", "Political"],
  lat: 78.60212,
  lng: 17.02994,
  zoom: 4,
   // 첫 번째 섹션 정보
   heading1: "Mainland Norway to Svalbard",
   visibility: "Medium",
   control: "Medium",
   bridgeInfo: "No passport checks for Schengen citizens, but health and environmental protocols apply. Travel requires proof of accommodation or work/study purpose. Customs checks occur for certain goods.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Svalbard to Mainland Norway", 
   visibility2: "Medium",
   control2: "Medium",
   bridgeInfo2: "Return to mainland includes standard customs procedures. Due to Svalbard's special status outside the Schengen VAT area, imported goods may be taxed. Health checks apply seasonally (e.g., during flu/COVID outbreaks)."
},
"guantanamo-bay": {
  title: "Guantanamo Bay",
  description: "Guantánamo Bay is a contested U.S. naval base within Cuban territory, operating under a 1903 treaty that grants the U.S. full control despite Cuba’s objections. Primarily serving military and security functions, it gained global attention as a detention site for alleged Muslim militants, sparking controversy over human rights and legal protections. The base also processes migrants and serves as a health and quarantine zone. Isolated from Cuban infrastructure, it maintains self-sufficient water and energy systems, forming a distinct economic and labor enclave. Its existence creates a socio-cultural divide, raising debates on constitutional rights and international law. With a deep natural harbor and strategic location, Guantánamo remains a highly symbolic and politically complex border space.",
  length: "Approx. 117 sq km (area of base)",
  established: "1903 (lease agreement)",
  crossingType: ["Road", "Sea"],
  status: "Active",
  tags: ["Administrative", "Physical", "Political", "Security&Military"],
  lat: 19.90666,
  lng: -75.14666,
  zoom: 10,
   // 첫 번째 섹션 정보
   heading1: "Cuban Mainland to U.S. Naval Base", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "ccess is highly restricted. Entry allowed only for U.S. military personnel, contractors, or authorized visitors via controlled checkpoints. Cuban citizens are prohibited without special U.S. government clearance.",
  
   // 두 번째 섹션 정보 추가
   heading2: "U.S. Naval Base to Cuban Mainland",
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Exit to Cuba is restricted to pre-approved personnel and typically requires U.S. and Cuban authority coordination. Movements are logged, and unauthorized crossing is considered a security violation."
},
"karakoram-highway": {
  title: "Karakoram Highway",
  description: "The Karakoram Highway (KKH) acts as a significant physical and political border, carving a 1,300km path through the world's most formidable mountain ranges (Himalayas, Karakoram, Hindu Kush) to link China and Pakistan. This joint administrative project, built by 24,000 laborers, navigates extreme natural terrain, including the 4,800m Khunjerab Pass, demanding continuous maintenance. Economically, the KKH unlocked remote areas for trade and tourism, yet also presented environmental challenges. Its profound socio-cultural impact lies in connecting diverse ethnic groups like the Uyghurs, Tajiks, and the unique communities of the Hunza Valley (Burusho, Wakhi). While fostering modernization, it also highlights local efforts to preserve distinct traditions and support female entrepreneurship. Though not explicitly a military checkpoint, its strategic link between two nations imbues it with inherent security relevance.",
  length: "1,300 km (int’l highway China–Pakistan)",
  established: "1959–1979 (completed), opened 1986",
  crossingType: ["Road"],
  status: "Active",
  tags: ["Economic", "Physical", "Political", "Socio-Cultural"],
  lat: 35.59999,
  lng: 74.65000,
  zoom: 9,
   // 첫 번째 섹션 정보
   heading1: "Pakistan (Hasan Abdal) to China (Kashgar)", 
   visibility: "Medium",
   control: "Strong",
   bridgeInfo: "Pakistani citizens need special permits to access Khunjerab Pass. Chinese customs at the border check passports, visas, and cargo. Security is heightened due to geopolitical sensitivities.",
  
   // 두 번째 섹션 정보 추가
   heading2: "China (Kashgar) to Pakistan (Hasan Abdal)", 
   visibility2: "Medium",
   control2: "Strong",
   bridgeInfo2: "Chinese citizens require special exit documentation and Pakistani visas. Trucks and travelers are screened by Pakistani border forces at Sost. Surveillance increases in Gilgit-Baltistan due to security concerns."
},
"un-buffer-zone": {
  title: "UN Buffer Zone",
  description: `The UN Buffer Zone, or "Green Line," is a 180km physical and political border in Cyprus, separating Greek and Turkish Cypriots since 1974. Under UNFICYP's administrative control, it's a demilitarized security & military zone. While enforcing separation, it hosts "Civil Use Areas" like Pyla, where over 10,000 people live, fostering unique socio-cultural interactions. Economically, parts are farmed, but much remains abandoned, preserving a unique natural environment. UNFICYP's presence ensures environmental protection and manages incidents. Though not a typical health & quarantine border, its controlled nature indirectly aids public safety. Ongoing informational monitoring and recently opened crossing points signal evolving normalization efforts across this complex, yet inhabited, boundary.`,
  length: "N/A",
  established: "1974",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Physical", "Political", "Security&Military"],
  lat: 35.18724,
  lng: 33.35731,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "Greek Cypriot South to Turkish Cypriot North", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Crossings allowed only at designated UN checkpoints. Identification checks, vehicle inspection, and UN monitoring apply. Political tensions may impact temporary closures.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Turkish Cypriot North to Greek Cypriot South", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Return movement also occurs only through official crossings. Passports or IDs checked. UN patrols monitor compliance and intercommunal disputes at the crossings."
},
"canadian-arctic-waters": {
  title: "Canadian Arctic Waters",
  description: "Canada's Arctic waters form a complex, evolving border critical to its sovereignty. Historically, extreme cold provided natural and physical defense, creating a robust security & military barrier. However, climate change now makes this border permeable; thinning ice hinders military operations and thaws permafrost. Politically, Canada's claim over the Northwest Passage as internal waters faces international contestation, generating informational disputes. Increased accessibility boosts economic interest in resources and shipping, challenging Canadian control. Administratively, Canada asserts presence via the Canadian Rangers (Indigenous paramilitary forces) and historical actions like Inuit relocations, which underpin socio-cultural aspects of its claim. While direct health & quarantine isn't a primary focus, the harsh, changing environment presents unique challenges. The Arctic is transforming from a frozen defense to a vulnerable frontier.",
  length: "1M+ km²",
  established: "Ongoing (evolving sovereignty claims)",
  crossingType: ["Sea", "Air"],
  status: "Active",
  tags: ["Economic", "Natural", "Political", "Security&Military"],
  lat: 75,
  lng: -90,
  zoom: 4,
   // 첫 번째 섹션 정보
   heading1: "Southern Canada to Arctic Archipelago",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Military, scientific, and Indigenous travel require approval. Maritime and aerial routes face customs and environmental regulations. Canadian Rangers help enforce sovereignty in remote zones.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Arctic Archipelago to Southern Canada",
   visibility2: "Medium",
   control2: "Medium",
   bridgeInfo2: "Vessels returning from Arctic require environmental compliance checks. Some routes overlap disputed waters. Indigenous movements often exempt from certain permits, though still monitored."
},
"enclaves": {
  title: "India–Bangladesh Enclaves",
  description: `The India-Bangladesh enclaves were a deeply complex physical and political border issue. These "chhits"—162 land pockets totally surrounded by foreign territory—rendered 50,000 residents stateless for nearly 70 years. Lacking administrative and legal recognition, they were deprived of basic economic and civil rights, including access to services, causing severe labor & financial hardship and a profound socio-cultural identity crisis. The often-shifting natural riverine border exacerbated land disputes. Security & military incidents were frequent. Decades of bilateral informational efforts, notably the 1974 Indira-Mujib Agreement, culminated in the 2015 Land Boundary Agreement. This landmark accord facilitated the exchange of enclaves, formalizing control and granting long-awaited citizenship, thus resolving a century-old border anomaly.`,
  length: "Approx. 170 km²",
  established: "1947 (partition), resolved in 2015",
  crossingType: ["Pedestrian", "Road"],
  status: "Inactive (resolved)",
  tags: ["Administrative", "Economic", "Physical", "Political", "Socio-Cultural"],
  lat: 26.14520,
  lng: 89.51200,
  zoom: 10,
   // 첫 번째 섹션 정보
   heading1: "India Mainland to Former Bangladeshi Enclave",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Before 2015, movement required informal negotiation or illegal crossings. Post-2015, integration allows free travel, though formal ID and land registration is required to access services.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Bangladesh Mainland to Former Indian Enclave", 
   visibility2: "Medium",
   control2: "Medium",
   bridgeInfo2: "After the enclave exchange, residents gained formal citizenship. Travel into mainland India or Bangladesh now regulated under standard national border controls."
},
"cross-strait": {
  title: "Cross Strait",
  description: `The Taiwan Strait is a highly contested political and physical border separating mainland China (PRC) and Taiwan (ROC). China claims Taiwan as a breakaway province under its "One China" policy, while Taiwan, a democratic state, balances between independence and maintaining the status quo. Military tensions are high, with China's growing force projection and the U.S. upholding strategic ambiguity. There is no formal administrative border, complicating diplomacy and international recognition. Despite this, cross-strait economic ties remain strong, though China’s leverage causes concern. Movement of labor and capital is tightly regulated. Culturally, Taiwan’s evolving identity further deepens the divide. While not a natural barrier, the Strait acts as a geographic and strategic divide, with health and quarantine measures—like during COVID-19—highlighting restricted, complex interactions across this sensitive border.`,
  length: "Approx. 180 km (at narrowest point)",
  established: "1949 (effective separation)",
  crossingType: ["Air", "Sea"],
  status: "Active",
  tags: ["Economic", "Informational", "Labor&Financial", "Political", "Security&Military", "Socio-Cultural"],
  lat: 24.80666,
  lng: 119.92366,
  zoom: 6,
   // 첫 번째 섹션 정보
   heading1: "Taiwan to Mainland China", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Cross-strait crossings are tightly controlled with limited official permissions, mostly by sea and air.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Mainland China to Taiwan", 
   visibility2: "Medium",
   control2: "Strong",
   bridgeInfo2: "Access from Mainland China to Taiwan is restricted and monitored, with strict political oversight."
},

"silk-road": {
  title: "Silk Road (Historical Trade Route)",
  description: "The Silk Road was an ancient, sprawling physical trade network, effectively a cultural borderland linking China with the West for centuries. Primarily an economic conduit for goods like silk, wool, and precious metals, it also facilitated the socio-cultural exchange of ideas, including the spread of Buddhism and Nestorian Christianity from India to China.This vast natural pathway, traversing mountains and deserts, faced security & military threats over time, becoming unsafe before its revival under the Mongols. It acted as a crucial informational artery, transmitting knowledge and even pathogens like the Black Death. While not a formal administrative border, its various segments were controlled by different empires and middlemen. Modern counterparts, like the Karakoram Highway and proposed UN trans-Asian routes, underscore its enduring legacy as a symbol of cross-continental connectivity and cultural exploration, as exemplified by projects like Yo-Yo Ma's Silk Road Project.",
  length: "Approx. 6,400 km (main routes)",
  established: "Circa 2nd Century BCE",
  crossingType: ["Pedestrian", "Road", "Rail"],
  status: "Inactive",
  tags: ["Administrative", "Economic", "Informational", "Natural", "Socio-Cultural"],
  lat: 12.91724,
  lng: 77.62295,
  zoom: 4,
   // 첫 번째 섹션 정보
   heading1: "China to Central Asia/Europe",
   visibility: "Medium",
   control: "Varied",
   bridgeInfo: "Merchants faced diverse regulations across numerous kingdoms and empires. This included tolls, customs duties at fortified cities and mountain passes, and requirements for safe passage. Security was a major concern, with caravans hiring guards to protect against bandits. Water and provisions were regulated at caravanserai and oases. Formal passports or permits were sometimes required by local authorities, though their enforcement varied greatly.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Europe/Central Asia to China",
   visibility2: "Medium",
   control2: "Varied",
   bridgeInfo2: "Travelers and traders moving eastward encountered similar challenges and regulations. Access to trade routes, oases, and cities was often managed by local rulers. Goods were subject to taxation and inspection, and security measures were essential due to the vast and often perilous journeys. Cultural and administrative differences between regions meant procedures varied significantly along the route, with no single overarching authority until periods like the Mongol Empire."
},
"ever-given-blockage": {
  title: "Suez Canal Obstruction",
  description: `The 2021 Ever Given blockage of the Suez Canal exemplifies a "border" disruption at a crucial physical chokepoint in global supply chains. This man-made Black Swan event had widespread repercussions. Economically, it caused significant financial losses for shipping lines, incurring higher operational, environmental, and inventory costs, and reduced revenue for the Canal Authority. Operationally, refloating the massive ship required unprecedented dredging and towing efforts, highlighting the complexities and risks of maintaining vital maritime infrastructure. The incident also had an informational impact, drawing global attention through real-time satellite imagery. This event underscored how a single disruption at a physical border can cascade into vast economic and operational challenges worldwide.`,
  length: "120,000 m² (≈12 ha) — total blocked section of the canal",
  established: "25 March 2021 15:58 UTC",
  crossingType: ["Sea"],
  status: "Inactive (blockage resolved)",
  tags: ["Administrative", "Economic", "Informational", "Physical"],
  lat: 30.57277,
  lng: 32.49194,
  zoom: 10,
   // 첫 번째 섹션 정보
   heading1: "Southbound Shipping Lane", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Canal traffic was fully blocked during the incident, halting southbound passage.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Northbound Shipping Lane", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Northbound lane also blocked during incident; normal operations resumed after clearance."
},
"uyuni-salt-flats-zone": {
  title: "Uyuni Salt Flats Zone",
  description: "The Uyuni Salt Flats Zone is a vital natural and physical border between Bolivia and Chile, marked by high-altitude salt flats and unique ecosystems. Politically and militarily, it has a history of tension, including Chilean landmines placed in 1973 near Volcan Licancabur, reflecting ongoing security concerns. Administratively, Bolivia manages this area through government bodies overseeing lithium extraction, a key economic resource with vast reserves promising future labor and financial growth. However, development challenges include infrastructure gaps and ensuring health and quarantine measures in its harsh environment. Socioculturally, indigenous communities face impacts from industrialization, requiring careful informational and social engagement. Overall, Uyuni Salt Flats represents a multifaceted border zone.",
  length: "Approx. 10,582 sq km (area of salt flats)",
  established: "N/A (natural formation, border defined by treaties)",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Economic", "Natural", "Political"],
  lat: -20.07282,
  lng: -67.64183,
  zoom: 8,
   // 첫 번째 섹션 정보
   heading1: "Bolivia to Chile", 
   visibility: "Medium",
   control: "Strong",
   bridgeInfo: "Travelers typically cross at official border points like Hito Cajones (Bolivia) to Ollagüe (Chile) or similar. Procedures involve presenting valid passports/visas, undergoing customs and immigration checks, and adhering to strict agricultural and health regulations, especially for food items due to biosecurity. For commercial activities, specific permits and declarations related to goods and mining (e.g., lithium) are required. Security concerns exist due to the remote nature and past landmine issues, so staying on designated routes is crucial.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Chile to Bolivia", 
   visibility2: "Medium",
   control2: "Strong",
   bridgeInfo2: "Crossing from Chile to Bolivia involves similar procedures at official border points. Travelers must complete immigration and customs formalities, present valid documents, and declare any restricted items. For economic activities, especially related to mining or tourism, specific permits and adherence to local regulations are enforced by Bolivian authorities. The remote environment means infrastructure can be basic, and travelers are advised to be prepared for challenging conditions and potential security screenings, particularly concerning historical landmine areas."
},
"gibraltar": {
  title: "Gibraltar",
  description: `Gibraltar is a highly contested physical and political border, a British overseas territory occupying a narrow peninsula connected to Spain. Its strategic location guarding the Strait of Gibraltar highlights its immense security and military importance, historically as a British air and naval base, and currently with NATO operations. The political dispute over its cession by the Treaty of Utrecht impacts administrative aspects, with Spain imposing restrictions on flight paths and other operations, preventing full EU "Open Skies" integration. This creates economic challenges for the airport, influencing labor and financial flows. The border's unique feature was the physical crossing of Winston Churchill Avenue over the runway, now replaced by an underground tunnel, a significant informational change for visitors. The movement of labor across the border has also evolved, with Moroccan workers replacing Spanish ones after the 1969 border closure.`,
  length: "Approx. 1.5 km (length of land border with Spain)",
  established: "1713 (Treaty of Utrecht)",
  crossingType: ["Air", "Pedestrian", "Road", "Sea"],
  status: "Active",
  tags: ["Administrative", "Economic", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 36.14017,
  lng: -5.35209,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "Gibraltar to Spain", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Travelers exiting Gibraltar into Spain undergo passport/ID control by Gibraltarian authorities, followed by Spanish border checks. Procedures include presenting valid travel documents, adherence to customs regulations (e.g., limits on tobacco/alcohol), and security screenings. Delays can occur due to political tensions or high traffic volumes. For vehicles, specific lanes are designated, and a vehicle search may occur. Freight transport follows separate customs procedures.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Spain to Gibraltar", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Entry into Gibraltar from Spain requires presenting valid travel documents at the Spanish border check, followed by Gibraltarian immigration and customs. All individuals and vehicles are subject to inspection. Smuggling prevention (especially tobacco) is a key focus, leading to thorough checks. The unique feature is crossing over the runway of Gibraltar International Airport (or via the new tunnel for vehicles), requiring stops when aircraft are landing or taking off. Pedestrian access remains direct."
},
"blaine-peace-arch": {
  title: "Blaine Peace Arch",
  description: "The Peace Arch Border Crossing, connecting Blaine, Washington, and Surrey, British Columbia, serves as a significant physical and political border between the U.S. and Canada. The striking Peace Arch itself, a 67-foot white structure, stands as a powerful socio-cultural symbol of lasting peace between the two nations, uniquely situated within a park split across both countries. Administratively, this is the third-busiest crossing, vital for economic activity and labor movement for non-commercial vehicles, directly linking major cities like Seattle and Vancouver. The continuous upgrading of physical infrastructure, with new facilities opening in 2009 and 2010, reflects its importance. The evolution of border stations provides rich informational insights into how security and cross-border interactions have been managed over time, highlighting a blend of shared ideals and practical border operations",
  length: "Approx. 347 m²",
  established: "1932 (Peace Arch dedicated), 1953 (modern crossing established)",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic","Physical", "Political", "Socio-Cultural"],
  lat: 49.00227,
  lng: -122.75654,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "USA to Canada (Northbound)", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Travelers entering Canada from the U.S. must present valid identification (e.g., passport, NEXUS card), declare all goods including alcohol/tobacco, and answer questions regarding their purpose of travel and duration of stay. Commercial vehicles follow separate lanes and regulations. Agricultural products, firearms, and other regulated items are subject to specific import rules. Waits can be long, especially during peak hours.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Canada to USA (Southbound)",
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Travelers entering the U.S. from Canada are required to present valid identification, declare any dutiable goods (purchases, alcohol, tobacco), and state their purpose of visit. Agricultural items, firearms, and certain medications are subject to strict import restrictions. All travelers and vehicles may be subject to inspection. Enhanced security measures and varying wait times are common, particularly for non-NEXUS cardholders."
},
"west-bank-barrier": {
  title: "West Bank Barrier",
  description: `The West Bank Barrier, built by Israel since 2002, functions as a highly disputed physical and political border within the occupied Palestinian territories. Its route often deviates from the pre-1967 line, effectively annexing Palestinian land and incorporating Israeli settlements. Human rights groups condemn this as "de facto annexation." This barrier carries significant administrative weight, controlling Palestinian movement and access, which in turn causes severe economic hardship by limiting access to farmlands and livelihoods. It impacts health & quarantine by hindering medical care. The barrier's design also shapes demographics, aiming to increase Jewish Israeli presence in East Jerusalem, fragmenting socio-cultural ties. International bodies, including the ICJ, deem it illegal, underscoring its deep informational and security implications beyond stated security goals.`,
  length: "Approx. 708 km (total planned/constructed length)",
  established: "2002 (construction began)",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Health&Quarantine", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 32.0,
  lng: 35.38333,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "West Bank to Israel",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Palestinians typically require permits issued by Israeli authorities to cross into Israel for work, medical care, or other purposes. Checkpoints are highly militarized, involving identity checks, extensive security screenings, vehicle searches, and often long waiting times (hours). Permits are frequently denied or revoked, leading to significant delays and unpredictable access. Movement is often restricted to specific crossing points and times.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Israel to West Bank", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Israeli citizens generally have more fluid access into the West Bank, although they are restricted from entering Area A (under full Palestinian Authority control). Palestinians entering the West Bank from Israel (e.g., returning home) also pass through checkpoints, facing scrutiny. Security checks, though perhaps less stringent for Israeli citizens, are still in place. The control aims to manage security risks and regulate population movement according to Israeli policies in the occupied territories."
},
"storskog": {
  title: "Storskog",
  description: "The Storskog-Borisoglebsky crossing is the only legal border between Norway and Russia, marked by strict security and military surveillance on both sides. Located on the E105 highway, it features modern administrative facilities but operates under tight controls due to geopolitical tensions. Historically a vibrant economic and socio-cultural hub with local trade and a permit system enabling cross-border visits, these exchanges have largely ceased, sharply limiting labor, financial flows, and tourism. The border spans a natural landscape along the Pasvikelva River and includes a new bridge to facilitate transit for the few permitted crossings. Storskog exemplifies a high-stakes, heavily monitored border where political and security concerns dominate, reflecting broader international dynamics while constraining previous local connectivity.",
  length: "N/A",
  established: "1950s (formal border crossing infrastructure developed), 1993 (new bridge completed)",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Labor&Financial", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 69.65834,
  lng: 30.20379,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "Norway to Russia (Eastbound)", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Entry into Russia requires a valid Russian visa (unless specific visa-free agreements apply for certain local residents, which are currently restricted). Travelers undergo passport control, customs declarations for goods, and security screenings. Due to current geopolitical tensions, traffic is extremely limited, and security scrutiny is very high. Special permits may be required for certain areas near the border.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Russia to Norway (Westbound)", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Entry into Norway requires a valid visa for non-Schengen citizens. Travelers undergo thorough passport checks, customs inspections (with strict rules on alcohol, tobacco, currency, and other goods), and security screenings. Norwegian authorities are vigilant regarding potential illegal crossings or smuggling. Access has become significantly more restricted following recent geopolitical events, with very few individuals currently permitted to cross."
},
"darien-gap-panama": {
  title: "Darién Gap",
  description: `The Darién Gap in Panama is a natural and physical border separating Central and South America, characterized by dense rainforest and rugged terrain with no formal infrastructure. This formidable barrier poses serious health and safety risks, lacking organized security or quarantine systems, while serving as a perilous migration route for thousands fleeing poverty and unrest. Despite government efforts to control crossings through increased border policing, fencing, and deportations, migrant flows continue, impacting indigenous communities and regional stability. Administratively, Panama collaborates with international organizations to provide limited humanitarian aid, though resources remain insufficient. The Darién Gap remains a complex border zone where natural obstacles, political challenges, and humanitarian concerns intersect, making it a critical, yet dangerous, gateway on the migration path northward. Also see: <a href="https://www.cfr.org/refugee-crisis/#!/a-system-under-strain">here</a>.`,
  length: "Approx. 100 km (unroaded stretch)",
  established: "1903 (Officially recognized as a border area with Panama's independence from Colombia)",
  crossingType: ["Pedestrian"],
  status: "Active",
  tags: ["Economic", "Health&Quarantine","Natural", "Physical", "Security&Military", "Socio-Cultural"],
  lat: 7.9,
  lng: -77.46,
  zoom: 8,
   // 첫 번째 섹션 정보
   heading1: "Colombia to Panama", 
   visibility: "Low",
   control: "Weak",
   bridgeInfo: "There are no official crossings or formal procedures. Migrants and illicit traffickers navigate extremely treacherous natural terrain on foot, facing dangers from wildlife, disease, swift rivers, and criminal gangs (robbery, extortion, violence). Panamanian authorities conduct sporadic interdictions and operate reception centers (like San Vicente or Lajas Blancas) where migrants are processed after emerging from the jungle, but active border control within the Gap itself is minimal.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Panama to Colombia", 
   visibility2: "Low",
   control2: "Weak",
   bridgeInfo2: "While less common for large-scale migration, any movement from Panama into Colombia through the Darién Gap faces the same extreme natural hazards and lack of official infrastructure. There are no regulated procedures; individuals attempting this passage are at high risk from the environment and illicit actors. Colombian authorities may have some presence on their side, but effective control over the dense, unroaded stretch remains challenging."
},
"taiwans-adiz": {
  title: "Taiwans Adiz",
  description: "Taiwan's Air Defense Identification Zone (ADIZ), established by the US in 1954, functions as a critical security and military border. Extending beyond Taiwan's sovereign airspace and encompassing parts of mainland China, it enables Taiwan to monitor and control aircraft for national defense, a crucial aspect of its national security. It encompasses the Taiwan Strait, parts of the Chinese mainland coast, and the East China Sea, reflecting geopolitical tensions with China, which frequently conducts incursions. The ADIZ serves as a quasi-territorial boundary that supports Taiwan’s sovereignty claims and strategic defense posture, while also influencing political and security dynamics in the region. This zone is vital for early warning, airspace management, and deterring military threats, highlighting the intersection of security, political sovereignty, and international aviation norms in a contested border environment.",
  length: "Approx. 400 nautical miles (varies by sector)",
  established: "1954",
  crossingType: ["Air"],
  status: "Active",
  tags: ["Administrative", "Informational",  "Political", "Security&Military"],
  lat: 20,
  lng: 118,
  zoom: 5,
   // 첫 번째 섹션 정보
   heading1: "Taiwan ADIZ South Sector", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Aircraft entering Taiwan's ADIZ, particularly from the south, are expected to file a flight plan and identify themselves to Taiwanese air traffic control (ATC). Unidentified or unauthorized aircraft (especially military aircraft) will receive broadcast warnings via radio. If these warnings are ignored, Taiwanese fighter jets may be scrambled for visual identification and potential interception. This sector often sees activity related to disputes in the South China Sea and general air traffic.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Taiwan ADIZ North Sector",
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Aircraft entering Taiwan's ADIZ from the north (most notably from mainland China) are also expected to file flight plans and identify themselves. This sector is frequently challenged by Chinese military aircraft incursions, which trigger similar responses: broadcast warnings, followed by scrambling of Taiwanese fighter jets for interception and escort out of the zone. The regulations prioritize national security, requiring strict adherence from all aircraft to prevent perceived threats and maintain airspace control."
},
"eurotunnel-zone": {
  title: "Channel Tunnel Zone",
  description: `The Eurotunnel, or "Chunnel," is a vital physical and political border linking the UK and France beneath the English Channel. Opened under the 1986 Treaty of Canterbury, it supports major economic flows via Eurostar and LeShuttle services. Operated by Getlink, it integrates advanced engineering systems for safety, ventilation, and signaling. While enabling commerce and tourism, it also serves as a tightly managed security border, especially evident during the 2015 migrant crisis. Its design reflects strict health and quarantine standards, highlighting the balance between facilitating cross-border movement and maintaining national control and security.`,
  length: "50.46 kilometers (31.35 miles) long, with 37.9 kilometers (23.5 miles) undersea section",
  established: "1994",
  crossingType: ["Rail"],
  status: "Active",
  tags: ["Administrative", "Economic", "Health&Quarantine", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 51.03217,
  lng: 1.48810,
  zoom: 8,
   // 첫 번째 섹션 정보
   heading1: "UK to EU Crossing", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Eurostar foot passengers and Le Shuttle vehicles are subject to security, ticket, and customs checks. Goods require GMR and GVMS barcodes, and must match vehicle registration. Health certificates for SPS products are mandatory (Jan–Apr 2024), with documentary and physical checks at designated BCPs. Pre-notification via IPAFFS is required. UK EORI number is mandatory for importers. Full Safety & Security declarations (ENS) are required from October 2024. Dangerous goods must follow strict tunnel transit regulations. Transit movements require TAD documents and office of departure validation.",
  
   // 두 번째 섹션 정보 추가
   heading2: "EU to UK Crossing", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Eurostar foot passengers and Le Shuttle vehicles. Security, ticket, customs (GMR, GVMS) checks. SPS product health certifications and risk-based checks entering Jan‑Apr 2024; full S&S declarations from Oct 2024."
},

"us-surveillance-towers": {
  title: "US Surveillance Towers",
  description: "The U.S.-Mexico border surveillance tower system emerged in a post-9/11 climate that framed migration as a national security threat. Driven by political narratives portraying irregular migration as dangerous, the U.S. adopted a militarized approach focused on control rather than root causes like economic disparity or humanitarian need. Surveillance towers offer physical detection in remote terrains, but their deployment often reflects more than security: powerful defense industry lobbying, technological solutionism, and a reluctance to enact meaningful immigration reform. These towers symbolize a shift from managing human mobility to deterring it through high-tech enforcement—prioritizing territorial sovereignty and political optics over sustainable, people-centered solutions. In essence, the border is not just a response to movement, but a constructed line shaped by security fears, economic interests, and a need to perform national control.",
  length: "Varies (distributed along hundreds of miles of border)",
  established: "195Early 2000s (various iterations)",
  crossingType: ["Digital", "Pedestrian", "River", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 31.33419,
  lng: -110.93388,
  zoom: 8,
   // 첫 번째 섹션 정보
   heading1: "U.S. to Mexico", 
   visibility: "Medium",
   control: "Medium",
   bridgeInfo: "Although the surveillance towers are not primarily designed to restrict movement from the U.S. into Mexico, they may contribute to outbound regulation by monitoring cross-border criminal activity such as weapons trafficking or fugitive movement. However, these regulatory functions are secondary. Outbound crossings by U.S. citizens or residents are generally not subject to the same level of enforcement or restriction, making the towers’ role in this direction limited and largely intelligence-driven.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Mexico to U.S.", 
   visibility2: "Strong",
   control2: "High",
   bridgeInfo2: "The towers enforce regulatory control by identifying, tracking, and enabling the interception of individuals crossing into the U.S. outside of legal ports of entry. Their surveillance capabilities effectively extend the regulatory perimeter beyond physical checkpoints, shifting border enforcement from point-of-entry control to a dispersed model of detection and deterrence. This system prioritizes unauthorized entry prevention over facilitating lawful migration, reinforcing a securitized regulatory regime along the border."
},
"haskell-free-library": {
  title: "Haskell Free Library",
  description: `The Haskell Free Library and Opera House exists as a unique physical and political border due to its deliberate placement astride the U.S.-Canada line. It was established through the Socio-Cultural vision of the Haskell family, who sought to provide Informational and artistic access equally to both Canadian and American communities. This philanthropic act created a space where two nations literally meet under one roof, fostering cross-border exchange. However, despite its inclusive origin, the library has increasingly become a site of Security & Military concern, leading to evolving Administrative regulations, especially following events like the 2015 migrant crisis and 2025 border policy changes, highlighting the tension between its founding spirit of openness and modern border control imperatives. Also see: <a href="https://www.haskelloperahouse.org/">here</a>.`,
  length: "Approximately 15 meters (the width of the building across the border line)",
  established: "1905 (Library opened), 1904 (Opera House opened)",
  crossingType: ["Pedestrian"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 45.00584,
  lng: -72.09778,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "U.S. to Canada (Entering Canadian Side via Library)", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Canadian patrons entering the library via the main U.S. entrance (Caswell Ave) are encouraged to carry documentation (as if crossing the border) but do not need to report to customs if they return immediately to Canada via the same route. Family reunions or cross-border visits are prohibited within the library. As of March 2025, non-library card holders may need to use the Canadian entrance. All visitors must abide by the laws of both the United States and Canada, and exit through the same door they entered. Exchange of goods is strictly prohibited.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Canada to U.S. (Entering U.S. Side via Library)",
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "U.S. patrons entering the library via the Canadian entrance (Church Street) are encouraged to carry documentation. Both US Border Patrol and RCMP can request personal identification and detain individuals lacking legal status. International law requires exiting through the same door entered, and the exchange of goods or cross-border meetings (like family reunions) is strictly prohibited. Large bags and backpacks are also not permitted. All visitors must abide by the laws of both the United States and Canada."
},
"south-china-sea-disputed-waters": {
  title: "South China Sea Disputed Waters",
  description: `The territorial disputes in the South China Sea represent a complex, multifaceted Political and Physical border, primarily arising from unresolved claims over Natural resources (oil, gas, fishing grounds) and strategic Economic and Security & Military maritime passages (SLOCs). This border emerged significantly after World War II, when Japan renounced its claims, leaving a vacuum that various sovereign states, notably China, Vietnam, the Philippines, Malaysia, and Brunei, sought to fill based on historical assertions and geographic proximity. China's expansive "nine-dash line" claim, combined with aggressive land reclamation and militarization efforts, has intensified these disputes. The U.S. and other nations have become involved to ensure freedom of navigation and counter China's assertive Political stance, transforming the region into a critical geopolitical flashpoint.`,
  length: "Varies (encompasses vast maritime areas, not a fixed linear length)",
  established: "1947 (China's 'nine-dash line' claim first published)",
  crossingType: ["Air", "Sea"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Natural", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 10.0,
  lng: 115.0,
  zoom: 5,
   // 첫 번째 섹션 정보
   heading1: "Operating within Disputed Waters (General Challenges)", 
   visibility: "Low",
   control: "Disputed",
   bridgeInfo: "Navigating these waters involves significant regulatory uncertainty and potential challenges. Vessels may face demands for notification or communication from claimant states' authorities. There's a risk of harassment, close shadowing, or verbal warnings by coast guard or naval vessels, particularly if perceived to be encroaching on a claimant's asserted territory or features. Adherence to international maritime law (UNCLOS) is often asserted by many nations, but actual compliance can be complex due to conflicting claims.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Specific Claimants' Control Zones (e.g., Chinese-claimed areas)", 
   visibility2: "Medium",
   control2: "Strong",
   bridgeInfo2: "Operating within zones where a claimant (like China) exerts strong control, especially around their reclaimed islands and military outposts, involves heightened scrutiny and more assertive enforcement. Vessels may be subject to demands for permits to enter, persistent surveillance, and potentially aggressive actions such as being hit with water cannons or military-grade lasers. There's a significant risk of collisions due to dangerous maneuvers by claimant vessels. These zones represent a particularly challenging environment for freedom of navigation, with frequent interventions based on the claimant's asserted sovereignty."
},
"ledra-palace-border": {
  title: "Ledra Palace Border Crossing",
  description: `The Ledra Palace Border Crossing, located in Nicosia, Cyprus, emerged as a physical and political border following the 1974 Turkish invasion and the island's partition. This division created the "Green Line," a UN buffer zone separating Greek Cypriot and Turkish Cypriot areas. Initially, the crossing was primarily for Administrative and Security & Military personnel (officials, UN, SBA), symbolizing the deep political chasm. Its existence is a direct result of a Socio-Cultural conflict and the failure to achieve political unification. While the Ledra Palace Hotel, a pre-invasion landmark, became a UN HQ within this no-man's-land, the crossing itself represents the island's enduring division, with ongoing, albeit sometimes easing, Administrative and Security & Military checks reflecting the complex, unresolved political landscape.`,
  length: "Varies (part of the UN Buffer Zone, not a single fixed length)",
  established: "1974 (established as a division point after the invasion)",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 35.17916,
  lng: 33.35555,
  zoom: 14,
   // 첫 번째 섹션 정보
   heading1: "Greek Cypriot South to Turkish Cypriot North",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Travelers entering the Turkish Cypriot North must present documentation (e.g., passport) for review by both Republic of Cyprus and Turkish Cypriot authorities. Historically, this crossing was restricted, but since 2008, Ledra Street (a nearby pedestrian crossing) and other points have opened to international visitors. Car insurance for TRNC is often required for vehicles. The crossing involves separate checks by both sides, often under UN observation, highlighting the dual control.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Turkish Cypriot North to Greek Cypriot South", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Similarly, movement into the Greek Cypriot South requires presenting documentation to both Turkish Cypriot and Republic of Cyprus officials. While largely hassle-free for eligible international visitors, it signifies distinct administrative processes. The ease of crossing can vary based on political developments. All movements are subject to verification by both sides and UN oversight."
},
"un-blue-line": {
  title: "UN Blue Line",
  description: `The UN Blue Line is a physical and political demarcation established by the United Nations in 2000 to confirm Israel's withdrawal from Lebanon. It is explicitly "not a border" but a "line of withdrawal," reflecting its temporary Administrative nature and an ongoing Security & Military dispute rather than a mutually agreed international boundary. Its origin traces back to earlier Political agreements like the 1923 Mandate Line and 1949 Armistice. Despite visible markers, its precise path causes friction, leading to frequent Security & Military violations and emphasizing unresolved Political and Socio-Cultural tensions.`,
  length: "Approx. 120 km",
  established: "2000 (UN-demarcated withdrawal line)",
  crossingType: [ "Air", "Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 33.2486,
  lng: 35.5900,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "Operating North of the Blue Line (Lebanese Side)", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Operating near or intending to approach the Blue Line from the Lebanese side requires adherence to Lebanese military regulations. UNIFIL (United Nations Interim Force in Lebanon) requests advance notice for any activities close to the line to prevent misunderstandings and incidents. Unauthorized crossings, even accidental ones by villagers or farmers, are considered violations of UN Security Council Resolution 1701 and are recorded by UNIFIL. Military activities in proximity are highly sensitive and subject to strict rules of engagement to avoid escalation.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Operating South of the Blue Line (Israeli Side)", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Activities near the Blue Line from the Israeli side are also subject to stringent military regulations. Israel has constructed a security barrier (fence/wall) entirely on its side, which is distinct from the Blue Line itself. Crossing this barrier does not mean crossing the Blue Line, but any direct crossing of the Blue Line into Lebanon is a violation of Resolution 1701. UNIFIL requests advance notification from Israeli authorities for maintenance or security activities near the line to maintain calm and prevent provocations. The area is prone to military incidents and aggressive responses to perceived threats."
},
"narva-river": {
  title: "Narva River",
  description: "The Narva River serves as a natural and historically significant political border dividing Estonia and Russia. Its formation traces back to 13th-century territorial contests, evolving into the external border of the European Union and Schengen Zone today. This boundary reflects centuries of Socio-Cultural and Political struggle. Despite an unratified Administrative treaty, it functions as a de facto line with substantial Security & Military infrastructure, including fencing, watchtowers, and recent X-ray upgrades for freight. Recent incidents like removed buoys and vehicle bans underscore persistent political tensions and directly impact Economic transit.",
  length: "Approx. 77 km",
  established: "1991 (de facto border between independent Estonia and Russia)",
  crossingType: ["Pedestrian", "Rail", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Natural", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 59.37991,
  lng: 28.19126,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "Estonia to Russia (Narva-Ivangorod)",
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Travelers must present passports at Narva station (Estonian side) for exit control. For freight, X-ray equipment is used. The crossing point involves passing through security fencing on the Estonian side and observation by border guards with dogs and watchtowers on the Russian side. Due to political tensions and ongoing construction on the Russian side, road traffic is currently closed (until mid-2026), and cross-border railway traffic is absent. Permits are required for non-locals visiting the 5km border security zone on the Russian side.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Russia to Estonia (Ivangorod-Narva)", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Entry into Estonia requires presenting passports for control at the **Narva crossing point. Vehicle-specific restrictions, such as the ban on Russian-plated vehicles** since September 2023, are strictly enforced in accordance with EU decisions. As with the eastbound crossing, the railway crossing remains unused for regular traffic, and **road traffic is temporarily suspended**. All movements are subject to stringent checks by both Russian and Estonian authorities, emphasizing its role as an EU external border."
},
"australias-offshore": {
  title: "Nauru",
  description: "Australia’s offshore detention center in Nauru functions as a Political and Administrative border, designed to process asylum seekers outside Australian territory. Established in 2012, its existence is rooted in Political policy aimed at deterring unauthorized maritime arrivals. Despite a UN ruling highlighting Human Rights violations and arbitrary detention of asylum seekers, including minors, this Security & Military system persists. These policies have caused severe Health & Quarantine and Socio-Cultural harm, leading to calls for abolition and compensation for survivors. The center represents Australia's controversial approach to immigration control, creating a de facto Physical barrier to asylum, with profound Socio-Cultural and Political implications.",
  length: "170 meters",
  established: "2012 (re-establishment of offshore processing in Nauru)",
  crossingType: ["Air", "Sea"],
  status: "Active",
  tags: ["Administrative", "Health&Quarantine", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: -0.5287,
  lng: 166.9329,
  zoom: 12,
   // 첫 번째 섹션 정보
   heading1: "Australia to Nauru", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Individuals seeking asylum who arrive in Australia by sea without a valid visa are subject to mandatory offshore processing. This involves transfer, typically by charter flights (Air) or, historically, by **sea**, to Nauru. This is not a voluntary crossing; rather, it's a forced transfer under the strict control of Australian and Nauruan immigration and security authorities. Upon arrival, individuals are held within the detention facilities for the duration of their asylum claim assessment.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Nauru to Australia", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Movement from Nauru to Australia is highly restricted and requires specific authorization. This typically occurs under very limited circumstances, such as urgent **medical transfers, successful legal challenges leading to release, or eventual resettlement** to a third country (though not typically Australia itself, unless specific conditions are met). It is not a pathway for general return or free movement. Australian authorities maintain **strong control** over who is permitted to enter Australia from Nauru, and individuals face significant legal and administrative hurdles to leave the offshore processing regime."
},
"transnistria-checkpoints": {
  title: "Transnistria Checkpoints",
  description: `The "Transnistria Checkpoints," established in 2022, primarily serve as Security & Military measures within a demilitarized Security Zone along the Dniester River, stemming from the 1992 conflict. While initially justified by an alleged 'terrorist threat,' their removal is a Political and Economic condition of a gas agreement with Moldova, highlighting Russia's use of gas as a leverage tool. These Physical barriers (concrete barriers, related infrastructure) have significantly impacted regional Socio-Cultural mobility and caused an Economic crisis due to energy shortages. Their dismantling aims to restore Administrative normalcy and freedom of movement, reflecting ongoing geopolitical negotiations and Moldova's efforts to reintegrate the region.`,
  length: "4,163 km²",
  established: "2022 (initially established)",
  crossingType: ["Pedestrian", "Road"],
  status: "Inactive (checkpoints removed/dismantled)",
  tags: ["Administrative", "Economic", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 46.85761,
  lng: 29.43982,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "Moldova to Transnistrian-controlled Security Zone",
   visibility: "High",
   control: "Low",
   bridgeInfo: "Previously, entering the Transnistrian-controlled Security Zone from Moldova through these checkpoints meant encountering **concrete barriers and **security personnel who conducted checks, often citing alleged 'terrorist threats.' This severely restricted movement. However, as a condition of a gas agreement, these checkpoints have been **dismantled**, and main roads cleared. This has significantly **eased previous restrictions**, allowing for more unimpeded travel into settlements within the zone.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Transnistrian-controlled Security Zone to Moldova", 
   visibility2: "High",
   control2: "Low",
   bridgeInfo2: "Exiting the Transnistrian-controlled Security Zone towards Moldova previously involved similar regulatory hurdles at these internal checkpoints, including potential stops and checks by Transnistrian authorities. With their dismantling, the process of moving towards Moldova has become less restricted and more fluid. While the broader international border crossing rules (e.g., at official international checkpoints) still apply, internal travel within the Security Zone is now significantly easier, aimed at restoring administrative normalcy and ensuring freedom of movement for residents and travelers alike."
},
"berlin-tegel-refugee-shelter": {
  title: "Berlin Tegel Refugee Shelter",
  description: "The Berlin Tegel Refugee Shelter, once an airport, functions as a Political and Administrative border, establishing strict controls over asylum seekers and refugees. Hastily set up in 2022 to manage the influx from Ukraine, it has become a long-term Physical containment point for nearly 5,500 people, with plans to expand to 8,000. The camp's design and stringent rules, including constant surveillance and limited movement, create a Security & Military barrier. This environment has raised serious Health & Quarantine and Socio-Cultural concerns, impacting well-being and hindering integration. Criticized for its high costs (up to €250 per person per day) and prison-like conditions, Tegel embodies Germany's evolving, often controversial, approach to migration.",
  length: "5 km²",
  established: "2022",
  crossingType:  ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Health&Quarantine", "Informational", "Labor&Financial", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 52.58266,
  lng: 13.33060,
  zoom: 15,
   // 첫 번째 섹션 정보
   heading1: "Entry and Access to Berlin Tegel Refugee Shelter", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Access for residents into the Berlin Tegel Refugee Shelter is highly controlled, primarily via special shuttle buses that are the sole means of transport for residents to and from nearby public transit. Upon entry, individuals are subject to strict administrative processing and are immediately integrated into the camp's rigid rule set. This includes a mandatory QR code for access verification, constant surveillance by security staff and CCTV, and highly restrictive policies on privacy and personal belongings.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Exit and Movement from Berlin Tegel Refugee Shelter", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Exiting the Berlin Tegel Refugee Shelter is subject to highly restrictive regulations. While Ukrainian refugees may be permitted to leave for up to three days at a time, asylum seekers from other countries are often required to remain in the camp every night or risk losing their accommodation. Daily bed checks are routine, creating a constant fear of missing attendance and deterring residents from leaving even during permitted hours. This controlled environment significantly limits external movement and integration opportunities, contributing to a 'prison-like' atmosphere for many residents."
},
"crimea": {
  title: "Crimea",
  description: "Crimea functions as a deeply contested Political and Security & Military border, primarily due to Russia's illegal 2014 annexation. Historically part of Russia until 1954, its current status stems from military seizure by unmarked Russian troops and a disputed referendum, leading to international condemnation. This has created a Physical barrier, intensified by infrastructure like the Kerch Strait Bridge, and a severe Socio-Cultural divide, polarizing ethnic Russians and Crimean Tatars. The border's existence is a key driver of regional instability, continuous armed conflict, and economic sanctions, embodying a critical geopolitical fault line between Ukraine and Russia.",
  length: "Approx. 8 km",
  established: "2014 (as a contested border post-annexation)",
  crossingType: ["Pedestrian", "Rail", "Road", "Sea"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Labor&Financial", "Natural", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 45.21700,
  lng: 34.44200,
  zoom: 6,
   // 첫 번째 섹션 정보
   heading1: "Mainland Ukraine to Russian-occupied Crimea", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Exiting Russian-occupied Crimea towards mainland Ukraine involves navigating Russian military presence (e.g., convoys) on the Crimean side, followed by Ukrainian checkpoints. Travelers must show official papers to armed Ukrainian guards for verification. This process is subject to the complexities of an internationally unrecognized occupation, with residents potentially facing risks (e.g., 'fearing Russian arrest back home in Crimea') based on their actions or identity.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Russian-occupied Crimea to Mainland Ukraine",
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Exiting Russian-occupied Crimea towards mainland Ukraine involves navigating Russian military presence (e.g., convoys) on the Crimean side, followed by Ukrainian checkpoints. Travelers must show official papers to armed Ukrainian guards for verification. This process is subject to the complexities of an internationally unrecognized occupation, with residents potentially facing risks (e.g., 'fearing Russian arrest') based on their actions or identity."
},
"tohono-oʼodham-nation": {
  title: "Tohono Oʼodham Nation",
  description: "The Gadsden Purchase of 1853 unilaterally imposed an international border through the Tohono O'odham Nation's ancestral territory, fundamentally altering their existence. This political division fractured socio-cultural unity, separating families and disrupting traditional migration for ceremonies and vital services. Consequently, the Nation now grapples with immense security and military burdens from increased illegal crossings and smuggling, leading to a humanitarian crisis on their lands. These challenges, along with rising crime rates, place considerable strain on their economic resources, compelling the use of casino profits for border management. Furthermore, the construction of physical barriers and intensified surveillance by Integrated Fixed Towers jeopardize tribal sovereignty and cultural practices, often impeding tribal members' movement due to insufficient informational recognition of their identity.",
  length: "74 miles (119 km)",
  established: "1853 (by Gadsden Purchase)",
  crossingType: ["Bridge", "Road"],
  status: "Active",
  tags: ["Economic", "Health&Quarantine", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 31.99195,
  lng: -112.06241,
  zoom: 9,
   // 첫 번째 섹션 정보
   heading1: "U.S. to Mexico", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "Tohono O'odham tribal members may cross at designated tribal gates such as San Miguel, but these require tribal identification cards, prior notification, and coordination with U.S. Border Patrol. Traditional unguarded paths are illegal to use. Non-tribal individuals must use official Ports of Entry. During health crises like the COVID-19 pandemic, additional restrictions and health screenings have been implemented.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Mexico to U.S.", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Tohono O'odham members residing in Mexico face considerable challenges entering the U.S., requiring enhanced tribal identification and facing risks of detention and deportation. Their access to essential services such as medical care, education, and social support on the U.S. side is frequently hindered."
},
"baarle-nassau": {
  title: "Baarle-Hertog/Baarle-Nassau",
  description: "Baarle-Hertog and Baarle-Nassau share one of the world’s most complex borders, shaped by centuries of medieval treaties dividing land between the Dukes of Brabant and the Lords of Breda. This political border created numerous Belgian enclaves within the Netherlands and Dutch counter-enclaves, resulting in a patchwork of overlapping jurisdictions. The border’s intricate layout reflects historical land ownership rather than natural or administrative divisions, leading to unique challenges in governance, infrastructure, and daily life. Despite political complexity, the border fosters socio-cultural coexistence, though economic and administrative differences remain evident. This anomaly highlights how historical agreements can produce enduring and intricate borders beyond simple geographic lines.",
  length: "76.30 km² (Baarle-Nassau, Netherlands),7.48 km² (Baarle-Hertog, Belgium)",
  established: "Medieval origins; formalized 1843 (Treaty of Maastricht); finalized 1995",
  crossingType: ["Pedestrian", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Physical", "Political", "Socio-Cultural"],
  lat: 51.43755,
  lng: 4.92848,
  zoom: 13,
   // 첫 번째 섹션 정보
   heading1: "Netherlands to Belgium", 
   visibility: "High",
   control: "Weak",
   bridgeInfo: "Crossing from Baarle-Nassau to Baarle-Hertog is generally seamless for residents and EU citizens, with the border often running through buildings, streets, and cafes. There are no formal border checkpoints or customs. Regulations primarily concern differences in local laws (e.g., drinking age, fireworks sales, shop opening hours) rather than border crossing procedures. Identification may be required for legal purposes, but not typically for crossing itself.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Belgium to Netherlands", 
   visibility2: "High",
   control2: "Weak",
   bridgeInfo2: "Similarly, crossing from Baarle-Hertog to Baarle-Nassau is unrestricted. Individuals simply walk or drive across the marked lines on the pavement. The primary 'regulations' are adhering to the respective national and local laws (e.g., different planning permissions, tax regulations, business operating hours). While there are no border checks, law enforcement from either country can enforce their laws within their respective territories, even within shared buildings."
},
"turtuk": {
  title: "Turtuk",
  description: "Turtuk, once part of Baltistan, came under Indian control during the 1971 Indo-Pak war, shifting its status from a Pakistani-administered village to a strategic Indian borderland. This border emerged not through natural geography but through post-colonial conflict and military conquest. The division fractured families, many of whom still communicate via flash drives sent across the Line of Control. As one of five Balti-populated villages now in India, Turtuk embodies a socio-cultural and political border—Muslim-majority in a Buddhist-Hindu region—and a military gateway to Siachen Glacier. Though it remained closed for decades, local efforts led to its 2010 opening, transforming it from a restricted security zone into a rare site of cross-border memory, contested identity, and cautious connection.",
  length: "Approx. 7 km from Line of Control (within Indian territory)",
  established: "1971 (Integrated into India after Indo-Pakistani War)",
  crossingType: "No Official Civilian Crossing Point",
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: 34.84574,
  lng: 76.82766,
  zoom: 14,
   // 첫 번째 섹션 정보
   heading1: "India to Pakistan", 
   visibility: "High",
   control: "Strong",
   bridgeInfo: "There is no authorized civilian crossing point between Turtuk and Pakistan. The Line of Control (LoC) is a de facto military frontier, heavily guarded by both Indian and Pakistani forces. Any unauthorized crossing is illegal and dangerous, often resulting in arrest or military confrontation. Families divided by the LoC rely on intermediaries and recorded messages (e.g., flash drives) for communication.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Pakistan to India", 
   visibility2: "High",
   control2: "Strong",
   bridgeInfo2: "Crossing from Pakistan-administered Gilgit-Baltistan into Turtuk (India) is prohibited. The LoC is a conflict-sensitive zone with no legal mechanism for civilian crossing or family reunification. Entry attempts from either side face strict military enforcement and legal consequences."
},
"triple-frontier": {
  title: "Triple Frontier",
  description: "The Triple Frontier marks the convergence of Argentina, Brazil, and Paraguay at the Iguazú and Paraná rivers, forming a unique tri-border area. Its complexity stems from the intertwined presence of major border cities (Ciudad del Este, Foz do Iguaçu, Puerto Iguazú) and its status as a significant global tourist destination, home to Iguazú Falls. Beyond tourism, the region is a notorious hub for organized crime, including drug and arms trafficking, smuggling, money laundering, and has been cited by some as a financing point for terrorist organizations like Hezbollah and Hamas. This creates a challenging environment where economic reliance on cross-border activity clashes with persistent security concerns and weak institutional control, making it a critical area for regional and international cooperation.",
  length: "Approx. 700–750 km² (estimated functional tri-border zone)",
  established: "Natural river convergence; modern political borders formalized by treaties over the 19th–20th centuries",
  crossingType: ["Pedestrian", "River", "Road"],
  status: "Active",
  tags: ["Administrative", "Economic", "Informational", "Natural", "Physical", "Political", "Security&Military", "Socio-Cultural"],
  lat: -25.59289,
  lng: -54.59360,
  zoom: 13,
   // 첫 번째 섹션 정보
   heading1: "Argentina to Brazil& Paraguay", 
   visibility: "High",
   control: "Mederate",
   bridgeInfo: "Moderate to Permeable (tourist-friendly with underlying high-security monitoring)",
    "bridgeInfo": "Argentina and Brazil are connected by the Tancredo Neves Bridge (also known as Fraternity Bridge). Brazil and Paraguay are connected by the Friendship Bridge between Foz do Iguaçu and Ciudad del Este. Cross-border movement is relatively smooth for tourists and local commerce, though customs and security checkpoints are present. River ferry options also exist for informal local movement. The area is monitored by cooperative security efforts (Tripartite Command and the 3+1 Group with the U.S.) due to concerns over transnational crime, smuggling, and suspected terrorist financing activities.",
  
   // 두 번째 섹션 정보 추가
   heading2: "Brazil to Argentina& Paraguay", 
   visibility2: "High",
   control2: "Moderate",
   bridgeInfo2: "From Brazil, crossings to Argentina are made via the Tancredo Neves Bridge, and to Paraguay via the Friendship Bridge. While entry and exit are managed, daily transits for work, shopping, and tourism are common. Authorities conduct periodic operations to counteract money laundering, narcotics, and arms smuggling. Enforcement is often intelligence-based and low-profile in appearance to avoid disrupting tourist traffic. The natural river boundary contrasts with heavily trafficked infrastructure and interdependent economies."
},
};

// 4. 해당 ID의 데이터 가져오기
const item = data[id];

// 5. 데이터가 유효하면 정보 표시 및 맵 설정
if (item) {
  // 예: 첫 번째 섹션에 정보 넣기
  const sections = document.querySelectorAll("section.a-to-b");

  // 첫 번째 섹션
  const firstSection = sections[0];
  firstSection.querySelector(".visibility .high").innerText = item.visibility;
  firstSection.querySelector(".control .high").innerText = item.control;
  firstSection.querySelector(".the-bridge-is").innerText = item.bridgeInfo;
  firstSection.querySelector(".heading-1").innerText = item.heading1;  // 제목

  // 두 번째 섹션
  const secondSection = sections[1];
  secondSection.querySelector(".visibility .high").innerText = item.visibility2;
  secondSection.querySelector(".control .high").innerText = item.control2;
  secondSection.querySelector(".the-bridge-is").innerText = item.bridgeInfo2;
  secondSection.querySelector(".heading-2").innerText = item.heading2;  // 제목

  // 나머지 공통 정보는 첫 번째 섹션에만 넣거나, 필요하면 각각 넣으면 됩니다.
  document.querySelector(".the-bridge-of").innerText = item.title;
  document.querySelector(".the-bridge-of1").innerHTML = item.description;  // 여기만 innerHTML 사용
  document.querySelector(".meters-wrapper .meters").innerText = item.length;
  document.querySelector(".established-wrapper h3.established").innerText = item.established;

  document.querySelector(".status-wrapper .status").innerText = item.status;

  // 태그 처리 (기존 코드 유지)
  const allTags = document.querySelectorAll(".tag-toggle1");
  allTags.forEach(tagEl => {
    const tagName = tagEl.querySelector(".title").innerText;
    if (!item.tags.includes(tagName)) {
      tagEl.style.display = "none";
    }
  });

  // 맵 데이터 속성 업데이트
  const mapDiv = document.querySelector('.map');
  mapDiv.dataset.lat = item.lat;
  mapDiv.dataset.lng = item.lng;
  mapDiv.dataset.zoom = item.zoom;
}





// 6. 태그 아이콘 경로 매핑
const tagClassMap = {
  "Administrative": "administrative",
  "Economic": "economic",
  "Health&Quarantine": "health-quarantine",
  "Informational": "informational",
  "Labor&Financial": "labor-financial",
  "Natural": "natural",
  "Physical": "physical",
  "Political": "political",
  "Security&Military": "security-military",
  "Socio-Cultural": "socio-cultural"
};


// 태그 렌더링
const tagContainer = document.getElementById("tag-toggle-parent");

item.tags.forEach(tag => {
  const tagDiv = document.createElement("div");

  // 🟡 기존 class 추가
  tagDiv.classList.add("tag-toggle1");

  // 🟢 category 스타일 적용용 클래스 추가
  tagDiv.classList.add("category");
  tagDiv.classList.add(tagClassMap[tag]);  // e.g., "political", "natural"

  tagDiv.innerHTML = `
    <div class="title">${tag}</div>
  `;

  tagContainer.appendChild(tagDiv);
});


// 태그 수 표시도 업데이트
const tagCountEl = document.getElementById("border-type-count");
tagCountEl.innerText = `${item.tags.length} Border Type${item.tags.length > 1 ? 's' : ''}`;




// 7.crossingType에 맞는 색상 배열 리턴 함수
function getCrossingTypeColors(crossingTypes) {
  const typesArray = Array.isArray(crossingTypes) ? crossingTypes : [crossingTypes];
  return typesArray.map(type => {
    return {
      type: type,
      color: typeColors[type] || "transparent"
    };
  });
}

if (id && data[id]) {
  const selectedData = data[id];
  const crossingWithColors = getCrossingTypeColors(selectedData.crossingType);

  const container = document.getElementById('crossing-container');
  container.innerHTML = ''; // 초기화

  crossingWithColors.forEach(item => {
    const span = document.createElement('span');
    span.textContent = item.type;
    span.style.backgroundColor = item.color;
    span.style.padding = '0px 10px';
    span.style.marginTop = '10px';
    span.style.display = 'block';
    span.style.width = '13vw';
    span.style.textAlign = 'center';
    container.appendChild(span);
  });
}





////// Mapbox 초기화
document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaHllZXMyIiwiYSI6ImNtYjI5enNxbzFocm8yanM2dDl6ZDAyZ3gifQ.IRCkkbbPlddk-a3V6zthSQ';

  const mapContainer = document.querySelector('.map');
  if (!mapContainer) {
    console.error('Map container not found');
    return;
  }

  mapContainer.innerHTML = '';

  const lat = parseFloat(mapContainer.dataset.lat);
  const lng = parseFloat(mapContainer.dataset.lng);
  const zoom = parseFloat(mapContainer.dataset.zoom);

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/hyees2/cma42kegn002m01qodpo94v3j',
    center: [lng, lat],
    zoom: zoom,
  });

  // ✨ 커스텀 마커 생성
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker'; // CSS에 스타일 정의 필요

  new mapboxgl.Marker(markerEl)
    .setLngLat([lng, lat])
    .addTo(map);
});






// active/inactive
function updateStatusDisplay(statusValue) { 
  const statusElement = document.querySelector('.status-wrapper .status');

  if (!statusElement) {
    console.error("Error: Status display element not found.");
    return;
  }

  statusElement.textContent = ''; 

  const statusTagDiv = document.createElement('div');
  statusTagDiv.classList.add('heading', 'status-tag');

  if (statusValue === "Active") {
    statusTagDiv.classList.add('active');
    statusTagDiv.textContent = '• Active';
  } else if (statusValue === "Inactive") {
    statusTagDiv.classList.add('inactive');
    statusTagDiv.textContent = '• Inactive';
  } else {
    statusTagDiv.textContent = statusValue;
    console.warn("Unknown status value:", statusValue);
  }

  statusElement.appendChild(statusTagDiv);
}

const urlParams = new URLSearchParams(window.location.search);
const borderId = urlParams.get('id'); 

const selectedBorderData = borderId ? data[borderId] : null;

if (selectedBorderData) {
  updateStatusDisplay(selectedBorderData.status); 
} else {
  console.error("Error: Border ID not found in URL or data. Cannot display status.");
}




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
