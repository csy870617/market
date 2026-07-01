(() => {
    const grid = document.getElementById('grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');

    // 현재 상태 변수
    let currentCategory = 'all';
    let currentSort = 'newest';

    // 초기 렌더링
    updateGrid();

    // 1. 카테고리 필터 버튼 클릭 이벤트
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 버튼 활성화 스타일 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // 상태 업데이트 및 그리드 갱신
            currentCategory = e.currentTarget.getAttribute('data-filter');
            updateGrid();
        });
    });

    // 2. 정렬 선택 이벤트
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        updateGrid();
    });

    // 통합 렌더링 함수
    function updateGrid() {
        grid.innerHTML = '';

        // A. 필터링 (카테고리)
        let filteredData = currentCategory === 'all'
            ? [...productData]
            : productData.filter(item => item.category === currentCategory);

        // B. 정렬 로직 (인기순 제거됨)
        switch (currentSort) {
            case 'newest':
                // ID 내림차순 (높은 ID가 최신)
                filteredData.sort((a, b) => b.id - a.id);
                break;
            case 'low-price':
                // 가격 오름차순
                filteredData.sort((a, b) => a.price - b.price);
                break;
            case 'high-price':
                // 가격 내림차순
                filteredData.sort((a, b) => b.price - a.price);
                break;
            default:
                // 기본: ID 내림차순
                filteredData.sort((a, b) => b.id - a.id);
        }

        // C. 결과 없음 처리
        if (filteredData.length === 0) {
            grid.innerHTML = '<p style="grid-column:1/-1; padding:4rem 0; text-align:center; color:#888;">준비된 상품이 없습니다.</p>';
            return;
        }

        // D. 카드 생성 및 출력
        filteredData.forEach(product => {
            grid.appendChild(createCard(product));
        });
    }

    function createCard(product) {
        const card = document.createElement('a');
        card.href = product.link;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'card';

        const imgBox = document.createElement('div');
        imgBox.className = 'img-box';
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.title;
        imgBox.appendChild(img);

        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';

        const catTag = document.createElement('span');
        catTag.className = 'cat-tag';
        catTag.textContent = product.categoryKr;

        const title = document.createElement('h3');
        title.textContent = product.title;

        const price = document.createElement('div');
        price.className = 'price';
        price.append(`${product.price.toLocaleString()}원`, document.createElement('br'));
        const priceNote = document.createElement('span');
        priceNote.style.cssText = 'font-size:0.75rem; color:#888; font-weight:400;';
        priceNote.textContent = '정확한 가격은 클릭 후 확인';
        price.appendChild(priceNote);

        infoBox.append(catTag, title, price);
        card.append(imgBox, infoBox);

        return card;
    }
})();
