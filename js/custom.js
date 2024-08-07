
$(document).ready(function() {

	//Подключаем попап на страницах
	$( ".popup-with-form" ).each(function() {
		$(this).magnificPopup({
			type: 'inline',
			preloader: false,
		});
	  });

	  $( ".popup-with-form_faves" ).each(function() {
		let href = $(this).data('href');

		$(this).magnificPopup({
			items: {
				src: href,
				type: 'inline'
			},
			preloader: false,
		});
	});
	

	//Стилизуем select

	$('.form__select').each(function() {
		const _this = $(this),
			selectOption = _this.find('option'),
			selectOptionLength = selectOption.length,
			selectedOption = selectOption.filter(':selected'),
			duration = 450; // длительность анимации 

		_this.hide();
		_this.wrap('<div class="select"></div>');
		$('<div>', {
			class: 'new-select',
			text: _this.children('option:disabled').text()
		}).insertAfter(_this);

		const selectHead = _this.next('.new-select');
		$('<div>', {
			class: 'new-select__list'
		}).insertAfter(selectHead);

		const selectList = selectHead.next('.new-select__list');
		for (let i = 1; i < selectOptionLength; i++) {
			$('<div>', {
				class: 'new-select__item',
				html: $('<span>', {
					text: selectOption.eq(i).text()
				})
			})
			.attr('data-value', selectOption.eq(i).val())
			.appendTo(selectList);
		}

		const selectItem = selectList.find('.new-select__item');
		selectList.slideUp(0);
		selectHead.on('click', function() {
			if ( !$(this).hasClass('on') ) {
				$(this).addClass('on');
				selectList.slideDown(duration);

				selectItem.on('click', function() {
					let chooseItem = $(this).data('value');

					$('select').val(chooseItem).attr('selected', 'selected');
					selectHead.text( $(this).find('span').text() );

					selectList.slideUp(duration);
					selectHead.removeClass('on');
				});

			} else {
				$(this).removeClass('on');
				selectList.slideUp(duration);
			}
		});
	});

	//Валидация форм
	$(".form").each(function() {
		$(this).validate({
			rules: {
				email: {
					required: true,
					email: true,
					minlength: 5
				},
				pass: {
					required: true,
					minlength: 8
				},
				old_pass: {
					required: true,
					minlength: 8
				},
				new_pass: {
					required: true,
					minlength: 8
				},
				repeat_pass: {
					required: true,
					minlength: 8
				},
				name: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				email: {
					required: "Введите Email",
					minlength: "Поле должно быть более 5-ти символов",
					email: "Некорректно введен Email"
				},
				name: {
					required: "Введите название",
					minlength: "Поле должно быть более 2 символов"
				},
				pass: {
					required: "Введите пароль",
					minlength: "Пароль должно быть более 8 символов",
				},
				old_pass: {
					required: "Введите старый пароль",
					minlength: "Пароль должно быть более 8 символов",
				},
				new_pass: {
					required: "Введите новый пароль",
					minlength: "Пароль должно быть более 8 символов"
				},
				repeat_pass: {
					required: "Повторите пароль",
					minlength: "Пароль должно быть более 8 символов",
				}
			},
			focusInvalid: true,
		});
	});

	//Устанавливаем куки
	function cookieSet() {
		if($.cookie('user_agree')) {
			$(".bottom__cookies").addClass("closed")
		}

		$("#bottom__cookies").on("click", function(){
			$.cookie("user_agree", "Yes", {expires: 72 / 24}); 
			$(".bottom__cookies").addClass("closed")
	   })
	}

	cookieSet();
	
});