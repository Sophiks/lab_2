document.addEventListener("DOMContentLoaded", () => {
    const info = {
        os: navigator.platform,
        browser: navigator.userAgent,
        res: `${window.screen.width}x${window.screen.height}`
    };
    localStorage.setItem("user_data", JSON.stringify(info));

    const footer = document.getElementById("storage-footer");
    const data = JSON.parse(localStorage.getItem("user_data"));
    footer.innerHTML = `<b>OS:</b> ${data.os} | <b>Browser:</b> ${data.browser} | <b>Screen:</b> ${data.res}`;

    const container = document.getElementById("comments-container");
    fetch("https://jsonplaceholder.typicode.com/posts/3/comments")
        .then(res => res.json())
        .then(comments => {
            container.innerHTML = "";
            comments.forEach(c => {
                const item = document.createElement("div");
                item.className = "comment-box";
                item.innerHTML = `<b>${c.email}</b><p>${c.body}</p>`;
                container.appendChild(item);
            });
        });

    const modal = document.getElementById("modal-form");
    setTimeout(() => {
        modal.style.display = "flex";
    }, 60000);

    document.getElementById("close-btn").onclick = () => modal.style.display = "none";

    const btn = document.getElementById("theme-toggle");

    function toggleMode() {
        document.body.classList.toggle("dark-mode");
        btn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Day Mode" : "🌙 Night Mode";
    }

    btn.onclick = toggleMode;
    const hour = new Date().getHours();
    if (hour < 7 || hour >= 21) {
        document.body.classList.add("dark-mode");
        btn.innerText = "☀️ Day Mode";
    }
});