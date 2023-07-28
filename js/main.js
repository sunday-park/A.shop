//[상단] 모바일 네비 토글버튼
const toggleBtn = document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_icons');

toggleBtn.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    icons.classList.toggle('active');
} );

//[상단] 스크롤 - 페이지 진행도
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('scroll',updateProgress);

function updateProgress(){
    const totalHeight = document.body.clientHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = (currentScroll / totalHeight) * 100;
    document.querySelector('.progress_bar').style.display = 'block';
    document.querySelector('.progress_bar').style.width = `${progress}%`;
}

//[상단] 스크롤 - 네비바 작게
window.addEventListener('scroll',()=>{
    if(window.scrollY > 100){
        document.querySelector('.navbar').style.fontSize='17pt';
        document.querySelector('.navbar_logo').style.fontSize='22pt';
    } else {
        document.querySelector('.navbar').style.fontSize='';//기본값 설정
        document.querySelector('.navbar_logo').style.fontSize='';
    }
})

//[본문(공통)] 스크롤 - 상단 페이지 이동 버튼
document.querySelector('.scroll_btn').addEventListener('click',clickme);

function clickme() {
    window.scrollTo({top:0, left:0, behavior:'smooth'});
}

//[본문] 로그인 - 로그인 모달 토글
$('.login_btn').on('click', function(){
    //document.querySelector('.black_bg').classList.add('.show_modal');
    $('.black_bg').addClass('show_modal');
});

$('.close_btn').on('click', function(){
    $('.black_bg').removeClass('show_modal');
})

$('.black_bg').on('click',(e)=>{
    if($(e.target).is($('.black_bg'))){
        e.stopPropagation();
        $('.black_bg').removeClass('show_modal');
    }
})

//[본문] 로그인 - 이메일 정규식
let email = document.getElementById('input_id');
let pw = document.getElementById('input_pw');
const loginForm = document.getElementById('login_form');

email.addEventListener('keyup', function(event) {
    const emailHelp = document.getElementById('help_id');
    const isValidEmail = /\S+@\S+\.\S+/.test(email.value);
    
    if (email.value === '') {
        emailHelp.innerText = '이메일을 입력하세요';
    } else if (isValidEmail) {
        emailHelp.innerText = '✅';
    } else {
        emailHelp.innerText = '이메일 형식에 맞지 않습니다';
    }
    });

    pw.addEventListener('keyup', function(event) {
    const pwHelp = document.getElementById('help_pw');
    
    if (pw.value === '') {
        pwHelp.innerText = '비밀번호를 입력하세요';
    } else if (pw.value.length < 8) {
        pwHelp.innerText = '비밀번호는 8자 이상이어야 합니다';
    } else if(/[A-Z]/.test(pw.value)) {
        pwHelp.innerText = '대문자는 입력 불가능합니다';
    } else {
        pwHelp.innerText = '✅';
    }
});


//[본문] 서버에 상품이 있다고 가정하며

let bestProducts = [
    { id : 0, price : 59900, title : '[로이스트] 원목 써클 대형거울', sale:10 },
    { id : 1, price : 39900, title : '[감성공방] 오픈형 원목 행거', sale:0 },
    { id : 2, price : 69000, title : '[포레스트] 월넛 원목 체어', sale:8 },
    { id : 3, price : 20250, title : '[아이온] 모던 전기 커피 포트', sale:5 }
]
var newProducts = [
    { id : 0, price : 13500, title : '[메리] 크리스마스 리스 화환', sale:5 },
    { id : 1, price : 5900, title : '[잔향] 스모키 우드 심지캔들', sale:13 },
    { id : 2, price : 6350, title : '[겨울] 트리 장식볼 SET', sale:5 },
    { id : 3, price : 13900, title : '[그린이야기] 테이블 트리 화분', sale:10 }
];

let bestGoods = bestProducts;
let newGoods = newProducts;

bestGoods.forEach((item)=>{
    let template = 
    `<div class="goods_container">
        <a href="#">
            <div class="img_container">
                <img src="./image/product/best${item.id+1}.png" class="goods_b_img" alt="thumbnail">
            </div>
            <h2>${item.title}</h2>
        </a>
        <div class="goods_info">
            <div>
                <span class="price">${item.price.toLocaleString()}</span>
                <span class="sale">${item.sale}%</span>
            </div>
            <button class="add_cart"><i class="fa-solid fa-cart-plus"></i></button>
        </div>       
    </div>
    `
    $('.goods_best').append(template);
});

newGoods.forEach((item)=>{
    let template = 
    `<div class="goods_container">
        <a href="#">
            <div class="img_container">
                <img src="./image/product/new${item.id+1}.png" class="goods_b_img" alt="thumbnail">
            </div>
            <h2>${item.title}</h2>
        </a>
        <div class="goods_info">
            <div>
                <span class="price">${item.price.toLocaleString()}</span>
                <span class="sale">${item.sale}%</span>
            </div>
            <button class="add_cart"><i class="fa-solid fa-cart-plus"></i></button>
        </div>       
    </div>
    `
    $('.goods_new').append(template);
});

//[본문] 이미지 슬라이더
function Silder(num){
    $('.slide_container').css('transform','translateX('+num+'vw)');
}

$('.silde_btn_1').on('click',()=>{
    console.log('1번이미지');
    Silder(0);
    //$('.slide_container').css('transform','translateX(0vw)');
    //$('.silde_btn_1').addClass('silde_btn_active');
})
$('.silde_btn_2').on('click',()=>{
    console.log('2번이미지');
    Silder(-100);
    //$('.slide_container').css('transform','translateX(-100vw)');
})
$('.silde_btn_3').on('click',()=>{
    console.log('3번이미지');
    Silder(-200);
    //$('.slide_container').css('transform','translateX(-200vw)');
})

//[본문] 이미지 슬라이더 다음이전 버튼
let 지금사진 = 0;

$('.slide_btn_next').on('click', function(){
    지금사진++;
    $('.slide_container').css('transform','translateX(-'+지금사진+'00vw)');
    if(지금사진 == 3){ //맨 끝일때 앞으로 돌아감
        $('.slide_container').css('transform','translateX(0vw)');
        지금사진 = 0;
    }
    console.log(지금사진);
})

$('.slide_btn_prev').on('click',function(){
    지금사진--;
    $('.slide_container').css('transform','translateX(-'+지금사진+'00vw)')
    if(지금사진 == -1){ //맨 앞일때 끝으로 넘어감
        $('.slide_container').css('transform','translateX(-200vw)');
        지금사진 = 2;
    }
    console.log(지금사진);
})



//카트 - 로컬스토리지에 상품 저장하기
//localStorage.removeItem('cart');
$('.add_cart').on('click', (event) => {
    let title = $(event.target).closest('.goods_container').find('h2').text();
    let priceText = $(event.target).closest('div').find('.price').text();
    let price = parseFloat(priceText.replace(',', ''));
    let img = $(event.target).closest('.goods_container').find('img').attr('src');
    console.log(title,price, img);
    let cartItems = [];
    alert("상품을 카트에 담았습니다!");

    if (localStorage.getItem('cart') !== null) {
        cartItems = JSON.parse(localStorage.getItem('cart'));
        
        // 같은 상품이 이미 장바구니에 있는지 확인
        let existingItem = cartItems.find(item => item.title === title);
        if (existingItem) {
        existingItem.quantity++; // 이미 있는 상품의 개수를 증가
        } else {
        // 새로운 상품 추가
        cartItems.push({ title: title, price: price, quantity: 1, img:img});
        }
    } else {
        cartItems.push({ title: title, price: price, quantity: 1, img:img});
    }

localStorage.setItem('cart', JSON.stringify(cartItems));
});


//[cart.html] 장바구니 확인
    //$('.check_cart').click(()=>{
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        //console.log(cartItems);
        let totalSum = 0; //전역변수로 충합계값 저장

        if(cartItems !== null){
            cartItems.forEach((item)=>{
                let Template =
                `<div class="cart_list">
                    <img src="${item.img}" class="cart_img" alt="thumbnail"></img>
                    <p>${item.title}</p>
                    <p>￦${item.price.toLocaleString()}</p>
                    <p>수량: ${item.quantity}</p>
                    <p>합계: ${(item.price*item.quantity).toLocaleString()}원</p>
                </div>`;
                totalSum += item.price*item.quantity; //가격 전체 합계
                $('.check_cart').append(Template);
                console.log(item.img);
            });
            let totalTemplate = `<hr>
            <div class="totalSum">총 합계: ${totalSum.toLocaleString()}원</div>`;
            $('.check_cart').append(totalTemplate);

            //카트 결제하기 버튼
            $('.buy_cart').click(()=>{
                alert("결제가 완료되었습니다.");
            })
            //카트 모두 삭제 버튼
            $('.remove_cart').click(()=>{
                localStorage.removeItem('cart');
                location.reload();
            })
        } else {
            let 템플릿 = 
            `<div class="no_cart">
            😢이런! 장바구니가 비어있습니다.
            </div>`
            $('.check_cart').append(템플릿);
            //카트 결제 비활성화
            //$('.buy_cart').off('click');
            $('.buy_cart').addClass('hide_modal');
            $('.remove_cart').addClass('hide_modal');
        }
