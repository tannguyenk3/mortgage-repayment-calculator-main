    const defaultText = document.getElementById('default-text')
    const calculationsContainer = document.getElementById('calculations-container')
//check input radio , only one choice
document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
            document.querySelectorAll('.radio-inputs').forEach(div => {
                div.classList.remove('selected')
            })

        if(this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})


document.getElementById('calculate-btn').addEventListener('click', () =>{
    // Take value from Mortgage Amount & Mortgage Term & Interest Rate
    const amount = parseFloat(document.getElementById('mortgage-amount').value)
    const term = parseFloat(document.getElementById('mortgage-term').value)
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked')

    let isValid = true
    // It'll remove error from Mortgage Amount & Mortgage Term & Interest Rate 
    // if the value inputted
    document.querySelectorAll('.form-flex').forEach(el => {
         el.classList.remove('error')
    });

    //check value input of Mortgage Amount
    if(isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = 'block'
        document.getElementById('mortgage-amount-main').classList.add('error')
        isValid = false;
    } else {
        document.getElementById('amount-alert').style.display = 'none'
    }

    //check value input of Mortgage Term
    if(isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = 'block'
        document.getElementById('mortgage-term-main').classList.add('error')
        isValid = false;
    } else {
        document.getElementById('term-alert').style.display = 'none'
        // document.getElementById('mortgage-term-main').classList.remove('error')
    }

    //check value input of Interest Rate
    if(isNaN(rate) || rate <= 0) {
        document.getElementById('rate-alert').style.display = 'block'
        document.getElementById('interest-rate-main').classList.add('error')
        isValid = false;
    } else {
        document.getElementById('rate-alert').style.display = 'none'
        // document.getElementById('mortgage-term-main').classList.remove('error')
    }

    //check value radio input of Mortgage Type
    if(!mortgageType) {
        document.getElementById('type-alert').style.display = 'block'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error')  
            isValid = false;
        });
    } else {
        document.getElementById('type-alert').style.display = 'none'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.remove('error')
        });
    }

    //Calculate Repayment and Interest-only Function
    if (isValid) {
        let monthlyPayment = 0
        let totalRepayment = 0
    
        defaultText.classList.add('hide')
        calculationsContainer.classList.add('show')
        //Calculate Repayment   
        if(mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
            totalRepayment = monthlyPayment * n
        }   //Interest-only 
        else if (mortgageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12
            totalRepayment = monthlyPayment * term * 12
        }
        //return results one of them
        document.getElementById('monthly-result').innerText = `$${monthlyPayment.toFixed(2)}`
        document.getElementById('term-result').innerText = `$${totalRepayment.toFixed(2)}`
    } //return empty if users don't input anything 
    else {
        document.getElementById('result').innerText = ''
        document.getElementById('term-result').innerText = ''
    
        defaultText.classList.remove('hide')
        calculationsContainer.classList.remove('show')
    }

});

// clear button, remove everthing
document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('mortgage-form').reset()
        document.getElementById('monthly-result').innerText = ''
        document.getElementById('term-result').innerText = ''
        document.querySelectorAll('.form-alert').forEach(alert => {
            alert.style.display = 'none'
        });

        defaultText.classList.remove('hide') 
        calculationsContainer.classList.remove('show')

        document.querySelectorAll('.radio-inputs').forEach(div => {
                div.classList.remove('selected') 
                div.classList.remove('error') 
        });

        document.querySelectorAll('.form-flex').forEach(el => {
            el.classList.remove('error')
       });

});


// hide error when everything not empty
document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none'
});