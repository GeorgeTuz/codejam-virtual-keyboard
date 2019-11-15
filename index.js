fetch('https://raw.githubusercontent.com/GeorgeTuz/data/master/data.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let keyboardKeys = data;
        let wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        document.body.append(wrapper);

        let textarea = document.createElement('textarea');
        textarea.className = 'textarea';
        textarea.readOnly = true;
        wrapper.append(textarea);

        let keyboard = document.createElement('div');
        keyboard.className = 'keyboard';
        wrapper.append(keyboard);

        let shiftOn = false;
        let capsLockOn = false;
        let language = 'ru';
        if (localStorage.getItem('lang') == 'en') {
            language = 'en';
        }


        for (let nod in keyboardKeys) {
            let key = document.createElement('div');
            key.className = 'key ' + String(nod).toLowerCase();
            if (language == 'ru') {
                key.innerHTML = keyboardKeys[nod].ru;
            } else {
                key.innerHTML = keyboardKeys[nod].en;
            }

            keyboard.append(key);
        }

        let keys = document.querySelectorAll('.key');

        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener('mousedown', function () {
                keys[i].style.transitionDuration = '.2s';
                keys[i].style.backgroundColor = 'rgb(255, 164, 60)';
                keys[i].style.borderRadius = '23px';
            });
            keys[i].addEventListener('mouseup', function () {
                keys[i].style.backgroundColor = 'whitesmoke';
                keys[i].style.borderRadius = '4px';
            });
            keys[i].addEventListener('click', function () {
                if (keys[i].className.includes('alt') ||
                    keys[i].className.includes('control') ||
                    keys[i].className.includes('metaleft')) {
                } else if (keys[i].className.includes('enter')) {
                    textarea.value += String.fromCharCode(13);
                } else if (keys[i].className.includes('tab')) {
                    textarea.value += String.fromCharCode(9);
                } else if (keys[i].className.includes('backspace')) {
                    textarea.value = textarea.value.slice(0, -1);
                } else if (keys[i].className.includes('space')) {
                    textarea.value += ' ';
                } else if (keys[i].className.includes('capslock') && !capsLockOn) {
                    if (language === 'ru') {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].shRu;
                            i++;
                        }
                        capsLockOn = true;
                    } else {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].shEn;
                            i++;
                        }
                        capsLockOn = true;
                    }
                } else if (keys[i].className.includes('capslock') && capsLockOn) {
                    if (language === 'ru') {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].ru;
                            i++;
                        }
                        capsLockOn = false;
                    } else {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].en;
                            i++;
                        }
                        capsLockOn = false;
                    }
                } else if (keys[i].className.includes('shift') && !shiftOn) {
                    if (language === 'ru') {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].shRu;
                            i++;
                        }
                        shiftOn = true;
                    } else {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].shEn;
                            i++;
                        }
                        shiftOn = true;
                    }

                } else if (keys[i].className.includes('shift') && shiftOn) {
                    if (language === 'ru') {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].ru;
                            i++;
                        }
                        shiftOn = false;
                    } else {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].en;
                            i++;
                        }
                        shiftOn = false;
                    }
                } else if (shiftOn) {
                    textarea.value += keys[i].innerText;
                    if (language === 'ru') {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].ru;
                            i++;
                        }
                        shiftOn = false;
                    } else {
                        let i = 0;
                        for (let nod in keyboardKeys) {
                            keys[i].innerHTML = keyboardKeys[nod].en;
                            i++;
                        }
                        shiftOn = false;
                    }
                } else {
                    textarea.value += keys[i].innerText;
                }
            });
        }
        document.addEventListener('keydown', function (event) {
            if (event.altKey && event.shiftKey) {
                if (language === 'ru') {
                    let i = 0;
                    for (let nod in keyboardKeys) {
                        keys[i].innerHTML = keyboardKeys[nod].en;
                        if (keys[i].className.includes(' ' + String(event.code.toLowerCase()))) {
                            keys[i].style.transitionDuration = '.2s';
                            keys[i].style.backgroundColor = 'rgb(255, 164, 60)';
                            keys[i].style.borderRadius = '23px';
                        }
                        i++;
                    }
                    language = 'en';
                    localStorage.setItem('lang', language);
                } else {
                    let i = 0;
                    for (let nod in keyboardKeys) {
                        keys[i].innerHTML = keyboardKeys[nod].ru;
                        if (keys[i].className.includes(' ' + String(event.code.toLowerCase()))) {
                            keys[i].style.transitionDuration = '.2s';
                            keys[i].style.backgroundColor = 'rgb(255, 164, 60)';
                            keys[i].style.borderRadius = '23px';
                        }
                        i++;
                    }
                    language = 'ru';
                    localStorage.setItem('lang', language);
                }
            } else {
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i].className.includes(' ' + String(event.code.toLowerCase()))) {
                        keys[i].style.transitionDuration = '.2s';
                        keys[i].style.backgroundColor = 'rgb(255, 164, 60)';
                        keys[i].style.borderRadius = '23px';

                        if (keys[i].className.includes('control') ||
                            keys[i].className.includes('metaleft')) {
                        } else if (keys[i].className.includes('enter')) {
                            textarea.value += String.fromCharCode(13);
                        } else if (keys[i].className.includes('tab')) {
                            textarea.value += String.fromCharCode(9);
                            event.preventDefault();
                        } else if (keys[i].className.includes('alt')) {
                            event.preventDefault();
                        } else if (keys[i].className.includes('backspace')) {
                            textarea.value = textarea.value.slice(0, -1);
                        } else if (keys[i].className.includes('space')) {
                            textarea.value += ' ';
                        } else if (keys[i].className.includes('capslock') && !capsLockOn) {
                            if (language === 'ru') {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].shRu;
                                    i++;
                                }
                                capsLockOn = true;
                            } else {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].shEn;
                                    i++;
                                }
                                capsLockOn = true;
                            }
                        } else if (keys[i].className.includes('capslock') && capsLockOn) {
                            if (language === 'ru') {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].ru;
                                    i++;
                                }
                                capsLockOn = false;
                            } else {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].en;
                                    i++;
                                }
                                capsLockOn = false;
                            }
                        } else if (keys[i].className.includes('shift') && !shiftOn) {
                            if (language === 'ru') {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].shRu;
                                    i++;
                                }
                                shiftOn = true;
                            } else {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].shEn;
                                    i++;
                                }
                                shiftOn = true;
                            }

                        } else if (keys[i].className.includes('shift') && shiftOn) {
                            if (language === 'ru') {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].ru;
                                    i++;
                                }
                                shiftOn = false;
                            } else {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].en;
                                    i++;
                                }
                                shiftOn = false;
                            }
                        } else if (shiftOn) {
                            textarea.value += keys[i].innerText;
                            if (language === 'ru') {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].ru;
                                    i++;
                                }
                                shiftOn = false;
                            } else {
                                let i = 0;
                                for (let nod in keyboardKeys) {
                                    keys[i].innerHTML = keyboardKeys[nod].en;
                                    i++;
                                }
                                shiftOn = false;
                            }
                        } else {
                            textarea.value += keys[i].innerText;
                        }
                    }
                }
            }
        });
        document.addEventListener('keyup', function (event) {
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].className.includes(String(event.code.toLowerCase()))) {
                    keys[i].style.backgroundColor = 'whitesmoke';
                    keys[i].style.borderRadius = '4px';
                }
            }

        });
    });











