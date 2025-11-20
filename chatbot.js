const btn = document.getElementById("chatbot-button");
const box = document.getElementById("chatbot-box");
const send = document.getElementById("chat-send");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");

// Toggle chatbot window
btn.onclick = () => {
    box.style.display = getComputedStyle(box).display === "none" ? "flex" : "none";
};

// Add message to UI
function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = sender === "AI" ? "bot-msg" : "user-msg";
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// Loading dots animation
function showTyping() {
    const div = document.createElement("div");
    div.id = "typing";
    div.className = "bot-msg";
    div.innerHTML = "Typing<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span>";
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// Remove typing animation
function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

// Send message
send.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage("You", text);
    input.value = "";

    showTyping();

    try {
        const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        removeTyping();
        addMessage("AI", data.reply);

    } catch (err) {
        removeTyping();
        addMessage("AI", "⚠️ Server error. Backend is not responding.");
    }
};
