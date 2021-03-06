

const logOutBtns = Array.from(document.querySelectorAll('.log-out'));

console.log(logOutBtns)

const logOutFunc = (e) => {
    e.preventDefault()

    localStorage.removeItem('@-sorosoke-webapp-token')
    localStorage.removeItem('@-sorosoke-webapp-userData')

    location.replace(`${window.location.origin}`);
    
}

logOutBtns.map(x => {
    console.log(x)
    x.addEventListener('click', (e) => logOutFunc(e))
})