Array.from(document.querySelectorAll('*')).forEach(el => {
    if (el.getBoundingClientRect().width > window.innerWidth) {
        console.log('Wide element:', el);
    }
});
