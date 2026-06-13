document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 선택
    const scriptInput = document.getElementById('scriptInput');
    const speedSelect = document.getElementById('speedSelect');
    const estimatedTimeEl = document.getElementById('estimatedTime');
    const charCountEl = document.getElementById('charCount');
    const clearBtn = document.getElementById('clearBtn');

    // 계산 및 화면 업데이트 로직
    const updateCalculator = () => {
        const text = scriptInput.value;
        const charsPerSecond = parseInt(speedSelect.value, 10);
        
        // 공백(띄어쓰기, 줄바꿈) 제외 순수 글자 수 계산
        const textWithoutSpaces = text.replace(/\s+/g, '');
        const charLength = textWithoutSpaces.length;
        
        // 시간 계산 (소수점 첫째 자리까지)
        let totalSeconds = 0;
        if (charLength > 0) {
            totalSeconds = (charLength / charsPerSecond).toFixed(1);
        }

        // 60초 초과 시 경고 스타일 적용 (Shorts 기준)
        if (totalSeconds > 60) {
            estimatedTimeEl.style.color = '#ef4444';
            estimatedTimeEl.textContent = `${totalSeconds}초 (1분 초과)`;
        } else {
            estimatedTimeEl.style.color = 'var(--text-main)';
            estimatedTimeEl.textContent = `${totalSeconds}초`;
        }

        charCountEl.textContent = `${charLength}자`;
    };

    // 이벤트 리스너 등록
    scriptInput.addEventListener('input', updateCalculator);
    speedSelect.addEventListener('change', updateCalculator);

    clearBtn.addEventListener('click', () => {
        scriptInput.value = '';
        updateCalculator();
        scriptInput.focus();
    });
});