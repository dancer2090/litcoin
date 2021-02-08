'use strict';
const FULL_URL = 'https://layout.webbuilder.in.ua/litcoin';
const axios = require('axios');

const addressSend = `${FULL_URL}/send.php`;
const body = document.querySelector('body');
const modalBg = document.querySelector('.modal__bg');
const modalForm = document.getElementById('modalForm');
const modalTy = document.getElementById('modalTy');

const modalClose = () => {
  body.classList.remove('modal-opened');
  const modalActive = document.querySelector('.modal.active');
  if(
    modalActive &&
    modalActive.classList &&
    modalActive.classList.contains('active')
  ) modalActive.classList.remove('active');
}
const modalOpen = (modalName) => {
  body.classList.add('modal-opened');
  const modalActive = document.getElementById(modalName);
  modalActive.classList.add('active');
};

const emailCheck = [
  {
    reg: '',
    validation: (val, compare) => val === compare,
    message: 'Field is required',
  },
  {
    reg: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    validation: (val, compare) => compare.test(val) === false,
    message: 'Enter correct email',
  },
];
const textCheck = [
  {
    reg: '',
    validation: (val, compare) => val === compare,
    message: 'Field is required',
  }
];
const validateEmailField = (email) => {
  const error = [];
  emailCheck.forEach((el) => {
    if (el.validation(email, el.reg)) error.push(el.message);
  });
  return error;
};
const validateField = (text) => {
  const error = [];
  textCheck.forEach((el) => {
    if (el.validation(text, el.reg)) error.push(el.message);
  });
  return error;
};
const clearInputs = (inputs) => {
    inputs.forEach( (item) => {
        item.value = '';
    })
}

const submitForm = async () => {
  const formName = 'form';
  const form = document.getElementById(formName);
  const inputs = form.querySelectorAll('.form__input');
  const result = [];
  const values = new FormData();
  let error = false;
  inputs.forEach( (item) => {
    const type = item.type;
    values.append(item.name, item.value);
    if(item.classList.contains('required')){
        if(type === 'email'){
            const error = validateEmailField(item.value);
            result.push(error);
            const inputError = item.parentElement.querySelector('.input_error')
            if(error && error.length > 0){
                inputError.innerHTML = error[0];
                error = true;
            } else {
                inputError.innerHTML = '';
            }
        } else {
            const error = validateField(item.value);
            result.push(error);
            const inputError = item.parentElement.querySelector('.input_error')
            if(error && error.length > 0){
                inputError.innerHTML = error[0];
                error = true;
            } else {
                inputError.innerHTML = '';
            }
        }
    }
  })
  if(!error){
    axios.post(
        addressSend,
        values,
        { headers: { 'content-type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
        clearInputs(inputs);
        modalForm.classList.remove('active');
        modalTy.classList.add('active');
      })
      .catch(function (error) {
        console.log(error);
      });

  }
}

const buttonsClose = document.querySelectorAll('.modal__close');
buttonsClose.forEach( (item) => {
  item.onclick = modalClose;
} )

setTimeout(() => {
  modalBg.onclick = modalClose;
  const callForm = document.getElementById('callForm');
  callForm.onclick = (e) => {
    e.preventDefault;
    modalOpen("modalForm");
  }
  const formSubmit = document.querySelector('.form__button');
  formSubmit.onclick = submitForm
}, 0)