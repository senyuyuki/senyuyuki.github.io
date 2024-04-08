sengame.hookFunction("ChatRoomClick", 0, (args, next) => {
    if (MouseIn(965, 500, 40, 40)) {
        if (!window.windowIsOpen) {
            createWindow();
            window.windowIsOpen = true; // 标记窗口已打开
        } else {
            // 如果窗口已打开，则不执行任何操作
            return;
        }
        // 阻止默认行为和事件传播
        args[0].preventDefault();
        args[0].stopPropagation();
        return;
    }
    next(args);
});

function createWindow() {
    window.tarot.tarotWindow = document.createElement("div");
    window.tarot.tarotWindow.style.position = "fixed";
    window.tarot.tarotWindow.style.width = "300px";
    window.tarot.tarotWindow.style.height = "200px";
    window.tarot.tarotWindow.style.backgroundColor = "#fff"; // 修正属性名
    window.tarot.tarotWindow.style.border = "1px solid #ccc";
    window.tarot.tarotWindow.style.top = "50%";
    window.tarot.tarotWindow.style.left = "50%";
    window.tarot.tarotWindow.style.transform = "translate(-50%, -50%)"; // 修正 transform 属性值
    window.tarot.tarotWindow.style.overflow = "hidden";
    window.tarot.tarotWindow.style.zIndex = "9999";
    document.body.appendChild(window.tarot.tarotWindow); // 添加到页面中
}
