const input = document.querySelector('#searchInput')
const button = document.querySelector('#search')
const subtitle = document.querySelector('.main__span')


const setButtonStatus = (status = false) => {

    button.removeAttribute('disabled')
    if (!status) {
        button.setAttribute('disabled', 'disabled')
    }

}

const setInputText = (text) => {

    const disableCharts = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']

    disableCharts.forEach(char => {
        if (text.includes(char)) {
            input.value = text.replaceAll(char, '')
        }
    })


    if (text.length <= 2) setButtonStatus(false)
    else if (text.length >= 13) setButtonStatus(false)
    else setButtonStatus(true)

}


const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const fetchSubTitle = () => {
    fetch('https://baconipsum.com/api/?type=lucky', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(text => subtitle.innerHTML = text[0, randomInteger(0, text.length-1)]);
}


input.oninput = function () {
    setInputText(input.value)
}

setButtonStatus(false)
fetchSubTitle()