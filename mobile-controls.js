// Universal Mobile Controls for HTML5 Games
// Add this script to any canvas-based game for proper mobile touch support

function addMobileControls(canvas, gameType = 'default') {
    let touchStartX = 0, touchStartY = 0;
    let touchMoveX = 0, touchMoveY = 0;
    let isTouching = false;
    let touchStartTime = 0;
    
    // Prevent default touch behaviors
    canvas.style.touchAction = 'none';
    document.body.style.touchAction = 'none';
    
    // Get proper canvas coordinates
    function getTouchPos(e, touch) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const pos = getTouchPos(e, touch);
        touchStartX = pos.x;
        touchStartY = pos.y;
        touchMoveX = pos.x;
        touchMoveY = pos.y;
        isTouching = true;
        touchStartTime = Date.now();
        
        // Game-specific touch start logic
        if (typeof window.onTouchStart === 'function') {
            window.onTouchStart(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isTouching) return;
        
        const touch = e.touches[0];
        const pos = getTouchPos(e, touch);
        touchMoveX = pos.x;
        touchMoveY = pos.y;
        
        // Game-specific touch move logic
        if (typeof window.onTouchMove === 'function') {
            window.onTouchMove(pos.x, pos.y, touchStartX, touchStartY);
        }
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touchDuration = Date.now() - touchStartTime;
        const diffX = touchMoveX - touchStartX;
        const diffY = touchMoveY - touchStartY;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        
        // Determine gesture type
        const isTap = touchDuration < 200 && distance < 20;
        const isSwipe = distance > 30;
        
        // Game-specific touch end logic
        if (typeof window.onTouchEnd === 'function') {
            window.onTouchEnd(touchMoveX, touchMoveY, diffX, diffY, isTap, isSwipe);
        }
        
        isTouching = false;
    });
    
    // Prevent context menu on long press
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}
