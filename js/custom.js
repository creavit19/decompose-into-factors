function decomposeIntoFactors(num){
	/*
	Функция возвращает объект содержащий число и два массива с множителями и их степенями
	*/
	let answer = {
		number : 0,
		factor : [],
		degree : []
	}
	answer.number = num;
	let remain = num;
	let sqrtRemain = sqRound(remain);
	let limitRec = sqRound(sqrtRemain);
	let needRec = true;
	let primeNumbers = [2, 3];
	let actualPrime = 2;
	let countSqPrime = 1;
	let squaredPrime = 9;
	if(!countDegree()){
		actualPrime = 3;
		while(sqrtRemain >= actualPrime){
			if(countDegree()) break;
			let chek = false;
			do{
				chek = false;
				actualPrime += 2;
				if(actualPrime >= squaredPrime) squaredPrime = (primeNumbers[++countSqPrime]) ** 2;
				for(let i=1; i <= countSqPrime; i++){
					if(actualPrime % primeNumbers[i] == 0) {chek = true; break}
				}
			}while(chek);
			if(needRec){
				if(limitRec < actualPrime){
					needRec = false;
				}else{
					primeNumbers.push(actualPrime);
				}
			}
		}
	}
	if(remain != 1){
		answer.factor.push(remain);
		answer.degree.push(1);
	}
	return answer;

	function countDegree(){
		let j = 0;
		while(remain % actualPrime == 0){
			remain /= actualPrime;
			j++;
		}
		if(j > 0){
			answer.factor.push(actualPrime);
			answer.degree.push(j);
			if(remain == 1) {return true;
			}else{
				sqrtRemain = sqRound(remain);
				if(needRec) {
					limitRec= sqRound(sqrtRemain);
					if(limitRec < actualPrime) needRec = false;
				}
				return false};
			}
			return false;
		}

		function sqRound(x){
			return Math.ceil(Math.sqrt(x)) + 5;
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
