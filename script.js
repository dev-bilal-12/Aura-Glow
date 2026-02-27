function openInstagramWeb() {
    const username = "_.aura_glow";
    const webUrl = `https://www.instagram.com/${username}/?utm_source=web`;
    alert("If Instagram popup appears, please tap 'cross' for best experience.");
    const newWindow = window.open("", "_blank");
    newWindow.opener = null;
    newWindow.location = webUrl;
}

// DROPDOWN
document.querySelectorAll('.drop-btn').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        const isOpen = content.style.display === "block";
        this.parentElement.parentElement.querySelectorAll('.drop-content').forEach(d => d.style.display="none");
        this.parentElement.parentElement.querySelectorAll('.drop-btn i').forEach(i => i.className="fas fa-chevron-down");
        if(!isOpen){ content.style.display="block"; icon.className="fas fa-chevron-up"; }
    });
});

// CART LOGIC
let cart = [];
function toggleCart(){ document.getElementById("cart-sidebar").classList.toggle("active"); }
function addToCart(name, price){ cart.push({name, price}); updateUI(); if(!document.getElementById("cart-sidebar").classList.contains("active")) toggleCart(); }
function updateUI(){
    const list=document.getElementById("cart-items-list"); let total=0; list.innerHTML="";
    cart.forEach((item,index)=>{ total+=item.price; list.innerHTML+=`<div class="cart-item"><span>${item.name}</span><span> Rs. ${item.price} <i class="fas fa-trash-alt" style="color:#ff4d4d;margin-left:10px;cursor:pointer" onclick="removeItem(${index})"></i></span></div>`; });
    document.getElementById("cart-total-price").innerText=total;
    document.getElementById("cart-count").innerText=cart.length;
}
function removeItem(index){ cart.splice(index,1); updateUI(); }
function checkout(){
    if(cart.length===0){ alert("Your bag is empty!"); return; }
    let msg="Hi Aura Glow! I want to order:\n\n";
    cart.forEach((item,i)=>{ msg+=`${i+1}. ${item.name} (Rs. ${item.price})\n`; });
    const total=document.getElementById("cart-total-price").innerText;
    msg+=`\nTotal: Rs. ${total}`;
    copyTextToClipboard(msg);
    alert("Order copied! Now you will be redirected to Instagram. Just paste the message in DM.");
    openInstagramWeb();
}
function copyTextToClipboard(text){
    if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(text); }
    else{
        let textArea=document.createElement("textarea"); textArea.value=text;
        textArea.style.position="fixed"; textArea.style.left="-999999px"; textArea.style.top="-999999px";
        document.body.appendChild(textArea); textArea.focus(); textArea.select(); document.execCommand('copy'); textArea.remove();
    }
}

// Scroll animation
const observerOptions={threshold:0.1};
const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add("appear"); } });
}, observerOptions);
document.querySelectorAll(".fade-in").forEach(el=>observer.observe(el));