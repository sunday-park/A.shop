# 🏠A . shop
html/css/JavaScript 인테리어 쇼핑몰 웹페이지

개인으로 작업한 인테리어 쇼핑몰 웹사이트입니다. 
미디어쿼리를 통해 PC와 모바일 해상도(max-width:  768px) 버전을 작성했습니다.
로그인, Scroll 이벤트, 이미지 슬라이드의 기능과  Localstorage에 상품을 담아두고 삭제할 수 있게 하였습니다.

## 개발환경
`HTML` `CSS` `JavaScript` `JQuery (3.41)`
`VSCode(v1.74)`

## 기능
* 로그인, 이메일 정규식
* 스크롤 진행도
* localstorage  장바구니
* 이미지 슬라이더
<br>

>**로그인, 이메일 정규식**
```javascript
let email = document.getElementById('input_id');
let pw = document.getElementById('input_pw');
const  loginForm  = document.getElementById('login_form');

email.addEventListener('keyup',  function(event)  {
	const  emailHelp  = document.getElementById('help_id');
	const  isValidEmail  = /\S+@\S+\.\S+/.test(email.value);
	
	if (email.value ===  '') {
	emailHelp.innerText =  '이메일을 입력하세요';
	} else if (isValidEmail) {
	emailHelp.innerText =  '✅';
	} else {
	emailHelp.innerText =  '이메일 형식에 맞지 않습니다';
	}
	});

pw.addEventListener('keyup',  function(event)  {
	const  pwHelp  = document.getElementById('help_pw');
	
	if (pw.value ===  '') {
	pwHelp.innerText =  '비밀번호를 입력하세요';
	} else if (pw.value.length <  8) {
	pwHelp.innerText =  '비밀번호는 8자 이상이어야 합니다';
	} else if(/[A-Z]/.test(pw.value)) {
	pwHelp.innerText =  '대문자는 입력 불가능합니다';
	} else {
	pwHelp.innerText =  '✅';
	}
});
```
- 이메일과 비밀번호 입력란에 `keyup` 이벤트 리스너를 추가합니다.
-   이메일과 비밀번호의 유효성을 정규식을 사용하여 확인합니다.
-   올바른 형식에 맞는 경우 ✅를, 형식에 맞지 않는 경우 해당 오류 메시지를 보여줍니다.
<br>

>**스크롤 진행도**
```javascript
window.addEventListener('load', ()  => {
	window.scrollTo(0,  0);
});

window.addEventListener('scroll', updateProgress);

function updateProgress(){
	const totalHeight = document.body.clientHeight - window.innerHeight;
	const currentScroll = window.scrollY;
	const  progress  = (currentScroll / totalHeight) * 100;

	document.querySelector('.progress_bar').style.display = 'block';
	document.querySelector('.progress_bar').style.width = `${progress}%`;
}
```
-   페이지 로드 시 `window.scrollTo(0, 0)`을 사용하여 페이지 맨 위로 스크롤을 이동합니다.
-   `updateProgress` 함수는 `scroll` 이벤트가 발생할 때 호출됩니다.
-   `totalHeight`는 문서 전체 높이에서 윈도우 높이를 뺀 값을 나타냅니다.
-   `currentScroll`은 현재 스크롤 위치를 나타냅니다.
-   `progress`는 스크롤 진행도를 백분율로 나타냅니다.
-   `.progress_bar` 요소의 너비를 `progress`로 설정하여 진행 바를 업데이트합니다.
<br>

>**localstorage  장바구니**
```javascript
$('.add_cart').on('click',  (event)  =>  {
	let title = $(event.target).closest('.goods_container').find('h2').text();
	let priceText = $(event.target).closest('div').find('.price').text();
	let price = parseFloat(priceText.replace(',',  ''));
	let img = $(event.target).closest('.goods_container').find('img').attr('src');
	let cartItems = [];
	alert("상품을 카트에 담았습니다!");

	if (localStorage.getItem('cart') !==  null) {
		cartItems = JSON.parse(localStorage.getItem('cart'));
		
		// 같은 상품이 이미 장바구니에 있는지 확인
		let existingItem = cartItems.find(item => item.title === title);
			if (existingItem) {
			existingItem.quantity++; //이미 있는 상품의 개수를 증가
		}  else  {
		// 새로운 상품 추가
		cartItems.push({ title: title, price: price, quantity: 1, img:img});
		}
	} else {
	cartItems.push({ title: title, price: price, quantity: 1, img:img});
	}

localStorage.setItem('cart',  JSON.stringify(cartItems));
});
```
-   `.add_cart` 클래스를 가진 요소를 클릭하면 상품 정보를 가져와 카트에 추가합니다.
-   카트 정보를 배열로 저장하여 로컬 스토리지에 저장합니다.
<br>

>**장바구니 확인**
```javascript
let cartItems = JSON.parse(localStorage.getItem('cart'));

let totalSum = 0; //전역변수로 충합계값 저장
	if(cartItems!== null){
		cartItems.forEach((item)=>{
	let Template =
		`<div class="cart_list">
			<img src="${item.img}" class="cart_img" alt="thumbnail"></img>
			<p>${item.title}</p>
			<p>￦${item.price.toLocaleString()}</p>
			<p>수량: ${item.quantity}</p>
			<p>합계: ${(item.price*item.quantity).toLocaleString()}원</p>
		</div>`;
		totalSum += item.price*item.quantity;  //가격 전체 합계
		$('.check_cart').append(Template);
	});
		let totalTemplate =  `<hr>
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
		$('.buy_cart').addClass('hide_modal');
		$('.remove_cart').addClass('hide_modal');
}
```
-   카트 페이지에서 로컬 스토리지에서 카트 데이터를 가져와 카트에 추가합니다.
-   각 카트 아이템의 세부 정보와 총 가격을 동적으로 생성하여 표시합니다.
<br>

>**이미지 슬라이더**
```javascript
//[본문] 이미지 슬라이더

function  Silder(num){
	$('.slide_container').css('transform','translateX('+num+'vw)');
}

$('.silde_btn_1').on('click',()=>{
	console.log('1번이미지');
	Silder(0);
})

$('.silde_btn_2').on('click',()=>{
	console.log('2번이미지');
	Silder(-100);
})

$('.silde_btn_3').on('click',()=>{
	console.log('3번이미지');
	Silder(-200);
})

//[본문] 이미지 슬라이더 다음이전 버튼
let 지금사진 =  0;

$('.slide_btn_next').on('click',  function(){
	지금사진++;
	$('.slide_container').css('transform','translateX(-'+지금사진+'00vw)');
	if(지금사진 ==  3){  //맨 끝일때 앞으로 돌아감
		$('.slide_container').css('transform','translateX(0vw)');
		지금사진 =  0;
	}
})

$('.slide_btn_prev').on('click',function(){
지금사진--;
	$('.slide_container').css('transform','translateX(-'+지금사진+'00vw)')
	if(지금사진 ==  -1){  //맨 앞일때 끝으로 넘어감
		$('.slide_container').css('transform','translateX(-200vw)');
		지금사진 =  2;
	}
	console.log(지금사진);
})
```

-   버튼을 사용하여 다양한 상품 이미지 사이를 이동할 수 있도록 합니다.
-  CSS의 translation을 사용하여 여러 이미지를 가로로 나열합니다. 
-   `.slide_container` 요소의 `transform` 속성을 변경하여 이미지를 이동시킵니다.
-   `.silde_btn_1`, `.silde_btn_2`, `.silde_btn_3` 요소를 클릭하면 `Silder` 함수를 호출하여 이미지를 이동시킵니다.
-   `.slide_btn_next`와 `.slide_btn_prev` 요소를 클릭하면 이미지를 좌우로 이동시키며, 끝에 도달하면 처음으로 돌아갑니다.
<br>

## 리뷰
### 해결되지 않은 문제
* 장바구니 상품 개별 삭제 기능
