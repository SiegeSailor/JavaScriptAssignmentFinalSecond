// Varibles for Default
var seeResult = document.querySelector('#result-btn');
var heightInput = document.getElementById('height-input');
var weightInput = document.getElementById('weight-input');
var resultBoard = document.querySelector('.layout-content ul');
var resultData = JSON.parse(localStorage.getItem('BMI Record')) || [];
console.log('resultData Type:' + typeof (resultData));
console.log(resultData);

// Varibles after Clicking
var resultBTN = document.querySelector('#result-display');
// As Default
resultBTN.classList.add('display-none');
var resultValue = document.querySelector('.display input');
var resultStatus = document.querySelector('.display .description p');

// Varibles for Date
var dateCurrent = new Date();
var dayDate = String(dateCurrent.getDate()).padStart(2, '0');
var monthDate = String(dateCurrent.getMonth() + 1).padStart(2, '0');
var yearDate = dateCurrent.getFullYear();
dateCurrent = monthDate + '-' + dayDate + '-' + yearDate;

seeResult.addEventListener('click', getResult);
resultBTN.addEventListener('click', refreshResult);

function getResult(event) {
    // Prevent Null
    if (heightInput.value != '' && weightInput.value != '') {
        // Get Info
        var elementLi = document.createElement('li');
        var elementUl = document.createElement('ul');
        var weight = parseFloat(document.querySelector('#weight-input').value);
        var height = parseFloat(document.querySelector('#height-input').value);
        var result = (weight / (height * height)).toFixed(2);
        
        console.log('BMI:' + result);
        var status = '';
        switch (true) {
            case (result < 18.5):
                status = '過輕';
                elementLi.setAttribute('class', 'underweight');
                resultBTN.setAttribute('class', 'display display-underweight');
                break;
            case ((18.5 <= result) && (result < 24)):
                status = '理想';
                elementLi.setAttribute('class', 'normal');
                resultBTN.setAttribute('class', 'display display-normal');
                break;
            case ((24 <= result) && (result < 27)):
                status = '過重'
                elementLi.setAttribute('class', 'overweight');
                resultBTN.setAttribute('class', 'display display-overweight');
                break;
            case ((27 <= result) && (result < 30)):
                status = '輕度肥胖'
                elementLi.setAttribute('class', 'mildObesity');
                resultBTN.setAttribute('class', 'display display-mildObesity');
                break;
            case ((30 <= result) && (result < 35)):
                status = '中度肥胖'
                elementLi.setAttribute('class', 'moderateObesity');
                resultBTN.setAttribute('class', 'display display-moderateObesity');
                break;
            case (result >= 35):
                status = '重度肥胖'
                elementLi.setAttribute('class', 'severeObesity');
                resultBTN.setAttribute('class', 'display display-severeObesity');
                break;
            default:
                status = 'Unknown';
                break;
        }
        console.log('BMI Status:' + status);
        // Set Info for Refresh Button
        resultValue.value = result;
        resultStatus.textContent = status;
        // Set Info for Record
        var statusLi = '<li><span class="text-content">' + status + '</span></li>';
        var resultLi = '<li>BMI<span class="bmi text-content">' + result + '</span></li>';
        var weightLi = '<li>Weight<span class="weight text-content">' + weight + 'kg</span></li>';
        var heightLi = '<li>Height<span class="height text-content">' + height + 'm</span></li>';
        var dateLi = '<li class="date">'+ dateCurrent +'</li>';
        elementUl.innerHTML = statusLi + resultLi + weightLi + heightLi + dateLi;
        elementLi.appendChild(elementUl);
        var stringElement = String(elementLi.outerHTML);
        console.log('Info:' + stringElement);
        console.log('Type:' + typeof (stringElement));
        // Push Info
        resultData.push(stringElement);
        console.log('Type:' + typeof (resultData) + 'Array:' + resultData);
        console.log(resultData);
        // Rendering
        renderResult(resultData);
        // Save to LocalStorage
        localStorage.setItem('BMI Record', JSON.stringify(resultData));
        showDisplay();
    } else {
        event.preventDefault();
    };
}

function renderResult(result) {
    var stringHTML = '';
    for (var i = 0; i < result.length; i = i + 1) {
        stringHTML = stringHTML + result[i];
    }
    resultBoard.innerHTML = stringHTML;
}
renderResult(resultData);

function showDisplay(){
    resultBTN.classList.remove('display-none');
    resultBTN.classList.add('display-block');
    seeResult.classList.add('display-none');
    heightInput.disabled = true;
    weightInput.disabled = true;
}

function refreshResult(){
    heightInput.value = '';
    weightInput.value = '';
    heightInput.disabled = false;
    weightInput.disabled = false;
    resultBTN.classList.remove('display-block');
    resultBTN.classList.add('display-none');
    seeResult.classList.remove('display-none');
}