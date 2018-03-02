const imgFile = {};
const date = document.querySelector('.date')
const ifsw = Date.parse('2018/3/20')

document.ontouchmove = function(event) {
	event.preventDefault();
}

document.querySelector('#file-input').onchange = function(event) {
	const file = event.target.files[0];
	transformFileToDataUrl(file)
}


function transformFileToDataUrl(file) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		const result = e.target.result;
		const img = document.querySelector('.img')
		const setImg = document.createElement('img')
		setImg.src = result
		img.append(setImg)
		document.querySelector('.shu').style.display = 'none'
		document.querySelector('.heng').style.display = 'none'
	};
}

function selects(selected) {
	switch (selected) {
		case 'no':
			date.style.display = 'none';
			break;
		default:
			date.style.display = 'block';
			break
	}
}

function generate() {
	const set_name = document.querySelector("#name").value
	const set_type = document.querySelector("#type").value
	const set_date = (document.querySelector("#date").value).replace(/\-/g, "/")
	const img = document.querySelector('.img').querySelectorAll('img').item(0)
	if (img !== null) {
		if (set_name.length > 0) {
			if (set_type !== 'none') {
				document.querySelector(".get_name").innerHTML = `我是${set_name}`
				if (set_type == 'yes') {
					if (set_date.length > 0) {
						const get_date = parseInt((ifsw - Date.parse(set_date)) / (1000 * 60 * 60 * 24) + 1)
						document.querySelector('.set').style.display = 'none'
						document.querySelector('.get').style.display = 'block'
						const yes_t = document.querySelectorAll('.yes_t')
						for (let i = 0; i < yes_t.length; i++) {
							yes_t[i].style.display = 'block'
						}
						document.querySelector('.yes_t1').style.opacity = '1'
						document.querySelector('.call').style.display = 'none'
						document.querySelector(".get_date").innerHTML = `今天是我加入社工第${get_date}天`
						switch (get_date.toString().length) {
							case 4:
								document.querySelector(".qian").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".bai").innerHTML = get_date.toString().charAt(1)
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(2)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(3)
								break
							case 3:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(1)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(2)
								break
							case 2:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = 0
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(1)
								break
							case 1:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = 0
								document.querySelector(".shi").innerHTML = 0
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(0)
								break
						}
					} else {
						document.querySelector('.erro').innerHTML = '请选择日期'
						setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
					}
				} else {
					document.querySelector('.set').style.display = 'none'
					document.querySelector('.get').style.display = 'block'
					const yes_t = document.querySelectorAll('.yes_t')
					for (let i = 0; i < yes_t.length; i++) {
						yes_t[i].style.display = 'none'
					}
					document.querySelector('.text').style.marginTop = (15 / 32.5) + 'rem'
					document.querySelector('.yes_t1').style.opacity = '0'
					document.querySelector('.call').style.display = 'block'
				}
				document.querySelector(".download").style.display = 'block'
				convert2canvas()
			}
		} else {
			document.querySelector('.erro').innerHTML = '请输入姓名'
			setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
		}
	} else {
		document.querySelector('.erro').innerHTML = '请上传图片'
		setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
	}
}

function convert2canvas() {
	var shareContent = document.querySelector('.wrap');
	var width = shareContent.offsetWidth;
	var height = shareContent.offsetHeight;
	var canvas = document.createElement("canvas");
	var scale = 2;

	canvas.width = width * scale;
	canvas.height = height * scale;
	canvas.getContext("2d").scale(scale, scale);

	var opts = {
		scale: scale,
		canvas: canvas,
		width: width,
		height: height
	};
	html2canvas(shareContent, opts).then(function(canvas) {
		var context = canvas.getContext('2d');
		var download = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
		document.querySelector('.download').append(download)
		download.style.width = canvas.width / 2 + "px"
		download.style.height = canvas.height / 2 + "px"
		//document.querySelector('.save').style.display = 'block'
		document.querySelector('.save').classList.add('hei55')
		document.querySelector('.save').classList.remove('hei0')
		setTimeout(function() {
			document.querySelector('.save').classList.remove('hei55')
			document.querySelector('.save').classList.add('hei0')
			//document.querySelector('.save').style.display = 'none'
		}, 4000)
	});
}
