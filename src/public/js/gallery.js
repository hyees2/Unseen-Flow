document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const nameDisplay = document.getElementById('current-image-name');
  const scrollContainer = document.querySelector('.index-main-inner');
  const resetButtons = document.querySelectorAll('.reset-btn');
  const closeButtons = document.querySelectorAll('.circle-icon.close-btn');

// 10개 보더 필터링
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

document.getElementById('nationality').addEventListener('change', function () {
  const selectedType = this.value;

  const typeMap = {
    "Group_A": "Informational",
    "Group_B": "Political",
    "Group_C": "Administrative",
    "Group_D": "Economic",
    "Group_E": "Labor&Financial",
    "Group_F": "Socio-Cultural",
    "Group_G": "Security&Military",
    "Group_H": "Health&Quarantine",
    "Group_I": "Physical",
    "Group_J": "Natural"
  };

  const filterType = typeMap[selectedType] || "";
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    const types = item.dataset.types
      .split(",")
      .map(t => t.trim().toLowerCase()); // 모든 타입을 소문자로 정리
  
    const isMatch = types.includes(filterType.toLowerCase()); // 필터타입도 소문자
  
    if (!filterType || isMatch) {
      item.style.opacity = "1";
      item.style.filter = "none";
    } else {
      item.style.opacity = "0.1";
      item.style.filter = "grayscale(1)";
    }
  });

  // 노티피케이션 영역 초기화
  const notificationContainer = document.getElementById('notification-container');
  notificationContainer.innerHTML = ""; // 기존 노티 제거

  if (filterType && restrictionDescriptions[filterType]) {
    const notif = document.createElement('div');
    notif.classList.add('custom-notification');
    notif.innerHTML = `
    <div class="notif-title">${filterType} BORDER OPERATIONAL CRITERIA</div>
    <div class="notif-desc">${restrictionDescriptions[filterType]}</div>
  `;

    // Close 버튼
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-box');
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    `;
    closeBtn.addEventListener('click', () => {
      notificationContainer.innerHTML = "";
    });

    // Undo 버튼
    const undoBtn = document.createElement('div');
    undoBtn.classList.add('undo-box');
    undoBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    `;
    undoBtn.addEventListener('click', () => {
      // 초기화 함수 (있다면 실행)
      if (typeof resetInterfaceToInitial === 'function') {
        resetInterfaceToInitial();
      }

      // 전체 opacity 원상복귀
      items.forEach(item => item.style.opacity = "1");

      // 노티 제거
      notificationContainer.innerHTML = "";
    });

    // 컨테이너에 모두 추가
    notificationContainer.appendChild(notif);
    notificationContainer.appendChild(closeBtn);
    notificationContainer.appendChild(undoBtn);
  }
});









  // 카드 뒤집기와 콘텐츠 주입
  galleryItems.forEach(item => {
    const desc = item.querySelector('.card-back .boundary-description');
    const link = item.querySelector('.card-back .dropdown-item-link');
    const id = item.dataset.id;
    const itemData = data[id];
    if (itemData) {
      if (desc) desc.textContent = itemData.boundaryDescription;
      if (link) {
        link.textContent = itemData.seeMoreText;
        link.href = `${itemData.detailPageUrl}&source=gallery`;
      }
    }
    const cardInner = item.querySelector('.card-inner');
    if (cardInner) {
      item.addEventListener('mouseenter', () => cardInner.classList.add('is-flipped'));
      item.addEventListener('mouseleave', () => cardInner.classList.remove('is-flipped'));
    }
  });

  // 스크롤 중심에 있는 이미지에 active 클래스 부여
  function activateCenterImage() {
    if (!scrollContainer) return;
    const containerRect = scrollContainer.getBoundingClientRect();
    const viewportCenterY = containerRect.top + scrollContainer.clientHeight / 2;

    let closestItem = null;
    let minDistance = Infinity;

    galleryItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + rect.height / 2;

      const distance = Math.abs(viewportCenterY - itemCenterY);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    galleryItems.forEach(item => {
      item.classList.remove('active');
    });

    if (closestItem) {
      closestItem.classList.add('active');
      if (closestItem.dataset.id && nameDisplay) {
        nameDisplay.textContent = closestItem.dataset.id
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
      }
    }
  }

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', activateCenterImage);
    window.addEventListener('resize', activateCenterImage);
    window.addEventListener('load', () => {
      const firstItem = galleryItems[0];
      if (firstItem) {
        firstItem.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
      activateCenterImage();
    });
    
  }
});





