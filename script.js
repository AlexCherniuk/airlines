window.addEventListener('DOMContentLoaded', () => {
    const myForm = document.querySelector('form');

    function openModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    function modal(triggerSelector, modalSelector) {
        const modal = document.querySelector(modalSelector);
        const btn = document.querySelector(triggerSelector);



        btn.addEventListener('click', () => {
            openModal(modalSelector);
        });



        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal(modalSelector);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) {
                closeModal(modalSelector);
            }
        });

    }

    const message = {
        success: 'Company added successfully',
        failure: 'Somethink was wrong...'
    };

    modal('[data-modal]', '.modal');



    function showThanksModal(message, textColor) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.style.color = textColor;
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        if (message === message.success) {
            
        } else {
        }
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const postData = async (url, data) => {    // universal  POST method function 
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });
                return await res.json();
            };

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('https://htpbin.org/post', json)
                .then(data => {
                    console.log(data);
                    closeModal('.modal');
                    showThanksModal(message.success, "green");

                })
                .catch(() => {
                    console.log('errorrr....');
                    closeModal('.modal');
                    showThanksModal(message.failure, "red");
                })
                .finally(() => form.reset());
        });
    }



    bindPostData(myForm);

});