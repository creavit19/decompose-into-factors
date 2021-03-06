function decomposeIntoFactors(num){
	/*
	Функция возвращает объект содержащий число и два массива с множителями и их степенями
	*/
	let answer = {
		number : 1,
		factor : [],
		degree : []
	}
	if(num == 1){answer.factor[0] = 1; return answer};

	answer.number = num;
	let remain = num;
	let sqrtRemain = sqRound(remain);
	let currentNum = 2;

	if(remain % currentNum == 0) if(recInAnswer()) return answer;
	
	currentNum = 1;
	do{
		currentNum += 2;
		if(remain % currentNum != 0) continue;
		if(recInAnswer()) return answer;
	}while(sqrtRemain >= currentNum);

	answer.factor.push(remain);
	answer.degree.push(1);
	return answer;

	function recInAnswer(){
		let degree = 0;
		do{
			remain /= currentNum;
			degree++;
		}while(remain % currentNum == 0);
		answer.factor.push(currentNum);
		answer.degree.push(degree);
		if(remain == 1) return true;
		sqrtRemain = sqRound(remain);
		return false;
	}

	function sqRound(x){
		return Math.ceil(Math.sqrt(x));
	}

}
//-- end of function decomposeIntoFactors ---------------------------------

let out = document.getElementById('out');
let btn = document.getElementById('btn');
let wasError = false;
btn.onclick=function(){
	let ante = parseInt(document.getElementById('ante').value);
	if(isNaN(ante)){
		out.innerText = 'Вы ввели не верное значение!';
		out.style.color = 'red';
		wasError = true;
		return;
	}
	if(wasError){
		out.style.color = 'black';
		wasError = false;
	}
	let ans = decomposeIntoFactors(ante);
	let htmMes = ans.number;
	if(ans.number == ans.factor[0]){
		htmMes += ' - это простое число.';
	}else{
		htmMes += ' =';
		for(let i = 0; i < ans.factor.length; i++){
			htmMes += (i > 0 ? ' × ': ' ') + ans.factor[i] + (ans.degree[i] > 1 ? '<sup>' + ans.degree[i] + '</sup>' : '')
		}
	}
	out.innerHTML = htmMes;
}
