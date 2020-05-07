function decomposeIntoFactors(num){
	/*
	Функция возвращает объект содержащий число и два массива с множителями и их степенями
	*/
	let answer = {
		number : 0,
		factor : [],
		degree : []
	};
	answer.number = num;
	let remain = num;
	let primeNumbers = [2, 3, 5, 7, 11];
	let squaredPrime = [4, 9, 25, 49, 121];
	let i = 0;
	do{
		let j = 0;
		while(remain % primeNumbers[i] == 0){
			remain /= primeNumbers[i];
			j++;
		}
		if(j > 0){
			answer.factor.push(primeNumbers[i]);
			answer.degree.push(j);
		}
		i++;
		if(i > primeNumbers.length - 1) nextPrime();
	}while(remain >= squaredPrime[i]);
	if(remain != 1){
		answer.factor.push(remain);
		answer.degree.push(1);
	};
	return answer;
	
	function lastItemArr(arr) {
		return arr[arr.length - 1];
	}
	function nextPrime(){
		let pr = lastItemArr(primeNumbers);
		let i = 1;
		let chek = true;
		do{
			pr += 2;
			i = 1;
			chek = true;
			while(pr >= squaredPrime[i]){
				if(pr % primeNumbers[i] == 0) {chek = false; break;}
				i++;
			}
		}while(!chek);
		primeNumbers.push(pr);
		squaredPrime.push(pr ** 2);
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
	let htmMes = ans.number + ' =';
	for(let i = 0; i < ans.factor.length; i++){
		htmMes += (i > 0 ? ' × ': ' ') + ans.factor[i] + (ans.degree[i] > 1 ? '<sup>' + ans.degree[i] + '</sup>' : '')
	}
	out.innerHTML = htmMes;
}
