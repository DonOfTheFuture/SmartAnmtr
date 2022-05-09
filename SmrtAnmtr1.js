function allDvs(div, sel){
	let trgt = (sel === undefined)? "*": sel 
let elm = (div == undefined)? document.body.getElementsByTagName(trgt): div.getElementsByTagName(trgt)
 return elm
}
function openDB(dbName, dataObj){
	let req = window.indexedDB.open(dbName, 4)
	let db, store
	
	req.onsuccess = function(e){
		db = e.target.result|| e.currentTarget || req.result
			let hasName = Array.from(db.objectStoreNames).some((n, i, ar)=>{
			return n === dbName
		})
		if(hasName === true){
		store = db.transaction([dbName], 'readwrite').objectStore(dbName)
		   return store
	   
	db.addEventListener('versionchange',event=>{
	
		if(db.newVersion > db.oldVersion){
			db.close()
		location.href = location.href
	}
		})}
	   }
		   	req.onupgradeneeded = function(e){
		 db =  req.result|| e.currentTarget 
		if(typeof dbName === 'string'){
			if(dbName.length > 0){
		store = db.createObjectStore(dbName, {keyPath: 'title'})
		console.log(Object.entries(dataObj))
		Object.entries(dataObj).forEach((p, i, a)=>{
	if(p == 'title'){
	store.createIndex(p, p, {unique: true})
	}else{
		store.createIndex(p, p, {unique: false})
	}
	})
	if(store !== undefined){
	return store
	}
	}}
	}
	req.onerror = function(e){
		console.log(e.name, e.message)
	}
		
	
}
(function infoDivFncts(){
 let infoDivs = Array.from(document.querySelectorAll('.info-div'))
 let [imgSlidesDiv, txtsDiv] = infoDivs
   	let animDiv = allDvs()['animDiv'], animState = allDvs(animDiv)['slide-state']
	let ssBtns = Array.from(animState.querySelectorAll('button'))
let dataObjArr = [{title:'', slides:[]},{title:'', essay:''}]
	   
	   let navs = infoDivs.map((d, i, arr)=>{
		   return d.querySelectorAll('.nav')[0]
	   })
	   	  let selN = 0
	   navs.forEach((n, i, arr)=>{ 
		   emptDivInd(infoDivs[i])
		let divsElm = Array.from(infoDivs[i].querySelector('.divs').querySelectorAll('div'))
	let srchInpt = n.querySelector('input')

	 let rndm = crteRndm()
	   let navBtns = Array.from(n.querySelectorAll('button'))
	   let [selBtn, newBtn, srchBtn] = navBtns
	   newBtn.onclick = function(e){ 
		    let con, sel1, sel2, sel3 
				//Google Cloud JSON API https://storage.googleapis.com/storage/v1/b/my-bucketT/o/my-object?fields=id,name,metadata/key
let dataObj = Object.create({})			
			if(infoDivs[i].id === 'txtsDiv'){
			con = prompt('new essay name')
			sel1 = '#txts'
			sel2 = '#txt'
			sel3 = '#txts'
			 }else if(infoDivs[i].id === 'imgSlidesDiv'){
		   con = prompt('new image slide name')
		   	sel1 = '#imgDiv'
			sel2 = '#slides'
			sel3 = '#slides'

			 }
			   
			 con = (typeof con !== 'string')? defName(infoDivs[i]): con
			 if(typeof con == 'string'){
			 con = (con.length < 5)? con+defName(infoDivs[i]):con
			 }
			 if(crctVal(con, 'string') === true){
				   let cloneElm
				   if(sel1 == '#imgDiv'){
					  cloneElm = infoDivs[i].querySelector(sel1).cloneNode(true)
					  
				  cloneElm.addEventListener('dblclick', function(e){
					 newInfoElm(cloneElm,newBtn,e)  
				  }, false)
				   }else{
					   cloneElm = infoDivs[i].querySelector(sel1).querySelectorAll(sel2)[0].cloneNode(true)
						cloneElm.style.height = '150px'
					cloneElm.querySelector('textarea').style.width = '100%'
						cloneElm.querySelector('textarea').style.height = 'inherit'
						cloneElm.querySelector('textarea').style.resize = 'none'
				  }
				  				 let holdCnt = 0

				   cloneElm.addEventListener("mousedown", function(e){
				 let waitHold = setInterval(()=>{
					 if(holdCnt === 3){
						 clearInterval(waitHold)
						 let clnElmDelCon = confirm('delete '+ this.id+'?')
						 if(clnElmDelCon === true){
							 this.remove()
						 }else{
							 e.preventDefault()
						 }
					 }else{
						 holdCnt+=1
					 }
				 }, 1000)
				 this.onmouseup = (e)=>{
					 clearInterval(waitHold)
					 holdCnt = 0
				 }
			 })
				  openDB(infoDivs[i].children[1].id, dataObjArr[i])
				   cloneElm.setAttribute('title', con)
				   cloneElm.style.display = 'block'
				   cloneElm.style.background = 'linear-gradient(gray, darkgray)'
			       infoDivs[i].querySelector(sel3).appendChild(cloneElm)
				   
			   //handleEv(infoDivs[i].querySelector('.divs') , e)
			   }else{
				   e.preventDefault()
			   } 

	  }
  	
	srchBtn.onclick = function(e){ 
	console.log('searching')
	//Google Cloud JSON API https://storage.googleapis.com/storage/v1/b/my-bucketT/o/my-object?fields=id,name,metadata/key1

	  if(crctVal(this.previousElementSibling.value, 'string') === true){
		  let simDivs = Array.from(infoDivs[i].querySelector('.divs').querySelectorAll('div')).filter((d, i, arr)=>{
			  return !d.title.includes(this.previousElementSibling.value) || !this.previousElementSibling.value.includes(d.title) 
		  })
		  if(typeof simDivs === 'object'){
			  if(simDivs.length > 0){
		  simDivs.forEach((d2, i, arr)=>{
			  d2.style.display = 'none'
		  })
		  srchInpt.onclick = function(e){
		divsElm.forEach((d, i, arr)=>{
			d.style.display = 'block'
		})
			  }}
	  }else{
		  e.preventDefault()
	  }}
	  }

	    selBtn.onclick = function(e){		
		  let ddDivs = Array.from(infoDivs[i].querySelector('.divs').querySelectorAll('div'))
		  ddDivs.forEach((ddDiv, i2, arr)=>{	
		  ddDiv.addEventListener('click', function(e){ 
		  selN+=1
		  console.log(selN)
		   let oDvClasses = [] 
				  arr.forEach((d1, i4)=>{ 
					  styleElm(d1, {
						  border: 'solid 1px black',
						  background: 'linear-gradient(gray, darkgray)'
					  })
					  oDvClasses[i4] = d1.classList.item(0)
					  d1.classList.toggle('div')
				  })
				  styleElm(this, {
					  border: 'solid 1px lightgreen', 
					  background: 'linear-gradient(lightgreen, green)',
				  })
				  let thisCL = this.classList
				  thisCL.toggle('slctd')
				  if(selN >= 2){
					 if(selN > 2){
			e.preventDefault()
		}else{
					  let crntCnt = infoDivs.map((id)=>{
						  return Array.from(id.querySelector('.divs').querySelectorAll('div')).filter((d2)=>{
							let itm = d2.classList.value
							 if(typeof itm === 'string'){
								 console.log(itm)
							return (itm.includes('slctd'))
							
							 }
						  })[0]
					  })
					  
					  	let navBtns = Array.from(animDiv.querySelectorAll('.nav-btn'))
	let [goR, goL] = navBtns
		let [imgDiv,  txtDiv] = crntCnt
console.log(imgDiv.classList.value, txtDiv.classList.value)
		let imgs = Array.from(imgDiv.querySelectorAll('#pic')).map((p)=>{
			return p.querySelectorAll('img')[0]
		})
	    let txt = txtDiv.querySelector('textarea').value
		let replStrs = [',', '.', ')', '(', '/', '']
		replStrs.forEach((s, i)=>{
		txt = txt.replaceAll(s, '')
		})
		let addSpcInt, modTxtProm = new Promise((res)=>{
		addSpcInt = setInterval(()=>{
		 if(txt.length % 53 === 0){
		   res(txt)
		}else{
		  txt = txt+' '
		  txtDiv.querySelector('textarea').value = txt
		 }
		}, 1) 
		})
		modTxtProm.then(v=>{
					let lines= []
console.log(v)
			if(v.length >= 53){
	 for(let l = 0; l < v.length; l+=53){
			let slcdStr = v.slice(l-53, l)
		 if(l >= v.length){
			 let strDiff = v.indexOf(slcdStr+(slcdStr.length-1)) - v.length-1
			 if(strDiff > 0){
				 break 
			 }else{
				 lines.push(v.slice(v.indexOf(slcdStr)+slcdStr.length-1, v.length-1))
			 }
		 }else{
				 lines.push(slcdStr)
		 }
		}
		}else{
			lines.push(v)
		}
		return JSON.stringify(lines)
		}).then(v2=>{
			let lines = JSON.parse(v2)
			let navNum=0
	let movDiv = allDvs(animDiv)['mov']
	let ccTxt = allDvs(animDiv)['cc'].children[0]
	goR.onclick = function(e){
		if(navNum === 1){
			this.style.opacity = "1"
			e.preventDefault()
		}else{
			movDiv.children[0].src = imgs[navNum].src
			navNum+=1
		}
	}
	goL.onclick = function(e){
		if(navNum === imgs.length-1){
			this.style.opacity = ".4"
			e.preventDefault()
		}else{
			movDiv.children[0].src = imgs[navNum].src
			navNum-=1
		}
	}
	function togBtnFunct(btn, tn, intFunct = undefined){
		tn+=1
						if(tn % 2 !== 0){
				btn.style.opacity = '.5'
				if(intFunct !== undefined){
				btn.onclick = function(e){
					e.preventDefault()
				}}
			}else{
				btn.style.opacity = '1'
				if(intFunct !== undefined){
					btn.onclick = (e)=>{
						clearInterval(intFunct)
					}
				}			
			}
	}
	let movImg =allDvs(animDiv)['mov'].children[0]
	let [playBtn, pauseBtn, ffBtn,  revBtn, spdBtn, loopBtn] = ssBtns
		let time = 2500
		let scn =  0,iN = 1, lTogNum = 0, pseTog = 0, plyTog = 0
		let looped = false
		loopBtn.onclick = function(e){
			lTogNum+=1
			if(lTogNum % 2 !== 0){
				looped = true
				loopBtn.style.border = 'solid green 2.5px'
			}else{
				looped = false
			loopBtn.style.border = 'solid gray 2.5px'
			}
		}
	spdBtn.onclick = function(e){
	let speedsArr = ['SLOW', 'SLOWER','REG','FAST','FASTER']
	let spdArr = [(2500+(time/3)), (2500+(time/2)),2500,(2500-(time/2)),(2500-(time/3))]
    let n = 2
	if(n === spdArr.length){
		n-=spdArr.length
	}else{
		n+=1
	}
	time = swtchFnct(spdArr, n)
this.innerText = speedsArr[spdArr.indexOf(time)]

	}
	let pics = Array.from(imgDiv.querySelectorAll('div'))
					function retList(){
							let  list = [],cn = 0
							let length = infoDivs[i].querySelector('.divs').children.length
							for(let n = 1; n < length; n++){
								let div = infoDivs[i].querySelector('.divs').children[n]
								list.push(div)
								if(list.length > pics.length){
									
									list = Array.from(infoDivs[i].querySelector('.divs').querySelectorAll('div'))
									return list
								}
							}
							}
				let	picList = retList()
				
	playBtn.onclick  = function(e){ 
	//movDiv.style.backgroundImage = "url('')"
	iN = 4
	let onlyImg = confirm('Is this only an img slide?')
		if(onlyImg === true){
			let tn = 0
			tn+=1
			//Promise.resolve(prepRec(movImg, tn)).then(v=>{

			let imgSlideInt,  imgSlideProm = new Promise((res)=>{
				
			   pauseBtn.onclick =(e) =>{
			togBtnFunct(this, pseTog, imgSlideInt)
			}
			imgSlideInt = setInterval(()=>{
					console.log(iN,Math.round(picList.length))
					if(iN == (picList.length+1)){
					  if(looped === true){
						iN = 3
					  }else{
						res('stop')
					}}else{
						movImg.src = picList[iN-1].querySelectorAll('img')[0].src
						iN+=1
					}
				}, time)

			})
			imgSlideProm.then(v=>{
				clearInterval(imgSlideInt)
				if(v == 'stop'){
				Promise.resolve(screenRec(v)).then(v=>{
		

				console.log("end of Img Slide")
				//prepRec(movImg, tn)
				}).catch(e=>{console.log(e.name, e.message)})
				}else if(v == 'paused'){
					console.log('slide paused!')
				}
				}).catch(e=>{console.log(e.name, e.message)})
		}else if(onlyImg === false){
	let imgsHavWrd = pics.every((d, i)=>{return !(d.querySelectorAll('img')[0].alt === '')})
	if(imgsHavWrd === true){
		let someHavNon = pics.some((d)=>{
			return d.querySelectorAll('img')[0].alt.length < 1 
		})
		console.log(someHavNon)
		if(someHavNon === true){
			picList = picList.slice(0, (picList.length/2)-1)
		let havNone = picList.filter((d)=>{
			return d.querySelectorAll('img')[0].alt === ''
		})
		console.log(havNone)
		for(let s = 0; s < havNone.length; s++){
			newElmBox(havNone[s].id,havNone[s],playBtn)
			styleElm(havNone[s], {
				border: 'yellow 1px solid'
			})
		}
 		}else{
		
		let slideInt
		let slideProm = new Promise((res)=>{
	    pauseBtn.onclick =(e) =>{
			togBtnFunct(this, pseTog, slideInt)
	}
	console.log(lines)
	    let n = 0
essayLinesLoop:for(let ln = 0; ln < lines.length; ln++){ 
		let l = lines[ln]
						 ccTxt.innerText = l
						 console.log(l.length, ccTxt.length)
	     let lineTime = (sylblCntr(ccTxt.innerText)/ccTxt.innerText.length)
		 let picList=(retList())
		 let picInt = sylblCntr(ccTxt.innerText)/((picList.length/2)-1)
		 let cn = 0
		l = l.replaceAll(' ', '(?)')
		 let wrdArr = l.split('(?)')
		 		 //	speakLine(ccTxt.innerText, 'en-US')
	lineWordLoop: for(let wn = 0; wn < wrdArr.length; wn++){
							let iN = 0
							let lineProm, imgSlideProm
let promArr = [lineProm, imgSlideProm] 
			let imgSlideInt
			imgSlideProm = new Promise((res)=>{
				imgSlideInt = setInterval(()=>{
					if(iN === (picList.length)){
						res('')
					}else{
						movImg.src = picList[iN].querySelectorAll('img')[0].src
						iN+=1
					}
				}, 2000)
			})

		let waitLinesInt
		lineProm = new Promise((res)=>{	
		let wait = setTimeout(()=>{
			clearInterval(waitLinesInt)
			res('')
		}, sylblCntr(l))
		  waitLinesInt  = setInterval(()=>{
			 if(cn === wrdArr.length-1){
clearTimeout(wait)
res('')
			 }else{
				 cn+=1
				 let linePer = Math.round((cn*100)/wrdArr.length)
				 highlight(wrdArr[linePer],ccTxt)
			 }
		 }, lineTime)
	 })
		Promise.all(promArr).then(va=>{
			  
		  ccTxt.innerText = ''
		  clearInterval(waitLinesInt)
				clearInterval(imgSlideInt)
	    console.log('end of slide 2')
		}).catch(e=>{console.log(e.name, e.message)})
		}}
		})	
		slideProm.then(v=>{
			clearInterval(slideInt)
			console.log(v)
		}).catch(e=>{console.log(e.name, e.message)})
	}}}
	}
		let cntN = 0
ffBtn.onclick = function(e){
let spdArr = [Math.abs(Math.round((time*80)/100)),Math.abs(Math.round((time*40)/100)), Math.abs(Math.round((time*20)/100)), 2500]
	if(cntN === spdArr.length-1){
	 cntN-=spdArr.length	
	}else{
	cntN+=1
	}
 time = swtchFnct(spdArr, cntN)
}
	revBtn.onclick = function(e){
		let slideInt,slideProm = new Promise((res, rej)=>{
	   pauseBtn.onclick =(e)=>{
		   rej('')
	   }
	   let picList = retList()
	     picList = picList.slice(0, picList.length+1)
	    slideInt = setInterval(()=>{
		if(iN == 1){
			res('beginning of slide')
		}else{
			iN-=1
			if(iN !== 0){
			 movImg.src = picList[iN].querySelectorAll('img')[0].src
		}}
		}, time)
   })	
		slideProm.then(v=>{
			clearInterval(slideInt)
		}, v2=>{
					   console.log('paused!')
			clearInterval(slideInt)
		}).catch(e=>{console.log(e.name, e.message)})
				  
		  }
	})

		}
		}
	
	   })	  
		  })
		  }

   loadData(infoDivs[i], dataObjArr[i])	  
	   })
	   let saveInt = setInterval(()=>{
		   
		   Promise.resolve(saveData(infoDivs)).then(v=>{
			   let oVals = []
			   let moreThan1 = infoDivs.every((id, i)=>{return id.querySelector('.divs').children.length > 1})
			   if(moreThan1 === true){
			   infoDivs.forEach((id, i, arr)=>{ 
				   id.style.border = 'green 1px solid'
				   arr.forEach((d1, i2)=>{
					   let inpt = d1.querySelector('.nav').children[2]
					   let newOValObj = Object.create({})
					   newOValObj.placeholder = inpt.placeholder
					   newOValObj.value = inpt.value 
					  
					   oVals.push(newOValObj)

				   })
				   
			   })
			   let saveInd = setTimeout(()=>{
				 infoDivs.forEach((d, i2, arr)=>{
					d.style.border = 'black 1px solid'
					 arr.forEach((d1, i3)=>{
					   let inpt = d1.querySelector('.nav').children[2]
					  Object.entries(oVals[i3]).forEach((p, i, a)=>{
						  inpt[p] = oVals[i3]
					  })
				   })
				 })
				   }, 3000)
			   }
		   }).catch(e=>{console.log(e.name, e.message)})
	   }, 20000)
	
	  })()
	  function swtchFnct(valArr, n){
		  let vName
     vName = valArr[n]

	return vName
	  }
function loadData(d, newObj){
		let divs = d.querySelector('.divs'), id = divs.id
		console.log(id)
  let btns = Array.from(d.querySelector('.nav').querySelectorAll('button')) 
let [sb, nb, scb] = btns  
   let store = openDB(divs.id,newObj)
let storedData = (store === undefined)? false : store.getAll(id)

if(storedData === crctVal(storedData, 'object')){
storedData.onsuccess = function(e){
if(storedData.length > 0){
  for(let i = 0; i < storedData.length;i++){
	let newDiv = divs.children[0].cloneNode(true)
	newDiv.title = storedData[i].title
    if(id === 'slides'){
	storedData[i].slides.forEach((img, i, arr)=>{
			newInfoElm(newDiv,undefined,nb)
		})
	}else if(id === 'txts'){
		newInfoElm(newDiv, undefined, nb)
		newDiv.children[0].value = storedData[i].essay
	}
	divs.appendChild(newDiv)
	
  }
}
}
}}
function crctVal(val, optType){
if(typeof val === optType && val.length > 5){
	return true
}
}
function sylblCntr(txt){
	console.log(txt)
 let txtArr = '', wrdTime 
 if((typeof txt).toLowerCase() === 'object'){
	 txtArr = txt.trim().split('(?)')
	 console.log(txtArr)
 wrdTime = txtArr.map((t, i, ar)=>{
	 return vwlCntr(t)
  })
  return (Math.round(wrdTime.reduce((a,b)=>{return a + b}, 0)/5))
}else if((typeof txt).toLowerCase() === 'string'){
	wrdTime = vwlCntr(txt)
}
function vwlCntr(vc = 0 , t){
	let vowels = ['a', 'e','i', 'o', 'u']
	for(let ltr = 0; ltr < t.length; ltr++){
			if(ltr >= t.length){
				break
		   }else{
			   let hasVwl = vowels.some((l)=>{return l === t[ltr]})
			   let nxtLtr = t[ltr+1]
			  if(hasVwl === true){
				  if(vowels.some((v)=>{return v === nxtLtr})){
				 vc+=0
			 }else{
			   			 vc +=1   
			  }}
		   continue
		   }
	   }
	    return vc
}
}
function newInfoElm(div, e, nb){
	let newElm = div.children[0].cloneNode(true)
	newElm.style.display = 'block'
	newElm.style.display = 'inline-block'
let scrollWidth = div.scrollWidth	
	if(div.id === 'imgDiv'){
		let niPrmpt = prompt('new img src')
		let newPic = div.querySelector('#pic').cloneNode(true)
		if(crctVal(niPrmpt, 'string') === true){
		let hasSuf = ['gif', 'png', 'jpeg', 'jpg', 'psd', 'svg', 'eps', 'pdf','bmp'].some((s, i, arr)=>{
			let av = '' || '.'
		  return (niPrmpt.includes(av+s) || niPrmpt.includes(av+s.toUpperCase())) || '/images?'
			})
		if(hasSuf === true && (niPrmpt.length > 4 || niPrmpt.length > 5)){
		newPic.children[0].src = niPrmpt	
			newPic.style.display='block'
		newPic.style.width = '200px'
		newPic.style.height = '150px'
		newPic.style.border = 'solid 1px red'
		newPic.children[0].style.height = 'inherit'
		newPic.children[0].style.width = '100%'
		newPic.style.display = 'inline-block'
		newPic.id = 'pic'+crteRndm()
		newPic.addEventListener('click', function(e){
		boxDisplay(this, nb)
					 })
		div.appendChild(newPic)
	
		}}}else if(div.id === 'txts'){
		let ntPrmpt = confirm('Add new Text area?')
		if(ntPrmpt === true){
			let newTxtDiv = div.querySelectorAll('#txt')[0].cloneNode(true)
			newTxtDiv.children[0].style.width = '100%'
			newTxtDiv.children[0].style.height = 'inherit'
			 newTxtDiv.style.display = 'block'
			 newTxtDiv.id = 'txt' + crteRndm()
			 newTxtDiv.addEventListener('click', function(e){
				 boxDisplay(this, nb)
			 })
			 div.appendChild(newTxtDiv)
		}else{
			if(e !== undefined){
			e.preventDefault()
		}}
	}
	div.scrollTo(scrollWidth, 0)
}
function boxDisplay(div, nb){
		let waitInt
		let waitBoxProm = new Promise((res, rej)=>{
		 let n = 0
		 div.onmouseout = function(e){
			 rej('')
		 }
			waitInt = setInterval(()=>{
				if(n == 1){
					res('')
				}else{
					n+=1
					console.log(n)
				}
			}, 1000)
		})
		waitBoxProm.then(v=>{
			clearInterval(waitInt)
		    newElmBox(div.id, div, nb)
		}, v2=>{
			clearInterval(waitInt)
		}).catch(e=>{console.log(e.name, e.message)})
	
}
function crteRndm(){
	 let rndm = (Math.random()+''), rndmNum = rndm.replace('.', '')
		  rndmNum = parseInt(rndmNum.slice(1, 10), 10)
		 return rndmNum 
}
function newElmBox(id,elm, nb){

 if(elm.children[0].id !== 'picSet'){
	let cn = 0
    cn+=1
  if(cn % 2 !== 0){
  nb['onclick'] = function(e){
	  e.preventDefault()
  }
 let styles = ['height', 'width'].map((str, i, arr)=>{
	 let prop = window.getComputedStyle(elm).getPropertyValue(str)
	 let val = prop.replace('px')
	 return parseInt(val, 10)
 })
	let newD = document.createElement('div')
	newD.setAttribute('id', 'picSet')
	let styleObj = {
		height: styles[0]+'px',
		width: styles[1]+'px',
		position: 'absolute',
		zIndex: '5',
		backgroundColor: 'blue',
		border: 'solid 1px red',
		opacity: '.8',
		
	}
	styleElm(newD, styleObj)
	let plcHldrs =  ['', 'move img place', 'add img name', 'new img src']
	let newElms = ['button', 'input', 'input', 'input', 'button'].map((str, i, arr)=>{
	let newE = document.createElement(str)
	
	let newL = document.createElement('br')
	newE.style.height = 30+'px'
	newE.style.width = styles[1]+'px'
	newE.style.textAlign = 'center'
	newE.style.zIndex = '6'
	newE.onmouseover = function(e){
		this.onclick = function(e){
			this.focus()
			e.stopImmediatePropagation()
		}
		elm.onclick = function(e){
			e.preventDefault()			
		}
		}
	if(str == 'input'){
		
		newE.max = elm.children.length-1
		newE.min = 0
		/*newE.addEventListener('keypress', function(e){
		
			let keyCode = e.keyCode || e.which
			
			if(keyCode == 13){ 
			console.log(Array.from(elm.querySelectorAll('div')).length)
				let newList = Array.from(elm.querySelectorAll('div')).map((d, i, arr)=>{
					let obj, rm = crteRndm() 
					if(id == 'pic'){
					obj = {
						name: d.classList.item(0),
						src: d.children[0].src
					}
					return obj
				}else if(id == 'txt'){
					obj = {
						name:d.classList.item(0),
						txt: d.children[0].value
					}
					return obj
				}})
				let thisObj = {
					name: elm.classList.item(0), 
				}
				if(id == 'pic'){
				thisObj['src'] = elm.children[0].src
				}else{
				thisObj['txt'] = elm.children[0].value
				}
				newList = newList.splice(newList.indexOf(thisObj), 1)
				newList[parseInt(this.value)-1] = thisObj
				elm.parentElement.innerHTML = ''
				newList.forEach((o, i, arr)=>{
					let newDiv = elm.cloneNode(true)
					newDiv.classList.add(o.name)
					if(id === 'txt'){
						newDiv.children[0].value = o.txt
					}else if(id=== 'pic'){
						newDiv.children[0].src = o.src
					}					
				})
			}	

		})*/
									newE.placeholder = plcHldrs[i]
	}
	newD.appendChild(newE)
	newD.appendChild(newL)
	return newE
	})

	let [btn, inpt, inpt2,inpt3,btn2] = newElms
	btn2.innerText = 'Exit'
	inpt2.setAttribute('type', 'text')
	inpt.setAttribute('type', 'number')
	btn.innerText = 'remove'

	btn.addEventListener('click', function(e){
							  Promise.resolve(remElm(e, this.parentElement.parentElement, '')).then(v=>{
						  console.log(v)
					  }).catch(e=>{console.log(e.name, e.message)})
	})
	let elmList = Array.from(elm.parentElement.querySelectorAll('div'))
	inpt.addEventListener('keydown', function(e){
	  if(typeof this.value === 'number'){
		let key = e.which || e.keyCode
		
		if(key === 13){
			
			let newArr = elmList.map((obj, i, arr)=>{
					let newObj = Object.create({})
					newObj.name = obj.classList.item(0)
					if(this.parentElement.id == 'imgDiv'){
					newObj.src = obj.querySelectorAll('img')[0].getAttributeNode('src').value
					}else{
					newObj.txt = obj.querySelectorAll('textarea')[0].value
					}
				return newObj
			})
let thisObj = { 
name:elm.classList.item(0),
src: elm.querySelectorAll('img')[0].getAttributeNode('src').value
	  }
	  newArr.splice(thisObj, 1)
	  newArr[parseInt(this.value, 10)-1] = thisObj
	   elm.parentElement.innerHTML = ''
	   newArr.forEach((obj, i, arr)=>{
		   let newDiv = document.createElement('div')
		   styleElm(newDiv, {
			   display: 'inline-block',
			   height: '150px',
			   width: '200px'
		   })
		   let newImg = new Image(150, 200)
		   newImg.loading = 'eager'
		   newImg.decoding = 'async'
		   newImg.src =  obj.src
		   newImg.style.position = 'relative'
		   newImg.decode().then(v=>{
			   newDiv.appendChild(newImg)
		   })
	   })
	  }
	}})
	inpt2.addEventListener('keydown', function(e){
		
			entrKey(elm.querySelectorAll('img')[0].alt,elm.querySelectorAll('img')[0].alt+ (this.value+' '), 'string')
			this.value = ''
			addedInd(this, 'added')

	})
	inpt3.addEventListener('keydown', function(e){			
		entrKey(this.parentElement.parentElement.querySelectorAll('img')[0].src, this.value,'string')

	})
	btn2.addEventListener('click',function(e){
		this.parentElement.remove()
	})
	elm.prepend(newD)
function entrKey(elmProp, val, type){
			 if(typeof this.value === type){
		let key = e.which || e.keyCode
		if(elmList.length > 1){
		if(key == 13){
		  	elmProp = val
		}}
} 
 }
}}}
function addedInd(inpt, txt){
	let oTxt = inpt.placeholder
	inpt.style.outline = 'green'
	inpt.placeholer = txt
	let waitInpt = setTimeout(()=>{
		inpt.placeholder = oTxt
		inpt.style.outline = 'black'
					inpt.blur()

	}, 2000)
}
function defName(div){
	let  id = div.querySelector('.divs').id
	let rndm  = (Math.random() + ' ')
	let rndmNum = rndm.slice(3, rndm.length-1)
	return id+rndmNum
}
function screenRec(recFunct){
let devices = navigator.mediaDevices || navigator.webkitmediaDevices
if(devices){
	if(recFunct == 'record'){
	const gdmOptions = {
  video: {
    cursor: "always"
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}
	devices.getDisplayMedia(gdm).then(stream=>{
		let mediaRec  = new MediaRecorder(stream) || new webkitMediaRecorder(stream)
if(mediaRec){
		let newVid = document.createElement('video')
		styleElm(newVid, {display: 'none', position: 'absolute'})
		
		document.body.appendChild(newVid)
		newVid.srcObject = stream
		}
	}).catch(e=>{console.log(e.name, e.message)})
}else if(recFunct == 'pause'){
let tracks = document.querySelector('video').srcObject.getTracks()
tracks.forEach(v=>{
	v.stop()
})
  const videoTrack = videoElem.srcObject.getVideoTracks()[0]
document.querySelector('video').srcObject = null
 save.onclick = function(){
        recorder.stop()
 
        console.log(recorder.state)
          recorder.ondataavailable = function(event){
            chunks.unshift(event.data)
          }
         recorder.onstop = function(){
          console.log(recorder.mimeType)
          console.log(recorder.stream)
           var savedData = JSON.parse(localStorage.getItem('urlList'))
		   let urlData = (savedData === null)? [] : savedData
          var recVidDiv = recDiv.children[0]//section.querySelector('div');
          var divClone = capFoot.cloneNode(true)
          var options
if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')){
  options = {'type': 'video/webm; codecs=vp9'}
} else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
   options = {'type': 'video/webm; codecs=vp8'}
} else{
 options = {'type': 'video/webm'}
}
          var blob = new Blob(chunks , options)
          var videoURL = window.URL.createObjectURL(blob)
   
          var videoName = prompt('MP4 NAME', getDate())
          var vidInfo = Object.create({})
          vidInfo.name = vidDiv.querySelector('h2').innerText
           vidInfo.url = videoURL
           var newArr = []
           if(savedData == null){
            newArr.push(vidInfo) 
             localStorage.setItem('urlList', JSON.stringify(newArr))  
           console.log(JSON.parse(localStorage.getItem('urlList')))
           }else{
             vidURLs.push(vidInfo)
             localStorage.setItem('urlList', JSON.stringify(vidURLs))
           }
           docuemnt.body.querySelector('video').controls = true
          document.body.querySelector('video').src = videoURL
           divClone.querySelectorAll('button')[0].addEventListener('click', function(){
             Delete(savedData, this.parentElement)
           });
		divClone.querySelectorAll('button')[1].addEventListener('click', function(){
		let a =document.createElement('a')
			       blob = new Blob(chunks, options)
        url = window.URL.createObjectURL(blob) || widow.webkitURL.createObjectURL(blob)
        a.href = currentTime +'.webm'
        a.download = videoURL
        a.type = 'video/webm'
        div.appendChild(a)
        a.click()
        div.removeChild(a)
		})
			divClone.style.display = 'block'
          footageDiv.appendChild(divClone)
         }
      }
}else if(recFunct == 'pause'){
        recorder.pause()
}else if(recFunct == 'stop'){
	
}
}else{
	console.log('device media not supported!')
}
}
function listen(line){
	return new Promise(res=>{
     var grammar = '#JSGF V1.0;grammar tags;public <tag>;'
   var recognition = new webkitSpeechRecognition() || new SpeechRecognition()
   var grammarList = new webkitSpeechGrammarList() || new SpeechGrammarList()
   grammarList.addFromString(grammar, 1)
   recognition.grammars = grammarList 
      recognition.lang = 'en-US'
   recognition.interimResults = false
   recognition.continuous = false
   recognition.maxAlternatives = 1
   let isStarted = false
    let moveWinInt 
	if(isStarted ===false){
       recognition.start()
    }else{
	    console.log('rec has started already!')
	}
	recognition.onsoundstart = function(){ 
	recognition.onspeechstart = function(){
        console.log('LISTENING')
			   isStarted = true
      }
	}
       
 recognition.onspeechend =function(){
        recognition.stop()
isStarted = false
        console.log('...')

       
      }
 recognition.onresult = function(event){
	 let selImgDiv = Array.from(allDvs(allDvs()['imgSlidesDiv'])['slides'].querySelectorAll('div'))
	 let txt = event[0][0].transcript
	 hrdWrd()
	 async function hrdWrd(){
		 line = line+' '
	let lastW = line.slice(line.lastIndexOf(' '), line.length-1)
	let wrdArr = []
     if(!txt.includes(lastW)){
          wrdArr.push(lastW.trim())
		if(wrdArr.length > 0){
		  if(isStarted === false){
			  rej('The spoken text is incomplete!')
			}  		   	   	   
		  }
		}else{
		if(isStarted === true){
			wrdArr.push(lastW.trim())
		}else if(isStarted === false && txt.length == line.trim().length){
			res('')
		}
			
	 }
	 }
	/*let spltTxt = txt.split(' ')
	spltTxt.forEach((w, i, a)=>{
		repWrd()
	async function repWrd(){
		let res = await picRes(w)
			allDvs()['animDiv'].querySelector('#mov').src = synImg.src
	let wait = window.setTimeout(function(){
		let syns = 'normal' || 'neutral' || 'calm'
		 picRes(syns).then(v=>{
	        allDvs()['animDiv'].querySelector('#mov').src =selImgDiv[0].src 
		 }).catch(e=>{console.log(e.name, e.message)})
	}, 2000)
	}})*/
 }
	})	
}
function tog(sel, objArr){
	let objPropsArrs = objArr.map((o, i, arr)=>{
		return Object.entries(o) 
		})
		console.log(objArr)
	let elmArr = Array.from(document.body.querySelectorAll(sel)).map((d, i1)=>{
		let orglObj = Object.create({})
		let oPropsArr = objPropsArrs[i1].map((p, i2)=>{
		let rplceStr
		for(let l = 0; l < p.length;l++){
		if(p[l] === p[l].toUpperCase()){
			let np = p+' '
			let secWrd = p.slice(p.indexOf(p[l]), p.length)
			secWrd = secWrd.toLowerCase()
			let frstWrd = p.replace(secWrd, '')
			 rplceStr = frstWrd+'-'+secWrd
			rplceStr = p[l].replace(p[l], rplceStr)
			break
		}
		}
		let prop = window.getComputedStyle(d).getPropertyValue(rplceStr)
		return prop
	})
	oPropsArr.forEach((p, i2, ar)=>{
		orglObj[p] = objPropsArrs[i1][i2]
	})
	return orglObj
	})
	let togNum = 0
	togNum+= 1
	if(togNum % 2 !== 0){
		elmArr.forEach((obj, i, ar)=>{
			anmteDivs($(sel),objArr)
			})
	}else{
		elmArr.forEach((obj, i, ar)=>{
		anmteDivs($(sel), obj) 
		})
	}
}
function saveData(divs){
	divs.forEach((d, i, arr)=>{
	let divs = Array.from(d.querySelector('.divs').querySelectorAll('div')).map((d2)=>{
		let newObj = Object.create({})
   newObj.title = d2.title

 if(d2.parentElement.id === 'slides'){
	 let imgArr = Array.from(d2.querySelectorAll('#pic')).map((p)=>{
		 return p.children[0].src
	 })
	newObj.imgs = imgArr
 }else if(d2.parentElement.id === 'txts'){
	 newObj.essay = d2.children[0].value
 }
 let store = openDB(d2.parentElement.id,newObj)
 if(store !== undefined){
 store.put(newObj)
	}})
})
}
 function picRes(word){
	return new Promise(function(res, rej){
		
	 let selImgDiv = Array.from(allDvs(allDvs()['imgSlidesDiv'])['slides'].querySelectorAll('div')).filter((div,i,arr)=>{
		 let prop = div.getComputedStyle(div).getPropertyValue('borderColor')
		 return prop === 'lightgreen'
	 })[0]
	 fetch('').then(j =>{
     return j.json()		 
	 }).then(v=>{
		 let synImg = selImgDiv.filter((d, i, a)=>{
		let bool =	Array.from(v).some((w, i, a)=>{
			 let hasWrd = Array.from(d.querySelectorAll('div')).some((d, i, a)=>{
				 return d.classList.item(0).includes(w)
			 })
			 
			 return hasWrd === true
		 })
		 return bool
		 })[0]

	 }).catch(e=>{console.log(e.name, e.message)})
	 })
 }
function anmteDivs(elm, obj){
	elm.animate(obj)
} 
function remElm(e,elm, LS){
	 let conRem = confirm('Remove element?')
	 		 let json = JSON.parse(localStorage.getItem(LS)), strArr = (json === null)? []: json

	 if(conRem === true && strArr.length > 0){
		 		 let elmClass = elm.classList.value
		 let elmObj = Object.create({})
		  elmObj.class = elmClass
		 elmObj.id = elm.id
	  let strHasObj = strArr.some((o, i)=>{
		  return o.id === elm.id
	  })
		 if(strHasObj === false){
			 elm.remove()
		 }else{
	 strHasObj.splice(strHasObj.indexOf(elmObj), 1)		 
		 localStorage.setItem(JS, JSON.stringify(strArrObj))
		 return 'element obj with  id:'+elm.id + ' and class:'+elm.class + ' has been removed!'
		 } }else{
		elm.remove()
		return 'element removed!'
	 }
}
function speakLine(str, lang){
	let synth = window.speechSynthesis
	let voices = synth.getVoices()
	let uttr = new SpeechSynthesisUtterance(str)
	uttr.lang = lang
	uttr.localService = false
	synth.speak(uttr)

  
}
function styleElm(elm, obj){
	let keys = Object.keys(obj)
	keys.forEach((k, i, arr)=>{
		elm.style[k] = obj[k] 
	})
}
function prepRec(imgDiv, tn){
//first start countdown then change size after size change start slide and start recording when down anmte back to orgnl size and style

	 let osObj = Object.create({}), osArr = ['height', 'width', 'zIndex'].map((str, i, arr)=>{
		 let prop = window.getComputedStyle(imgDiv).getPropertyValue(str)
			osObj[str] = prop
	 })
	let styleObj = {
		zIndex: '3', 
		height: window.innerHeight+'px', 
		width: window.innerWidth+'px'
	}
	let cd = document.createElement('h1'), dStyles = {position: 'absolute', zIndex:'3', fontSize: '130px', margin:'auto',opacity: '0', width: window.innerWidth+'px', height: window.innerHeight+'px'}
	  styleElm(cd, {
		  position: 'relative',
		  opacity: '1',
		  textAlign: 'center',
		  marginTop:((window.innerHeight/2)+130)+'px',
		  color: 'white',
		  backgroundColor: 'black',
		  border: 'solid 1px red,'
	  })
	let div = document.createElement('div')
	styleElm(div, dStyles)
	div.appendChild(cd)
	document.body.appendChild(div)
	let cntInt, cntProm = new Promise((res, rej)=>{
		let n = 0
		div.ondblclick = function(e){
			
			rej('countdown cancelled')
		}
		cntInt = setInterval(()=>{
			if(n == 10){
				res('')
			}else{
				n+=1
				cd.innerText = n
			}
		},1000)
	}) 
cntProm.then(v=>{
	clearInterval(cntInt)
	div.remove()
	anmteDivs(imgDiv, styleObj)
}, v2=>{
	clearInterval(cntInt)
	div.remove()
	
}).catch(e =>{console.log(e.name, e.message)})

}
function emptDivInd(elm){
let emptInt = setInterval(()=>{
	let ind = document.createElement('div')
	ind.setAttribute('class', 'ind')
	let imgUrl = (elm.id === 'txtsDiv')? "url('./message-txt')": "url('./slide_icon')"
styleElm(ind, {
	height: '120px',
	width: parseInt(((window.innerWidth/2)*90)/100),
	lineHeight: '20px',
	position:'relative',
	backgroundImage: imgUrl
})
	if(elm.children.length !== 1){
		if(elm.children[1].matches('ind')){
			ind.remove()
		}
	}else{
		elm.appendChild(ind)
	}
	ind.remove()
}, Number.MIN_VALIE)
}
		function highlight(text, area) {
  var inputText = area;
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) { 
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}