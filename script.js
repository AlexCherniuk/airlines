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


    modal('[data-modal]', '.modal');
    console.log(myForm);

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
            postData('https://httpbin.org/post', json)
            .then(data => {
                console.log(data);
            });
        });
    }
    bindPostData(myForm);

});