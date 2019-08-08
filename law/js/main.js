$(function() {
	$("#banner").slide({
		mainCell: ".bd ul",
		titCell: ".hd ul",
		effect: "fold",
		autoPlay: true,
		autoPage: true,
		delayTime: 500,
		interTime: 5000,
	});
	//弹出层
	window.pop = Modal.instance();
	$('[data-show]').click(function(e) {
		var $this = $(this);
		var str = $this.attr('data-show');
		pop.open(str);
	})
	
	$('.modal .black,.modal .close').on("click", function() {
		var parent = $(this).parents(".modal");
		pop.close(parent);
	})

	
	//单选
	$('[data-type=radioBtnGroup]').on('click','a',function(){
		var params=$(this).parent().find('input').val($(this).attr('data-value'));
		$(this).addClass('on').siblings().removeClass('on');
	})
	
	
	//placeholder支持ie8
	var $input=$('[placeholder]');
	$input.length>0 && $input.each(function(){
		placeholder($(this));
	})
	
	//登陆
	validate($("[validate]"));
	$('#login,#reg').keydown(function(e){
     if(e.keyCode == 13){
        $(this).find('.submit').click();
     }
	});
	
	$('#login .submit,#reg .submit').on('click', function() {
		var $form = $(this).closest("form");
		if($form.attr('validate')!=null){
			validate($form);
			if (!$form.valid())return false;
		}
		var data = $form.serializeArray();
		postData = {};
		$(data).each(function(i) {
			postData[this.name] = this.value;
		});
		var url = $form.attr('action');
		
		pop.closeAll();
		pop.tips("登录失败")
		//         $.post(url, postData, function (res) {
		// 			  if(res.mes)pop.tips(res.mes);
		//			  if (res.status == 0) {
		//					pop.closeAll();
		//                  return;
		//             }
		//             if (res.status == 1) {
		//                 return location.reload();
		//				}
		//         }, 'JSON');
	});


})


function Modal() {
	this.modalArr = [];
	this.zIndex = 1000;
	this.open = function(e) {
		if (typeof e == 'string') e = $(e);
		e.css("z-index", this.zIndex++);
		this.modalArr.push(e);
		e.show();
	}
	this.close = function(e) {
		if (typeof e == 'string') e = $(e);
		if (e.length > 0) {
			for (var i = this.modalArr.length - 1; i >= 0; i--) {
				if (e[0] == this.modalArr[i][0]) {
					this.modalArr[i].hide();
					this.modalArr.splice(i, 1);
					break;
				}
			}
		}
	}
	this.closeAll = function() {
		for (var i = this.modalArr.length - 1; i >= 0; i--) {
			this.modalArr[i].hide();
		}
		this.modalArr = [];
	}
	this.tips = function(str,cb) {
		if ($('#tips').length > 0) $('#tips').remove();
		var tmp = '<div class="tips" id="tips" style="z-index:'+(this.zIndex++)+'"><div class="text">' + str + '</div></div>';
		$(tmp).appendTo($("body"));
		$('#tips').show();
		setTimeout(function() {
			$('#tips').hide();
			cb && cb();
		}, 2000)
	}
}

Modal.instance=function(){
	return new Modal();
}


function validate(e) {
	e.validate({
		errorPlacement: function(error, element) { //错误提示位置
			if (element.parents('.input_box').find(".err").length>0) {
				error.appendTo(element.parents('.input_box').find('.err'));
			}
		},
		rules: {
			phone: {
				required: true,
				isMobile: true
			},
			code: {
				required: true,
				digits: true
			}
		},
		messages: {
			phone: {
				required: "请输入手机号",
			},
			code: {
				required: "请输入验证码",
				digits: "验证码应该输入数字"
			}
		}
	})
}

function placeholder($input){
		var mes=$input.attr('placeholder');
		var supportArray = {
		    isPlaceholder: "placeholder" in document.createElement("input"),
    	}
        if (supportArray.isPlaceholder) {
            return;
        } else {
            $input.removeAttr('placeholder');
            $input.wrap('<div style="position:relative; display:inline-block"></div>');
            var h=$input.height();
			var fs=$input.css("font-size");
            var left=$input.css("padding-left");
			var top=0;
            if( $input[0].tagName.toLowerCase()=="textarea" ) {
            	h=fs;
            	top=$input.css("padding-top")
            }
            var $tip = $("<span style='line-height:"+h+"px;position: absolute;left:"+left+"; top:"+top+"; font-size:"+fs+"; color: #999;z-index: 1;'></span>");
            $tip.text(mes);
            $input.after($tip);
            $.data($input[0], 'tip', $tip);
            if ($input.val() != '') {
                hidePHTip($input);
            }
            	dealPHTip($input,$tip);
        }
        function hidePHTip($input){
        	var $tip = $.data($input[0], 'tip');
	        if ($tip) {
	            $tip.hide();
	        }
        }
        function dealPHTip($input, $tip){
	        var _deal = function() {
	            var val = $input.val();
	            if (val == '') {
	                $tip.show();
	            } else {
	                $tip.hide();
	            }
	        };
	        $tip.click(function() {
	            $input.focus();
	        });
	        $input.on('input propertychange blur', function(){
	            clearTimeout(timeout);
	            var timeout = setTimeout(_deal, 0);
	        });
	    }
    }

