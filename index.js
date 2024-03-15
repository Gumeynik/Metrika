const posts = [];
const date = getUserTime(new Date());
const titleLimit = 100;
const textLimit = 200;


const inputTitleNode = document.querySelector('.js-input-title');
const inputTextNode = document.querySelector('.js-input-text');
const btnNode = document.querySelector('.js-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage')

btnNode.addEventListener('click', function () {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();

    inputTextNode.value = ' ';
    inputTitleNode.value = ' ';
});

inputTitleNode.addEventListener('input', function(){
    validation();
}
);

inputTextNode.addEventListener('input', function () {
        validation();
});


function validation() {
    const title = inputTitleNode.value.trim();
    const text = inputTextNode.value.trim();
    const titleLength = title.length;
    const textLength = text.length;

    if (titleLength === 0) {
        validationMessage.innerText = 'Заголовок не может быть пустым.';
        validationMessage.classList.remove('validationMessage_hidden');
        btnNode.setAttribute('disabled', true);
        return;
    }

    if (textLength === 0) {
        validationMessage.innerText = 'Пост не может быть пустым.';
        validationMessage.classList.remove('validationMessage_hidden');
        btnNode.setAttribute('disabled', true);
        return;
    }

    if (titleLength > titleLimit) {
        validationMessage.innerText = `Максимум символов ${titleLimit}. Лимит символов превышен на ${titleLength - titleLimit} .`;
        validationMessage.classList.remove('validationMessage_hidden');
        btnNode.setAttribute('disabled', true);
        return;
    }

    if (textLength > textLimit) {
        validationMessage.innerText = `Максимум символов ${textLimit}. Лимит символов превышен на ${textLength - textLimit} .`;
        validationMessage.classList.remove('validationMessage_hidden');
        btnNode.setAttribute('disabled', true);
        return;
    }

    validationMessage.classList.add('validationMessage_hidden');
    btnNode.removeAttribute('disabled');
}




function getPostFromUser() {
   const title = inputTitleNode.value;
   const text = inputTextNode.value;

    return {
        title: title,
        text: text,
    };
};

function addPost({title, text}) {
    const currentDate = getUserTime(new Date()); 
    posts.push({
     title,
     text,
     date: currentDate,
    });
 }
;

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <div class='post__date'>${post.date}</div>
                 <p class='post__title'>${post.title} </p>
                <textarea class='post__text'>${post.text} </textarea>
            </div>
            `;
    });

    postsNode.innerHTML = postsHTML; 
}


function addLeadingZero(d) {
  return ( d < 10) ? '0' + d : d;
}
function getUserTime(t) {
    let Y = t.getFullYear();
    let M = addLeadingZero(t.getMonth() + 1);
    let D = addLeadingZero(t.getDate());
    let H = addLeadingZero(t.getHours());
    let m = addLeadingZero(t.getMinutes());
    return `${D}.${M}.${Y} ${H}:${m}` 
}